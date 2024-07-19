import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {color, Screen} from '../Helper/Constants';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.bgstyle} onPress={onPress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  bgstyle: {
    backgroundColor: color.primary,
    width: Screen.width / 1.2,
    borderRadius: 10,
    alignItems: 'center',
    padding: Screen.width / 30,
    alignSelf: 'center',
    marginBottom: Screen.width / 30,
  },
  textStyle: {
    fontSize: Screen.fontScale * 20,
    color: color.white,
  },
});
