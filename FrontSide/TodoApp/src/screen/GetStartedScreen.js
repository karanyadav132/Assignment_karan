import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {color, Screen} from '../Helper/Constants';
import Button from '../components/Button';
import PrefManager from '../Helper/PrefManager';

const GetStartedScreen = ({navigation}) => {
  useEffect(() => {
    pullDown();
  }, []);

  const pullDown = async () => {
    const userId = await PrefManager.getValue('@userId');
    if (userId) {
      navigation.navigate('DashboardScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };
  return (
    <>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to TodoApp</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  title: {
    fontSize: Screen.fontScale * 28,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: Screen.fontScale * 20,
    color: color.white,
  },
  bgstyle: {
    backgroundColor: color.primary,
    width: Screen.width / 1.2,
    borderRadius: 10,
    alignItems: 'center',
    padding: Screen.width / 30,
    alignSelf: 'center',
    marginBottom: Screen.width / 30,
  },
});

export default GetStartedScreen;
