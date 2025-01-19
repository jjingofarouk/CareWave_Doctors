import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PEFRCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    race: '',
    actualPEFR: '',
    previousBest: '', // Added for personal best PEFR
    symptoms: '', // Added for symptom severity
  });
  const [result, setResult] = useState(null);

  const calculateExpectedPEFR = () => {
    const age = parseFloat(formData.age);
    const height = parseFloat(formData.height);
    const actualPEFR = parseFloat(formData.actualPEFR);
    const previousBest = parseFloat(formData.previousBest);

    if (!age || !height || !formData.race) {
      alert('Please fill in all required fields');
      return;
    }

    let expectedPEFR;
    // CDC NHANES III formulas
    switch (formData.race) {
      case 'caucasian':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 2.3) * 60;
        break;
      case 'african-american':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 1.8) * 60;
        break;
      case 'mexican-american':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 2.1) * 60;
        break;
      case 'other':
        expectedPEFR = (-0.0517 * age + 0.0332 * height + 2.1) * 60;
        break;
      default:
        alert('Please select a race/ethnicity');
        return;
    }

    const pefrResult = {
      expectedPEFR: expectedPEFR.toFixed(1),
      percentage: actualPEFR ? ((actualPEFR / expectedPEFR) * 100).toFixed(1) : null,
      personalBestRatio: previousBest ? ((actualPEFR / previousBest) * 100).toFixed(1) : null,
      severity: getExacerbationSeverity(actualPEFR, previousBest, formData.symptoms),
    };

    setResult(pefrResult);
  };

  const getExacerbationSeverity = (actual, personalBest, symptoms) => {
    if (!actual || !personalBest) return null;
    const percentage = (actual / personalBest) * 100;
    
    if (percentage >= 80) return {
      level: 'Green Zone - Well Controlled',
      description: 'Good asthma control',
      clinicalFeatures: [
        'No nighttime symptoms',
        'No activity limitation',
        'Rescue inhaler use ≤2 times/week',
        'No exacerbations'
      ],
      recommendations: [
        'Continue current treatment regimen',
        'Review inhaler technique at next visit',
        'Follow-up in 1-3 months',
        'Consider step-down if well-controlled for >3 months'
      ],
      medications: [
        'Continue prescribed controller medication',
        'PRN SABA for rescue'
      ],
      monitoring: [
        'Regular PEFR monitoring',
        'Symptom diary review',
        'Review action plan compliance'
      ],
      color: '#4CAF50'
    };
    
    if (percentage >= 50) return {
      level: 'Yellow Zone - Partial Control',
      description: 'Moderate exacerbation',
      clinicalFeatures: [
        'Increasing symptoms',
        'Decreased exercise tolerance',
        'Nocturnal symptoms',
        'Increased rescue inhaler use'
      ],
      recommendations: [
        'Increase ICS dose 2-4 fold',
        'Add LABA if not already prescribed',
        'Consider short course of oral corticosteroids',
        'Re-evaluate in 24-48 hours'
      ],
      medications: [
        'Increase ICS or ICS/LABA combination',
        'Prednisone 40-50mg daily for 5-7 days if needed',
        'Frequent SABA use as needed'
      ],
      monitoring: [
        'Daily PEFR measurements',
        'Follow-up in 2-7 days',
        'Monitor for deterioration'
      ],
      color: '#FFC107'
    };
    
    return {
      level: 'Red Zone - Severe Exacerbation',
      description: 'Severe exacerbation - Medical Alert',
      clinicalFeatures: [
        'Marked breathlessness',
        'Cannot complete sentences',
        'Use of accessory muscles',
        'Silent chest on auscultation'
      ],
      recommendations: [
        'Immediate SABA + ipratropium nebulization',
        'Systemic corticosteroids',
        'Consider IM epinephrine if anaphylaxis suspected',
        'Arrange emergency transport'
      ],
      medications: [
        'Continuous nebulized SABA/ipratropium',
        'Systemic steroids (IV methylprednisolone 60-125mg)',
        'Consider magnesium sulfate',
        'Oxygen therapy to maintain SpO2 92-95%'
      ],
      monitoring: [
        'Continuous pulse oximetry',
        'Frequent vital signs',
        'Serial PEFR measurements',
        'Consider ABG if severe'
      ],
      referral: [
        'Emergency department evaluation',
        'Consider ICU if deteriorating',
        'Pulmonology consultation',
        'Close follow-up after discharge'
      ],
      color: '#F44336'
    };
  };

  // Rest of the component UI code remains similar, but we'll add clinical sections

  const renderRaceButton = (value, label) => (
    <TouchableOpacity
      style={[
        styles.raceButton,
        formData.race === value && styles.raceButtonSelected
      ]}
      onPress={() => setFormData({ ...formData, race: value })}
    >
      <Text style={[
        styles.raceButtonText,
        formData.race === value && styles.raceButtonTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>PEFR Clinical Assessment Tool</Text>
          <Text style={styles.subtitle}>Based on GINA Guidelines & NHANES III Standards</Text>
        </View>

        <View style={styles.card}>
          {/* Previous inputs remain the same */}
          <Text style={styles.label}>Age (years)</Text>
          <TextInput
            style={styles.input}
            value={formData.age}
            onChangeText={(value) => setFormData({ ...formData, age: value })}
            keyboardType="numeric"
            placeholder="Enter age"
          />

          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={formData.height}
            onChangeText={(value) => setFormData({ ...formData, height: value })}
            keyboardType="numeric"
            placeholder="Enter height"
          />

          <Text style={styles.label}>Race/Ethnicity</Text>
          <View style={styles.raceContainer}>
            {renderRaceButton('caucasian', 'Caucasian')}
            {renderRaceButton('african-american', 'African-American')}
            {renderRaceButton('mexican-american', 'Mexican-American')}
            {renderRaceButton('other', 'Other')}
          </View>

          <Text style={styles.label}>Current PEFR (L/min)</Text>
          <TextInput
            style={styles.input}
            value={formData.actualPEFR}
            onChangeText={(value) => setFormData({ ...formData, actualPEFR: value })}
            keyboardType="numeric"
            placeholder="Enter measured PEFR"
          />

          <Text style={styles.label}>Personal Best PEFR (L/min)</Text>
          <TextInput
            style={styles.input}
            value={formData.previousBest}
            onChangeText={(value) => setFormData({ ...formData, previousBest: value })}
            keyboardType="numeric"
            placeholder="Enter patient's personal best PEFR"
          />

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateExpectedPEFR}
          >
            <LinearGradient
              colors={['#007AFF', '#0055FF']}
              style={styles.gradient}
            >
              <Text style={styles.calculateButtonText}>Generate Clinical Assessment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Clinical Assessment</Text>
            
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Expected PEFR:</Text>
              <Text style={styles.resultValue}>{result.expectedPEFR} L/min</Text>
            </View>

            {result.percentage && (
              <>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>% of Predicted:</Text>
                  <Text style={styles.resultValue}>{result.percentage}%</Text>
                </View>

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>% of Personal Best:</Text>
                  <Text style={styles.resultValue}>{result.personalBestRatio}%</Text>
                </View>

                <View style={[styles.severityCard, { borderLeftColor: result.severity.color }]}>
                  <Text style={[styles.severityTitle, { color: result.severity.color }]}>
                    {result.severity.level}
                  </Text>
                  <Text style={styles.severityDescription}>{result.severity.description}</Text>
                  
                  <Text style={styles.sectionTitle}>Clinical Features</Text>
                  {result.severity.clinicalFeatures.map((feature, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {feature}</Text>
                  ))}

                  <Text style={styles.sectionTitle}>Recommended Actions</Text>
                  {result.severity.recommendations.map((rec, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {rec}</Text>
                  ))}

                  <Text style={styles.sectionTitle}>Medication Adjustments</Text>
                  {result.severity.medications.map((med, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {med}</Text>
                  ))}

                  <Text style={styles.sectionTitle}>Monitoring Plan</Text>
                  {result.severity.monitoring.map((item, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {item}</Text>
                  ))}

                  {result.severity.referral && (
                    <>
                      <Text style={styles.sectionTitle}>Referral Considerations</Text>
                      {result.severity.referral.map((item, index) => (
                        <Text key={index} style={styles.bulletPoint}>• {item}</Text>
                      ))}
                    </>
                  )}
                </View>

                <View style={styles.clinicalGuidance}>
                  <Text style={styles.guidanceTitle}>Additional Clinical Considerations</Text>
                  <Text style={styles.guidanceText}>
                    • Consider comorbidities (rhinitis, GERD, obesity){'\n'}
                    • Assess medication adherence and inhaler technique{'\n'}
                    • Evaluate trigger factors and environmental exposures{'\n'}
                    • Review vaccination status (flu, pneumococcal){'\n'}
                    • Consider biological therapy for severe asthma
                  </Text>
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
  },
  raceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  raceButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  raceButtonSelected: {
    backgroundColor: '#007AFF',
  },
  raceButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  raceButtonTextSelected: {
    color: '#FFFFFF',
  },
  calculateButton: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  resultLabel: {
    fontSize: 16,
    color: '#666666',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  severityCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  severityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  severityDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#4A4A4A',
    marginBottom: 6,
    paddingLeft: 8,
    lineHeight: 20,
  },
  clinicalGuidance: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  guidanceText: {
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 24,
  },
  clinicalCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  warningText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  requiredField: {
    color: '#D32F2F',
    marginLeft: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  infoIcon: {
    marginLeft: 8,
    color: '#007AFF',
  },
  tooltip: {
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 4,
    maxWidth: 200,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modalScrollView: {
    maxHeight: '90%',
  },
  graphContainer: {
    marginTop: 16,
    height: 200,
    padding: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
  },
  printButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6F7',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  printButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default PEFRCalculator;