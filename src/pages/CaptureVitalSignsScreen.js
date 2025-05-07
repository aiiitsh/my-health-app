// src/pages/CaptureVitalSignsScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';      // :contentReference[oaicite:0]{index=0}
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const CaptureVitalSignsScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [countdown, setCountdown] = useState(10);
  const cameraRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  // 1️⃣ Ask for camera permission on mount
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  // 2️⃣ Reset state whenever this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setCountdown(10);
      setVideoUri(null);
      setRecording(false);
    }, [])
  );

  // 3️⃣ Kick off recording at t = 10
  useEffect(() => {
    if (permission?.granted && !recording && countdown === 10) {
      startRecording();
    }
  }, [permission, recording, countdown]);

  // 4️⃣ Countdown → stop & navigate at 0
  useEffect(() => {
    if (countdown <= 0) {
      if (recording) {
        cameraRef.current?.stopRecording();
      }
      navigation.navigate('Results', { videoUri });
      return;
    }
    const timer = setInterval(() => setCountdown((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, recording, navigation, videoUri]);

  // 📹 10-second capture helper
  const startRecording = async () => {
    if (!cameraRef.current) return;
    setRecording(true);
    try {
      const { uri } = await cameraRef.current.recordAsync({
        maxDuration: 10,
      });
      setVideoUri(uri);
    } catch (e) {
      console.warn('Recording error:', e);
    } finally {
      setRecording(false);
    }
  };

  // 🚫 Permission UI
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Loading permissions…</Text>
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera access is required.</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {videoUri ? (
        // ▶️ Play back the recorded clip
        <Video
          source={{ uri: videoUri }}
          style={styles.video}
          shouldPlay
          resizeMode="cover"
          isLooping={false}
        />
      ) : (
        // 📷 Live front-cam preview
        <CameraView
          ref={cameraRef}
          style={styles.video}
          facing="front"       // :contentReference[oaicite:1]{index=1}
          mode="video"
          videoQuality="480p"   // :contentReference[oaicite:2]{index=2}
        />
      )}

      {/* your existing overlay */}
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        <Text style={styles.loadingText}>Capturing Vital Signs</Text>
        <Text style={styles.timer}>{countdown}</Text>
        <View style={styles.faceGuideContainer}>
          <View style={styles.faceGuide} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  video: { flex: 1, width: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: { marginBottom: 10 },
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
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default CaptureVitalSignsScreen;
