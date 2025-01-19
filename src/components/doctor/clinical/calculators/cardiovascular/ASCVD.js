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

const ASCVDCalculator = () => {
  const [age, setAge] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [hdl, setHdl] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [sex, setSex] = useState('male');
  const [diabetes, setDiabetes] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [result, setResult] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const calculateASCVD = () => {
    // Validate and convert inputs to numbers
    const ageNum = Number(age);
    const cholesterolNum = Number(cholesterol);
    const hdlNum = Number(hdl);
    const systolicBPNum = Number(systolicBP);

    // Check for valid numeric inputs
    if ([ageNum, cholesterolNum, hdlNum, systolicBPNum].some((val) => isNaN(val) || val <= 0)) {
      alert("Please enter positive numbers for all fields.");
      return;
    }

    // ASCVD calculation based on new parameters
    const smokingFactor = smoking ? 20 : 0;
    const bpAdjustment = Math.max(systolicBPNum - 120, 0); // Avoid negative BP adjustment

    // Simple calculation for illustration
    let riskScore = (ageNum + cholesterolNum - hdlNum + smokingFactor + bpAdjustment) / 2;

    // Adjust based on additional factors (diabetes, sex)
    if (diabetes) riskScore += 5;
    if (sex === 'female') riskScore -= 5;

    // Calculate the risk score (this could be further enhanced with a more detailed model)
    const riskPercentage = riskScore.toFixed(2);

    // Interpretation and recommendations based on the score
    let interpretation = '';
    if (riskPercentage < 5) {
      interpretation = 'Low risk: Healthy lifestyle recommended.';
    } else if (riskPercentage >= 5 && riskPercentage <= 7.4) {
      interpretation = 'Borderline risk: Statin therapy may be considered based on risk enhancers.';
    } else if (riskPercentage > 7.4 && riskPercentage <= 20) {
      interpretation = 'Intermediate risk: Moderate-intensity statin therapy recommended.';
    } else {
      interpretation = 'High risk: High-intensity statin therapy recommended.';
    }

    // Update the result and recommendation
    setResult(riskPercentage);
    setRecommendation(interpretation);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ASCVD Risk Calculator</Text>

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

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Diabetes</Text>
          <Switch value={diabetes} onValueChange={setDiabetes} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Sex (Male/Female)</Text>
          <Switch
            value={sex === 'female'}
            onValueChange={() => setSex(sex === 'male' ? 'female' : 'male')}
          />
        </View>

        <View style={styles.button}>
          <Button title="Calculate ASCVD" onPress={calculateASCVD} color="#fff" />
        </View>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>ASCVD Risk Score</Text>
            <Text style={styles.resultText}>{result}%</Text>
            <Text style={styles.resultTitle}>Recommendation</Text>
            <Text style={styles.resultText}>{recommendation}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ASCVDCalculator;

