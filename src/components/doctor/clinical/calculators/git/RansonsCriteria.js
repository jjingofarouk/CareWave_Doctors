import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const RansonsCriteria = () => {
  const initialState = {
    // Admission criteria
    age: '',
    wbc: '',
    glucose: '',
    ldh: '',
    ast: '',
    // 48-hour criteria
    hctDrop: '',
    bunIncrease: '',
    calcium: '',
    pO2: '',
    baseDeficit: '',
    fluidNeeds: '',
  };

  const [values, setValues] = useState(initialState);
  const [timePoint, setTimePoint] = useState('admission'); // 'admission' or '48hour'
  const [admissionScore, setAdmissionScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const getMortalityRate = (score) => {
    const mortalityRates = {
      0: '0-3%',
      1: '0-3%',
      2: '15%',
      3: '40%',
      4: '40%',
      5: '100%',
      6: '100%',
      7: '100%',
      8: '100%',
    };
    return mortalityRates[score] || '100%';
  };

  const calculateScores = () => {
    let admissionPoints = 0;
    let totalPoints = 0;

    // Admission criteria
    if (Number(values.age) > 55) admissionPoints++;
    if (Number(values.wbc) > 16000) admissionPoints++;
    if (Number(values.glucose) > 200) admissionPoints++;
    if (Number(values.ldh) > 350) admissionPoints++;
    if (Number(values.ast) > 250) admissionPoints++;

    totalPoints = admissionPoints;

    // 48-hour criteria
    if (Number(values.hctDrop) > 10) totalPoints++;
    if (Number(values.bunIncrease) > 5) totalPoints++;
    if (Number(values.calcium) < 8) totalPoints++;
    if (Number(values.pO2) < 60) totalPoints++;
    if (Number(values.baseDeficit) > 4) totalPoints++;
    if (Number(values.fluidNeeds) > 6) totalPoints++;

    setAdmissionScore(admissionPoints);
    setTotalScore(totalPoints);
  };

  useEffect(() => {
    calculateScores();
  }, [values]);

  const renderInputField = (label, key, unit, placeholder) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={values[key]}
          onChangeText={(value) => setValues({ ...values, [key]: value })}
          placeholder={placeholder}
          placeholderTextColor="#666"
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );

  const getSeverityColor = (score) => {
    if (score <= 2) return '#4CAF50';
    if (score <= 4) return '#FFC107';
    return '#F44336';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ranson's Criteria Calculator</Text>
        <Text style={styles.subtitle}>Pancreatitis Severity Assessment</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, timePoint === 'admission' && styles.activeTab]}
          onPress={() => setTimePoint('admission')}
        >
          <Text style={[styles.tabText, timePoint === 'admission' && styles.activeTabText]}>
            On Admission
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, timePoint === '48hour' && styles.activeTab]}
          onPress={() => setTimePoint('48hour')}
        >
          <Text style={[styles.tabText, timePoint === '48hour' && styles.activeTabText]}>
            48 Hours
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {timePoint === 'admission' ? (
          <>
            {renderInputField('Age', 'age', 'years', '0-100')}
            {renderInputField('White Blood Cell Count', 'wbc', 'cells/mm³', '4000-20000')}
            {renderInputField('Blood Glucose', 'glucose', 'mg/dL', '70-500')}
            {renderInputField('Serum LDH', 'ldh', 'IU/L', '100-1000')}
            {renderInputField('AST (SGOT)', 'ast', 'IU/L', '0-1000')}
          </>
        ) : (
          <>
            {renderInputField('Hematocrit Drop', 'hctDrop', '%', '0-50')}
            {renderInputField('BUN Increase', 'bunIncrease', 'mg/dL', '0-50')}
            {renderInputField('Serum Calcium', 'calcium', 'mg/dL', '5-12')}
            {renderInputField('Arterial pO2', 'pO2', 'mmHg', '0-100')}
            {renderInputField('Base Deficit', 'baseDeficit', 'mEq/L', '0-20')}
            {renderInputField('Fluid Sequestration', 'fluidNeeds', 'L', '0-20')}
          </>
        )}
      </View>

      <View style={styles.resultsContainer}>
        <View style={[styles.scoreCard, { backgroundColor: getSeverityColor(admissionScore) }]}>
          <Text style={styles.scoreTitle}>Admission Score</Text>
          <Text style={styles.scoreValue}>{admissionScore}</Text>
        </View>
        <View style={[styles.scoreCard, { backgroundColor: getSeverityColor(totalScore) }]}>
          <Text style={styles.scoreTitle}>Total Score</Text>
          <Text style={styles.scoreValue}>{totalScore}</Text>
        </View>
        <View style={styles.mortalityCard}>
          <Text style={styles.mortalityTitle}>Predicted Mortality Rate</Text>
          <Text style={styles.mortalityValue}>{getMortalityRate(totalScore)}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Clinical Interpretation</Text>
        <Text style={styles.infoText}>
          • Score ≤2: Mild pancreatitis (0-3% mortality){'\n'}
          • Score 3-4: Moderate pancreatitis (15-40% mortality){'\n'}
          • Score ≥5: Severe pancreatitis (above 40% mortality){'\n\n'}
          Consider ICU admission for scores ≥3
        </Text>
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#1976D2',
  },
  tabText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
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
    width: 80,
  },
  resultsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
    justifyContent: 'space-between',
  },
  scoreCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mortalityCard: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#34495E',
  },
  mortalityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mortalityValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
});

export default RansonsCriteria;