import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Clinical reference ranges and guidelines
const REFERENCE_RANGES = {
  creatinine: {
    male: { min: 0.7, max: 1.3 },
    female: { min: 0.6, max: 1.1 }
  },
  bmi: {
    underweight: 18.5,
    normal: 24.9,
    overweight: 29.9,
    obese: 30
  }
};

const CKD_STAGES = {
  1: { range: '≥90', description: 'Normal or High', color: '#4CAF50' },
  2: { range: '60-89', description: 'Mildly Decreased', color: '#8BC34A' },
  3: { range: '30-59', description: 'Moderately Decreased', color: '#FFC107' },
  4: { range: '15-29', description: 'Severely Decreased', color: '#FF5722' },
  5: { range: '<15', description: 'Kidney Failure', color: '#F44336' }
};

const CreatinineClearanceCalculator = () => {
  const [inputs, setInputs] = useState({
    creatinine: '',
    age: '',
    weight: '',
    height: '',
    gender: null,
  });
  const [results, setResults] = useState(null);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateClearance = () => {
    // Validate inputs
    if (!inputs.creatinine || !inputs.age || !inputs.weight || !inputs.height || !inputs.gender) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    const age = parseFloat(inputs.age);
    const weight = parseFloat(inputs.weight);
    const height = parseFloat(inputs.height);
    const creatinine = parseFloat(inputs.creatinine);
    const bmi = calculateBMI(weight, height);

    // Cockcroft-Gault equation
    let clearance = ((140 - age) * weight) / (72 * creatinine);
    if (inputs.gender === 'female') {
      clearance *= 0.85;
    }

    // Adjust for body surface area if BMI is outside normal range
    let adjustedClearance = clearance;
    if (bmi > REFERENCE_RANGES.bmi.normal) {
      const idealWeight = (REFERENCE_RANGES.bmi.normal * (height/100) * (height/100));
      adjustedClearance = ((140 - age) * idealWeight) / (72 * creatinine);
      if (inputs.gender === 'female') {
        adjustedClearance *= 0.85;
      }
    }

    setResults({
      clearance: Math.round(clearance * 10) / 10,
      adjustedClearance: Math.round(adjustedClearance * 10) / 10,
      bmi: Math.round(bmi * 10) / 10,
      stage: getCKDStage(clearance)
    });
  };

  const getCKDStage = (clearance) => {
    if (clearance >= 90) return CKD_STAGES[1];
    if (clearance >= 60) return CKD_STAGES[2];
    if (clearance >= 30) return CKD_STAGES[3];
    if (clearance >= 15) return CKD_STAGES[4];
    return CKD_STAGES[5];
  };

  const renderGenderSelection = () => (
    <View style={styles.genderContainer}>
      <Text style={styles.label}>Sex at Birth*</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={[styles.genderButton, inputs.gender === 'female' && styles.genderButtonSelected]}
          onPress={() => setInputs({...inputs, gender: 'female'})}
        >
          <Text style={[styles.genderButtonText, inputs.gender === 'female' && styles.genderButtonTextSelected]}>
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, inputs.gender === 'male' && styles.genderButtonSelected]}
          onPress={() => setInputs({...inputs, gender: 'male'})}
        >
          <Text style={[styles.genderButtonText, inputs.gender === 'male' && styles.genderButtonTextSelected]}>
            Male
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Creatinine Clearance Calculator</Text>
        <Text style={styles.subtitle}>Cockcroft-Gault Equation</Text>

        {renderGenderSelection()}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Serum Creatinine*</Text>
          <TextInput
            style={styles.input}
            placeholder="mg/dL"
            value={inputs.creatinine}
            onChangeText={(text) => setInputs({...inputs, creatinine: text})}
            keyboardType="decimal-pad"
          />
          <Text style={styles.hint}>
            Reference Range: {inputs.gender === 'male' ? '0.7-1.3' : '0.6-1.1'} mg/dL
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age*</Text>
          <TextInput
            style={styles.input}
            placeholder="Years"
            value={inputs.age}
            onChangeText={(text) => setInputs({...inputs, age: text})}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight*</Text>
          <TextInput
            style={styles.input}
            placeholder="kg"
            value={inputs.weight}
            onChangeText={(text) => setInputs({...inputs, weight: text})}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height*</Text>
          <TextInput
            style={styles.input}
            placeholder="cm"
            value={inputs.height}
            onChangeText={(text) => setInputs({...inputs, height: text})}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateClearance}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {results && (
          <View style={styles.resultsContainer}>
            <View style={[styles.resultCard, { borderColor: results.stage.color }]}>
              <Text style={styles.resultTitle}>Creatinine Clearance</Text>
              <Text style={styles.resultValue}>{results.clearance}</Text>
              <Text style={styles.resultUnit}>mL/min</Text>
              
              {results.adjustedClearance !== results.clearance && (
                <View style={styles.adjustedContainer}>
                  <Text style={styles.adjustedLabel}>Adjusted for Ideal Body Weight:</Text>
                  <Text style={styles.adjustedValue}>{results.adjustedClearance} mL/min</Text>
                </View>
              )}

              <View style={[styles.stageIndicator, { backgroundColor: results.stage.color }]}>
                <Text style={styles.stageText}>
                  CKD Stage - {results.stage.description}
                </Text>
              </View>

              <View style={styles.bmiContainer}>
                <Text style={styles.bmiLabel}>BMI:</Text>
                <Text style={styles.bmiValue}>{results.bmi} kg/m²</Text>
              </View>
            </View>

            <View style={styles.clinicalCard}>
              <Text style={styles.clinicalTitle}>Clinical Guidance</Text>
              
              <View style={styles.guidanceSection}>
                <Text style={styles.guidanceTitle}>Medication Adjustments</Text>
                <Text style={styles.guidanceText}>
                  • Review medication dosing for renal adjustment
                  {'\n'}• Consider anticoagulation modifications if CrCl {'<'} 30
                  {'\n'}• Adjust antibiotics based on CrCl
                </Text>
              </View>

              <View style={styles.guidanceSection}>
                <Text style={styles.guidanceTitle}>Monitoring</Text>
                <Text style={styles.guidanceText}>
                  • Regular monitoring of renal function
                  {'\n'}• Assessment of fluid status
                  {'\n'}• Electrolyte monitoring
                </Text>
              </View>

              {results.clearance < 60 && (
                <View style={styles.warningBox}>
                  <Text style={styles.warningTitle}>Critical Considerations</Text>
                  <Text style={styles.warningText}>
                    • Nephrology referral recommended
                    {'\n'}• Monitor for anemia
                    {'\n'}• Assess bone mineral metabolism
                    {'\n'}• Evaluate cardiovascular risk
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  hint: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  genderButtonSelected: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
  },
  genderButtonTextSelected: {
    color: '#FFFFFF',
  },
  calculateButton: {
    height: 56,
    backgroundColor: '#3498DB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultsContainer: {
    gap: 24,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2C3E50',
  },
  resultUnit: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 4,
  },
  stageIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  stageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  adjustedContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  adjustedLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  adjustedValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 4,
  },
  bmiContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bmiLabel: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  bmiValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  clinicalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  clinicalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  guidanceSection: {
    marginBottom: 16,
  },
  guidanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  guidanceText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 22,
  },
  warningBox: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E53E3E',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#E53E3E',
    lineHeight: 22,
  }
});

export default CreatinineClearanceCalculator;