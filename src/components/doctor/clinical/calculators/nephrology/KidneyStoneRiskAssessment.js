import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const KidneyStoneRiskAssessment = () => {
  const [calcium, setCalcium] = useState('');
  const [oxalate, setOxalate] = useState('');
  const [risk, setRisk] = useState(null);

  const calculateRisk = () => {
    const riskValue = calcium * 0.1 + oxalate * 0.2; // Simplified logic
    setRisk(riskValue.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kidney Stone Risk Assessment</Text>

      <TextInput
        style={styles.input}
        placeholder="Calcium (mg/dL) - Reference: 8.5-10.5"
        value={calcium}
        onChangeText={(text) => setCalcium(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Oxalate (mg/dL) - Reference: < 40"
        value={oxalate}
        onChangeText={(text) => setOxalate(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate Risk" onPress={calculateRisk} />

      {risk && <Text style={styles.result}>Kidney Stone Risk: {risk}</Text>}
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

export default KidneyStoneRiskAssessment;
