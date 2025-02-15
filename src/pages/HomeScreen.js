// src/pages/HomeScreen.js
import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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
    r: "6",
    strokeWidth: "2",
    stroke: "#007AFF",
  },
};

const HomeScreen = () => {
  // Dummy data for the charts
  const heartRateData = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        data: [72, 75, 70, 78, 74], // BPM values
      },
    ],
  };

  const oxygenData = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        data: [97, 98, 99, 98, 97], // Oxygen saturation in %
      },
    ],
  };

  const breathRateData = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        data: [16, 15, 17, 16, 16], // Breath rate in breaths/min
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hi Ahmed</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Heart Rate (BPM)</Text>
        <LineChart
          data={heartRateData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Oxygen Level (%)</Text>
        <LineChart
          data={oxygenData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Breath Rate (breaths/min)</Text>
        <LineChart
          data={breathRateData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

export default HomeScreen;
