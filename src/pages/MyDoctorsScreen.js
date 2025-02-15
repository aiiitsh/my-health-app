// src/pages/MyDoctorsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';

const doctors = [
  { id: '1', name: 'Doctor H', phone: '01024204493', hasAccess: false },
  { id: '2', name: 'Doctor H', phone: '01024204493', hasAccess: false },
  { id: '3', name: 'Doctor H', phone: '01024204493', hasAccess: false },
];

const MyDoctorsScreen = () => {
  const [doctorList, setDoctorList] = useState(doctors);

  const toggleAccess = (id) => {
    setDoctorList(prev =>
      prev.map(doc => doc.id === id ? { ...doc, hasAccess: !doc.hasAccess } : doc)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.phone}</Text>
      <Switch value={item.hasAccess} onValueChange={() => toggleAccess(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={doctorList}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 40, backgroundColor: '#fff' },
  item: { backgroundColor: '#f0f8ff', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  itemText: { fontSize: 18, color: '#007AFF' },
});

export default MyDoctorsScreen;
