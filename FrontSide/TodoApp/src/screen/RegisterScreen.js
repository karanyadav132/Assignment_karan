import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ToastAndroid} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import {color, Screen} from '../Helper/Constants';
import Button from '../components/Button';
import {RegistervalidationSchema} from '../Helper/ValidationSchema';
import {registerRequest, registerRequestClear} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import PrefManager from '../Helper/PrefManager';

const RegisterScreen = props => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const registerUser = useSelector(state => state.auth.registerUser);

  useEffect(() => {
    if (registerUser?.flag == true && registerUser !== null) {
      ToastAndroid.show(registerUser?.message, ToastAndroid.SHORT);
      PrefManager.setValue('@access_token', registerUser?.token);
      PrefManager.setValue('@userId', registerUser?.user?.id);
      dispatch(registerRequestClear());
      navigation.navigate('DashboardScreen');
    } else if (registerUser?.flag == false && registerUser !== null) {
      ToastAndroid.show(registerUser?.message, ToastAndroid.SHORT);
      dispatch(registerRequestClear());
    }
  }, [registerUser]);

  const handleRegister = values => {
    const data = {
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      email: values.email,
      password: values.password,
    };
    dispatch(registerRequest(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Register</Text>
      <Text style={styles.subhead}>Create your TodoApp account</Text>

      <Formik
        initialValues={{
          fname: '',
          lname: '',
          mobile: '',
          email: '',
          password: '',
        }}
        validationSchema={RegistervalidationSchema}
        onSubmit={values => {
          // handle form submission
          handleRegister(values);
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
              label="First Name"
              value={values.fname}
              onChangeText={handleChange('fname')}
              onBlur={handleBlur('fname')}
              errorMessage={touched.fname && errors.fname ? errors.fname : ''}
            />
            <TextField
              label="Last Name"
              value={values.lname}
              onChangeText={handleChange('lname')}
              onBlur={handleBlur('lname')}
              errorMessage={touched.lname && errors.lname ? errors.lname : ''}
            />
            <TextField
              label="Mobile"
              value={values.mobile}
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              errorMessage={
                touched.mobile && errors.mobile ? errors.mobile : ''
              }
              keyboardType="numeric"
            />
            <TextField
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorMessage={touched.email && errors.email ? errors.email : ''}
              keyboardType="email-address"
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
              <Button title="Register" onPress={handleSubmit} />
            </View>

            <View style={styles.registerView}>
              <Text
                style={styles.registerText}
                onPress={() => navigation.navigate('LoginScreen')}>
                Already have a account? Login.
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  head: {
    fontSize: Screen.fontScale * 35,
    marginBottom: 10,
    color: color.primary,
  },
  subhead: {
    fontSize: Screen.fontScale * 15,
    marginBottom: 20,
    color: color.gray,
  },
  formContainer: {
    width: '100%',
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
});
