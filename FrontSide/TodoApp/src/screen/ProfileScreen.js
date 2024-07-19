import {Alert, Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/HeaderComponents';
import {color, imagePath, Screen} from '../Helper/Constants';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import PrefManager from '../Helper/PrefManager';
import {deleteProfileRequest, deleteProfileRequestClear} from '../redux/action';

const ProfileScreen = props => {
  const {navigation} = props;
  const profileDetails = useSelector(state => state.auth.profileDetails);
  const userDeleteDetails = useSelector(state => state.auth.userDeleteDetails);

  const dispatch = useDispatch();

  const handleLogout = () => {
    PrefManager.removeValue('@access_token');
    PrefManager.removeValue('@userId');
    navigation.navigate('LoginScreen');
  };

  const handleDelete = () => {
    dispatch(deleteProfileRequest());
  };

  useEffect(() => {
    if (userDeleteDetails?.flag == true) {
      ToastAndroid.show(userDeleteDetails?.message, ToastAndroid.SHORT);
      dispatch(deleteProfileRequestClear());
      PrefManager.removeValue('@access_token');
      PrefManager.removeValue('@userId');
      navigation.navigate('LoginScreen');
    }
  }, [userDeleteDetails]);

  return (
    <View style={styles.container}>
      <Header
        title={'Profile'}
        isBack={true}
        navigation={navigation}
        isEdit={true}
      />
      <View style={[styles.container, {marginTop: Screen.width / 6}]}>
        <Image source={imagePath.users} style={styles.profile} />

        <Text style={styles.profileName}>
          {profileDetails?.user?.firstName} {profileDetails?.user?.lastName}
        </Text>
        <Text style={styles.profileName}>{profileDetails?.user?.email}</Text>
        <Text style={styles.profileName}>{profileDetails?.user?.mobile}</Text>
      </View>
      <Button
        title="Logout"
        onPress={() =>
          Alert.alert('Logout', 'Are you sure want to logout?', [
            {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'YES', onPress: () => handleLogout()},
          ])
        }
      />
      <Button
        title="Delete Account"
        onPress={() =>
          Alert.alert(
            'Delete Account',
            'Are you sure want to delete account?',
            [
              {
                text: 'NO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'YES', onPress: () => handleDelete()},
            ],
          )
        }
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  profile: {
    width: Screen.width / 2,
    height: Screen.width / 2,
  },
  profileName: {
    fontSize: Screen.fontScale * 20,
    color: color.black,
  },
});
