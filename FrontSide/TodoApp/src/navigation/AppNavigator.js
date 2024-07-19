import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  TransitionPresets,
} from '@react-navigation/native-stack';
import GetStartedScreen from '../screen/GetStartedScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import DashboardScreen from '../screen/DashboardScreen';
import ProfileScreen from '../screen/ProfileScreen';
import EditProfileScreen from '../screen/EditProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetStarted"
        navigationOptions={{
          headerVisible: false,
        }}
        screenOptions={{
          headerShown: false,
          estureEnabled: false,
          cardOverlayEnabled: true,
          // <-- The preset causing this issue!
        }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
