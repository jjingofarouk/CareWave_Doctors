import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

const calculateTIMI = ({
  age,
  aspirinUseLast7Days,
  anginaEpisodesLast24Hours,
  stChanges,
  elevatedBiomarkers,
  coronaryArteryDisease,
  cardiacRiskFactors,
  setResult,
}) => {
  let score = 0;

  if (parseInt(age) >= 65) score += 1;
  if (aspirinUseLast7Days) score += 1;
  if (parseInt(anginaEpisodesLast24Hours) >= 2) score += 1;
  if (stChanges) score += 1;
  if (elevatedBiomarkers) score += 1;
  if (coronaryArteryDisease) score += 1;
  if (Array.isArray(cardiacRiskFactors) && cardiacRiskFactors.length >= 3) score += 1;

  const risk =
    score === 0 || score === 1
      ? '4.7%'
      : score === 2
      ? '8.3%'
      : score === 3
      ? '13.2%'
      : score === 4
      ? '19.9%'
      : score === 5
      ? '26.2%'
      : '40.9% or higher';

  setResult({ score, risk });
};

const TIMICalculator = () => {
  const [formValues, setFormValues] = useState({
    age: '',
    aspirinUseLast7Days: false,
    anginaEpisodesLast24Hours: '',
    stChanges: false,
    elevatedBiomarkers: false,
    coronaryArteryDisease: false,
    cardiacRiskFactors: [],
  });

  const [result, setResult] = useState(null);

  const handleRiskFactorToggle = (factor) => {
    setFormValues((prev) => ({
      ...prev,
      cardiacRiskFactors: prev.cardiacRiskFactors.includes(factor)
        ? prev.cardiacRiskFactors.filter((f) => f !== factor)
        : [...prev.cardiacRiskFactors, factor],
    }));
  };

  const handleCalculate = () => {
    if (!formValues.age || !formValues.anginaEpisodesLast24Hours) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    calculateTIMI({ ...formValues, setResult });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>TIMI Calculator</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          keyboardType="numeric"
          value={formValues.age}
          onChangeText={(value) => setFormValues((prev) => ({ ...prev, age: value }))}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Aspirin use in the last 7 days:</Text>
        <Switch
          value={formValues.aspirinUseLast7Days}
          onValueChange={(value) =>
            setFormValues((prev) => ({ ...prev, aspirinUseLast7Days: value }))
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Angina episodes in the last 24 hours:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="numeric"
          value={formValues.anginaEpisodesLast24Hours}
          onChangeText={(value) =>
            setFormValues((prev) => ({ ...prev, anginaEpisodesLast24Hours: value }))
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>ST changes (≥0.5 mm):</Text>
        <Switch
          value={formValues.stChanges}
          onValueChange={(value) =>
            setFormValues((prev) => ({ ...prev, stChanges: value }))
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Elevated cardiac biomarkers:</Text>
        <Switch
          value={formValues.elevatedBiomarkers}
          onValueChange={(value) =>
            setFormValues((prev) => ({ ...prev, elevatedBiomarkers: value }))
          }
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Known coronary artery disease:</Text>
        <Switch
          value={formValues.coronaryArteryDisease}
          onValueChange={(value) =>
            setFormValues((prev) => ({ ...prev, coronaryArteryDisease: value }))
          }
        />
      </View>

      <Text style={styles.subHeader}>Cardiac Risk Factors:</Text>
      {['Hypertension', 'Smoking', 'Low HDL Cholesterol', 'Diabetes Mellitus', 'Family History of Premature CAD'].map(
        (factor) => (
          <TouchableOpacity
            key={factor}
            style={styles.checkboxContainer}
            onPress={() => handleRiskFactorToggle(factor)}
          >
            <Text style={styles.checkboxLabel}>
              {formValues.cardiacRiskFactors.includes(factor) ? '☑' : '☐'} {factor}
            </Text>
          </TouchableOpacity>
        )
      )}

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate TIMI</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultText}>TIMI Score: {result.score}</Text>
          <Text style={styles.resultText}>Risk: {result.risk}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DFE4E5', // Hospital-inspired background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#002432',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#002432',
  },
  input: {
    borderWidth: 1,
    borderColor: '#27C7B8',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#F78837',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#002432',
  },
  button: {
    backgroundColor: '#27C7B8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F78837',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default TIMICalculator;
