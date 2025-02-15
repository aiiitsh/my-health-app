// src/pages/ResultsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import VitalSignBox from '../components/VitalSignBox';

const ResultsScreen = ({ navigation }) => {
  const [vitals, setVitals] = useState({});

  const generateRandomVitals = () => {
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const systolic = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
    const diastolic = Math.floor(Math.random() * (85 - 70 + 1)) + 70;
    const bloodPressure = `${systolic}/${diastolic} mmHg`;
    const respiratoryRate = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
    const temperature = (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1) + '°C';
    // Use Unicode escape for % to avoid formatting issues
    const oxygenSaturation = Math.floor(Math.random() * (100 - 95 + 1)) + 95 + '\u0025';
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

  const handleSave = () => {
    navigation.navigate('Reports', { savedVitals: vitals });
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Results</Text>
      <View style={styles.boxContainer}>
        <VitalSignBox title="Heart Rate" reading={vitals.heartRate} icon="❤️" />
        <VitalSignBox title="Blood Pressure" reading={vitals.bloodPressure} icon="💓" />
        <VitalSignBox title="Respiratory Rate" reading={vitals.respiratoryRate} icon="🌬️" />
        <VitalSignBox title="Temperature" reading={vitals.temperature} icon="🌡️" />
        <VitalSignBox title="Oxygen Saturation" reading={vitals.oxygenSaturation} icon="🫁" />
        <VitalSignBox title="Blood Glucose" reading={vitals.bloodGlucose} icon="🍭" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // centers the boxes horizontally
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  skipButton: {
    backgroundColor: '#005BB5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ResultsScreen;
