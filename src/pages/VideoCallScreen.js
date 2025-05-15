// src/pages/VideoCallScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const VideoCallScreen = ({ navigation }) => {
  const [vitals, setVitals] = useState({});

  const generateRandomVitals = () => {
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const systolic = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
    const diastolic = Math.floor(Math.random() * (85 - 70 + 1)) + 70;
    const bloodPressure = `${systolic}/${diastolic} mmHg`;
    const respiratoryRate = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    const temperature = (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1) + '°C';
    const oxygenSaturation = Math.floor(Math.random() * (100 - 95 + 1)) + 95 + '%';
    const bloodGlucose = Math.floor(Math.random() * (120 - 80 + 1)) + 80 + ' mg/dL';

    return {
      heartRate: heartRate + ' BPM',
      bloodPressure,
      respiratoryRate: respiratoryRate + ' breaths/min',
      temperature,
      oxygenSaturation,
      bloodGlucose,
    };
  };

  useEffect(() => {
    setVitals(generateRandomVitals());
  }, []);

  const vitalSigns = [
    {
      key: 'heartRate',
      label: 'Heart Rate',
      value: vitals.heartRate,
      icon: <Ionicons name="heart" size={24} color="#fff" />,
    },
    {
      key: 'bloodPressure',
      label: 'Blood Pressure',
      value: vitals.bloodPressure,
      icon: <MaterialCommunityIcons name="heart-pulse" size={24} color="#fff" />,
    },
    {
      key: 'respiratoryRate',
      label: 'Respiratory',
      value: vitals.respiratoryRate,
      icon: <MaterialCommunityIcons name="lungs" size={24} color="#fff" />,
    },
    {
      key: 'temperature',
      label: 'Temperature',
      value: vitals.temperature,
      icon: <MaterialCommunityIcons name="thermometer" size={24} color="#fff" />,
    },
    {
      key: 'oxygenSaturation',
      label: 'Oxygen',
      value: vitals.oxygenSaturation,
      icon: <Ionicons name="water" size={24} color="#fff" />,
    },
    {
      key: 'bloodGlucose',
      label: 'Glucose',
      value: vitals.bloodGlucose,
      icon: <MaterialCommunityIcons name="spoon-sugar" size={24} color="#fff" />,
    },
  ];

  // Split the vital signs into two columns (first three on the left, last three on the right)
  const leftColumn = vitalSigns.slice(0, 3);
  const rightColumn = vitalSigns.slice(3, 6);

  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/facevideo.mp4')}
        style={styles.video}
        shouldPlay
        resizeMode="cover"
        isLooping
      />
      <View style={styles.overlay}>
        <View style={styles.vitalsContainer}>
          <View style={styles.vitalColumn}>
            {leftColumn.map(item => (
              <View key={item.key} style={styles.vitalItem}>
                {item.icon}
                <Text style={styles.vitalText}>{item.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.vitalColumn}>
            {rightColumn.map(item => (
              <View key={item.key} style={styles.vitalItem}>
                {item.icon}
                <Text style={styles.vitalText}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.hangupButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialCommunityIcons name="phone-hangup" size={36} color="#fff" />
        </TouchableOpacity>
        {/* Small preview rectangle at bottom right */}
        <View style={styles.previewContainer}>
          <Image
            source={require('../../assets/face2.jpg')}
            style={styles.previewImage}
            resizeMode="cover"
          />
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'space-between',
  },
  vitalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40, // shift vitals higher
    marginBottom: 80, // leave room for hangup button
  },
  vitalColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center',
  },
  vitalText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'center',
  },
  hangupButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 30,
    zIndex: 1,
  },
  previewContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120,
    height: 90,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

export default VideoCallScreen;
