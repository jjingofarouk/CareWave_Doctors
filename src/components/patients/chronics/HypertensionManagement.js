import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { drugOptions } from '../consultations/drugOptions'; // Assuming drug options are imported from data

const HypertensionManagement = () => {
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [medication, setMedication] = useState({ name: '', dosage: '', date: '' });
  const [exercise, setExercise] = useState('');
  const [exerciseSuggestions, setExerciseSuggestions] = useState([]);
  const [iotDevices, setIotDevices] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBloodPressureLog = () => {
    console.log('Blood Pressure Logged:', `Systolic: ${bloodPressure.systolic}, Diastolic: ${bloodPressure.diastolic}`);
  };

  const handleMedicationLog = () => {
    console.log('Medication Logged:', medication);
  };

  const handleExerciseLog = () => {
    console.log('Exercise Logged:', exercise);
  };

  const handleIoTDeviceIntegration = (device) => {
    setIotDevices([...iotDevices, device]);
    console.log('Device Integrated:', device);
  };

  const handleDrugSearch = (text) => {
    const filteredOptions = drugOptions.filter(option =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    setExerciseSuggestions(filteredOptions);
    setShowSuggestions(text.length > 0);
  };

  const handleSuggestionSelect = (suggestion) => {
    setExercise(suggestion);
    setShowSuggestions(false);
  };

  const handleGenerateReport = () => {
    console.log('Generating Report for Hypertension Management');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hypertension Management</Text>

      {/* Blood Pressure Log */}
      <Text style={styles.sectionTitle}>Log Blood Pressure</Text>
      <TextInput
        style={styles.input}
        placeholder="Systolic (mmHg)"
        keyboardType="numeric"
        value={bloodPressure.systolic}
        onChangeText={(text) => setBloodPressure({ ...bloodPressure, systolic: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Diastolic (mmHg)"
        keyboardType="numeric"
        value={bloodPressure.diastolic}
        onChangeText={(text) => setBloodPressure({ ...bloodPressure, diastolic: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleBloodPressureLog}>
        <Text style={styles.buttonText}>Log Blood Pressure</Text>
      </TouchableOpacity>

      {/* Medication Log */}
      <Text style={styles.sectionTitle}>Log Medication</Text>
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={medication.name}
        onChangeText={(text) => setMedication({ ...medication, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        keyboardType="numeric"
        value={medication.dosage}
        onChangeText={(text) => setMedication({ ...medication, dosage: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={medication.date}
        onChangeText={(text) => setMedication({ ...medication, date: text })}
      />
      <TouchableOpacity style={styles.button} onPress={handleMedicationLog}>
        <Text style={styles.buttonText}>Log Medication</Text>
      </TouchableOpacity>

      {/* Exercise Log */}
      <Text style={styles.sectionTitle}>Log Exercise</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter exercise type"
        value={exercise}
        onChangeText={handleDrugSearch}
      />
      {showSuggestions && (
        <FlatList
          data={exerciseSuggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestion} onPress={() => handleSuggestionSelect(item)}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleExerciseLog}>
        <Text style={styles.buttonText}>Log Exercise</Text>
      </TouchableOpacity>

      {/* IoT Device Integration */}
      <Text style={styles.sectionTitle}>IoT Device Integration</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleIoTDeviceIntegration('Omron Blood Pressure Monitor')}>
        <Text style={styles.buttonText}>Integrate Omron BP Monitor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleIoTDeviceIntegration('Withings BPM Connect')}>
        <Text style={styles.buttonText}>Integrate Withings BPM Connect</Text>
      </TouchableOpacity>

      {/* Generate Report */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateReport}>
        <Text style={styles.buttonText}>Generate Hypertension Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#004C54',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FF7043', // Accent color (Coral Orange)
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HypertensionManagement;
