import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // For graphing the trends

const VitalSigns = () => {
  const [temperature, setTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [spO2, setSpO2] = useState('');
  const [bloodGlucose, setBloodGlucose] = useState('');
  const [weight, setWeight] = useState('');

  const [history, setHistory] = useState([]);
  
  const handleSaveVitals = () => {
    const vitals = {
      temperature,
      heartRate,
      bloodPressure,
      respiratoryRate,
      spO2,
      bloodGlucose,
      weight,
      timestamp: new Date().toISOString(),
    };

    setHistory(prevHistory => [vitals, ...prevHistory]);

    // Alert if vitals are out of range
    checkVitalsRange(vitals);
  };

  const checkVitalsRange = (vitals) => {
    if (parseFloat(vitals.temperature) > 38.0) {
      Alert.alert('High Temperature Warning', 'Your temperature is above normal. Please consult a doctor.');
    }
    if (parseInt(vitals.heartRate) > 100 || parseInt(vitals.heartRate) < 60) {
      Alert.alert('Heart Rate Warning', 'Your heart rate is out of the normal range. Please check with a healthcare provider.');
    }
    if (parseInt(vitals.spO2) < 95) {
      Alert.alert('Low SpO2 Warning', 'Your oxygen saturation is low. Seek medical attention immediately.');
    }
    if (parseInt(vitals.bloodGlucose) > 180) {
      Alert.alert('High Blood Glucose Warning', 'Your blood glucose level is high. Please consult your doctor.');
    }
  };

  const renderHistory = () => {
    return history.map((vital, index) => (
      <View key={index} style={styles.historyItem}>
        <Text>Timestamp: {vital.timestamp}</Text>
        <Text>Temperature: {vital.temperature} °C</Text>
        <Text>Heart Rate: {vital.heartRate} bpm</Text>
        <Text>Blood Pressure: {vital.bloodPressure}</Text>
        <Text>Respiratory Rate: {vital.respiratoryRate} breaths/min</Text>
        <Text>SpO2: {vital.spO2}%</Text>
        <Text>Blood Glucose: {vital.bloodGlucose} mg/dL</Text>
        <Text>Weight: {vital.weight} kg</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Enter Your Vital Signs</Text>

      <View style={styles.inputContainer}>
        <Text>Temperature (°C):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={temperature}
          onChangeText={setTemperature}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Heart Rate (bpm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={heartRate}
          onChangeText={setHeartRate}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Blood Pressure (mmHg):</Text>
        <TextInput
          style={styles.input}
          value={bloodPressure}
          onChangeText={setBloodPressure}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Respiratory Rate (breaths/min):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={respiratoryRate}
          onChangeText={setRespiratoryRate}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>SpO2 (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={spO2}
          onChangeText={setSpO2}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Blood Glucose (mg/dL):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bloodGlucose}
          onChangeText={setBloodGlucose}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <Button title="Save Vital Signs" onPress={handleSaveVitals} />

      {/* Graphs for tracking trends */}
      <Text style={styles.graphHeading}>Trends Over Time</Text>
      <LineChart
        data={{
          labels: history.map((_, index) => `Entry ${index + 1}`),
          datasets: [{
            data: history.map((vital) => parseFloat(vital.temperature)),
            color: (opacity = 1) => `rgba(0, 204, 255, ${opacity})`,
            strokeWidth: 2,
          }]
        }}
        width={350} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
        }}
        bezier
      />

      <Text style={styles.historyHeading}>History of Vitals</Text>
      {renderHistory()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  graphHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  historyHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  historyItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default VitalSigns;
