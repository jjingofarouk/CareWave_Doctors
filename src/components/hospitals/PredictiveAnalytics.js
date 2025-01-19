import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Using react-native-chart-kit for charts

const PredictiveAnalytics = () => {
  const [predictions, setPredictions] = useState({
    patientOutcomes: 85,
    readmissionRisk: 12,
    resourceShortages: { beds: 5, ventilators: 2 },
  });

  const [predictionHistory, setPredictionHistory] = useState([]); // Store prediction history
  const [alert, setAlert] = useState(''); // Store alerts
  const [icuBeds, setIcuBeds] = useState(''); // For scenario planning input

  // Simulate real-time updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrediction = {
        timestamp: new Date().toLocaleTimeString(),
        patientOutcomes: Math.random() * 100,
        readmissionRisk: Math.random() * 20,
        resourceShortages: {
          beds: Math.round(Math.random() * 10),
          ventilators: Math.round(Math.random() * 5),
        },
      };

      // Update predictions and history
      setPredictions(newPrediction);
      setPredictionHistory((prev) => [...prev, newPrediction]);

      // Trigger alert if thresholds are exceeded
      if (newPrediction.readmissionRisk > 15) {
        setAlert('⚠️ High Readmission Risk Detected!');
      } else {
        setAlert('');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleScenarioChange = (beds) => {
    const impact = (beds * 0.5).toFixed(2);
    Alert.alert('Scenario Planning', `Impact: Adding ${beds} ICU beds will reduce readmission risk by ${impact}%.`);
  };

  // Export prediction history as JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(predictionHistory, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'predictive_analytics_report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predictive Analytics Dashboard</Text>
      <Text style={styles.description}>Leverage AI to predict patient outcomes, risks, and resource requirements in real-time.</Text>

      {/* Display current predictions */}
      <View style={styles.predictionsContainer}>
        <Text style={styles.predictionText}>Patient Outcomes: {predictions.patientOutcomes.toFixed(2)}%</Text>
        <Text style={styles.predictionText}>Readmission Risk: {predictions.readmissionRisk.toFixed(2)}%</Text>
        <Text style={styles.predictionText}>
          Resource Shortages: Beds - {predictions.resourceShortages.beds}, Ventilators - {predictions.resourceShortages.ventilators}
        </Text>
      </View>

      {/* Alert Section */}
      {alert && <Text style={styles.alert}>{alert}</Text>}

      {/* Chart Visualization */}
      <Text style={styles.chartHeader}>Prediction Trends (Last 5 Entries)</Text>
      <LineChart
        data={{
          labels: predictionHistory.slice(-5).map((entry) => entry.timestamp),
          datasets: [
            {
              data: predictionHistory.slice(-5).map((entry) => entry.patientOutcomes),
              strokeWidth: 2,
              color: () => '#27c7b8',
            },
            {
              data: predictionHistory.slice(-5).map((entry) => entry.readmissionRisk),
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

      {/* Scenario Planning */}
      <Text style={styles.subHeader}>Scenario Planning</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of ICU Beds"
        keyboardType="numeric"
        value={icuBeds}
        onChangeText={setIcuBeds}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleScenarioChange(Number(icuBeds))}
      >
        <Text style={styles.buttonText}>Evaluate Scenario</Text>
      </TouchableOpacity>

      {/* Export Button */}
      <TouchableOpacity
        style={styles.exportButton}
        onPress={handleExport}
      >
        <Text style={styles.buttonText}>Export Report</Text>
      </TouchableOpacity>
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
  predictionsContainer: {
    marginBottom: 20,
  },
  predictionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  alert: {
    backgroundColor: '#FFEB3B',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#D32F2D',
    borderRadius: 5,
    textAlign: 'center',
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#27c7b8',
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: '#FF7043',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PredictiveAnalytics;
