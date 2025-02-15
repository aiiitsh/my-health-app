// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import ReportsScreen from '../pages/ReportsScreen';
import VideoCallScreen from '../pages/VideoCallScreen';
import CaptureStackNavigator from './CaptureStackNavigator';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
      <Tab.Screen name="Video Call" component={VideoCallScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
