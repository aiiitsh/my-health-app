// src/navigation/CaptureStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CaptureVitalSignsScreen from '../pages/CaptureVitalSignsScreen';
import ResultsScreen from '../pages/ResultsScreen'; // Make sure this exists and is exported

const Stack = createNativeStackNavigator();

const CaptureStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CaptureVitalSigns" component={CaptureVitalSignsScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};

export default CaptureStackNavigator;
