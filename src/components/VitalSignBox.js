// src/components/VitalSignBox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VitalSignBox = ({ title, reading, icon }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.reading}>{reading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '45%',
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    fontSize: 32,
    marginBottom: 5,
    color: '#007AFF',
  },
  title: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  reading: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default VitalSignBox;
