import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Share,
} from 'react-native';

const ABCD2Score = () => {
  const [responses, setResponses] = useState({
    age: null,
    bp: null,
    clinicalFeatures: null,
    duration: null,
    diabetes: null,
  });

  const handleSelection = (field, value) => {
    setResponses(prev => ({ ...prev, [field]: value }));
  };

  const totalScore = Object.values(responses).reduce((sum, value) => sum + (value ?? 0), 0);

  const getRiskLevel = () => {
    if (totalScore >= 6) return {
      level: "High Risk",
      twoDayRisk: "8.1%",
      sevenDayRisk: "11.7%",
      ninetyDayRisk: "17.8%",
      color: "#FFE4E4",
      textColor: "#CC0000",
    };
    if (totalScore >= 4) return {
      level: "Moderate Risk",
      twoDayRisk: "4.1%",
      sevenDayRisk: "5.9%",
      ninetyDayRisk: "9.8%",
      color: "#FFF4E4",
      textColor: "#CC7700",
    };
    return {
      level: "Low Risk",
      twoDayRisk: "1.0%",
      sevenDayRisk: "1.2%",
      ninetyDayRisk: "3.1%",
      color: "#E4FFE4",
      textColor: "#007700",
    };
  };

  const handleShare = async () => {
    const riskInfo = getRiskLevel();
    const message = `ABCD² Score Results:\n
Total Score: ${totalScore}
Risk Level: ${riskInfo.level}
2-Day Stroke Risk: ${riskInfo.twoDayRisk}
7-Day Stroke Risk: ${riskInfo.sevenDayRisk}
90-Day Stroke Risk: ${riskInfo.ninetyDayRisk}`;

    try {
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  const criteriaGroups = [
    {
      id: 'age',
      label: 'Age ≥60 years',
      description: 'Patient age at time of TIA',
      options: [
        { value: 1, label: 'Yes (+1)', details: 'Patient is 60 years or older' },
        { value: 0, label: 'No (0)', details: 'Patient is under 60 years' }
      ]
    },
    {
      id: 'bp',
      label: 'Blood Pressure ≥140/90 mmHg',
      description: 'Initial BP reading. Either SBP ≥140 or DBP ≥90.',
      options: [
        { value: 1, label: 'Yes (+1)', details: 'SBP ≥140 or DBP ≥90 mmHg' },
        { value: 0, label: 'No (0)', details: 'Both SBP <140 and DBP <90 mmHg' }
      ]
    },
    {
      id: 'clinicalFeatures',
      label: 'Clinical Features of the TIA',
      description: 'Select the most severe symptom present during the TIA',
      options: [
        { value: 2, label: 'Unilateral Weakness (+2)', details: 'Any unilateral weakness of face, arm, or leg' },
        { value: 1, label: 'Speech Disturbance (+1)', details: 'Speech disturbance without weakness' },
        { value: 0, label: 'Other Symptoms (0)', details: 'Including sensory symptoms, visual loss, or vertigo' }
      ]
    },
    {
      id: 'duration',
      label: 'Duration of Symptoms',
      description: 'Total duration of TIA symptoms',
      options: [
        { value: 2, label: '≥60 minutes (+2)', details: 'Symptoms lasted 60 minutes or longer' },
        { value: 1, label: '10-59 minutes (+1)', details: 'Symptoms lasted between 10 and 59 minutes' },
        { value: 0, label: '<10 minutes (0)', details: 'Symptoms resolved within 10 minutes' }
      ]
    },
    {
      id: 'diabetes',
      label: 'History of Diabetes',
      description: 'Presence of diabetes mellitus',
      options: [
        { value: 1, label: 'Yes (+1)', details: 'Known history of diabetes mellitus' },
        { value: 0, label: 'No (0)', details: 'No history of diabetes' }
      ]
    }
  ];

  const isComplete = Object.values(responses).every(value => value !== null);
  const riskInfo = getRiskLevel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>ABCD² Score for TIA</Text>
        
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>When to Use</Text>
          <Text style={styles.warningText}>
            Use to estimate stroke risk after a suspected transient ischemic attack (TIA).
            This tool helps risk-stratify patients for appropriate level of care and urgency of workup.
          </Text>
        </View>

        {criteriaGroups.map((group) => (
          <View key={group.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{group.label}</Text>
            <Text style={styles.sectionDescription}>{group.description}</Text>
            
            <View style={styles.optionsContainer}>
              {group.options.map((option) => (
                <TouchableOpacity
                  key={`${group.id}-${option.value}`}
                  style={[
                    styles.optionButton,
                    responses[group.id] === option.value && styles.selectedOption
                  ]}
                  onPress={() => handleSelection(group.id, option.value)}
                >
                  <Text style={[
                    styles.optionLabel,
                    responses[group.id] === option.value && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.optionDetails,
                    responses[group.id] === option.value && styles.selectedOptionText
                  ]}>
                    {option.details}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {isComplete && (
          <View style={styles.resultsContainer}>
            <View style={[styles.riskBox, { backgroundColor: riskInfo.color }]}>
              <Text style={[styles.riskTitle, { color: riskInfo.textColor }]}>
                Total Score: {totalScore} points - {riskInfo.level}
              </Text>
              <Text style={styles.riskText}>Stroke Risk:</Text>
              <Text style={styles.riskDetail}>• 2-Day: {riskInfo.twoDayRisk}</Text>
              <Text style={styles.riskDetail}>• 7-Day: {riskInfo.sevenDayRisk}</Text>
              <Text style={styles.riskDetail}>• 90-Day: {riskInfo.ninetyDayRisk}</Text>
              
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>Share Results</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.managementBox}>
              <Text style={styles.managementTitle}>Management Recommendations</Text>
              <View style={styles.bulletPoints}>
                <Text style={styles.bulletHeader}>Immediate Actions:</Text>
                <Text style={styles.bulletPoint}>• Consider brain imaging (CT/MRI) based on risk level</Text>
                <Text style={styles.bulletPoint}>• Evaluate for carotid stenosis with ultrasound/CTA</Text>
                <Text style={styles.bulletPoint}>• Review and optimize antithrombotic therapy</Text>
                <Text style={styles.bulletPoint}>• Assess and manage vascular risk factors</Text>
                
                <Text style={styles.bulletHeader}>Risk-Based Management:</Text>
                <Text style={styles.bulletPoint}>• High Risk (≥6): Consider immediate admission and neurology consultation</Text>
                <Text style={styles.bulletPoint}>• Moderate Risk (4-5): Same-day TIA clinic evaluation recommended</Text>
                <Text style={styles.bulletPoint}>• Low Risk (0-3): Expedited outpatient evaluation within 24-48 hours</Text>
                
                <Text style={styles.bulletHeader}>Critical Actions:</Text>
                <Text style={styles.bulletPoint}>• This score does not replace clinical judgment</Text>
                <Text style={styles.bulletPoint}>• Consider cardiac monitoring for AF detection</Text>
                <Text style={styles.bulletPoint}>• Arrange appropriate follow-up based on risk level</Text>
              </View>
            </View>

            <View style={styles.pearlsBox}>
              <Text style={styles.pearlsTitle}>Pearls/Pitfalls</Text>
              <Text style={styles.pearlPoint}>• Score should supplement, not replace, clinical judgment</Text>
              <Text style={styles.pearlPoint}>• Low scores still require appropriate follow-up</Text>
              <Text style={styles.pearlPoint}>• Consider local stroke center capabilities when planning disposition</Text>
              <Text style={styles.pearlPoint}>• Remember to evaluate for other stroke mimics</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  warningBox: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  warningText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#27C7B8',
    borderColor: '#27C7B8',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDetails: {
    fontSize: 14,
    color: '#666',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    gap: 16,
    marginTop: 24,
  },
  riskBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  riskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  riskText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  riskDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  shareButton: {
    backgroundColor: '#27C7B8',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  managementBox: {
    backgroundColor: '#F0F7FF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  managementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  bulletHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  bulletPoints: {
    gap: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    paddingLeft: 8,
  },
  pearlsBox: {
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    marginTop: 16,
  },
  pearlsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  pearlPoint: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
    paddingLeft: 8,
  },
});

export default ABCD2Score;