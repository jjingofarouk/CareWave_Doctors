import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BarrettsEsophagusRisk = () => {
  // State variables for input parameters
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male'); // 'Male' or 'Female'
  const [refluxSymptoms, setRefluxSymptoms] = useState('No'); // 'Yes' or 'No'
  const [familyHistory, setFamilyHistory] = useState('No'); // 'Yes' or 'No'

  // Calculate the risk based on the inputs
  const calculateRisk = () => {
    const patientAge = parseInt(age, 10);
    let riskScore = 0;

    // Validate inputs
    if (isNaN(patientAge) || patientAge <= 0) {
      return 'Please enter a valid age.';
    }

    // Age factor
    if (patientAge > 50) {
      riskScore += 2;
    } else if (patientAge >= 40) {
      riskScore += 1;
    }

    // Gender factor (Men are at higher risk)
    if (gender === 'Male') {
      riskScore += 2;
    }

    // Reflux Symptoms (more reflux symptoms increase risk)
    if (refluxSymptoms === 'Yes') {
      riskScore += 2;
    }

    // Family History of Barrett's Esophagus (family history increases risk)
    if (familyHistory === 'Yes') {
      riskScore += 2;
    }

    return `Risk Score: ${riskScore}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Barrett's Esophagus Risk Calculator</Text>

      {/* Age Input */}
      <View style={styles.inputContainer}>
        <Text>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={(value) => setAge(value)}
        />
      </View>

      {/* Gender Input */}
      <View style={styles.inputContainer}>
        <Text>Gender:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={(value) => setGender(value)}
        />
      </View>

      {/* Reflux Symptoms Input */}
      <View style={styles.inputContainer}>
        <Text>Reflux Symptoms (Yes/No):</Text>
        <TextInput
          style={styles.input}
          value={refluxSymptoms}
          onChangeText={(value) => setRefluxSymptoms(value)}
        />
      </View>

      {/* Family History Input */}
      <View style={styles.inputContainer}>
        <Text>Family History of Barrett's Esophagus (Yes/No):</Text>
        <TextInput
          style={styles.input}
          value={familyHistory}
          onChangeText={(value) => setFamilyHistory(value)}
        />
      </View>

      {/* Calculate and display the risk */}
      <Text style={styles.result}>{calculateRisk()}</Text>

      {/* Reset button */}
      <Button
        title="Reset"
        onPress={() => {
          setAge('');
          setGender('Male');
          setRefluxSymptoms('No');
          setFamilyHistory('No');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default BarrettsEsophagusRisk;
