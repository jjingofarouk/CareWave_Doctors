import React, { useState } from 'react';
import { View, Text,  TextInput, StyleSheet } from 'react-native';
import CheckBox from './CheckBox';

export const AHASAScore = () => {
  const [age, setAge] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [previousStroke, setPreviousStroke] = useState(false);

  const score = (age ? 1 : 0) + 
               (hypertension ? 1 : 0) + 
               (diabetes ? 1 : 0) + 
               (smoking ? 1 : 0) + 
               (previousStroke ? 2 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AHA/ASA Stroke Risk Assessment</Text>

      {/* Age */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Age greater or equal to  65</Text>
        <CheckBox value={age} onValueChange={setAge} />
      </View>

      {/* Hypertension */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Hypertension</Text>
        <CheckBox value={hypertension} onValueChange={setHypertension} />
      </View>

      {/* Diabetes */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Diabetes</Text>
        <CheckBox value={diabetes} onValueChange={setDiabetes} />
      </View>

      {/* Smoking */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Smoking</Text>
        <CheckBox value={smoking} onValueChange={setSmoking} />
      </View>

      {/* Previous Stroke */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Previous Stroke/TIA</Text>
        <CheckBox value={previousStroke} onValueChange={setPreviousStroke} />
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
