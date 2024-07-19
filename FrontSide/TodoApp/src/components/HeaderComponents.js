// components/Header.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Screen, color, imagePath} from '../Helper/Constants';

const Header = ({title, isBack, navigation, isEdit}) => {
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.header}>
        <View style={styles.subheader}>
          <View style={{flexDirection: 'row'}}>
            {isBack && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Image source={imagePath.back} style={styles.imageStyle} />
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>{title}</Text>
          </View>
          <View>
            {isEdit && (
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfileScreen')}
                style={styles.backButton}>
                <Image source={imagePath.edit} style={styles.imageStyle} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: Screen.height / 14,
    backgroundColor: color.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheader: {
    width: '98%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginLeft: Screen.height / 50,
  },
  headerText: {
    color: 'white',
    fontSize: Screen.fontScale * 22,
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  imageStyle: {
    width: Screen.height / 30,
    height: Screen.height / 30,
    tintColor: color.white,
  },
});

export default Header;
