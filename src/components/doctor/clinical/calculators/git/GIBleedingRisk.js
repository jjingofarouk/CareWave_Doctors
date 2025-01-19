import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GIBleedingRisk = () => {
  // State variables for the clinical parameters
  const [hemoglobin, setHemoglobin] = useState('');
  const [bloodUrea, setBloodUrea] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [age, setAge] = useState('');
  const [melena, setMelena] = useState('No'); // Yes or No
  const [syncope, setSyncope] = useState('No'); // Yes or No

  // Calculate Glasgow-Blatchford Score
  const calculateGBScore = () => {
    const hgb = parseFloat(hemoglobin);
    const urea = parseFloat(bloodUrea);
    const sbp = parseFloat(systolicBP);
    const patientAge = parseFloat(age);

    if (
      isNaN(hgb) || isNaN(urea) || isNaN(sbp) || isNaN(patientAge) ||
      hgb <= 0 || urea <= 0 || sbp <= 0 || patientAge <= 0
    ) {
      return 'Please enter valid numbers for all inputs.';
    }

    // Initialize score
    let score = 0;

    // Hemoglobin level
    if (hgb < 10) score += 6;
    if (hgb >= 10 && hgb < 12) score += 3;

    // Blood Urea
    if (urea > 20) score += 6;
    if (urea > 10 && urea <= 20) score += 3;

    // Systolic Blood Pressure
    if (sbp < 90) score += 3;
    if (sbp >= 90 && sbp < 100) score += 2;

    // Age
    if (patientAge > 65) score += 1;

    // Melena (Black stools)
    if (melena === 'Yes') score += 1;

    // Syncope (Fainting)
    if (syncope === 'Yes') score += 3;

    return score;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gastrointestinal Bleeding Risk Score</Text>

      {/* Hemoglobin Input */}
      <View style={styles.inputContainer}>
        <Text>Hemoglobin (g/dL):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={hemoglobin}
          onChangeText={(value) => setHemoglobin(value)}
        />
      </View>

      {/* Blood Urea Input */}
      <View style={styles.inputContainer}>
        <Text>Blood Urea (mmol/L):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bloodUrea}
          onChangeText={(value) => setBloodUrea(value)}
        />
      </View>

      {/* Systolic BP Input */}
      <View style={styles.inputContainer}>
        <Text>Systolic Blood Pressure (mmHg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={systolicBP}
          onChangeText={(value) => setSystolicBP(value)}
        />
      </View>

      {/* Age Input */}
      <View style={styles.inputContainer}>
        <Text>Age (years):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={(value) => setAge(value)}
        />
      </View>

      {/* Melena (Black stools) Input */}
      <View style={styles.inputContainer}>
        <Text>Melena (Black stools - Yes/No):</Text>
        <TextInput
          style={styles.input}
          value={melena}
          onChangeText={(value) => setMelena(value)}
        />
      </View>

      {/* Syncope (Fainting) Input */}
      <View style={styles.inputContainer}>
        <Text>Syncope (Fainting - Yes/No):</Text>
        <TextInput
          style={styles.input}
          value={syncope}
          onChangeText={(value) => setSyncope(value)}
        />
      </View>

      {/* Calculate and display the Glasgow-Blatchford Score */}
      <Text style={styles.result}>Glasgow-Blatchford Score: {calculateGBScore()}</Text>

      {/* Button to reset inputs */}
      <Button
        title="Reset"
        onPress={() => {
          setHemoglobin('');
          setBloodUrea('');
          setSystolicBP('');
          setAge('');
          setMelena('No');
          setSyncope('No');
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

export default GIBleedingRisk;
