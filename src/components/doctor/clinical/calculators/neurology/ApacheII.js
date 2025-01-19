import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';

// Clinical guidelines content
const CLINICAL_GUIDELINES = {
  temperature: {
    title: 'Temperature Management',
    ranges: [
      {
        range: '< 36.0°C',
        guidance: 'Consider external warming methods. Monitor for signs of infection.',
        intervention: 'Active warming indicated if < 35.0°C'
      },
      {
        range: '38.5°C - 39.5°C',
        guidance: 'Search for source of infection. Consider blood cultures.',
        intervention: 'Antipyretics if symptomatic'
      },
      {
        range: '> 39.5°C',
        guidance: 'Urgent sepsis evaluation required. Initiate sepsis protocol.',
        intervention: 'Immediate cooling measures and antibiotics if indicated'
      }
    ]
  },
  heartRate: {
    title: 'Heart Rate Management',
    ranges: [
      {
        range: '< 60 bpm',
        guidance: 'Check medication history. Consider 12-lead ECG.',
        intervention: 'Atropine if symptomatic'
      },
      {
        range: '> 100 bpm',
        guidance: 'Evaluate for underlying cause: pain, anxiety, hypovolemia.',
        intervention: 'Rate control if AF. Fluid resuscitation if needed.'
      }
    ]
  },
  respiratoryRate: {
    title: 'Respiratory Management',
    ranges: [
      {
        range: '< 12 breaths/min',
        guidance: 'Check medication effects. Monitor CO2 retention.',
        intervention: 'Consider naloxone if opiate-induced'
      },
      {
        range: '> 24 breaths/min',
        guidance: 'Assess work of breathing. Check oxygen saturation.',
        intervention: 'Supplemental oxygen if hypoxemic'
      }
    ]
  },
  bloodPressure: {
    title: 'Blood Pressure Management',
    ranges: [
      {
        range: 'SBP < 90 mmHg',
        guidance: 'Evaluate for shock. Check lactate levels.',
        intervention: 'Fluid resuscitation. Consider vasopressors.'
      },
      {
        range: 'SBP > 180 mmHg',
        guidance: 'Screen for end-organ damage. Check causes.',
        intervention: 'IV antihypertensives if organ damage present'
      }
    ]
  }
};

// Helper component to display guidelines
const GuidelineCard = ({ title, ranges }) => (
  <View style={styles.guidelineCard}>
    <Text style={styles.guidelineTitle}>{title}</Text>
    {ranges.map((item, index) => (
      <View key={index} style={styles.rangeItem}>
        <Text style={styles.rangeText}>{item.range}</Text>
        <Text style={styles.guidanceText}>• {item.guidance}</Text>
        <Text style={styles.interventionText}>→ {item.intervention}</Text>
      </View>
    ))}
  </View>
);

// Input field component with toggleable guidelines
const InputField = ({ label, value, onChangeText, helperText, unit, keyboardType = 'numeric', guidelines }) => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        {unit && <Text style={styles.unitText}>({unit})</Text>}
        {guidelines && (
          <TouchableOpacity 
            onPress={() => setShowGuidelines(!showGuidelines)}
            style={styles.infoButton}
          >
            <Text style={styles.infoButtonText}>ⓘ</Text>
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.textInput}
        placeholderTextColor="#666"
        placeholder="Enter value"
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
      {showGuidelines && guidelines && (
        <GuidelineCard {...guidelines} />
      )}
    </View>
  );
};

// Score card component
const ScoreCard = ({ title, value, description, color }) => (
  <View style={[styles.scoreCard, { borderLeftColor: color }]}>
    <Text style={styles.scoreCardTitle}>{title}</Text>
    <Text style={[styles.scoreCardValue, { color }]}>{value}</Text>
    <Text style={styles.scoreCardDescription}>{description}</Text>
  </View>
);

// Recommendations card component
const RecommendationsCard = ({ score }) => {
  const recommendations = useMemo(() => {
    if (score <= 4) {
      return {
        monitoring: 'Q4H vital signs',
        tests: ['Basic metabolic panel daily', 'CBC with differential'],
        interventions: ['Standard nursing care', 'Early mobilization if appropriate']
      };
    } else if (score <= 9) {
      return {
        monitoring: 'Q2H vital signs',
        tests: ['Comprehensive metabolic panel', 'Arterial blood gases'],
        interventions: ['Consider HDU admission', 'Early specialist consultation']
      };
    } else if (score <= 14) {
      return {
        monitoring: 'Continuous vital signs monitoring',
        tests: ['Hourly blood gases', 'Continuous cardiac monitoring'],
        interventions: ['ICU admission', 'Consider early intubation']
      };
    } else {
      return {
        monitoring: 'Continuous ICU monitoring',
        tests: ['Frequent blood gases', 'Continuous cardiac monitoring'],
        interventions: ['Immediate ICU admission', 'Consider ventilation']
      };
    }
  }, [score]);

  return (
    <View style={styles.recommendationsCard}>
      <Text style={styles.recommendationsTitle}>Clinical Recommendations</Text>
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationHeader}>Monitoring:</Text>
        <Text style={styles.recommendationText}>{recommendations.monitoring}</Text>
      </View>
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationHeader}>Suggested Tests:</Text>
        {recommendations.tests.map((test, index) => (
          <Text key={index} style={styles.recommendationText}>• {test}</Text>
        ))}
      </View>
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationHeader}>Interventions:</Text>
        {recommendations.interventions.map((intervention, index) => (
          <Text key={index} style={styles.recommendationText}>• {intervention}</Text>
        ))}
      </View>
    </View>
  );
};

// Main component
const ApacheII = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    heartRate: '',
    respiratoryRate: '',
    systolicBP: '',
    age: '',
    chronicHealth: '0',
  });
  
  const [score, setScore] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasCalculated(false);
  }, []);

  const validateInput = useCallback(() => {
    const requiredFields = Object.entries(formData).filter(([key]) => key !== 'chronicHealth');
    
    for (const [field, value] of requiredFields) {
      if (!value || isNaN(value)) {
        Alert.alert('Validation Error', `Please enter a valid value for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    return true;
  }, [formData]);

  const calculateScore = useCallback(() => {
    if (!validateInput()) return;

    let totalScore = 0;
    const { temperature, heartRate, respiratoryRate, systolicBP, age, chronicHealth } = formData;

    // Temperature scoring
    const temp = parseFloat(temperature);
    if (temp < 36 || temp > 38.5) totalScore += 2;
    
    // Heart Rate scoring
    const hr = parseInt(heartRate);
    if (hr < 40 || hr > 140) totalScore += 4;
    else if (hr >= 40 && hr <= 60) totalScore += 1;
    else if (hr > 100 && hr <= 140) totalScore += 2;

    // Respiratory Rate scoring
    const rr = parseInt(respiratoryRate);
    if (rr < 8 || rr > 35) totalScore += 4;
    else if (rr >= 8 && rr <= 12) totalScore += 1;
    else if (rr > 24 && rr <= 35) totalScore += 2;

    // Blood Pressure scoring
    const sbp = parseInt(systolicBP);
    if (sbp < 70) totalScore += 4;
    else if (sbp >= 70 && sbp <= 100) totalScore += 2;
    else if (sbp > 160) totalScore += 2;

    // Age scoring
    const ageVal = parseInt(age);
    if (ageVal >= 75) totalScore += 6;
    else if (ageVal >= 65) totalScore += 4;
    else if (ageVal >= 55) totalScore += 2;

    // Chronic Health scoring
    if (chronicHealth === '1') totalScore += 2;

    setScore(totalScore);
    setHasCalculated(true);
  }, [formData, validateInput]);

  const interpretation = useMemo(() => {
    if (!hasCalculated) return null;

    if (score <= 4) {
      return {
        risk: 'Low',
        mortality: 'Very low',
        color: '#4CAF50'
      };
    } else if (score <= 9) {
      return {
        risk: 'Moderate',
        mortality: 'Low',
        color: '#FFA726'
      };
    } else if (score <= 14) {
      return {
        risk: 'High',
        mortality: 'Moderate',
        color: '#F44336'
      };
    } else {
      return {
        risk: 'Very High',
        mortality: 'High',
        color: '#D32F2F'
      };
    }
  }, [score, hasCalculated]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>APACHE II Score Calculator</Text>
          <Text style={styles.subtitle}>Enter patient parameters below</Text>
        </View>

        <View style={styles.inputGroup}>
          <InputField
            label="Temperature"
            value={formData.temperature}
            onChangeText={(value) => handleInputChange('temperature', value)}
            unit="°C"
            guidelines={CLINICAL_GUIDELINES.temperature}
          />
          
          <InputField
            label="Heart Rate"
            value={formData.heartRate}
            onChangeText={(value) => handleInputChange('heartRate', value)}
            unit="bpm"
            guidelines={CLINICAL_GUIDELINES.heartRate}
          />
          
          <InputField
            label="Respiratory Rate"
            value={formData.respiratoryRate}
            onChangeText={(value) => handleInputChange('respiratoryRate', value)}
            unit="breaths/min"
            guidelines={CLINICAL_GUIDELINES.respiratoryRate}
          />
          
          <InputField
            label="Systolic BP"
            value={formData.systolicBP}
            onChangeText={(value) => handleInputChange('systolicBP', value)}
            unit="mmHg"
            guidelines={CLINICAL_GUIDELINES.bloodPressure}
          />
          
          <InputField
            label="Age"
            value={formData.age}
            onChangeText={(value) => handleInputChange('age', value)}
            unit="years"
          />
          
          <InputField
            label="Chronic Health"
            value={formData.chronicHealth}
            onChangeText={(value) => handleInputChange('chronicHealth', value)}
            helperText="Enter 1 if severe organ insufficiency present, 0 if not"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity onPress={calculateScore} style={styles.calculateButton}>
          <Text style={styles.calculateButtonText}>Calculate Score</Text>
        </TouchableOpacity>

        {hasCalculated && interpretation && (
          <View style={styles.resultsContainer}>
            <ScoreCard
              title="APACHE II Score"
              value={score}
              description={`Risk Level: ${interpretation.risk} (${interpretation.mortality} mortality)`}
              color={interpretation.color}
            />
            <RecommendationsCard score={score} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 4,
  },
  inputGroup: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  unitText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#2C3E50',
  },
  helperText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  calculateButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    padding: 16,
    margin: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  calculateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    padding: 20,
  },
  scoreCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  scoreCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  scoreCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  scoreCardDescription: {
    fontSize: 14,
    color: '#2C3E50',
  },
  guidelineCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2C3E50',
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  rangeItem: {
    marginBottom: 12,
  },
  rangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  guidanceText: {
    fontSize: 14,
    color: '#2C3E50',
    marginTop: 4,
  },
  interventionText: {
    fontSize: 14,
    color: '#2C3E50',
    fontStyle: 'italic',
    marginTop: 4,
    marginLeft: 12,
  },
  infoButton: {
    marginLeft: 8,
    padding: 4,
  },
  infoButtonText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  recommendationsCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  recommendationSection: {
    marginBottom: 12,
  },
  recommendationHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 8,
    marginBottom: 2,
  },
});

export default ApacheII;