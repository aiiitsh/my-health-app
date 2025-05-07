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
import MapsScreen from '../pages/MapsScreen';  // <-- New import

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
         headerShown: false,
         tabBarIcon: ({ focused, color, size }) => {
           let iconName;
           switch (route.name) {
             case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
             case 'Capture': iconName = focused ? 'camera' : 'camera-outline'; break;
             case 'Reports': iconName = focused ? 'bar-chart' : 'bar-chart-outline'; break;
             case 'Video Call': iconName = focused ? 'videocam' : 'videocam-outline'; break;
             case 'Maps': iconName = focused ? 'map' : 'map-outline'; break;             
             case 'Patients': iconName = focused ? 'people' : 'people-outline'; break;
             case 'My Doctors': iconName = focused ? 'person' : 'person-outline'; break;
             default: iconName = 'ellipse';
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
      <Tab.Screen name="Maps" component={MapsScreen} />  
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