import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const CLINICAL_THEME = {
  primary: '#2E5C8A',      // Professional medical blue
  secondary: '#557BA8',    // Lighter blue for accents
  background: '#FFFFFF',   // Clean white background
  surface: '#F8F9FA',     // Slight off-white for cards
  error: '#D32F2F',       // Error red
  text: '#333333',        // Dark gray for text
  textLight: '#666666',   // Medium gray for secondary text
  border: '#DDDDDD',      // Light gray for borders
  success: '#2E7D32',     // Success green
};

const DYSPNEA_SCALE = [
  { score: 0, description: 'Dyspnea only with strenuous exercise' },
  { score: 1, description: 'Dyspnea when hurrying or walking up a slight hill' },
  { score: 2, description: 'Walks slower than people of same age because of dyspnea or stops for breath when walking at own pace' },
  { score: 3, description: 'Stops for breath after walking 100 yards (91 m) or after a few minutes' },
  { score: 4, description: 'Too dyspneic to leave house or breathless when dressing' }
];

const CLINICAL_GUIDANCE = {
  exclusions: [
    'Acute exacerbations of COPD',
    'Patients requiring immediate clinical intervention',
    'Unable to perform 6-minute walk test'
  ],
  usage: [
    'Use for stable COPD patients only',
    'Best used for prognostic discussions',
    'Should not guide therapy decisions'
  ],
  interpretation: {
    0: { risk: 'Low risk', survival: '80% 4-year survival' },
    1: { risk: 'Low risk', survival: '80% 4-year survival' },
    2: { risk: 'Low risk', survival: '80% 4-year survival' },
    3: { risk: 'Moderate risk', survival: '67% 4-year survival' },
    4: { risk: 'Moderate risk', survival: '67% 4-year survival' },
    5: { risk: 'High risk', survival: '57% 4-year survival' },
    6: { risk: 'High risk', survival: '57% 4-year survival' },
    7: { risk: 'Very high risk', survival: '18% 4-year survival' },
    8: { risk: 'Very high risk', survival: '18% 4-year survival' },
    9: { risk: 'Very high risk', survival: '18% 4-year survival' },
    10: { risk: 'Very high risk', survival: '18% 4-year survival' }
  }
};

const BODECalculator = () => {
  const [inputs, setInputs] = useState({
    bmi: '',
    fev1Percentage: '',
    dyspnea: '',
    sixMinuteWalk: '',
  });
  const [score, setScore] = useState(null);
  const [showGuidance, setShowGuidance] = useState(true);

  const calculateBODEIndex = useCallback(() => {
    const { bmi, fev1Percentage, dyspnea, sixMinuteWalk } = inputs;
    let totalScore = 0;

    // BMI Scoring (B)
    if (parseFloat(bmi) <= 21) totalScore += 1;

    // Airflow Obstruction - FEV1 Scoring (O)
    const fev1 = parseFloat(fev1Percentage);
    if (fev1 >= 65) totalScore += 0;
    else if (fev1 >= 50 && fev1 < 65) totalScore += 1;
    else if (fev1 >= 36 && fev1 < 50) totalScore += 2;
    else if (fev1 < 36) totalScore += 3;

    // Dyspnea Scoring (D)
    totalScore += parseInt(dyspnea);

    // Exercise Capacity - 6MWD Scoring (E)
    const walkDistance = parseInt(sixMinuteWalk);
    if (walkDistance >= 350) totalScore += 0;
    else if (walkDistance >= 250 && walkDistance < 350) totalScore += 1;
    else if (walkDistance >= 150 && walkDistance < 250) totalScore += 2;
    else totalScore += 3;

    setScore(totalScore);
  }, [inputs]);

  const ClinicalSection = ({ title, children }) => (
    <View style={styles.clinicalSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const InputField = ({ label, value, field, placeholder, info }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      {info && <Text style={styles.inputInfo}>{info}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setInputs(prev => ({ ...prev, [field]: text }))}
        placeholder={placeholder}
        keyboardType="numeric"
        placeholderTextColor={CLINICAL_THEME.textLight}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BODE Index Calculator</Text>
          <Text style={styles.subtitle}>Clinical Assessment Tool for COPD Prognosis</Text>
        </View>

        {showGuidance && (
          <View style={styles.guidanceContainer}>
            <ClinicalSection title="Important Clinical Guidance">
              <Text style={styles.warningText}>Do not use during acute exacerbations or to guide therapy</Text>
              
              <Text style={styles.guidanceHeader}>Exclusion Criteria:</Text>
              {CLINICAL_GUIDANCE.exclusions.map((item, index) => (
                <Text key={index} style={styles.guidanceText}>• {item}</Text>
              ))}

              <Text style={styles.guidanceHeader}>Appropriate Usage:</Text>
              {CLINICAL_GUIDANCE.usage.map((item, index) => (
                <Text key={index} style={styles.guidanceText}>• {item}</Text>
              ))}
            </ClinicalSection>
          </View>
        )}

        <View style={styles.form}>
          <InputField
            label="Body Mass Index (BMI)"
            value={inputs.bmi}
            field="bmi"
            placeholder="Enter BMI"
            info="Points: ≤21 kg/m² = 1 point, >21 kg/m² = 0 points"
          />

          <InputField
            label="FEV₁ (% of predicted)"
            value={inputs.fev1Percentage}
            field="fev1Percentage"
            placeholder="Enter FEV₁ percentage"
            info="≥65%: 0pts | 50-64%: 1pt | 36-49%: 2pts | ≤35%: 3pts"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>mMRC Dyspnea Scale (0-4)</Text>
            <Text style={styles.inputInfo}>Select appropriate score based on symptoms</Text>
            {DYSPNEA_SCALE.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dyspneaOption,
                  inputs.dyspnea === index.toString() && styles.dyspneaOptionSelected
                ]}
                onPress={() => setInputs(prev => ({ ...prev, dyspnea: index.toString() }))}
              >
                <Text style={styles.dyspneaScore}>Score {item.score}:</Text>
                <Text style={styles.dyspneaDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputField
            label="6-Minute Walk Distance (meters)"
            value={inputs.sixMinuteWalk}
            field="sixMinuteWalk"
            placeholder="Enter distance in meters"
            info="≥350m: 0pts | 250-349m: 1pt | 150-249m: 2pts | <150m: 3pts"
          />

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateBODEIndex}
          >
            <Text style={styles.calculateButtonText}>Calculate BODE Index</Text>
          </TouchableOpacity>

          {score !== null && (
            <View style={styles.resultCard}>
              <Text style={styles.scoreText}>BODE Index Score: {score}</Text>
              <Text style={styles.riskText}>
                Risk Assessment: {CLINICAL_GUIDANCE.interpretation[score].risk}
              </Text>
              <Text style={styles.survivalText}>
                {CLINICAL_GUIDANCE.interpretation[score].survival}
              </Text>
              <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimer}>
                  Clinical Application:
                </Text>
                <Text style={styles.disclaimerText}>
                  • Use for prognostic assessment only{'\n'}
                  • Do not use to guide therapy{'\n'}
                  • Higher scores indicate increased risk of mortality{'\n'}
                  • Consider in conjunction with other clinical factors{'\n'}
                  • Reassess periodically in stable patients
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CLINICAL_THEME.background,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: CLINICAL_THEME.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CLINICAL_THEME.background,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: CLINICAL_THEME.background,
    textAlign: 'center',
    marginTop: 5,
  },
  guidanceContainer: {
    padding: 15,
    backgroundColor: CLINICAL_THEME.surface,
    borderBottomWidth: 1,
    borderColor: CLINICAL_THEME.border,
  },
  clinicalSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CLINICAL_THEME.primary,
    marginBottom: 10,
  },
  warningText: {
    color: CLINICAL_THEME.error,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guidanceHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: CLINICAL_THEME.text,
    marginTop: 10,
    marginBottom: 5,
  },
  guidanceText: {
    fontSize: 14,
    color: CLINICAL_THEME.textLight,
    marginBottom: 3,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: CLINICAL_THEME.text,
    marginBottom: 5,
  },
  inputInfo: {
    fontSize: 14,
    color: CLINICAL_THEME.textLight,
    marginBottom: 5,
  },
  input: {
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: CLINICAL_THEME.border,
    color: CLINICAL_THEME.text,
  },
  dyspneaOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: CLINICAL_THEME.border,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: CLINICAL_THEME.surface,
  },
  dyspneaOptionSelected: {
    backgroundColor: CLINICAL_THEME.primary + '15',
    borderColor: CLINICAL_THEME.primary,
  },
  dyspneaScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CLINICAL_THEME.text,
    marginBottom: 3,
  },
  dyspneaDescription: {
    fontSize: 14,
    color: CLINICAL_THEME.textLight,
  },
  calculateButton: {
    backgroundColor: CLINICAL_THEME.primary,
    padding: 18,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  calculateButtonText: {
    color: CLINICAL_THEME.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 5,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: CLINICAL_THEME.primary,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CLINICAL_THEME.primary,
    marginBottom: 10,
  },
  riskText: {
    fontSize: 18,
    color: CLINICAL_THEME.text,
    marginBottom: 5,
  },
  survivalText: {
    fontSize: 16,
    color: CLINICAL_THEME.textLight,
    marginBottom: 15,
  },
  disclaimerBox: {
    backgroundColor: CLINICAL_THEME.background,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  disclaimer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CLINICAL_THEME.text,
    marginBottom: 5,
  },
  disclaimerText: {
    fontSize: 14,
    color: CLINICAL_THEME.textLight,
    lineHeight: 20,
  },
});

export default BODECalculator;