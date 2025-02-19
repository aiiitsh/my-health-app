// src/pages/CaptureVitalSignsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const CaptureVitalSignsScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState(10);

  // Reset the countdown timer every time the screen is focused.
  useFocusEffect(
    React.useCallback(() => {
      setCountdown(10);
      return () => {};
    }, [])
  );

  // Countdown effect: decrement the timer every second.
  useEffect(() => {
    if (countdown <= 0) {
      navigation.navigate('Results');
      return;
    }
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/facevideo.mp4')}
        style={styles.video}
        shouldPlay
        resizeMode="cover"
        isLooping={false}
      />
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        <Text style={styles.loadingText}>Capturing Vital Signs</Text>
        <Text style={styles.timer}>{countdown}</Text>
        {/* Face guide overlay */}
        <View style={styles.faceGuideContainer}>
          <View style={styles.faceGuide} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    color: '#007AFF',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  faceGuideContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceGuide: {
    width: 270,
    height: 300,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)', // Slight transparent fill for emphasis
  },
});

export default CaptureVitalSignsScreen;
