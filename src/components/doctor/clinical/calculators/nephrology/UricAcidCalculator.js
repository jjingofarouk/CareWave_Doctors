import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Clinical reference values and thresholds
const REFERENCE_RANGES = {
  NORMAL: { min: 3.5, max: 7.2 },
  ELEVATED: { min: 7.2, max: 8.9 },
  HIGH: { min: 8.9, max: Infinity },
  CRITICAL: 13.0,
  TARGET_GOUT: 6.0,
  TARGET_TOPHACEOUS: 5.0,
};

const RISK_FACTORS = [
  { id: 'obesity', label: 'Obesity (BMI > 30)' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'ckd', label: 'Chronic Kidney Disease' },
  { id: 'cardiovascular', label: 'Cardiovascular Disease' },
  { id: 'diuretics', label: 'Diuretic Use' },
];

const UricAcidCalculator = () => {
  // State management
  const [values, setValues] = useState({
    uricAcid: '',
    creatinine: '',
    age: '',
    weight: '',
    height: '',
  });
  
  const [selectedRiskFactors, setSelectedRiskFactors] = useState([]);
  const [showTrendModal, setShowTrendModal] = useState(false);
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    datasets: [{
      data: [],
      color: (opacity = 1) => `rgba(72, 61, 139, ${opacity})`,
      strokeWidth: 2,
    }],
  });

  const [results, setResults] = useState({
    status: null,
    interpretation: null,
    riskLevel: null,
    recommendations: [],
    alerts: [],
  });

  // Calculate BMI
  const calculateBMI = useCallback(() => {
    const heightInMeters = parseFloat(values.height) / 100;
    return (parseFloat(values.weight) / (heightInMeters * heightInMeters)).toFixed(1);
  }, [values.height, values.weight]);

  // Clinical interpretation function
  const interpretUricAcid = useCallback(() => {
    const uricAcid = parseFloat(values.uricAcid);
    const bmi = calculateBMI();
    let status, interpretation, riskLevel, recommendations = [], alerts = [];

    // Basic status determination
    if (uricAcid < REFERENCE_RANGES.NORMAL.min) {
      status = 'Hypouricemia';
      interpretation = 'Uric acid levels below normal range';
      riskLevel = 'Moderate';
      recommendations.push(
        'Evaluate for possible causes of hypouricemia:',
        '• SIADH',
        '• Malignancy',
        '• Medications (e.g., allopurinol overdose)',
        'Consider nephrology consultation'
      );
    } else if (uricAcid <= REFERENCE_RANGES.NORMAL.max) {
      status = 'Normal';
      interpretation = 'Uric acid within normal range';
      riskLevel = 'Low';
      recommendations.push(
        'Routine monitoring recommended',
        'Continue current management'
      );
    } else if (uricAcid <= REFERENCE_RANGES.ELEVATED.max) {
      status = 'Hyperuricemia';
      interpretation = 'Elevated uric acid levels - Increased risk for gout';
      riskLevel = 'Moderate';
      recommendations.push(
        'Consider urate-lowering therapy if:',
        '• History of gout attacks',
        '• Presence of tophi',
        '• Chronic kidney disease',
        'Lifestyle modifications recommended'
      );
    } else {
      status = 'Severe Hyperuricemia';
      interpretation = 'Significantly elevated uric acid levels';
      riskLevel = 'High';
      recommendations.push(
        'Urgent intervention recommended:',
        '• Initiate urate-lowering therapy',
        '• Monitor for tumor lysis syndrome',
        '• Assess renal function',
        '• Consider rheumatology consultation'
      );
    }

    // Risk factor assessment
    if (selectedRiskFactors.length > 2) {
      alerts.push('Multiple risk factors present - Consider aggressive management');
    }

    if (uricAcid >= REFERENCE_RANGES.CRITICAL) {
      alerts.push('CRITICAL VALUE - Immediate medical attention required');
    }

    // BMI-specific recommendations
    if (bmi > 30) {
      recommendations.push(
        'Weight management strategies:',
        '• Dietary modification',
        '• Regular exercise program',
        '• Consider bariatric consultation if BMI > 35'
      );
    }

    return {
      status,
      interpretation,
      riskLevel,
      recommendations,
      alerts
    };
  }, [values.uricAcid, selectedRiskFactors, calculateBMI]);

  // Handle calculation
  const calculateResults = useCallback(() => {
    if (!values.uricAcid) {
      Alert.alert('Error', 'Please enter uric acid value');
      return;
    }

    const results = interpretUricAcid();
    setResults(results);

    // Update historical data
    const newHistoricalData = {
      labels: [...historicalData.labels, new Date().toLocaleDateString()],
      datasets: [{
        ...historicalData.datasets[0],
        data: [...historicalData.datasets[0].data, parseFloat(values.uricAcid)]
      }]
    };
    setHistoricalData(newHistoricalData);

    // Check for critical values
    if (parseFloat(values.uricAcid) >= REFERENCE_RANGES.CRITICAL) {
      Alert.alert(
        'CRITICAL VALUE ALERT',
        'Uric acid level critically elevated. Immediate medical attention recommended.',
        [{ text: 'Acknowledge', style: 'cancel' }]
      );
    }
  }, [values, historicalData, interpretUricAcid]);

  // Render risk factor selection
  const renderRiskFactors = () => (
    <View style={styles.riskFactorsContainer}>
      <Text style={styles.sectionTitle}>Risk Factors</Text>
      <View style={styles.riskFactorGrid}>
        {RISK_FACTORS.map(factor => (
          <TouchableOpacity
            key={factor.id}
            style={[
              styles.riskFactorButton,
              selectedRiskFactors.includes(factor.id) && styles.riskFactorButtonSelected
            ]}
            onPress={() => {
              setSelectedRiskFactors(prev =>
                prev.includes(factor.id)
                  ? prev.filter(id => id !== factor.id)
                  : [...prev, factor.id]
              );
            }}
          >
            <Text style={[
              styles.riskFactorText,
              selectedRiskFactors.includes(factor.id) && styles.riskFactorTextSelected
            ]}>
              {factor.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Render trend modal
  const renderTrendModal = () => (
    <Modal
      visible={showTrendModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowTrendModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Uric Acid Trends</Text>
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
                color: (opacity = 1) => `rgba(72, 61, 139, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#483D8B'
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

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Advanced Uric Acid Analysis</Text>
        <Text style={styles.subtitle}>Clinical Decision Support Tool</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Uric Acid</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter value (mg/dL)"
            value={values.uricAcid}
            onChangeText={(text) => setValues(prev => ({ ...prev, uricAcid: text }))}
            keyboardType="numeric"
          />
          <Text style={styles.referenceRange}>
            Reference Range: {REFERENCE_RANGES.NORMAL.min} - {REFERENCE_RANGES.NORMAL.max} mg/dL
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Creatinine</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter value (mg/dL)"
            value={values.creatinine}
            onChangeText={(text) => setValues(prev => ({ ...prev, creatinine: text }))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={values.weight}
              onChangeText={(text) => setValues(prev => ({ ...prev, weight: text }))}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={values.height}
              onChangeText={(text) => setValues(prev => ({ ...prev, height: text }))}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Risk Factors Section */}
      {renderRiskFactors()}

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.analyzeButton}
          onPress={calculateResults}
        >
          <Text style={styles.buttonText}>Analyze Results</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.trendButton}
          onPress={() => setShowTrendModal(true)}
        >
          <Text style={styles.buttonText}>View Trends</Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      {results.status && (
        <View style={styles.resultsContainer}>
          {/* Status Card */}
          <View style={[styles.resultCard, styles.statusCard(results.riskLevel)]}>
            <Text style={styles.statusTitle}>{results.status}</Text>
            <Text style={styles.interpretation}>{results.interpretation}</Text>
            <Text style={styles.riskLevel}>Risk Level: {results.riskLevel}</Text>
          </View>

          {/* Alerts */}
          {results.alerts.length > 0 && (
            <View style={styles.alertCard}>
              {results.alerts.map((alert, index) => (
                <Text key={index} style={styles.alertText}>⚠️ {alert}</Text>
              ))}
            </View>
          )}

          {/* Recommendations */}
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Clinical Recommendations</Text>
            {results.recommendations.map((rec, index) => (
              <Text key={index} style={styles.recommendationText}>
                {rec}
              </Text>
            ))}
          </View>

          {values.weight && values.height && (
            <View style={styles.bmiCard}>
              <Text style={styles.bmiTitle}>BMI Assessment</Text>
              <Text style={styles.bmiValue}>{calculateBMI()} kg/m²</Text>
            </View>
          )}
        </View>
      )}

      {/* Trend Modal */}
      {renderTrendModal()}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  header: {
    padding: 24,
    backgroundColor: '#4F46E5',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  inputSection: {
    padding: 20,
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  referenceRange: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    letterSpacing: 0.2,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  riskFactorsContainer: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  riskFactorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskFactorButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: '45%',
    flex: 1,
  },
  riskFactorButtonSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  riskFactorText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    fontWeight: '500',
  },
  riskFactorTextSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  analyzeButton: {
    flex: 2,
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  trendButton: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 20,
    gap: 16,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statusCard: (riskLevel) => ({
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: 
      riskLevel === 'Low' ? '#10B981' :
      riskLevel === 'Moderate' ? '#F59E0B' :
      riskLevel === 'High' ? '#EF4444' : '#4F46E5',
  }),
  statusTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  interpretation: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12,
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  alertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#991B1B',
    fontWeight: '500',
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  recommendationText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
    lineHeight: 20,
  },
  bmiCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  bmiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F46E5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    minHeight: '60%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 16,
    borderRadius: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 40,
  },
  closeButton: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default UricAcidCalculator;