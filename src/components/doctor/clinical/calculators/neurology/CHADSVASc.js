import React, { useState } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import CheckBox from './CheckBox';

export const CHADSVASc = () => {
  const [age, setAge] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [vascular, setVascular] = useState(false);
  const [female, setFemale] = useState(false);

  const score =
    (hypertension ? 1 : 0) +
    (diabetes ? 1 : 0) +
    (stroke ? 2 : 0) +
    (vascular ? 1 : 0) +
    (female ? 1 : 0) +
    (age ? 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CHADS-VASc Score</Text>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Hypertension</Text>
        <CheckBox value={hypertension} onValueChange={setHypertension} />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Diabetes</Text>
        <CheckBox value={diabetes} onValueChange={setDiabetes} />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Previous Stroke/TIA</Text>
        <CheckBox value={stroke} onValueChange={setStroke} />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Vascular Disease</Text>
        <CheckBox value={vascular} onValueChange={setVascular} />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Female Gender</Text>
        <CheckBox value={female} onValueChange={setFemale} />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Age greater than 75</Text>
        <CheckBox value={age} onValueChange={setAge} />
      </View>

      <Text style={styles.result}>Total Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#004C54',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 8,
  },
  result: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    textAlign: 'center',
    marginTop: 16,
  },
});
