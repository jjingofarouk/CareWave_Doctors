import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const AdvancedCommandCenter = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [utilities, setUtilities] = useState({
    HVAC: 'Operational',
    Power: 'Stable',
    WaterSupply: 'Stable',
    BackupGenerators: 'Ready',
  });
  const [predictions, setPredictions] = useState({
    ICU: 'Stable',
    Wards: 'Stable',
    ER: 'Overload Imminent',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRealTimeData();
      fetchAmbulanceData();
      checkUtilitiesStatus();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRealTimeData = () => {
    const newData = generateRealTimeData();
    setRealTimeData((prevData) => [...prevData.slice(-20), newData]);
    setMetrics(calculateOperationalMetrics());
    setAlerts(checkForAlerts());
    updatePredictions();
    handleSurge();
  };

  const generateRealTimeData = () => ({
    timestamp: new Date().toLocaleTimeString(),
    patientFlow: Math.floor(Math.random() * 100),
    availableBeds: Math.floor(Math.random() * 50),
    emergencies: Math.floor(Math.random() * 10),
    waitTime: Math.floor(Math.random() * 60),
    staffUtilization: Math.floor(Math.random() * 100),
  });

  const calculateOperationalMetrics = () => ({
    icuOccupancy: Math.floor(Math.random() * 100),
    emergencyRoomLoad: Math.floor(Math.random() * 100),
    surgicalRoomUsage: Math.floor(Math.random() * 100),
    equipmentUtilization: Math.floor(Math.random() * 100),
    medicationInventory: Math.floor(Math.random() * 100),
  });

  const checkForAlerts = () => {
    const randomAlert = Math.random() > 0.9;
    if (randomAlert) {
      return [
        ...alerts,
        { id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: 'Code Blue in ICU', severity: 'high' },
      ];
    }
    return alerts;
  };

  const fetchAmbulanceData = () => {
    setAmbulanceData((prev) => [
      ...prev.slice(-5),
      {
        id: Math.random(),
        location: `Location-${Math.floor(Math.random() * 10)}`,
        status: 'En Route',
        ETA: `${Math.floor(Math.random() * 10)} mins`,
      },
    ]);
  };

  const checkUtilitiesStatus = () => {
    const randomFailure = Math.random() > 0.95;
    if (randomFailure) {
      setUtilities((prev) => ({
        ...prev,
        Power: 'Failure',
      }));
      setAlerts((prev) => [
        ...prev,
        { id: Date.now(), timestamp: new Date().toLocaleTimeString(), message: 'Power Supply Failure Detected', severity: 'critical' },
      ]);
    }
  };

  const updatePredictions = () => {
    setPredictions((prev) => ({
      ...prev,
      ICU: metrics.icuOccupancy > 80 ? 'Overload Imminent' : 'Stable',
      ER: metrics.emergencyRoomLoad > 70 ? 'Overload Imminent' : 'Stable',
    }));
  };

  const handleSurge = () => {
    const surgeDetected = metrics.patientFlow > 80 || metrics.emergencies > 8;
    if (surgeDetected) {
      setAlerts((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          message: 'Surge Detected: Activating Emergency Protocols',
          severity: 'high',
        },
      ]);
      setMetrics((prev) => ({
        ...prev,
        availableBeds: prev.availableBeds - 10,
        emergencyRoomLoad: prev.emergencyRoomLoad + 20,
      }));
    }
  };

  const RealTimeChart = useMemo(() => (
    <LineChart
      data={{
        labels: realTimeData.map((item) => item.timestamp),
        datasets: [
          {
            data: realTimeData.map((item) => item.patientFlow),
            strokeWidth: 2,
            color: () => '#8884d8',
          },
          {
            data: realTimeData.map((item) => item.availableBeds),
            strokeWidth: 2,
            color: () => '#82ca9d',
          },
          {
            data: realTimeData.map((item) => item.emergencies),
            strokeWidth: 2,
            color: () => '#ffc658',
          },
        ],
      }}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#F5F7FA',
        backgroundGradientFrom: '#F5F7FA',
        backgroundGradientTo: '#F5F7FA',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#fff',
        },
      }}
      bezier
    />
  ), [realTimeData]);

  const MetricsChart = useMemo(() => (
    <BarChart
      data={{
        labels: ['ICU Occupancy', 'ER Load', 'Surgical Room Usage', 'Equipment Utilization', 'Medication Inventory'],
        datasets: [
          {
            data: [
              metrics.icuOccupancy,
              metrics.emergencyRoomLoad,
              metrics.surgicalRoomUsage,
              metrics.equipmentUtilization,
              metrics.medicationInventory,
            ],
          },
        ],
      }}
      width={screenWidth - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#F5F7FA',
        backgroundGradientFrom: '#F5F7FA',
        backgroundGradientTo: '#F5F7FA',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#fff',
        },
      }}
      showBarTops={false}
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  ), [metrics]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Command Center</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Real-time Patient Flow</Text>
        <View style={styles.chartContainer}>{RealTimeChart}</View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Operational Metrics</Text>
        <View style={styles.chartContainer}>{MetricsChart}</View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Alerts</Text>
        <FlatList
          data={alerts.slice(-5)}
          renderItem={({ item }) => (
            <View style={[styles.alert, item.severity === 'critical' ? styles.criticalAlert : styles.highAlert]}>
              <Icon name="warning" size={20} color={item.severity === 'critical' ? 'red' : 'orange'} />
              <View style={styles.alertText}>
                <Text style={styles.alertMessage}>{item.message}</Text>
                <Text style={styles.alertTimestamp}>{item.timestamp}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ambulance Tracking</Text>
        <FlatList
          data={ambulanceData}
          renderItem={({ item }) => (
            <View style={styles.ambulanceItem}>
              <Icon name="local-hospital" size={20} />
              <Text>{`Ambulance ${item.id.toString().slice(2, 6)}`}</Text>
              <Text>{`Status: ${item.status}`}</Text>
              <Text>{`Location: ${item.location}`}</Text>
              <Text>{`ETA: ${item.ETA}`}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Utility Status</Text>
        <FlatList
          data={Object.entries(utilities)}
          renderItem={({ item }) => (
            <View style={styles.utilityItem}>
              <Icon name="battery-full" size={20} />
              <Text>{`${item[0]}: ${item[1]}`}</Text>
            </View>
          )}
          keyExtractor={(item) => item[0]}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Predictions</Text>
        <FlatList
          data={Object.entries(predictions)}
          renderItem={({ item }) => (
            <View style={styles.predictionItem}>
              <Icon name="arrow-upward" size={20} />
              <Text>{`${item[0]}: ${item[1]}`}</Text>
            </View>
          )}
          keyExtractor={(item) => item[0]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    height: 220,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  criticalAlert: {
    backgroundColor: 'red',
  },
  highAlert: {
    backgroundColor: 'yellow',
  },
  alertText: {
    marginLeft: 10,
  },
  alertMessage: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  alertTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
  ambulanceItem: {
    marginBottom: 10,
  },
  utilityItem: {
    marginBottom: 10,
  },
  predictionItem: {
    marginBottom: 10,
  },
});

export default AdvancedCommandCenter;
