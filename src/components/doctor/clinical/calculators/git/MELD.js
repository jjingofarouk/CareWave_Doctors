import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView
} from 'react-native';

const MELDScore = () => {
  const [dialysis, setDialysis] = useState(false);
  const [creatinine, setCreatinine] = useState('');
  const [bilirubin, setBilirubin] = useState('');
  const [inr, setInr] = useState('');
  const [score, setScore] = useState(null);
  const [mortality, setMortality] = useState(null);

  const calculateScore = () => {
    if (!creatinine || !bilirubin || !inr) return;

    let creatValue = parseFloat(creatinine);
    const bilirubinValue = parseFloat(bilirubin);
    const inrValue = parseFloat(inr);

    // Handle dialysis patients
    if (dialysis) {
      creatValue = 4.0;
    }

    // Enforce minimum values per UNOS guidelines
    creatValue = Math.max(1.0, Math.min(creatValue, 4.0));
    
    // Calculate MELD score
    const rawScore = (
      9.57 * Math.log(inrValue) +
      3.78 * Math.log(bilirubinValue) +
      11.2 * Math.log(creatValue) +
      6.43
    );

    const finalScore = Math.round(Math.max(6, Math.min(40, rawScore)));
    setScore(finalScore);

    // Calculate 3-month mortality rate
    const mortalityRates = {
      '40+': '71.3%',
      '30-39': '52.6%',
      '20-29': '19.6%',
      '10-19': '6.0%',
      '<10': '1.9%'
    };

    if (finalScore >= 40) setMortality(mortalityRates['40+']);
    else if (finalScore >= 30) setMortality(mortalityRates['30-39']);
    else if (finalScore >= 20) setMortality(mortalityRates['20-29']);
    else if (finalScore >= 10) setMortality(mortalityRates['10-19']);
    else setMortality(mortalityRates['<10']);
  };

  useEffect(() => {
    calculateScore();
  }, [creatinine, bilirubin, inr, dialysis]);

  const isValidInput = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0;
  };

  const handleInputChange = (value, setter) => {
    if (value === '' || isValidInput(value)) {
      setter(value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>MELD Score Calculator</Text>
          <Text style={styles.subtitle}>Model for End-Stage Liver Disease</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clinical Parameters</Text>

          {/* Dialysis Toggle */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dialysis (twice in past week):</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={[styles.toggleButton, !dialysis && styles.toggleButtonActive]}
                onPress={() => setDialysis(false)}
              >
                <Text style={[styles.toggleText, !dialysis && styles.toggleTextActive]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toggleButton, dialysis && styles.toggleButtonActive]}
                onPress={() => setDialysis(true)}
              >
                <Text style={[styles.toggleText, dialysis && styles.toggleTextActive]}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Creatinine (mg/dL):</Text>
            <TextInput
              style={styles.input}
              value={creatinine}
              onChangeText={(value) => handleInputChange(value, setCreatinine)}
              keyboardType="decimal-pad"
              placeholder="Enter value"
              placeholderTextColor="#999"
            />
            <Text style={styles.inputHelper}>Normal range: 0.7-1.3 mg/dL</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bilirubin (mg/dL):</Text>
            <TextInput
              style={styles.input}
              value={bilirubin}
              onChangeText={(value) => handleInputChange(value, setBilirubin)}
              keyboardType="decimal-pad"
              placeholder="Enter value"
              placeholderTextColor="#999"
            />
            <Text style={styles.inputHelper}>Normal range: 0.3-1.2 mg/dL</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>INR:</Text>
            <TextInput
              style={styles.input}
              value={inr}
              onChangeText={(value) => handleInputChange(value, setInr)}
              keyboardType="decimal-pad"
              placeholder="Enter value"
              placeholderTextColor="#999"
            />
            <Text style={styles.inputHelper}>Normal range: 0.8-1.1</Text>
          </View>
        </View>

        {/* Results Section */}
        {score !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>MELD Score:</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>
            <View style={styles.mortalityContainer}>
              <Text style={styles.mortalityLabel}>3-Month Mortality Rate:</Text>
              <Text style={styles.mortalityValue}>{mortality}</Text>
            </View>
          </View>
        )}

        {/* Clinical Guidance */}
        <View style={styles.guidanceCard}>
          <Text style={styles.guidanceTitle}>Clinical Interpretation</Text>
          <Text style={styles.guidanceText}>
            • MELD Score ≥ 40: Consider immediate transplant evaluation{'\n'}
            • MELD Score 30-39: High priority for transplantation{'\n'}
            • MELD Score 20-29: Evaluate for transplant listing{'\n'}
            • MELD Score 10-19: Monitor closely{'\n'}
            • MELD Score below 10: Routine follow-up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#fff',
  },
  inputHelper: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  toggleButtonActive: {
    backgroundColor: '#3498db',
  },
  toggleText: {
    color: '#7f8c8d',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#fff',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  mortalityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mortalityLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  mortalityValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e74c3c',
  },
  guidanceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  guidanceText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
  },
});

export default MELDScore;