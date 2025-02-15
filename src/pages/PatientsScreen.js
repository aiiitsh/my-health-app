// src/pages/PatientsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const patients = [
  { id: '1', name: 'Patient 1', phone: '01024204493' },
  { id: '2', name: 'Patient 2', phone: '01024204493' },
  { id: '3', name: 'Patient 3', phone: '01024204493' },
];

const PatientsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.phone}</Text>
      // Example snippet inside PatientsScreen.js renderItem:
<TouchableOpacity
  style={styles.reportButton}
  onPress={() => navigation.navigate('PatientReports', { patient: item })}
>
  <Text style={styles.reportButtonText}>Show Reports</Text>
</TouchableOpacity>

    </View>
  );

  return (
    <FlatList
      data={patients}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  item: { backgroundColor: '#f0f8ff', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  itemText: { fontSize: 18, color: '#007AFF' },
  reportButton: { marginTop: 10, backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  reportButtonText: { color: '#fff', fontSize: 16 },
});

export default PatientsScreen;
