import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HypertensiveNephropathyRiskScore = () => {
  const [age, setAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [score, setScore] = useState(null);

  const calculateRisk = () => {
    // Simplified risk score calculation
    const risk = age * 0.1 + bloodPressure * 0.5; // Placeholder formula
    setScore(risk.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hypertensive Nephropathy Risk Score</Text>

      <TextInput
        style={styles.input}
        placeholder="Age (years) - Reference: 18+"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Blood Pressure (mmHg) - Reference: < 120/80"
        value={bloodPressure}
        onChangeText={(text) => setBloodPressure(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate Risk Score" onPress={calculateRisk} />

      {score && <Text style={styles.result}>Risk Score: {score}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default HypertensiveNephropathyRiskScore;
