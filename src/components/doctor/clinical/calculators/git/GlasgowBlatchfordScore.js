import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect'; // Using the provided custom select

const GlasgowBlatchfordScore = () => {
  // Enhanced state management
  const [formData, setFormData] = useState({
    hemoglobin: '',
    bloodUrea: '',
    systolicBP: '',
    sex: '',
    heartRate: '',
    melena: '',
    syncope: '',
    liverDisease: '',
    cardiacFailure: '',
  });

  // Risk level thresholds based on clinical guidelines
  const getRiskLevel = (score) => {
    if (score === 0) return { level: 'Very Low Risk', recommendation: 'Consider outpatient management' };
    if (score <= 3) return { level: 'Low Risk', recommendation: 'Consider early discharge with follow-up' };
    if (score <= 7) return { level: 'Moderate Risk', recommendation: 'Admit for observation and early endoscopy' };
    return { level: 'High Risk', recommendation: 'Urgent intervention required. Consider ICU admission.' };
  };

  // Enhanced score calculation with more precise clinical criteria
  const calculateScore = useCallback(() => {
    let score = 0;
    const { hemoglobin, bloodUrea, systolicBP, sex, heartRate, melena, syncope, liverDisease, cardiacFailure } = formData;

    // Blood Urea Nitrogen (converting mmol/L to clinical scoring)
    const bun = parseFloat(bloodUrea);
    if (bun >= 25.0) score += 6;
    else if (bun >= 10.0) score += 3;
    else if (bun >= 6.5) score += 2;
    else if (bun >= 3.5) score += 1;

    // Hemoglobin criteria with sex-specific thresholds
    const hb = parseFloat(hemoglobin);
    if (sex === 'male') {
      if (hb < 100) score += 6;
      else if (hb < 120) score += 3;
    } else if (sex === 'female') {
      if (hb < 100) score += 6;
      else if (hb < 110) score += 3;
    }

    // Systolic Blood Pressure
    const sbp = parseFloat(systolicBP);
    if (sbp < 90) score += 3;
    else if (sbp < 100) score += 2;

    // Other clinical parameters
    if (heartRate === 'yes') score += 1;
    if (melena === 'yes') score += 1;
    if (syncope === 'yes') score += 2;
    if (liverDisease === 'yes') score += 2;
    if (cardiacFailure === 'yes') score += 2;

    return score;
  }, [formData]);

  const getManagementGuidelines = (score) => {
    const risk = getRiskLevel(score);
    return {
      ...risk,
      immediateActions: score >= 7 ? [
        'Establish two large-bore IV lines',
        'Start fluid resuscitation',
        'Consider blood type and cross-match',
        'Urgent endoscopy within 24 hours',
        'Monitor vitals every 15 minutes'
      ] : [
        'Regular vital sign monitoring',
        'Consider oral intake if appropriate',
        'Schedule routine endoscopy if indicated',
        'Plan follow-up care'
      ]
    };
  };

  // Input options for CustomSelect
  const yesNoOptions = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' }
  ];

  const sexOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const score = calculateScore();
  const management = getManagementGuidelines(score);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Glasgow-Blatchford Score (GBS)</Text>
        <Text style={styles.subheaderText}>Upper GI Bleeding Risk Assessment</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Clinical Parameters</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sex</Text>
          <CustomSelect
            options={sexOptions}
            placeholder="Select sex"
            onSelect={(item) => handleInputChange('sex', item.value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hemoglobin (g/L)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.hemoglobin}
            onChangeText={(value) => handleInputChange('hemoglobin', value)}
            placeholder="Enter hemoglobin level"
          />
          <Text style={styles.helperText}>Normal range: Males 130-170, Females 120-150 g/L</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Urea (mmol/L)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.bloodUrea}
            onChangeText={(value) => handleInputChange('bloodUrea', value)}
            placeholder="Enter blood urea level"
          />
          <Text style={styles.helperText}>Normal range: 3.6-7.1 mmol/L</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Systolic BP (mmHg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.systolicBP}
            onChangeText={(value) => handleInputChange('systolicBP', value)}
            placeholder="Enter systolic blood pressure"
          />
          <Text style={styles.helperText}>Normal range: 90-140 mmHg</Text>
        </View>

        {/* Clinical Signs and Symptoms */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Heart Rate ≥100 bpm</Text>
          <CustomSelect
            options={yesNoOptions}
            placeholder="Select heart rate status"
            onSelect={(item) => handleInputChange('heartRate', item.value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Melena Present</Text>
          <CustomSelect
            options={yesNoOptions}
            placeholder="Select melena status"
            onSelect={(item) => handleInputChange('melena', item.value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Recent Syncope</Text>
          <CustomSelect
            options={yesNoOptions}
            placeholder="Select syncope status"
            onSelect={(item) => handleInputChange('syncope', item.value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Liver Disease History</Text>
          <CustomSelect
            options={yesNoOptions}
            placeholder="Select liver disease status"
            onSelect={(item) => handleInputChange('liverDisease', item.value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cardiac Failure</Text>
          <CustomSelect
            options={yesNoOptions}
            placeholder="Select cardiac failure status"
            onSelect={(item) => handleInputChange('cardiacFailure', item.value)}
          />
        </View>
      </View>

      {/* Results Section */}
      <View style={styles.resultSection}>
        <Text style={styles.scoreText}>Total Score: {score}</Text>
        <Text style={styles.riskLevel}>Risk Level: {management.level}</Text>
        <Text style={styles.recommendation}>Recommendation: {management.recommendation}</Text>
        
        <View style={styles.actionList}>
          <Text style={styles.actionHeader}>Immediate Actions:</Text>
          {management.immediateActions.map((action, index) => (
            <Text key={index} style={styles.actionItem}>• {action}</Text>
          ))}
        </View>
      </View>

      {/* Clinical Notes */}
      <View style={styles.clinicalNotes}>
        <Text style={styles.notesHeader}>Clinical Notes</Text>
        <Text style={styles.noteText}>• Score of 0 has NPV above 99% for requiring intervention</Text>
        <Text style={styles.noteText}>• Scores ≥7 associated with above 50% risk of requiring intervention</Text>
        <Text style={styles.noteText}>• Consider early endoscopy for scores above 3</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subheaderText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#34495e',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  helperText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  resultSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  riskLevel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 5,
  },
  recommendation: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
  },
  actionList: {
    marginTop: 10,
  },
  actionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  actionItem: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 5,
    paddingLeft: 10,
  },
  clinicalNotes: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
  },
  notesHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  noteText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
});

export default GlasgowBlatchfordScore;