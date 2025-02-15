// src/navigation/AuthStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import SignUpScreen from '../pages/SignUpScreen';
import ForgotPasswordScreen from '../pages/ForgotPasswordScreen';
import ConfirmCodeScreen from '../pages/ConfirmCodeScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
