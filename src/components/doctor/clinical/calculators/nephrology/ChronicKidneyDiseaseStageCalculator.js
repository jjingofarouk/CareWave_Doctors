import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ChronicKidneyDiseaseStageCalculator = () => {
  const [gfr, setGfr] = useState('');
  const [age, setAge] = useState('');
  const [albuminuria, setAlbuminuria] = useState('');
  const [stage, setStage] = useState(null);
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const getStageDetails = (gfrValue) => {
    const stages = {
      'Stage 1': {
        range: '≥90',
        description: 'Kidney damage with normal or increased GFR',
        recommendations: [
          'Monitor BP closely (target <130/80)',
          'Annual screening for albuminuria',
          'Lifestyle modifications',
          'Manage cardiovascular risk factors'
        ],
        complications: [
          'Usually asymptomatic',
          'May have hypertension',
          'Early metabolic changes'
        ]
      },
      'Stage 2': {
        range: '60-89',
        description: 'Mild reduction in GFR',
        recommendations: [
          'BP control',
          'Glycemic control if diabetic',
          'Consider ACE/ARB therapy',
          'Dietary sodium restriction'
        ],
        complications: [
          'PTH may begin to rise',
          'Early vitamin D reduction',
          'Increased cardiovascular risk'
        ]
      },
      'Stage 3a': {
        range: '45-59',
        description: 'Mild to moderate reduction in GFR',
        recommendations: [
          'Nephrology referral',
          'Anemia screening',
          'Bone disease screening',
          'Nutritional assessment'
        ],
        complications: [
          'Anemia may develop',
          'Early bone disease',
          'Metabolic acidosis risk'
        ]
      },
      'Stage 3b': {
        range: '30-44',
        description: 'Moderate to severe reduction in GFR',
        recommendations: [
          'Regular nephrology care',
          'Medication dose adjustments',
          'Mineral metabolism monitoring',
          'Vaccination status review'
        ],
        complications: [
          'Hypertension common',
          'Anemia',
          'Bone disease',
          'Malnutrition risk'
        ]
      },
      'Stage 4': {
        range: '15-29',
        description: 'Severe reduction in GFR',
        recommendations: [
          'RRT planning',
          'Vascular access planning',
          'Dietary protein restriction',
          'Regular cardiovascular assessment'
        ],
        complications: [
          'Cardiovascular disease',
          'Hyperphosphatemia',
          'Metabolic acidosis',
          'Hyperkalemia risk'
        ]
      },
      'Stage 5': {
        range: '<15',
        description: 'Kidney failure',
        recommendations: [
          'Immediate RRT consideration',
          'Palliative care discussion',
          'Strict fluid management',
          'Complex medication adjustments'
        ],
        complications: [
          'Uremia',
          'Fluid overload',
          'Resistant hypertension',
          'High mortality risk'
        ]
      }
    };

    if (gfrValue >= 90) return { stage: 'Stage 1', details: stages['Stage 1'] };
    if (gfrValue >= 60) return { stage: 'Stage 2', details: stages['Stage 2'] };
    if (gfrValue >= 45) return { stage: 'Stage 3a', details: stages['Stage 3a'] };
    if (gfrValue >= 30) return { stage: 'Stage 3b', details: stages['Stage 3b'] };
    if (gfrValue >= 15) return { stage: 'Stage 4', details: stages['Stage 4'] };
    return { stage: 'Stage 5', details: stages['Stage 5'] };
  };

  const calculateRiskCategory = (gfrValue, albuminuriaValue) => {
    // ACR categories (mg/g):
    // A1: <30 (Normal to mildly increased)
    // A2: 30-300 (Moderately increased)
    // A3: >300 (Severely increased)
    const albuminuriaCategory = 
      albuminuriaValue < 30 ? 'A1' :
      albuminuriaValue <= 300 ? 'A2' : 'A3';

    // Risk categories based on KDIGO 2012
    const riskMatrix = {
      'Stage 1': { A1: 'Low', A2: 'Moderate', A3: 'High' },
      'Stage 2': { A1: 'Low', A2: 'Moderate', A3: 'High' },
      'Stage 3a': { A1: 'Moderate', A2: 'High', A3: 'Very High' },
      'Stage 3b': { A1: 'High', A2: 'Very High', A3: 'Very High' },
      'Stage 4': { A1: 'Very High', A2: 'Very High', A3: 'Very High' },
      'Stage 5': { A1: 'Very High', A2: 'Very High', A3: 'Very High' }
    };

    const stage = getStageDetails(gfrValue).stage;
    return {
      riskLevel: riskMatrix[stage][albuminuriaCategory],
      albuminuriaCategory
    };
  };

  const determineCKDStage = () => {
    setError('');
    
    if (!gfr) {
      setError('Please enter GFR value');
      return;
    }

    const gfrValue = parseFloat(gfr);
    if (isNaN(gfrValue)) {
      setError('Please enter a valid number for GFR');
      return;
    }

    const stageInfo = getStageDetails(gfrValue);
    const riskInfo = albuminuria ? calculateRiskCategory(gfrValue, parseFloat(albuminuria)) : null;
    
    setStage({ ...stageInfo, riskInfo });
    fadeIn();
  };

  const CustomInput = ({ label, value, onChangeText, placeholder, hint }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#ffffff', '#f7fafc']}
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>CKD Stage Calculator</Text>
          <Text style={styles.subtitle}>Advanced Clinical Edition</Text>
          <Text style={styles.description}>
            Comprehensive CKD staging and risk assessment tool
          </Text>
        </View>

        <View style={styles.card}>
          <CustomInput
            label="eGFR (mL/min/1.73m²)"
            value={gfr}
            onChangeText={setGfr}
            placeholder="Enter eGFR value"
            hint="Reference: ≥90 mL/min/1.73m²"
          />

          <CustomInput
            label="Urine Albumin-to-Creatinine Ratio (mg/g)"
            value={albuminuria}
            onChangeText={setAlbuminuria}
            placeholder="Enter ACR value (optional)"
            hint="For risk stratification"
          />

          <CustomInput
            label="Patient Age (years)"
            value={age}
            onChangeText={setAge}
            placeholder="Enter patient age (optional)"
            hint="For context-specific recommendations"
          />

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={determineCKDStage}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2D3748', '#1A202C']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Calculate CKD Stage</Text>
            </LinearGradient>
          </TouchableOpacity>

          {stage && (
            <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
              <Text style={styles.resultTitle}>Clinical Assessment</Text>
              
              <View style={styles.stageCard}>
                <Text style={styles.stageText}>{stage.stage}</Text>
                <Text style={styles.gfrRange}>GFR Range: {stage.details.range} mL/min/1.73m²</Text>
                <Text style={styles.stageDescription}>{stage.details.description}</Text>
                
                {stage.riskInfo && (
                  <View style={styles.riskSection}>
                    <Text style={styles.riskTitle}>Risk Category</Text>
                    <View style={[styles.riskBadge, styles[stage.riskInfo.riskLevel.toLowerCase().replace(' ', '')]]}>
                      <Text style={styles.riskText}>{stage.riskInfo.riskLevel}</Text>
                    </View>
                    <Text style={styles.albuminuriaCategory}>
                      Albuminuria Category: {stage.riskInfo.albuminuriaCategory}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.recommendationsContainer}>
                <Text style={styles.sectionTitle}>Key Recommendations</Text>
                {stage.details.recommendations.map((rec, index) => (
                  <View key={index} style={styles.recommendationItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.complicationsContainer}>
                <Text style={styles.sectionTitle}>Monitor for Complications</Text>
                {stage.details.complications.map((comp, index) => (
                  <View key={index} style={styles.complicationItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.complicationText}>{comp}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}

          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Clinical Notes</Text>
            <View style={styles.noteCard}>
              {[
                'eGFR should be stable over 3 months',
                'Consider age-related GFR decline',
                'Assess cardiovascular risk factors',
                'Review medication dosing per GFR',
                'Consider nephrology referral for stages 3b-5'
              ].map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <View style={styles.noteBullet} />
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradientContainer: {
    padding: 20,
    minHeight: '100%',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#718096',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  hint: {
    marginTop: 4,
    fontSize: 12,
    color: '#718096',
  },
  errorContainer: {
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 14,
  },
  calculateButton: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  stageCard: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  stageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
  },
  gfrRange: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 8,
  },
  stageDescription: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  riskSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  riskBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  low: {
    backgroundColor: '#48BB78',
  },
  moderate: {
    backgroundColor: '#ECC94B',
  },
  high: {
    backgroundColor: '#ED8936',
  },
  veryhigh: {
    backgroundColor: '#E53E3E',
  },
  riskText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  albuminuriaCategory: {
    fontSize: 14,
    color: '#4A5568',
  },
  recommendationsContainer: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  complicationsContainer: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  complicationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A5568',
    marginTop: 6,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
  },
  complicationText: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
  },
  notesContainer: {
    marginTop: 24,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  noteCard: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A5568',
    marginRight: 12,
  },
  noteText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  }
});

export default ChronicKidneyDiseaseStageCalculator;