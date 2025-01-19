import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, ScrollView, Alert } from 'react-native';

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
    color: '#002432',
  },
  calculatorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calculatorBox: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#002432',
  },
  inputField: {
    height: 45,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    color: '#002432',
  },
  button: {
    backgroundColor: '#27c7b8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#d0d0d0',
    paddingTop: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27c7b8',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#002432',
  },
};

const CHA2DS2VASc = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diabetes, setDiabetes] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [heartFailure, setHeartFailure] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid age.");
      return;
    }

    const ageScore = (ageNum >= 75) ? 2 : (ageNum >= 65) ? 1 : 0;
    const genderScore = (gender === 'female') ? 1 : 0;
    const conditionsScore = (diabetes ? 1 : 0) + (hypertension ? 1 : 0) + (heartFailure ? 1 : 0);
    const strokeScore = stroke ? 2 : 0;

    const score = ageScore + genderScore + conditionsScore + strokeScore;
    setResult(score);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CHA₂DS₂-VASc Risk Calculator</Text>

      <View style={styles.calculatorBox}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter Age"
        />

        <Text style={styles.inputLabel}>Gender</Text>
        <TextInput
          style={styles.inputField}
          value={gender}
          onChangeText={setGender}
          placeholder="Enter Gender (male/female)"
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Diabetes</Text>
          <Switch value={diabetes} onValueChange={setDiabetes} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Hypertension</Text>
          <Switch value={hypertension} onValueChange={setHypertension} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Heart Failure</Text>
          <Switch value={heartFailure} onValueChange={setHeartFailure} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Stroke</Text>
          <Switch value={stroke} onValueChange={setStroke} />
        </View>

        <View style={styles.button}>
          <Button title="Calculate CHA₂DS₂-VASc" onPress={handleCalculate} color="#fff" />
        </View>

        {result !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>CHA₂DS₂-VASc Score</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CHA2DS2VASc;
