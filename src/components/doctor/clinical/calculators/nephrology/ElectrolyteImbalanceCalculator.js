import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CRITICAL_VALUES = {
  sodium: { low: 120, high: 155 },
  potassium: { low: 2.5, high: 6.5 },
  calcium: { low: 7.0, high: 11.0 },
  magnesium: { low: 1.0, high: 3.0 },
  phosphate: { low: 1.0, high: 7.0 },
};

// Helper functions for calculations
const calculateCorrectedCalcium = (calcium, albumin) => {
  const normalAlbumin = 4.0;
  return calcium + 0.8 * (normalAlbumin - albumin);
};

const getSeverity = (electrolyte, value, type) => {
  const range = CRITICAL_VALUES[electrolyte];
  if (!range) return 'Unknown';

  if (type === 'low') {
    if (value <= range.low) return 'Critical';
    return 'Mild';
  } else {
    if (value >= range.high) return 'Critical';
    return 'Mild';
  }
};

const getAcidBaseContext = (values) => {
  const { pH, pCO2, bicarbonate } = values;
  if (!pH || !pCO2 || !bicarbonate) return 'Insufficient data for acid-base assessment';

  let context = 'Normal acid-base status';
  if (pH < 7.35) {
    if (bicarbonate < 22) context = 'Metabolic acidosis';
    if (pCO2 > 45) context = 'Respiratory acidosis';
  } else if (pH > 7.45) {
    if (bicarbonate > 26) context = 'Metabolic alkalosis';
    if (pCO2 < 35) context = 'Respiratory alkalosis';
  }
  return context;
};



const getHypernatremiaProtocol = (severity, values) => {
  const protocols = [{
    title: 'Hypernatremia Management',
    actions: [
      'Assess volume status',
      'Calculate free water deficit',
      severity === 'Critical' ? 'Begin immediate free water replacement' : 'Start oral water intake if possible',
      'Monitor sodium correction rate (not to exceed 8 mEq/L/24h)',
      'Identify and treat underlying cause',
    ]
  }];
  return protocols;
};

const getHypokalemiaProtocol = (severity, values) => {
  const protocols = [{
    title: 'Hypokalemia Management',
    actions: [
      'Obtain ECG',
      'Check magnesium level',
      severity === 'Critical' ? 'Consider IV potassium replacement' : 'Start oral potassium supplementation',
      'Monitor renal function',
      'Assess for underlying causes (diuretics, GI losses)',
    ]
  }];
  return protocols;
};

const getHyperkalemiaProtocol = (severity, values) => {
  const protocols = [{
    title: 'Hyperkalemia Management',
    actions: [
      'Obtain immediate ECG',
      severity === 'Critical' ? 'Give calcium gluconate if ECG changes present' : 'Consider potassium binders',
      'Implement insulin/glucose protocol if needed',
      'Consider albuterol nebulizer',
      'Assess for acute kidney injury',
    ]
  }];
  return protocols;
};

// Main component
const ElectrolyteCalculator = () => {
  // State management
  const [values, setValues] = useState({
    sodium: '',
    potassium: '',
    chloride: '',
    bicarbonate: '',
    calcium: '',
    ionizedCalcium: '',
    magnesium: '',
    phosphate: '',
    albumin: '',
    glucose: '',
    bun: '',
    creatinine: '',
    pH: '',
    pCO2: '',
  });

  // Historical data state with proper typing
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    datasets: [{
      data: [],
      color: (opacity = 1) => `rgba(41, 128, 185, ${opacity})`,
      strokeWidth: 2,
    }],
  });

  const [showTrendModal, setShowTrendModal] = useState(false);

  const [results, setResults] = useState({
    basicMetrics: {
      anionGap: null,
      correctedSodium: null,
      correctedCalcium: null,
      deltaGap: null,
    },
    advancedMetrics: {
      serumOsmolality: null,
      calculatedOsmolality: null,
      osmolarGap: null,
      winterFormula: null,
      expectedpCO2: null,
    },
    renalMetrics: {
      feneNa: null,
      feneK: null,
      transTubularKGradient: null,
    },
    clinicalAssessment: [],
    recommendations: [],
    alerts: [],
  });

  // Reference ranges
  const referenceRanges = {
    sodium: { 
      min: 135, 
      max: 145, 
      unit: 'mEq/L',
      criticalLow: 120,
      criticalHigh: 160,
      context: 'Critical for neural function and fluid balance'
    },
    potassium: { 
      min: 3.5, 
      max: 5.0, 
      unit: 'mEq/L',
      criticalLow: 2.5,
      criticalHigh: 6.5,
      context: 'Essential for cardiac function'
    },
    chloride: { 
      min: 96, 
      max: 106, 
      unit: 'mEq/L',
      context: 'Important for acid-base balance'
    },
    bicarbonate: { 
      min: 22, 
      max: 29, 
      unit: 'mEq/L',
      context: 'Key indicator of metabolic acid-base status'
    },
    calcium: { 
      min: 8.5, 
      max: 10.5, 
      unit: 'mg/dL',
      context: 'Critical for neuromuscular function'
    },
    ionizedCalcium: { 
      min: 1.16, 
      max: 1.32, 
      unit: 'mmol/L',
      context: 'Physiologically active calcium'
    },
    magnesium: { 
      min: 1.7, 
      max: 2.2, 
      unit: 'mg/dL',
      context: 'Essential for enzyme function'
    },
    phosphate: { 
      min: 2.5, 
      max: 4.5, 
      unit: 'mg/dL',
      context: 'Important for cellular energy'
    },
    albumin: { 
      min: 3.5, 
      max: 5.0, 
      unit: 'g/dL',
      context: 'Affects calcium interpretation'
    },
    pH: {
      min: 7.35,
      max: 7.45,
      unit: '',
      context: 'Critical for acid-base assessment'
    },
    glucose: {
      min: 70,
      max: 100,
      unit: 'mg/dL',
      context: 'Affects sodium interpretation'
    },
    bun: {
      min: 7,
      max: 20,
      unit: 'mg/dL',
      context: 'Renal function indicator'
    },
    creatinine: {
      min: 0.6,
      max: 1.2,
      unit: 'mg/dL',
      context: 'Renal function marker'
    },
    pCO2: {
      min: 35,
      max: 45,
      unit: 'mmHg',
      context: 'Respiratory component of acid-base'
    }
  };

  // Calculation function
  const calculateResults = useCallback(() => {
    const v = Object.keys(values).reduce((acc, key) => {
      acc[key] = parseFloat(values[key]) || 0;
      return acc;
    }, {});

    // Basic Calculations
    const anionGap = v.sodium - (v.chloride + v.bicarbonate);
    const correctedSodium = v.sodium + (1.6 * ((v.glucose - 100) / 100));
    const correctedCalcium = calculateCorrectedCalcium(v.calcium, v.albumin);

    // Advanced Calculations
    const calculatedOsmolality = (2 * v.sodium) + (v.glucose / 18) + (v.bun / 2.8);
    const serumOsmolality = v.serumOsmolality || calculatedOsmolality;
    const osmolarGap = Math.abs(serumOsmolality - calculatedOsmolality);

    // Acid-Base Calculations
    const expectedpCO2 = (1.5 * v.bicarbonate) + 8;
    const winterFormula = v.pCO2 - expectedpCO2;

    // Renal Calculations
    const feneNa = v.urineNa && v.creatinine ? 
      ((v.urineNa * v.creatinine) / (v.sodium * v.urineCr)) * 100 : null;
    const feneK = v.urineK && v.creatinine ? 
      ((v.urineK * v.creatinine) / (v.potassium * v.urineCr)) * 100 : null;
    const transTubularKGradient = v.urineK && v.serumosmolality ? 
      (v.urineK * v.serumosmolality) / (v.potassium * v.urineosmolality) : null;

    // Clinical Assessment
    let clinicalAssessment = [];
    let recommendations = [];
    let alerts = [];

    // Sodium Assessment
    if (v.sodium < referenceRanges.sodium.min) {
      const severity = getSeverity('sodium', v.sodium, 'low');
      clinicalAssessment.push({
        condition: 'Hyponatremia',
        severity,
        details: `Sodium: ${v.sodium} mEq/L`
      });
      recommendations.push(...getHyponatremiaProtocol(severity, v));
    } else if (v.sodium > referenceRanges.sodium.max) {
      const severity = getSeverity('sodium', v.sodium, 'high');
      clinicalAssessment.push({
        condition: 'Hypernatremia',
        severity,
        details: `Sodium: ${v.sodium} mEq/L`
      });
      recommendations.push(...getHypernatremiaProtocol(severity, v));
    }

    // Potassium Assessment
    if (v.potassium < referenceRanges.potassium.min) {
      const severity = getSeverity('potassium', v.potassium, 'low');
      clinicalAssessment.push({
        condition: 'Hypokalemia',
        severity,
        details: `Potassium: ${v.potassium} mEq/L`
      });
      recommendations.push(...getHypokalemiaProtocol(severity, v));
    } else if (v.potassium > referenceRanges.potassium.max) {
      const severity = getSeverity('potassium', v.potassium, 'high');
      clinicalAssessment.push({
        condition: 'Hyperkalemia',
        severity,
        details: `Potassium: ${v.potassium} mEq/L`,
        urgency: v.potassium > referenceRanges.potassium.criticalHigh ? 'IMMEDIATE ECG' : 'Urgent'
      });
      recommendations.push(...getHyperkalemiaProtocol(severity, v));
    }

    // Add results to historical data
    const newHistoricalData = {
      ...historicalData,
      labels: [...historicalData.labels, new Date().toLocaleDateString()],
      datasets: [{
        ...historicalData.datasets[0],
        data: [...historicalData.datasets[0].data, v.sodium]
      }]
    };
    setHistoricalData(newHistoricalData);

    // Update results state
    setResults({
      basicMetrics: {
        anionGap,
        correctedSodium,
        correctedCalcium,
        deltaGap: null,
      },
      advancedMetrics: {
        serumOsmolality,
        calculatedOsmolality,
        osmolarGap,
        winterFormula,
        expectedpCO2,
      },
      renalMetrics: {
        feneNa,
        feneK,
        transTubularKGradient,
      },
      clinicalAssessment,
      recommendations,
      alerts,
    });

    // Check for critical values
    checkCriticalValues(v);
  }, [values, historicalData]);

  // Critical value checking
  const checkCriticalValues = (values) => {
    Object.entries(CRITICAL_VALUES).forEach(([electrolyte, ranges]) => {
      const value = parseFloat(values[electrolyte]);
      if (value && (value < ranges.low || value > ranges.high)) {
        Alert.alert(
          'Critical Value Alert',
          `Critical ${electrolyte} value detected: ${value} ${referenceRanges[electrolyte].unit}`,
          [{ text: 'OK', style: 'cancel' }]
        );
      }
    });
  };

  // Input handler
  const handleInputChange = (name, value) => {
    // Validate input is numeric
    if (value && !/^\d*\.?\d*$/.test(value)) return;

    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Render input field
  const renderInput = (name, placeholder) => {
    const range = referenceRanges[name];
    const value = parseFloat(values[name]);
    const isOutOfRange = value && (value < range.min || value > range.max);

    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <Text style={styles.inputUnit}>

          {range.unit}
          </Text>
        </View>
        
        <TextInput
          style={[
            styles.input,
            isOutOfRange && styles.inputWarning
          ]}
          placeholder={`${range.min} - ${range.max}`}
          placeholderTextColor="#808080" // Using hex code for gray

          value={values[name]}
          onChangeText={(text) => handleInputChange(name, text)}
          keyboardType="numeric"
          maxLength={8}
        />
        
        <Text style={styles.inputContext}>
          {range.context}
        </Text>
      </View>
    );
  };

  // Trend Modal Component
  const renderTrendModal = () => (
    <Modal
      visible={showTrendModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowTrendModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Electrolyte Trends</Text>
          {historicalData.datasets[0].data.length > 0 ? (
            <LineChart
              data={historicalData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(41, 128, 185, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726'
                }
              }}
              bezier
              style={styles.chart}
            />
          ) : (
            <Text style={styles.noDataText}>No trend data available yet</Text>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowTrendModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Main render
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clinical Electrolyte Analysis</Text>
        <Text style={styles.subtitle}>Advanced Medical Decision Support</Text>
      </View>

      {/* Basic Electrolytes Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Basic Electrolytes</Text>
        {['sodium', 'potassium', 'chloride', 'bicarbonate'].map(key => renderInput(key))}
      </View>

      {/* Calcium & Minerals Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Calcium & Minerals</Text>
        {['calcium', 'ionizedCalcium', 'magnesium', 'phosphate'].map(key => renderInput(key))}
      </View>

      {/* Additional Parameters Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Additional Parameters</Text>
        {['albumin', 'glucose', 'bun', 'creatinine', 'pH', 'pCO2'].map(key => renderInput(key))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.calculateButton}
          onPress={calculateResults}
        >
          <Text style={styles.buttonText}>Analyze Values</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.trendButton}
          onPress={() => setShowTrendModal(true)}
        >
          <Text style={styles.buttonText}>View Trends</Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      {results.clinicalAssessment.length > 0 && (
        <View style={styles.resultsContainer}>
          {/* Basic Metrics Card */}
          <View style={styles.metricCard}>
            <Text style={styles.cardTitle}>Basic Metrics</Text>
            {Object.entries(results.basicMetrics).map(([key, value]) => (
              value !== null && (
                <Text key={key} style={styles.metricText}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}: {value.toFixed(1)}
                </Text>
              )
            ))}
          </View>

          {/* Advanced Metrics Card */}
          <View style={styles.metricCard}>
            <Text style={styles.cardTitle}>Advanced Calculations</Text>
            {Object.entries(results.advancedMetrics).map(([key, value]) => (
              value !== null && (
                <Text key={key} style={styles.metricText}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}: {value.toFixed(1)}
                </Text>
              )
            ))}
          </View>

          {/* Clinical Assessment Cards */}
          {results.clinicalAssessment.map((assessment, index) => (
            <View key={index} style={[
              styles.assessmentCard,
              assessment.urgency === 'IMMEDIATE ECG' && styles.urgentCard
            ]}>
              <Text style={styles.assessmentTitle}>
                {assessment.condition} - {assessment.severity}
                {assessment.urgency && (
                  <Text style={styles.urgencyText}> ({assessment.urgency})</Text>
                )}
              </Text>
              <Text style={styles.assessmentDetails}>
                {assessment.details}
              </Text>
            </View>
          ))}

          {/* Recommendations Cards */}
          {results.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>{rec.title}</Text>
              {rec.actions.map((action, actionIndex) => (
                <Text key={actionIndex} style={styles.recommendationText}>
                  • {action}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Trend Modal */}
      {renderTrendModal()}
    </ScrollView>
  );
};

// Export the component



// ... [Previous code remains the same until styles] ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ECF0F1',
  },
  sectionContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
    paddingBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 16,
    color: '#34495E',
    fontWeight: '500',
  },
  inputUnit: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#BDC3C7',
  },
  inputWarning: {
    borderColor: '#E74C3C',
    borderWidth: 2,
  },
  inputContext: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 3,
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  calculateButton: {
    flex: 1,
    backgroundColor: '#2980B9',
    padding: 15,
    borderRadius: 8,
    marginRight: 7,
    alignItems: 'center',
  },
  trendButton: {
    flex: 1,
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 8,
    marginLeft: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    padding: 15,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  metricText: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 5,
  },
  assessmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  assessmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 10,
  },
  assessmentDetails: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#27AE60',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 5,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#34495E',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Helper functions for clinical assessments



const getHyponatremiaDetails = (values) => {
  const { sodium, osmolality } = values;
  if (osmolality > 295) return 'Hypertonicity (likely hyperglycemia)';
  if (osmolality < 285) {
    if (values.urineOsmolality > 100) return 'SIADH suspected';
    return 'Primary polydipsia suspected';
  }
  return 'Isotonic hyponatremia (pseudohyponatremia)';
};

const getHyponatremiaProtocol = (severity, values) => {
  const baseProtocol = {
    title: 'Hyponatremia Management',
    actions: [
      'Check serum osmolality',
      'Assess volume status',
      'Monitor sodium correction rate (not to exceed 8 mEq/L/24h)',
      'Check TSH and cortisol levels'
    ]
  };

  if (severity === 'Critical') {
    baseProtocol.actions.push(
      'Immediate 3% hypertonic saline bolus',
      'Target correction rate: 6-8 mEq/L in first 24h',
      'Frequent neurological checks',
      'Q2h sodium monitoring initially',
      'Consider ICU admission'
    );
  } else if (severity === 'Moderate') {
    baseProtocol.actions.push(
      'Consider 3% hypertonic saline if symptomatic',
      'Fluid restrict to <1L/day',
      'Daily sodium monitoring',
      'Evaluate for underlying cause'
    );
  } else {
    baseProtocol.actions.push(
      'Fluid restriction if appropriate',
      'Address underlying cause',
      'Monitor sodium daily',
      'Consider endocrine consultation'
    );
  }

  return [baseProtocol];
};







const getHypocalcemiaProtocol = (severity, values) => {
  // Implementation for calcium disorders
};

const getHypercalcemiaProtocol = (severity, values) => {
  // Implementation for calcium disorders
};

export default ElectrolyteCalculator;