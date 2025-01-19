import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, ScrollView } from 'react-native';

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

const FraminghamRiskCalculator = () => {
  const [age, setAge] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [smoking, setSmoking] = useState(false);
  const [result, setResult] = useState(null);

  const calculateFramingham = () => {
    const ageNum = parseInt(age);
    const cholesterolNum = parseInt(cholesterol);
    const hdlNum = parseInt(hdl);
    const systolicBPNum = parseInt(systolicBP);

    // Validate input fields
    if (isNaN(ageNum) || isNaN(cholesterolNum) || isNaN(hdlNum) || isNaN(systolicBPNum)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    let score = 0;

    // Age scoring
    if (ageNum >= 20 && ageNum <= 34) score += 0;
    else if (ageNum >= 35 && ageNum <= 39) score += 2;
    else if (ageNum >= 40 && ageNum <= 44) score += 3;
    else if (ageNum >= 45 && ageNum <= 49) score += 4;
    else if (ageNum >= 50 && ageNum <= 54) score += 5;
    else if (ageNum >= 55 && ageNum <= 59) score += 6;
    else if (ageNum >= 60 && ageNum <= 64) score += 7;
    else if (ageNum >= 65) score += 8;

    // Cholesterol scoring
    score += cholesterolNum > 240 ? 3 : cholesterolNum >= 200 && cholesterolNum <= 240 ? 1 : 0;

    // HDL scoring
    score += hdlNum < 40 ? 1 : 0;

    // Systolic BP scoring
    score += systolicBPNum > 140 ? 3 : systolicBPNum >= 130 && systolicBPNum <= 140 ? 1 : 0;

    // Smoking scoring
    score += smoking ? 2 : 0;

    // Set result
    setResult(score);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Framingham Risk Calculator</Text>

      <View style={styles.calculatorBox}>
        <Text style={styles.inputLabel}>Age (years)</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter Age"
        />

        <Text style={styles.inputLabel}>Total Cholesterol (mg/dL)</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={cholesterol}
          onChangeText={setCholesterol}
          placeholder="Enter Cholesterol"
        />

        <Text style={styles.inputLabel}>HDL (mg/dL)</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={hdl}
          onChangeText={setHdl}
          placeholder="Enter HDL"
        />

        <Text style={styles.inputLabel}>Systolic Blood Pressure (mmHg)</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={systolicBP}
          onChangeText={setSystolicBP}
          placeholder="Enter Systolic BP"
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Smoker</Text>
          <Switch value={smoking} onValueChange={setSmoking} />
        </View>

        <View style={styles.button}>
          <Button title="Calculate Framingham Risk" onPress={calculateFramingham} color="#fff" />
        </View>

        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Framingham Risk Score</Text>
            <Text style={styles.resultText}>
              Your 10-year risk of cardiovascular disease: {result}%
            </Text>
            <Text style={styles.resultText}>
              Risk Category: {result < 6 ? 'Low' : result <= 20 ? 'Intermediate' : 'High'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default FraminghamRiskCalculator;
