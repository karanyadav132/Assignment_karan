import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, imagePath, Screen} from '../Helper/Constants';
import PrefManager from '../Helper/PrefManager';
import {useDispatch, useSelector} from 'react-redux';
import {getProfileRequest} from '../redux/action';

const DashboardScreen = props => {
  const {navigation} = props;
  const [greeting, setGreeting] = useState('');
  const dispatch = useDispatch();

  const profileDetails = useSelector(state => state.auth.profileDetails);

  const pullDown = async () => {
    dispatch(getProfileRequest());
  };

  useEffect(() => {
    pullDown();
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour < 18) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good night');
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.profileView}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image source={imagePath.users} style={styles.profile} />
            <View style={{marginTop: 20}} />
          </TouchableOpacity>

          <Text style={styles.profileName}>
            {profileDetails?.user?.firstName} {profileDetails?.user?.lastName}
          </Text>
        </View>
        <View>
          <Text style={styles.greeting}>Hello, {greeting}</Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: color.primary,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: Screen.fontScale * 25,
    color: color.white,
  },
  mainView: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profile: {
    width: Screen.width / 5,
    height: Screen.width / 5,
  },
  profileName: {
    fontSize: Screen.fontScale * 20,
    color: color.white,
  },
  profileView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
