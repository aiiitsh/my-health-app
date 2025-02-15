// src/pages/ReportsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ReportsScreen = () => {
  const [filter, setFilter] = useState('week');

  // Define static fake data for each filter option
  const fakeData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ data: [70, 72, 75, 68, 80, 78, 73] }]
    },
    month: {
      labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
      datasets: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 60) }]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{ data: [70, 72, 75, 68, 80, 78, 73, 74, 76, 71, 69, 73] }]
    }
  };

  const [chartData, setChartData] = useState(fakeData.week);

  // Update the chart data when the filter changes.
  useEffect(() => {
    setChartData(fakeData[filter]);
  }, [filter]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Reports</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          <Picker.Item label="Last Week" value="week" />
          <Picker.Item label="Last Month" value="month" />
          <Picker.Item label="Last Year" value="year" />
        </Picker>
      </View>
      {['Heart Rate', 'Blood Pressure', 'Respiratory Rate', 'Temperature', 'Oxygen Saturation', 'Blood Glucose'].map((vital, index) => (
        <View key={index} style={styles.chartContainer}>
          <Text style={styles.chartTitle}>{vital}</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#007AFF',
  },
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
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#007AFF',
  },
  chartContainer: {
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
});

export default ReportsScreen;
