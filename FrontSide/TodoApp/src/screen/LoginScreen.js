import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import TextField from '../components/TextField';
import {color, imagePath, Screen} from '../Helper/Constants';
import Button from '../components/Button';
import {loginvalidationSchema} from '../Helper/ValidationSchema';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest, loginRequestclear} from '../redux/action';
import PrefManager from '../Helper/PrefManager';

const LoginScreen = props => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const users = useSelector(state => state.auth.user);

  useEffect(() => {
    if (users?.flag == true && users !== null) {
      ToastAndroid.show(users?.message, ToastAndroid.SHORT);
      PrefManager.setValue('@access_token', users?.token);
      PrefManager.setValue('@userId', users?.userId);
      dispatch(loginRequestclear());
      navigation.navigate('DashboardScreen');
    } else if (users?.flag == false && users !== null) {
      ToastAndroid.show(users?.message, ToastAndroid.SHORT);
      dispatch(loginRequestclear());
    }
  }, [users]);

  const handleLogin = values => {
    const data = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginRequest(data));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Login</Text>
      <Text style={styles.subhead}>Welcome to TodoApp</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginvalidationSchema}
        onSubmit={values => {
          // handle form submission
          handleLogin(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <TextField
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorMessage={touched.email && errors.email ? errors.email : ''}
            />
            <TextField
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={
                touched.password && errors.password ? errors.password : ''
              }
              secureTextEntry
            />

            <View style={styles.viewContainer}>
              <Button title="Login" onPress={handleSubmit} />
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.googleButton}>
                <Image source={imagePath.google} style={styles.icon} />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.facebookButton}>
                <Image source={imagePath.facebook} style={styles.icon} />

                <Text style={styles.buttonText}>Sign in with Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.appleButton}>
                <Image source={imagePath.apple} style={styles.icon} />

                <Text style={styles.buttonText}>Sign in with Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerView}>
              <Text
                style={styles.registerText}
                onPress={() => navigation.navigate('RegisterScreen')}>
                Create a account? SignUp.
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    fontSize: Screen.fontScale * 35,
    color: color.primary,
  },
  subhead: {
    fontSize: Screen.fontScale * 15,
    marginBottom: Screen.width / 5,
    color: color.gray,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  registerView: {
    alignSelf: 'center',
    marginTop: Screen.width / 20,
  },
  registerText: {
    fontSize: Screen.fontScale * 15,
    color: color.gray,
  },
  viewContainer: {
    marginTop: Screen.width / 8,
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DB4437',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    justifyContent: 'center',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    justifyContent: 'center',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    justifyContent: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: color.white,
    marginRight: 10,
  },
  appleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
