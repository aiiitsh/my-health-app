// src/navigation/PatientsStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientsScreen from '../pages/PatientsScreen';
import PatientReportsScreen from '../pages/PatientReportsScreen';

const Stack = createNativeStackNavigator();

const PatientsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientsMain" component={PatientsScreen} />
      <Stack.Screen name="PatientReports" component={PatientReportsScreen} />
    </Stack.Navigator>
  );
};

export default PatientsStackNavigator;
