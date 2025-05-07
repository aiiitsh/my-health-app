// src/pages/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AuthContext } from '../../App';  // adjust path to where App.js exports it

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
    r: '6',
    strokeWidth: '2',
    stroke: '#007AFF',
  },
};

const HomeScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);

  // Sign out by clearing user context, which resets navigation root
  const handleSignOut = () => {
    setUser(null);
  };

  // Dummy data for the charts
  const heartRateData = { labels: ['', '', '', '', ''], datasets: [{ data: [72, 75, 70, 78, 74] }] };
  const oxygenData    = { labels: ['', '', '', '', ''], datasets: [{ data: [97, 98, 99, 98, 97] }] };
  const breathRateData= { labels: ['', '', '', '', ''], datasets: [{ data: [16, 15, 17, 16, 16] }] };

  return (
    <ScrollView style={styles.container}>
      {/* Sign Out button at top left */}
      <View style={styles.signOutContainer}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>

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
  signOutContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
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
  chart: { borderRadius: 16 },
});

export default HomeScreen;
