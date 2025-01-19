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

const HASBLED = () => {
  const [hypertension, setHypertension] = useState(false);
  const [creatinine, setCreatinine] = useState('');
  const [stroke, setStroke] = useState(false);
  const [bleedingHistory, setBleedingHistory] = useState(false);
  const [age, setAge] = useState('');
  const [drugs, setDrugs] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    // Input validation
    const creatinineValue = parseFloat(creatinine);
    const ageValue = parseInt(age);
    if (isNaN(creatinineValue) || creatinineValue <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid creatinine value.");
      return;
    }
    if (isNaN(ageValue) || ageValue <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid age.");
      return;
    }

    let score = 0;
    score += hypertension ? 1 : 0;
    score += creatinineValue > 2 ? 1 : 0;
    score += stroke ? 1 : 0;
    score += bleedingHistory ? 1 : 0;
    score += ageValue >= 65 ? 1 : 0;
    score += drugs ? 1 : 0;
    score += alcohol ? 1 : 0;

    // Determine risk level
    let riskLevel = '';
    if (score === 0) riskLevel = 'Low risk for major bleeding';
    else if (score === 1) riskLevel = 'Moderate risk for major bleeding';
    else if (score === 2) riskLevel = 'Moderate to high risk for major bleeding';
    else if (score >= 3 && score <= 4) riskLevel = 'High risk of major bleeding';
    else if (score >= 5) riskLevel = 'Very high risk of major bleeding';

    setResult({ score, riskLevel });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>HAS-BLED Risk Calculator</Text>

      <View style={styles.calculatorBox}>
        <Text style={styles.inputLabel}>Hypertension</Text>
        <Switch value={hypertension} onValueChange={setHypertension} />

        <Text style={styles.inputLabel}>Creatinine Level (mg/dl)</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={creatinine}
          onChangeText={setCreatinine}
          placeholder="Enter Creatinine Level"
        />

        <Text style={styles.inputLabel}>Stroke History</Text>
        <Switch value={stroke} onValueChange={setStroke} />

        <Text style={styles.inputLabel}>Bleeding History</Text>
        <Switch value={bleedingHistory} onValueChange={setBleedingHistory} />

        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter Age"
        />

        <Text style={styles.inputLabel}>Medications (Aspirin, NSAIDs)</Text>
        <Switch value={drugs} onValueChange={setDrugs} />

        <Text style={styles.inputLabel}>Alcohol Consumption (≥8 units/week)</Text>
        <Switch value={alcohol} onValueChange={setAlcohol} />

        <View style={styles.button}>
          <Button title="Calculate HAS-BLED" onPress={handleCalculate} color="#fff" />
        </View>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>HAS-BLED Score</Text>
            <Text style={styles.resultText}>{result.score}</Text>
            <Text style={styles.resultTitle}>Risk Level</Text>
            <Text style={styles.resultText}>{result.riskLevel}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HASBLED;
