const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const secretKey = "your_secret_key";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "", // replace with your MySQL password
  database: "user_registration",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Register API
app.post("/register", async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  if (!firstName || !lastName || !mobile || !email || !password) {
    return res.status(400).send({ message: "Please fill all fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "CALL registerUser(?, ?, ?, ?, ?)";

    db.query(
      query,
      [firstName, lastName, mobile, email, hashedPassword],
      (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            if (err.message.includes("mobile")) {
              return res
                .status(200)
                .send({ message: "Mobile number already exists", flag: false });
            } else if (err.message.includes("email")) {
              return res
                .status(200)
                .send({ message: "Email address already exists", flag: false });
            }
          }
          console.error(err);
          return res.status(500).send({ message: "Server error" });
        }

        const userId = results.insertId;
        const token = jwt.sign({ userId: userId }, secretKey, {
          expiresIn: "1h",
        });

        // Fetch user details after registration
        const userQuery =
          "SELECT id, firstName, lastName, mobile, email FROM users WHERE email = ?";
        db.query(userQuery, [email], (err, userResults) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ message: "Server error" });
          }

          const user = userResults[0];

          const token = jwt.sign({ userId: user.id }, secretKey, {
            expiresIn: "1h",
          });
          res.status(201).send({
            message: "User registered successfully",
            token,
            user,
            flag: true,
          });
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Please fill all fields" });
  }

  const query = "CALL getUserByEmail(?)";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Server error" });
    }

    const user = results[0][0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", flag: false });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.status(200).send({
      message: "Login successful",
      token,
      userId: user.id,
      flag: true,
    });
  });
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Get User Profile API
app.get("/profile", authenticateToken, (req, res) => {
  const userId = req.user.userId;

  const query = "CALL getUserById(?)";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Server error" });
    }

    const user = results[0][0];
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Remove sensitive data like password before sending response
    delete user.password;
    res.status(200).send({ user });
  });
});

// Update User Profile API
app.put("/profile", authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { firstName, lastName, mobile } = req.body;

  if (!firstName || !lastName || !mobile) {
    return res
      .status(400)
      .send({ message: "Please fill all fields", flag: false });
  }

  try {
    const query = "CALL updateUser(?, ?, ?, ?)";
    await db.query(query, [userId, firstName, lastName, mobile]);
    res
      .status(200)
      .send({ message: "Profile updated successfully", flag: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error", flag: false });
  }
});

// Delete User Account API
app.delete("/profile", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const query = "CALL deleteUser(?)";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Server error", flag: false });
    }

    res.status(200).send({ message: "User deleted successfully", flag: true });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
