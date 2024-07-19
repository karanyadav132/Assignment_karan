-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 05:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_registration`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser` (IN `p_userId` INT)   BEGIN
    DELETE FROM users WHERE id = p_userId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByEmail` (IN `p_email` VARCHAR(255))   BEGIN
    SELECT * FROM users WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserById` (IN `p_userId` INT)   BEGIN
    SELECT * FROM users WHERE id = p_userId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registerUser` (IN `p_firstName` VARCHAR(255), IN `p_lastName` VARCHAR(255), IN `p_mobile` VARCHAR(10), IN `p_email` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    INSERT INTO users (firstName,lastName,mobile,email, password) VALUES (p_firstName,p_lastName,p_mobile, p_email, p_password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser` (IN `p_userId` INT, IN `p_firstName` VARCHAR(50), IN `p_lastName` VARCHAR(50), IN `p_mobile` VARCHAR(15))   BEGIN
    UPDATE users
    SET firstName = p_firstName,
        lastName = p_lastName,
        mobile = p_mobile
    WHERE id = p_userId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'UTC',
  `createdBy` varchar(100) DEFAULT NULL,
  `updatedDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'UTC',
  `updatedBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `mobile`, `email`, `password`, `createdDate`, `createdBy`, `updatedDate`, `updatedBy`) VALUES
(1, 'John', 'Doe', '1234539w34', 'john.doe371w11ewe6esas2313@example.com', '$2b$10$gwPY8MOhOjqlCXTQQuXjs..xjzLSsAnZw.Pd3t5PPthsrwDw4mtZu', '2024-07-19 02:55:22', NULL, '2024-07-19 02:55:22', NULL),
(2, 'Test', 'New', '7845213690', 'test@gmail.com', '$2b$10$5t/Fz4POilzpR1dyt0fgdeUZuOn8j/4DKuDUBV44lMTA37eYF.Bia', '2024-07-19 03:17:15', NULL, '2024-07-19 03:17:15', NULL),
(3, 'test', '123', '1234567890', 'test123@gmail.com', '$2b$10$MAhVEc6Re4jvZ3k3TM11meX/gtbNXSS2rk73.jzxsjDSmBAP1xAbq', '2024-07-19 03:20:54', NULL, '2024-07-19 03:20:54', NULL),
(5, 'John', 'Doe', '1234539w34', 'john.doe371w11ewe6esas231e3@example.com', '$2b$10$KUtIu7WDQvmTXFHwBXy34ud/uaUecc1qXRkVZ/auR6OAItJykianS', '2024-07-19 03:22:35', NULL, '2024-07-19 03:22:35', NULL),
(6, 'test', '1234', '7894561230', 'test12345@gmail.com', '$2b$10$3xrl0G.nFF.hVSgNqIN/du9uFFs2kTdJVY5F1saeF2lThunUUsJFi', '2024-07-19 03:26:52', NULL, '2024-07-19 03:26:52', NULL),
(8, 'John', 'Doe', '1234539w34', 'john.3@example.com', '$2b$10$WuDvkme740ichreBJS1KuO6H.gBhITFtSHYi96LSwsXZvHQ3pxM42', '2024-07-19 03:29:47', NULL, '2024-07-19 03:29:47', NULL),
(10, 'John', 'Doe', '1234539w34', 'john.322@example.com', '$2b$10$6uWdKOLfgQc9rlpiNulE3eGit7EE65r/.EY8UvniRM.VlAvnhiuIS', '2024-07-19 03:38:25', NULL, '2024-07-19 03:38:25', NULL),
(12, 'John', 'Doe', '1234539w34', 'john.1111@example.com', '$2b$10$kb3oitmlqzQZY.c1UJLMoutWR7XNX.SLiEdZHz/sD9DxhbockxQj6', '2024-07-19 03:42:11', NULL, '2024-07-19 03:42:11', NULL),
(13, 'John', 'Doe', '1234539w34', 'john.111www@example.com', '$2b$10$6jn3TLQfY0.CMwbQo4iPI.NKwwT7w57vOT17SgeE/fuf9Dz3RvyjG', '2024-07-19 03:42:45', NULL, '2024-07-19 03:42:45', NULL),
(14, 'testkkk', 'new1', '7895642231', 'test45@gmail.com', '$2b$10$V2XG66RiokSAgA5tDRVBHeQ/TsLSE0v2NTEmg5dVPWYKskHIgOI9.', '2024-07-19 03:46:28', NULL, '2024-07-19 03:46:44', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
