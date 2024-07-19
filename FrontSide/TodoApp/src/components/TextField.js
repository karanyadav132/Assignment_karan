import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Screen} from '../Helper/Constants';

const TextField = props => {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    errorMessage,
    onBlur,
    secureTextEntry,
    editable,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: Screen.width / 1.2,
    alignSelf: 'center',
  },
  label: {
    fontSize: Screen.fontScale * 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: Screen.width / 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  appContainer: {
    padding: 20,
  },
});
