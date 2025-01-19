import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Constants for clinical staging and guidance
const CKD_STAGES = {
  G1: { 
    range: '≥90', 
    description: 'Normal or Increased', 
    color: '#34C759',
    guidance: {
      monitoring: 'Annual screening if risk factors present',
      referral: 'Primary care monitoring',
      labs: ['Serum creatinine', 'eGFR', 'UACR annually'],
      management: 'Lifestyle modification, risk factor control'
    }
  },
  G2: { 
    range: '60-89', 
    description: 'Mildly Decreased', 
    color: '#30B0C7',
    guidance: {
      monitoring: 'Annual screening',
      referral: 'Primary care monitoring',
      labs: ['Serum creatinine', 'eGFR', 'UACR', 'Basic metabolic panel annually'],
      management: 'Blood pressure control, glycemic control in diabetes'
    }
  },
  G3a: { 
    range: '45-59', 
    description: 'Mild-Moderately Decreased', 
    color: '#FFD60A',
    guidance: {
      monitoring: 'Every 6 months',
      referral: 'Consider nephrology referral if rapid progression',
      labs: ['CBC', 'CMP', 'PTH', 'Vitamin D', 'UACR every 6 months'],
      management: 'ACEi/ARB if proteinuric, avoid nephrotoxics'
    }
  },
  G3b: { 
    range: '30-44', 
    description: 'Moderate-Severely Decreased', 
    color: '#FF9500',
    guidance: {
      monitoring: 'Every 3-4 months',
      referral: 'Nephrology referral recommended',
      labs: ['CBC, CMP, PTH, Vitamin D, Phosphorus every 3-4 months'],
      management: 'Anemia management, mineral bone disease prevention'
    }
  },
  G4: { 
    range: '15-29', 
    description: 'Severely Decreased', 
    color: '#FF3B30',
    guidance: {
      monitoring: 'Every 2-3 months',
      referral: 'Urgent nephrology referral required',
      labs: ['Monthly labs if rapid progression'],
      management: 'RRT planning, vascular access planning if needed'
    }
  },
  G5: { 
    range: '<15', 
    description: 'Kidney Failure', 
    color: '#AF2A2A',
    guidance: {
      monitoring: 'Monthly or more frequently',
      referral: 'Immediate nephrology care',
      labs: ['Frequent comprehensive metabolic monitoring'],
      management: 'Urgent RRT preparation if not initiated'
    }
  }
};

// Clinical risk factors that affect management
const RISK_FACTORS = [
  'Diabetes',
  'Hypertension',
  'Cardiovascular disease',
  'Family history of kidney disease',
  'Obesity',
  'Smoking'
];


const CKDEpiCalculator = () => {
  const [inputs, setInputs] = useState({
    creatinine: '',
    age: '',
    gender: null,
    weight: '',
    height: '',
  });
  const [gfrResult, setGfrResult] = useState(null);
  const [showDetailedGuidance, setShowDetailedGuidance] = useState(false);

  const renderGenderSelection = () => (
    <View style={styles.genderContainer}>
      <Text style={styles.inputLabel}>Sex at Birth*</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity 
          style={[
            styles.genderButton,
            inputs.gender === 'female' && styles.genderButtonSelected
          ]}
          onPress={() => setInputs({...inputs, gender: 'female'})}
        >
          <Text style={[
            styles.genderButtonText,
            inputs.gender === 'female' && styles.genderButtonTextSelected
          ]}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.genderButton,
            inputs.gender === 'male' && styles.genderButtonSelected
          ]}
          onPress={() => setInputs({...inputs, gender: 'male'})}
        >
          <Text style={[
            styles.genderButtonText,
            inputs.gender === 'male' && styles.genderButtonTextSelected
          ]}>Male</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculate2021CKDEpi = () => {
    const scr = parseFloat(inputs.creatinine);
    const age = parseFloat(inputs.age);
    
    if (!scr || !age || !inputs.gender) {
      alert('Please fill in all required fields');
      return;
    }

    let kappa = inputs.gender === 'female' ? 0.7 : 0.9;
    let alpha = inputs.gender === 'female' ? -0.241 : -0.302;
    
    let scrKappa = scr / kappa;
    let scrKappaAlpha = Math.pow(scrKappa, alpha);
    let ageExp = Math.pow(0.9938, age);
    
    let gfr = 142 * Math.min(scrKappa, 1) * scrKappaAlpha * ageExp;
    
    if (inputs.gender === 'female') {
      gfr *= 1.012;
    }
    
    const roundedGFR = Math.round(gfr * 10) / 10;
    const stage = getCKDStage(roundedGFR);
    const stageInfo = CKD_STAGES[stage];

    setGfrResult({
      value: roundedGFR,
      stage: stage,
      stageInfo: stageInfo
    });
  };

  const getCKDStage = (gfr) => {
    if (gfr >= 90) return 'G1';
    if (gfr >= 60) return 'G2';
    if (gfr >= 45) return 'G3a';
    if (gfr >= 30) return 'G3b';
    if (gfr >= 15) return 'G4';
    return 'G5';
  };

  const renderDetailedGuidance = () => {
    if (!gfrResult) return null;
    const { stage } = gfrResult;
    const guidance = CKD_STAGES[stage].guidance;

    return (
      <View style={styles.guidanceContainer}>
        <Text style={styles.guidanceTitle}>Clinical Management Guidelines</Text>
        
        <View style={styles.guidanceSection}>
          <Text style={styles.guidanceSubtitle}>Monitoring Frequency</Text>
          <Text style={styles.guidanceText}>{guidance.monitoring}</Text>
        </View>

        <View style={styles.guidanceSection}>
          <Text style={styles.guidanceSubtitle}>Specialty Referral</Text>
          <Text style={styles.guidanceText}>{guidance.referral}</Text>
        </View>

        <View style={styles.guidanceSection}>
          <Text style={styles.guidanceSubtitle}>Recommended Labs</Text>
          {guidance.labs.map((lab, index) => (
            <Text key={index} style={styles.bulletPoint}>• {lab}</Text>
          ))}
        </View>

        <View style={styles.guidanceSection}>
          <Text style={styles.guidanceSubtitle}>Management Focus</Text>
          <Text style={styles.guidanceText}>{guidance.management}</Text>
        </View>

        {stage >= 'G3a' && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>Critical Considerations</Text>
            <Text style={styles.warningText}>
              • Dose adjust medications for renal function
              {'\n'}• Monitor for anemia (CBC q 3-6 months)
              {'\n'}• Assess mineral bone disease (Ca, Phos, PTH)
              {'\n'}• Consider dietary protein restriction
              {'\n'}• Evaluate cardiovascular risk factors
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.kdoqiButton}
          onPress={() => setShowDetailedGuidance(true)}
        >
          <Text style={styles.kdoqiButtonText}>View Full KDOQI Guidelines</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>CKD-EPI GFR Calculator</Text>
        <Text style={styles.subtitle}>2021 CKD-EPI Equation (ASN/NKF Standard)</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Serum Creatinine*</Text>
          <TextInput
            style={styles.input}
            placeholder="mg/dL"
            value={inputs.creatinine}
            onChangeText={(text) => setInputs({...inputs, creatinine: text})}
            keyboardType="decimal-pad"
          />
          <Text style={styles.inputHint}>Reference Range: Male 0.7-1.3 mg/dL, Female 0.6-1.1 mg/dL</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Age*</Text>
          <TextInput
            style={styles.input}
            placeholder="Years"
            value={inputs.age}
            onChangeText={(text) => setInputs({...inputs, age: text})}
            keyboardType="number-pad"
          />
        </View>

        {renderGenderSelection()}

        <TouchableOpacity 
          style={styles.calculateButton}
          onPress={calculate2021CKDEpi}
        >
          <Text style={styles.calculateButtonText}>Calculate GFR</Text>
        </TouchableOpacity>

        {gfrResult && (
          <View style={[styles.resultCard, { borderColor: gfrResult.stageInfo.color }]}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>eGFR Result</Text>
              <View style={[styles.stageIndicator, { backgroundColor: gfrResult.stageInfo.color }]}>
                <Text style={styles.stageText}>CKD Stage {gfrResult.stage}</Text>
              </View>
            </View>
            
            <View style={styles.resultDetails}>
              <Text style={styles.gfrValue}>{gfrResult.value}</Text>
              <Text style={styles.gfrUnit}>mL/min/1.73m²</Text>
            </View>

            <View style={styles.interpretationBox}>
              <Text style={styles.interpretationTitle}>Clinical Interpretation</Text>
              <Text style={styles.interpretationText}>
                {gfrResult.stageInfo.description}
                {'\n'}Normal Range: above 90 mL/min/1.73m²
              </Text>
            </View>
          </View>
        )}

        {gfrResult && renderDetailedGuidance()}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  // ... (previous styles remain the same)
  
  genderContainer: {
    marginBottom: 20,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  genderButton: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  genderButtonSelected: {
    backgroundColor: '#007AFF',
  },
  genderButtonText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '500',
  },
  genderButtonTextSelected: {
    color: '#FFFFFF',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 24,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  interpretationBox: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  interpretationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  interpretationText: {
    fontSize: 15,
    color: '#48484A',
    lineHeight: 22,
  },
  guidanceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  guidanceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  guidanceSection: {
    marginBottom: 16,
  },
  guidanceSubtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  guidanceText: {
    fontSize: 15,
    color: '#48484A',
    lineHeight: 22,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#48484A',
    lineHeight: 22,
    marginLeft: 8,
  },
  warningBox: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#FF3B30',
    lineHeight: 20,
  },
  kdoqiButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  kdoqiButtonText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },

  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E73',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputHint: {
    fontSize: 13,
    color: '#6E6E73',
    marginTop: 4,
    marginLeft: 16,
  },
  calculateButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  stageIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  stageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  gfrValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
  },
  gfrUnit: {
    fontSize: 16,
    color: '#6E6E73',
    marginTop: 4,
  },
  gfrDescription: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 12,
  },
  clinicalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  clinicalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  recommendationItem: {
    marginBottom: 12,
  },
  recommendationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  recommendationValue: {
    fontSize: 16,
    color: '#6E6E73',
  },
  warningBox: {
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#FF3B30',
    lineHeight: 20,
  }
});

export default CKDEpiCalculator;