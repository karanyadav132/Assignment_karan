import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/HeaderComponents';
import {Formik} from 'formik';
import TextField from '../components/TextField';
import {color, imagePath, Screen} from '../Helper/Constants';
import * as Yup from 'yup';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileRequest,
  updateProfileRequest,
  updateProfileRequestClear,
} from '../redux/action';

const EditProfileScreen = props => {
  const {navigation} = props;

  const [firstName, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const profileDetails = useSelector(state => state.auth.profileDetails);

  const profileUpdate = useSelector(state => state.auth.profileUpdate);

  useEffect(() => {
    if (profileUpdate?.flag == true) {
      ToastAndroid.show(profileUpdate?.message, ToastAndroid.SHORT);
      dispatch(updateProfileRequestClear());
      dispatch(getProfileRequest());
    }
  }, [profileUpdate]);

  useEffect(() => {
    if (profileDetails?.user) {
      setFirstName(profileDetails?.user?.firstName);
      setLastName(profileDetails?.user?.lastName);
      setMobile(profileDetails?.user?.mobile);
      setEmail(profileDetails?.user?.email);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleUpdateDetails = values => {
    const data = {
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      email: values.email,
    };

    dispatch(updateProfileRequest(data));
  };

  return (
    <View style={styles.container}>
      <Header title={'Edit Profile'} isBack={true} navigation={navigation} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            fname: firstName,
            lname: lastname,
            mobile: mobile,
            email: email,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={values => {
            handleUpdateDetails(values);
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
              <Image source={imagePath.users} style={styles.profile} />

              <View style={{marginBottom: Screen.width / 7}} />

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
                editable={false}
                keyboardType="numeric"
              />
              <TextField
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMessage={touched.email && errors.email ? errors.email : ''}
                keyboardType="email-address"
                editable={false}
              />

              <View style={styles.viewContainer}>
                <Button title="Update" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  formContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  profile: {
    width: Screen.width / 3,
    height: Screen.width / 3,
  },
});
