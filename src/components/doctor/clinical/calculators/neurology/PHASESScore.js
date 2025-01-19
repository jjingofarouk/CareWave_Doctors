import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

export const PHASESScore = () => {
  const [scores, setScores] = useState({
    population: 0,
    hypertension: 0,
    age: 0,
    size: 0,
    earlierSAH: 0,
    site: 0
  });

  const calculateRuptureProbability = (score) => {
    const riskTable = {
      0: 0.4, 1: 0.4, 2: 0.4,
      3: 0.7,
      4: 0.9,
      5: 1.3,
      6: 1.7,
      7: 2.4,
      8: 3.2,
      9: 4.3,
      10: 5.3,
      11: 7.2,
      12: 17.8
    };
    return score >= 12 ? 17.8 : riskTable[score];
  };

  const sections = [
    {
      title: 'Population',
      key: 'population',
      options: [
        { label: 'North American/European (non-Finnish)', value: 0, detail: 'Standard population risk' },
        { label: 'Japanese', value: 3, detail: 'Higher baseline risk' },
        { label: 'Finnish', value: 5, detail: 'Highest population risk' }
      ]
    },
    {
      title: 'Hypertension',
      key: 'hypertension',
      options: [
        { label: 'No', value: 0, detail: 'Normal blood pressure' },
        { label: 'Yes', value: 1, detail: 'Diagnosed hypertension' }
      ]
    },
    {
      title: 'Age',
      key: 'age',
      options: [
        { label: '< 70 years', value: 0, detail: 'Lower age-related risk' },
        { label: '≥ 70 years', value: 1, detail: 'Higher age-related risk' }
      ]
    },
    {
      title: 'Size of Aneurysm',
      key: 'size',
      options: [
        { label: '< 7.0 mm', value: 0, detail: 'Small aneurysm' },
        { label: '7.0-9.9 mm', value: 3, detail: 'Medium aneurysm' },
        { label: '10.0-19.9 mm', value: 6, detail: 'Large aneurysm' },
        { label: '≥ 20.0 mm', value: 10, detail: 'Giant aneurysm' }
      ]
    },
    {
      title: 'Earlier SAH',
      key: 'earlierSAH',
      options: [
        { label: 'No', value: 0, detail: 'No previous subarachnoid hemorrhage' },
        { label: 'Yes', value: 1, detail: 'History of SAH from another aneurysm' }
      ]
    },
    {
      title: 'Site of Aneurysm',
      key: 'site',
      options: [
        { label: 'Internal carotid artery (ICA)', value: 0, detail: 'Lowest site-related risk' },
        { label: 'Middle cerebral artery (MCA)', value: 2, detail: 'Moderate site-related risk' },
        { label: 'ACA/PComm/Posterior circulation', value: 4, detail: 'Highest site-related risk' }
      ]
    }
  ];

  const handleSelection = (sectionKey, value) => {
    const newScores = { ...scores, [sectionKey]: value };
    setScores(newScores);
    
    // Alert for high-risk features
    if (value === 10) { // Giant aneurysm
      Alert.alert(
        "⚠️ High Risk Feature Detected",
        "Giant aneurysm (≥20mm) detected. Consider urgent neurosurgical consultation.",
        [{ text: "Acknowledge", style: "cancel" }]
      );
    }
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const ruptureProbability = calculateRuptureProbability(totalScore);

  const getRiskLevel = (probability) => {
    if (probability >= 7) return { text: "High Risk", color: '#DC2626' };
    if (probability >= 3) return { text: "Moderate Risk", color: '#EA580C' };
    return { text: "Low Risk", color: '#047857' };
  };

  const riskLevel = getRiskLevel(ruptureProbability);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>PHASES Score Calculator</Text>
          <Text style={styles.subtitle}>
            5-Year Aneurysm Rupture Risk Assessment
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.key} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.optionsContainer}>
              {section.options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    scores[section.key] === option.value && {
                      backgroundColor: '#1E293B',
                      borderColor: '#1E293B',
                    },
                  ]}
                  onPress={() => handleSelection(section.key, option.value)}
                >
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionText,
                      scores[section.key] === option.value && styles.selectedOptionText
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[
                      styles.optionDetail,
                      scores[section.key] === option.value && styles.selectedOptionText
                    ]}>
                      {option.detail}
                    </Text>
                  </View>
                  <Text style={[
                    styles.pointsText,
                    scores[section.key] === option.value && styles.selectedOptionText
                  ]}>
                    {option.value > 0 ? `+${option.value}` : '0'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={[styles.resultContainer, { backgroundColor: riskLevel.color + '20' }]}>
          <Text style={styles.scoreText}>Total Score: {totalScore}</Text>
          <Text style={styles.probabilityText}>
            5-Year Rupture Risk: {ruptureProbability}%
          </Text>
          <Text style={[styles.riskLevel, { color: riskLevel.color }]}>
            {riskLevel.text}
          </Text>
        </View>

        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>Clinical Recommendations:</Text>
          <Text style={styles.recommendationText}>
            • Score ≤2: Consider conservative management with regular monitoring
          </Text>
          <Text style={styles.recommendationText}>
            • Score 3-6: Individual risk assessment needed; consider patient factors
          </Text>
          <Text style={styles.recommendationText}>
            • Score 7-11: Consider intervention based on patient factors
          </Text>
          <Text style={styles.recommendationText}>
            • Score ≥12: Strong consideration for intervention
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Validated only in North American, European, Japanese, and Finnish populations.
          Use clinical judgment in conjunction with score results.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  optionDetail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  resultContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  probabilityText: {
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  riskLevel: {
    fontSize: 20,
    fontWeight: '600',
  },
  recommendationContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 8,
    lineHeight: 22,
  },
  disclaimer: {
    fontSize: 14,
    color: '#64748B',
    fontStyle: 'italic',
    textAlign: 'center',
    margin: 16,
    marginTop: 0,
  },
});