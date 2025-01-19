import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CKD_STAGES = {
  1: { range: '≥90', description: 'Normal or High', color: '#4CAF50' },
  2: { range: '60-89', description: 'Mildly Decreased', color: '#8BC34A' },
  3: { range: '30-59', description: 'Moderately Decreased', color: '#FFC107' },
  4: { range: '15-29', description: 'Severely Decreased', color: '#FF9800' },
  5: { range: '<15', description: 'Kidney Failure', color: '#F44336' },
};

const GFRCalculator = () => {
  const [inputs, setInputs] = useState({
    creatinine: '',
    age: '',
    gender: 'female',
    isBlack: false,
    weight: '',
    height: '',
  });
  const [results, setResults] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const calculateMDRD = () => {
    const { creatinine, age, gender, isBlack } = inputs;
    if (!creatinine || !age) return null;

    // MDRD Formula
    let gfr = 175 * Math.pow(parseFloat(creatinine), -1.154) 
              * Math.pow(parseFloat(age), -0.203);
    
    // Gender modifier
    if (gender === 'female') gfr *= 0.742;
    
    // Race modifier (optional)
    if (isBlack) gfr *= 1.212;

    return gfr.toFixed(2);
  };

  const calculateCockcroftGault = () => {
    const { creatinine, age, gender, weight } = inputs;
    if (!creatinine || !age || !weight) return null;

    let cgClearance = ((140 - parseFloat(age)) * parseFloat(weight)) /
                      (72 * parseFloat(creatinine));
    
    if (gender === 'female') cgClearance *= 0.85;

    return cgClearance.toFixed(2);
  };

  const getCKDStage = (gfr) => {
    const gfrValue = parseFloat(gfr);
    if (gfrValue >= 90) return 1;
    if (gfrValue >= 60) return 2;
    if (gfrValue >= 30) return 3;
    if (gfrValue >= 15) return 4;
    return 5;
  };

  const handleCalculate = () => {
    const mdrdResult = calculateMDRD();
    const cgResult = calculateCockcroftGault();
    
    if (mdrdResult && cgResult) {
      const stage = getCKDStage(mdrdResult);
      setResults({
        mdrd: mdrdResult,
        cg: cgResult,
        stage,
        stageInfo: CKD_STAGES[stage],
      });
      setShowRecommendations(true);
    }
  };

  const renderRecommendations = () => {
    if (!results) return null;
    const { stage } = results;

    return (
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>Clinical Recommendations</Text>
        <Text style={styles.recommendationText}>
          • Monitoring Frequency: {stage <= 2 ? 'Annually' : stage === 3 ? 'Every 3-6 months' : 'Monthly'}
        </Text>
        <Text style={styles.recommendationText}>
          • Referral to Nephrology: {stage >= 4 ? 'Strongly Recommended' : stage === 3 ? 'Consider based on progression' : 'Not typically needed'}
        </Text>
        <Text style={styles.recommendationText}>
          • Key Interventions:
          {'\n'}- BP Target: beliw 130/80 mmHg
          {'\n'}- Diabetes Control: HbA1c below 7%
          {'\n'}- Avoid nephrotoxic medications
          {stage >= 3 ? '\n- Consider dose adjustments for medications' : ''}
        </Text>
        {stage >= 3 && (
          <Text style={styles.warningText}>
            ⚠️ Consider dose adjustments for medications cleared by kidneys
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>GFR Calculator</Text>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Creatinine (mg/dL)"
            placeholderTextColor="#808080" // Using hex code for gray

            value={inputs.creatinine}
            onChangeText={(text) => setInputs({...inputs, creatinine: text})}
            keyboardType="decimal-pad"
          />
          <Text style={styles.inputHint}>Reference Range: 0.6 - 1.2 mg/dL</Text>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Age (years)"
            placeholderTextColor="#808080" // Using hex code for gray

            value={inputs.age}
            onChangeText={(text) => setInputs({...inputs, age: text})}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            placeholderTextColor="#808080" // Using hex code for gray

            value={inputs.weight}
            onChangeText={(text) => setInputs({...inputs, weight: text})}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, inputs.gender === 'male' && styles.toggleButtonActive]}
            onPress={() => setInputs({...inputs, gender: 'male'})}>
            <Text style={[styles.toggleText, inputs.gender === 'male' && styles.toggleTextActive]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, inputs.gender === 'female' && styles.toggleButtonActive]}
            onPress={() => setInputs({...inputs, gender: 'female'})}>
            <Text style={[styles.toggleText, inputs.gender === 'female' && styles.toggleTextActive]}>Female</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, inputs.isBlack && styles.toggleButtonActive]}
            onPress={() => setInputs({...inputs, isBlack: !inputs.isBlack})}>
            <Text style={[styles.toggleText, inputs.isBlack && styles.toggleTextActive]}>
              Black Race (Optional)
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
          <Text style={styles.calculateButtonText}>Calculate GFR</Text>
        </TouchableOpacity>

        {results && (
          <View style={styles.resultsContainer}>
            <View style={[styles.stageIndicator, { backgroundColor: results.stageInfo.color }]}>
              <Text style={styles.stageText}>CKD Stage {results.stage}</Text>
              <Text style={styles.stageDescription}>{results.stageInfo.description}</Text>
            </View>
            
            <View style={styles.gfrResults}>
              <View style={styles.gfrResult}>
                <Text style={styles.gfrLabel}>MDRD GFR</Text>
                <Text style={styles.gfrValue}>{results.mdrd}</Text>
                <Text style={styles.gfrUnit}>mL/min/1.73m²</Text>
              </View>
              
              <View style={styles.gfrResult}>
                <Text style={styles.gfrLabel}>Cockcroft-Gault</Text>
                <Text style={styles.gfrValue}>{results.cg}</Text>
                <Text style={styles.gfrUnit}>mL/min</Text>
              </View>
            </View>
          </View>
        )}

        {showRecommendations && renderRecommendations()}
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
    color: '#2D3748',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2D3748',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputHint: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
    marginLeft: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
  },
  toggleButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#4299E1',
  },
  toggleText: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  calculateButton: {
    height: 56,
    backgroundColor: '#4299E1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  stageIndicator: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  stageText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  stageDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  gfrResults: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gfrResult: {
    alignItems: 'center',
  },
  gfrLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  gfrValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  gfrUnit: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  recommendationsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    lineHeight: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#E53E3E',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default GFRCalculator;