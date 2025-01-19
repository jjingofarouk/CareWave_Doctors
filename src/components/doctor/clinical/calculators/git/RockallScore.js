import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect'; // Assuming CustomSelect is in the same directory

const RockallScore = () => {
  const [clinicalData, setClinicalData] = useState({
    age: '',
    systolicBP: '',
    heartRate: '',
    comorbidities: '',
    diagnosis: '',
    stigmata: ''
  });

  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
  const [showClinicalGuidance, setShowClinicalGuidance] = useState(false);

  // Options for CustomSelect components
  const comorbidityOptions = [
    { label: 'No major comorbidity', value: 'none' },
    { label: 'Any comorbidity (except major)', value: 'minor' },
    { label: 'Renal/Liver failure or malignancy', value: 'major' }
  ];

  const diagnosisOptions = [
    { label: 'Mallory-Weiss tear', value: 'mallory-weiss' },
    { label: 'Other diagnoses', value: 'other' },
    { label: 'Upper GI malignancy', value: 'malignancy' }
  ];

  const stigmataOptions = [
    { label: 'None or dark spot only', value: 'none' },
    { label: 'Blood in upper GI tract', value: 'blood' },
    { label: 'Adherent clot', value: 'clot' },
    { label: 'Visible or spurting vessel', value: 'vessel' }
  ];

  const calculateRockallScore = () => {
    let totalScore = 0;

    // Age scoring
    const age = parseInt(clinicalData.age);
    if (age >= 60 && age < 80) totalScore += 1;
    if (age >= 80) totalScore += 2;

    // Shock scoring
    const sbp = parseInt(clinicalData.systolicBP);
    const hr = parseInt(clinicalData.heartRate);
    if (sbp >= 100 && hr >= 100) totalScore += 1;
    if (sbp < 100) totalScore += 2;

    // Comorbidity scoring
    if (clinicalData.comorbidities === 'minor') totalScore += 2;
    if (clinicalData.comorbidities === 'major') totalScore += 3;

    // Diagnosis scoring
    if (clinicalData.diagnosis === 'other') totalScore += 1;
    if (clinicalData.diagnosis === 'malignancy') totalScore += 2;

    // Stigmata scoring
    if (['blood', 'clot', 'vessel'].includes(clinicalData.stigmata)) totalScore += 2;

    return totalScore;
  };

  const getRiskLevel = (score) => {
    if (score === 0) return { level: 'Very Low', mortality: '0%', rebleed: '4.9%' };
    if (score <= 2) return { level: 'Low', mortality: '0.2%', rebleed: '5.3%' };
    if (score <= 4) return { level: 'Moderate', mortality: '5.3%', rebleed: '14.1%' };
    return { level: 'High', mortality: '24.6%', rebleed: '24.1%' };
  };

  useEffect(() => {
    const newScore = calculateRockallScore();
    setScore(newScore);
    setRiskLevel(getRiskLevel(newScore));
  }, [clinicalData]);

  const renderInputField = (label, key, unit, keyboardType = 'numeric', placeholder) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType={keyboardType}
          value={clinicalData[key]}
          onChangeText={(value) => setClinicalData({ ...clinicalData, [key]: value })}
          placeholder={placeholder}
          placeholderTextColor="#666"
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rockall Score Calculator</Text>
        <Text style={styles.subtitle}>Upper GI Bleeding Risk Assessment</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Clinical Parameters */}
        <Text style={styles.sectionTitle}>Clinical Parameters</Text>
        {renderInputField('Age', 'age', 'years', 'numeric', '0-100')}
        {renderInputField('Systolic BP', 'systolicBP', 'mmHg', 'numeric', '60-200')}
        {renderInputField('Heart Rate', 'heartRate', 'bpm', 'numeric', '40-200')}

        <CustomSelect
          label="Comorbidities"
          options={comorbidityOptions}
          placeholder="Select comorbidity"
          onSelect={(item) => setClinicalData({ ...clinicalData, comorbidities: item.value })}
        />

        {/* Endoscopic Findings */}
        <Text style={styles.sectionTitle}>Endoscopic Findings</Text>
        <CustomSelect
          label="Diagnosis"
          options={diagnosisOptions}
          placeholder="Select diagnosis"
          onSelect={(item) => setClinicalData({ ...clinicalData, diagnosis: item.value })}
        />

        <CustomSelect
          label="Stigmata of Recent Hemorrhage"
          options={stigmataOptions}
          placeholder="Select stigmata"
          onSelect={(item) => setClinicalData({ ...clinicalData, stigmata: item.value })}
        />
      </View>

      {/* Results Section */}
      <View style={styles.resultsContainer}>
        <View style={[styles.scoreCard, { backgroundColor: score <= 2 ? '#4CAF50' : score <= 4 ? '#FFC107' : '#F44336' }]}>
          <Text style={styles.scoreTitle}>Rockall Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        <View style={styles.riskCard}>
          <Text style={styles.riskTitle}>Risk Assessment</Text>
          <Text style={styles.riskLevel}>Risk Level: {riskLevel.level}</Text>
          <Text style={styles.riskDetail}>Mortality Risk: {riskLevel.mortality}</Text>
          <Text style={styles.riskDetail}>Rebleeding Risk: {riskLevel.rebleed}</Text>
        </View>
      </View>

      {/* Clinical Guidance */}
      <TouchableOpacity 
        style={styles.guidanceButton}
        onPress={() => setShowClinicalGuidance(!showClinicalGuidance)}>
        <Text style={styles.guidanceButtonText}>
          {showClinicalGuidance ? 'Hide Clinical Guidance' : 'Show Clinical Guidance'}
        </Text>
      </TouchableOpacity>

      {showClinicalGuidance && (
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceTitle}>Clinical Recommendations</Text>
          <Text style={styles.guidanceText}>
            • Score 0-2: Consider outpatient management if social circumstances allow{'\n\n'}
            • Score 3-4: Consider ward admission with regular monitoring{'\n\n'}
            • Score ≥5: Consider ICU admission and urgent endoscopy{'\n\n'}
            • All patients with active bleeding should receive IV PPI therapy{'\n\n'}
            • Endoscopy should be performed within 24h for most patients{'\n\n'}
            • Consider blood transfusion if Hb below 7 g/dL (or below 8 g/dL in patients with cardiovascular disease)
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#1976D2',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#F5F7FA',
  },
  unit: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
    width: 60,
  },
  resultsContainer: {
    margin: 16,
  },
  scoreCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  riskCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  riskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  riskLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  riskDetail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  guidanceButton: {
    backgroundColor: '#1976D2',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  guidanceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  guidanceContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  guidanceText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  }
});

export default RockallScore;