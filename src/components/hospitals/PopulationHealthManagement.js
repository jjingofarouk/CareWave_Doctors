import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Using react-native-chart-kit for charts

const PopulationHealthManagement = () => {
  const [healthData, setHealthData] = useState([
    { condition: 'Diabetes', percentage: 15.4, risk: 0.1 },
    { condition: 'Heart Disease', percentage: 9.1, risk: 0.2 },
    { condition: 'Hypertension', percentage: 22.8, risk: 0.15 },
  ]);
  const [riskData, setRiskData] = useState([]);
  const [engagement, setEngagement] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [sdoh, setSdoh] = useState({ income: 30000, education: 'High School' });

  useEffect(() => {
    // Simulate real-time updates for health data
    const interval = setInterval(() => {
      const newRiskData = healthData.map((data) => ({
        ...data,
        risk: data.risk + (Math.random() - 0.05), // Random fluctuation
      }));

      setHealthData((prevData) =>
        prevData.map((data) => ({
          ...data,
          percentage: Math.max(0, data.percentage + (Math.random() - 0.5)),
        }))
      );

      setRiskData((prev) => [...prev, ...newRiskData]);

      // Trigger alerts based on health thresholds
      const newAlerts = newRiskData.filter((data) => data.risk > 0.15);
      if (newAlerts.length > 0) {
        setAlerts((prevAlerts) => [
          ...prevAlerts,
          `High risk detected for: ${newAlerts.map((item) => item.condition).join(', ')}`,
        ]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [healthData]);

  const handleGenerateReport = () => {
    const report = {
      healthData,
      riskData,
      engagement,
      sdoh,
      alerts,
    };
    console.log('Generating Population Health Report:', JSON.stringify(report, null, 2));
    Alert.alert('Population Health Report', 'Report generated in console.');
  };

  const handlePatientEngagement = () => {
    // Simulate patient engagement score
    const newEngagement = Math.random() * 100;
    setEngagement(newEngagement);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Population Health Management</Text>
      <Text style={styles.description}>
        Monitor and manage health outcomes across specific population segments.
      </Text>

      {/* Health Data List */}
      <FlatList
        data={healthData}
        keyExtractor={(item) => item.condition}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.condition}: {item.percentage.toFixed(2)}% | Risk: {item.risk.toFixed(2)}
            </Text>
          </View>
        )}
      />

      {/* Alerts Section */}
      <Text style={styles.subHeader}>Alerts</Text>
      {alerts.length > 0 ? (
        <FlatList
          data={alerts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.alert}>{item}</Text>
          )}
        />
      ) : (
        <Text>No alerts</Text>
      )}

      {/* Risk Data Visualization */}
      <Text style={styles.chartHeader}>Risk Trend Over Time</Text>
      <LineChart
        data={{
          labels: riskData.slice(-5).map((entry) => entry.condition),
          datasets: [
            {
              data: riskData.slice(-5).map((entry) => entry.risk),
              strokeWidth: 2,
              color: () => '#f78837',
            },
          ],
        }}
        width={350} // Set chart width
        height={220} // Set chart height
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // For better readability
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />

      {/* Patient Engagement Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handlePatientEngagement}
      >
        <Text style={styles.buttonText}>Assess Patient Engagement</Text>
      </TouchableOpacity>
      <Text>Current Patient Engagement Level: {engagement.toFixed(2)}%</Text>

      {/* Generate Report Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGenerateReport}
      >
        <Text style={styles.buttonText}>Generate Population Health Report</Text>
      </TouchableOpacity>

      {/* SDOH Assessment */}
      <Text style={styles.subHeader}>Social Determinants of Health</Text>
      <Text>Income: ${sdoh.income}, Education: {sdoh.education}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004C54',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  alert: {
    color: 'red',
    marginVertical: 5,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  chart: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#27c7b8',
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PopulationHealthManagement;
