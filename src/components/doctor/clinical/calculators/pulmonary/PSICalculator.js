import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PSICalculator = () => {
  // ... [previous state and calculation logic remains the same until styles] ...
  const initialState = {
    age: '',
    sex: 'male',
    nursingHomeResident: false,
    neoplasticDisease: false,
    liverDisease: false,
    chfHistory: false,
    cerebrovascularDisease: false,
    renalDisease: false,
    mentalStatus: false,
    respiratoryRate: '',
    systolicBP: '',
    temperature: '',
    pulse: '',
    ph: '',
    bun: '',
    sodium: '',
    glucose: '',
    hematocrit: '',
    oxygenPressure: '',
    pleuralEffusion: false,
  };

  const [inputs, setInputs] = useState(initialState);
  const [score, setScore] = useState(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateScore = useCallback(() => {
    // Required numeric fields validation
    const requiredFields = [
      'age', 'respiratoryRate', 'systolicBP', 'temperature',
      'pulse', 'ph', 'bun', 'sodium', 'glucose', 'hematocrit'
    ];

    const missingFields = requiredFields.filter(field => !inputs[field]);
    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required numeric fields to calculate the score accurately.",
        [{ text: "OK" }]
      );
      return;
    }

    // Convert and validate numeric inputs
    let totalScore = parseInt(inputs.age, 10);

    // Demographics
    if (inputs.sex === 'female') totalScore -= 10;
    if (inputs.nursingHomeResident) totalScore += 10;

    // Comorbidities
    if (inputs.neoplasticDisease) totalScore += 30;
    if (inputs.liverDisease) totalScore += 20;
    if (inputs.chfHistory) totalScore += 10;
    if (inputs.cerebrovascularDisease) totalScore += 10;
    if (inputs.renalDisease) totalScore += 10;

    // Physical Examination
    if (inputs.mentalStatus) totalScore += 20;
    if (parseInt(inputs.respiratoryRate, 10) >= 30) totalScore += 20;
    if (parseInt(inputs.systolicBP, 10) < 90) totalScore += 20;
    const temp = parseFloat(inputs.temperature);
    if (temp < 35 || temp > 39.9) totalScore += 15;
    if (parseInt(inputs.pulse, 10) >= 125) totalScore += 10;

    // Laboratory and Imaging
    if (parseFloat(inputs.ph) < 7.35) totalScore += 30;
    if (parseFloat(inputs.bun) >= 30) totalScore += 20;
    if (parseFloat(inputs.sodium) < 130) totalScore += 20;
    if (parseFloat(inputs.glucose) >= 250) totalScore += 10;
    if (parseFloat(inputs.hematocrit) < 30) totalScore += 10;
    if (parseFloat(inputs.oxygenPressure) < 60) totalScore += 10;
    if (inputs.pleuralEffusion) totalScore += 10;

    setScore(totalScore);
  }, [inputs]);

  const getInterpretation = useCallback((score) => {
    if (!score) return null;
    if (score <= 70) return {
      class: 'Class I-II',
      risk: 'Low Risk',
      mortality: '0.1-0.7%',
      disposition: 'Consider Outpatient Management',
      color: '#4CAF50'
    };
    if (score <= 90) return {
      class: 'Class III',
      risk: 'Moderate Risk',
      mortality: '0.9-2.8%',
      disposition: 'Short Stay/Observation Unit',
      color: '#FFC107'
    };
    if (score <= 130) return {
      class: 'Class IV',
      risk: 'High Risk',
      mortality: '8.2-9.3%',
      disposition: 'Inpatient Admission Required',
      color: '#FF9800'
    };
    return {
      class: 'Class V',
      risk: 'Very High Risk',
      mortality: '27-31.1%',
      disposition: 'ICU Admission Consider',
      color: '#F44336'
    };
  }, []);

  const renderToggle = useCallback(({ label, field }) => (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        value={inputs[field]}
        onValueChange={(value) => setInputs(prev => ({ ...prev, [field]: value }))}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={inputs[field] ? '#2196F3' : '#f4f3f4'}
      />
    </View>
  ), [inputs]);
  const renderNumericInput = useCallback(({ label, field, placeholder, unit, normalRange }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={placeholder}
          value={inputs[field]}
          onChangeText={(value) => setInputs(prev => ({ ...prev, [field]: value }))}
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {normalRange && (
        <Text style={styles.normalRange}>Normal range: {normalRange}</Text>
      )}
    </View>
  ), [inputs]);

  // ... [previous render logic remains the same until the vital signs section] ...
  const interpretation = getInterpretation(score);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <View style={styles.header}>
            <Text style={styles.title}>PSI/PORT Score Calculator</Text>
            <Text style={styles.subtitle}>Pneumonia Severity Index</Text>
          </View>

          <TouchableOpacity
            style={styles.guidanceButton}
            onPress={() => setShowGuidance(!showGuidance)}
          >
            <Text style={styles.guidanceButtonText}>
              {showGuidance ? 'Hide Clinical Guidance' : 'Show Clinical Guidance'}
            </Text>
          </TouchableOpacity>

          {showGuidance && (
            <View style={styles.guidanceContainer}>
              <Text style={styles.guidanceTitle}>Clinical Guidance</Text>
              <Text style={styles.guidanceText}>
                • Use for adult patients with community-acquired pneumonia{'\n'}
                • COVID-19 Consideration: Can be used after diagnosis to determine disposition{'\n'}
                • Validated for predicting mortality and identifying low-risk patients{'\n'}
                • Consider social factors and clinical judgment alongside score
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Demographics</Text>
            {renderNumericInput({
              label: "Age",
              field: "age",
              placeholder: "Enter age",
              unit: "years"
            })}
            
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Sex</Text>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  inputs.sex === 'male' && styles.genderButtonActive
                ]}
                onPress={() => setInputs(prev => ({ ...prev, sex: 'male' }))}
              >
                <Text style={[
                  styles.genderButtonText,
                  inputs.sex === 'male' && styles.genderButtonTextActive
                ]}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  inputs.sex === 'female' && styles.genderButtonActive
                ]}
                onPress={() => setInputs(prev => ({ ...prev, sex: 'female' }))}
              >
                <Text style={[
                  styles.genderButtonText,
                  inputs.sex === 'female' && styles.genderButtonTextActive
                ]}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comorbidities</Text>
            {renderToggle({ label: "Nursing Home Resident", field: "nursingHomeResident" })}
            {renderToggle({ label: "Neoplastic Disease", field: "neoplasticDisease" })}
            {renderToggle({ label: "Liver Disease", field: "liverDisease" })}
            {renderToggle({ label: "CHF History", field: "chfHistory" })}
            {renderToggle({ label: "Cerebrovascular Disease", field: "cerebrovascularDisease" })}
            {renderToggle({ label: "Renal Disease", field: "renalDisease" })}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vital Signs</Text>
            {renderNumericInput({
              label: "Respiratory Rate",
              field: "respiratoryRate",
              placeholder: "Enter rate",
              unit: "breaths/min",
              normalRange: "12-20 breaths/min"
            })}
            {renderNumericInput({
              label: "Systolic BP",
              field: "systolicBP",
              placeholder: "Enter BP",
              unit: "mmHg",
              normalRange: "90-120 mmHg"
            })}
            {renderNumericInput({
              label: "Temperature",
              field: "temperature",
              placeholder: "Enter temp",
              unit: "°C",
              normalRange: "36.5-37.5°C"
            })}
            {renderNumericInput({
              label: "Pulse",
              field: "pulse",
              placeholder: "Enter pulse",
              unit: "bpm",
              normalRange: "60-100 bpm"
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Laboratory Values</Text>
            {renderNumericInput({
              label: "Arterial pH",
              field: "ph",
              placeholder: "Enter pH",
              normalRange: "7.35-7.45"
            })}
            {renderNumericInput({
              label: "BUN",
              field: "bun",
              placeholder: "Enter BUN",
              unit: "mg/dL",
              normalRange: "7-20 mg/dL"
            })}
            {renderNumericInput({
              label: "Sodium",
              field: "sodium",
              placeholder: "Enter sodium",
              unit: "mmol/L",
              normalRange: "135-145 mmol/L"
            })}
            {renderNumericInput({
              label: "Glucose",
              field: "glucose",
              placeholder: "Enter glucose",
              unit: "mg/dL",
              normalRange: "70-99 mg/dL (fasting)"
            })}
            {renderNumericInput({
              label: "Hematocrit",
              field: "hematocrit",
              placeholder: "Enter hematocrit",
              unit: "%",
              normalRange: "37-47% (F), 42-52% (M)"
            })}
            {renderNumericInput({
              label: "PaO2",
              field: "oxygenPressure",
              placeholder: "Enter PaO2",
              unit: "mmHg",
              normalRange: "75-100 mmHg"
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Findings</Text>
            {renderToggle({ label: "Altered Mental Status", field: "mentalStatus" })}
            {renderToggle({ label: "Pleural Effusion", field: "pleuralEffusion" })}
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateScore}
          >
            <Text style={styles.calculateButtonText}>Calculate PSI Score</Text>
          </TouchableOpacity>

          {score !== null && interpretation && (
            <View style={[styles.resultContainer, { borderColor: interpretation.color }]}>
              <Text style={[styles.resultTitle, { color: interpretation.color }]}>
                Score: {score} points
              </Text>
              <Text style={styles.resultClass}>{interpretation.class}</Text>
              <Text style={styles.resultRisk}>{interpretation.risk}</Text>
              <Text style={styles.resultMortality}>
                Mortality Risk: {interpretation.mortality}
              </Text>
              <Text style={styles.resultDisposition}>
                Recommended Disposition:{'\n'}{interpretation.disposition}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setInputs(initialState);
              setScore(null);
            }}
          >
            <Text style={styles.resetButtonText}>Reset Calculator</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#005EB8', // NHS Blue
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#005EB8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#005EB8',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  unit: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
    width: 60,
  },
  normalRange: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontStyle: 'italic',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#2C3E50',
    flexShrink: 1,
    flex: 1,
  },
  
  genderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    marginLeft: 8,
  },
  genderButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  genderButtonText: {
    color: '#34495e',
    fontSize: 14,
  },
  genderButtonTextActive: {
    color: '#ffffff',
  },
  calculateButton: {
    backgroundColor: '#005EB8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 24,
    shadowColor: '#005EB8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  resetButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultClass: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultRisk: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultMortality: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultDisposition: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 24,
  },
  guidanceButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  guidanceButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  guidanceContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  guidanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  guidanceText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  // ... [rest of the styles remain the same]
});

export default PSICalculator;