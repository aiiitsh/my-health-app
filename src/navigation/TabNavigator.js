// src/navigation/MainTabNavigator.js
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import ReportsScreen from '../pages/ReportsScreen';
import CaptureStackNavigator from './CaptureStackNavigator';
import VideoCallStackNavigator from './VideoCallStackNavigator';
import PreMeetingScreen from '../pages/PreMeetingScreen';
import { AuthContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import PatientsStackNavigator from './PatientsStackNavigator';
import MyDoctorsScreen from '../pages/MyDoctorsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
         headerShown: false,
         tabBarIcon: ({ focused, color, size }) => {
           let iconName;
           if (route.name === 'Home') {
             iconName = focused ? 'home' : 'home-outline';
           } else if (route.name === 'Capture') {
             iconName = focused ? 'camera' : 'camera-outline';
           } else if (route.name === 'Reports') {
             iconName = focused ? 'bar-chart' : 'bar-chart-outline';
           } else if (route.name === 'Video Call') {
             iconName = focused ? 'videocam' : 'videocam-outline';
           } else if (route.name === 'Patients') {
             iconName = focused ? 'people' : 'people-outline';
           } else if (route.name === 'My Doctors') {
             iconName = focused ? 'person' : 'person-outline';
           }
           return <Ionicons name={iconName} size={size} color={color} />;
         },
         tabBarActiveTintColor: '#007AFF',
         tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Capture" component={CaptureStackNavigator} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Video Call" component={VideoCallStackNavigator} />
      {user.role === 'doctor' && (
        <Tab.Screen name="Patients" component={PatientsStackNavigator} />
      )}
      {user.role === 'patient' && (
        <Tab.Screen name="My Doctors" component={MyDoctorsScreen} />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
