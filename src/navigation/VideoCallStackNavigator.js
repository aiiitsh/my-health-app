// src/navigation/VideoCallStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreMeetingScreen from '../pages/PreMeetingScreen';
import VideoCallScreen from '../pages/VideoCallScreen';

const Stack = createNativeStackNavigator();

const VideoCallStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PreMeeting" component={PreMeetingScreen} />
      <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
    </Stack.Navigator>
  );
};

export default VideoCallStackNavigator;
