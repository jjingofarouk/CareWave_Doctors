import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export const EpilepsyRisk = () => {
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [seizures, setSeizures] = useState(false);
  const [riskScore, setRiskScore] = useState(null);

  const calculateRisk = () => {
    let score = 0;
    
    // Logic for scoring based on inputs
    if (parseInt(age) < 20) score += 2; // Higher risk for younger age
    if (familyHistory) score += 3; // Family history increases risk
    if (seizures) score += 4; // Prior seizures increase risk

    setRiskScore(score);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Epilepsy Risk Assessment Score</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
      />
      <View style={styles.checkboxContainer}>
        <Text>Family History of Epilepsy?</Text>
        <Button title="Yes" onPress={() => setFamilyHistory(true)} />
        <Button title="No" onPress={() => setFamilyHistory(false)} />
      </View>
      <View style={styles.checkboxContainer}>
        <Text>Prior Seizures?</Text>
        <Button title="Yes" onPress={() => setSeizures(true)} />
        <Button title="No" onPress={() => setSeizures(false)} />
      </View>
      <Button title="Calculate Risk" onPress={calculateRisk} />
      {riskScore !== null && <Text>Risk Score: {riskScore}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
});
