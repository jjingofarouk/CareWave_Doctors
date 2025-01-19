import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect';

const MMRCCalculator = () => {
  const [score, setScore] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(false);

  const dyspneaOptions = [
    {
      value: '0',
      label: 'Grade 0 - Dyspnea only with strenuous exercise',
    },
    {
      value: '1',
      label: 'Grade 1 - Dyspnea when hurrying or walking up a slight hill',
    },
    {
      value: '2',
      label: 'Grade 2 - Walks slower than people of same age due to breathlessness',
    },
    {
      value: '3',
      label: 'Grade 3 - Stops for breath after walking 100 yards or few minutes',
    },
    {
      value: '4',
      label: 'Grade 4 - Too breathless to leave house or dress',
    },
  ];

  const getResultInterpretation = () => {
    if (!score) return null;
    
    const interpretations = {
      '0': 'Minimal respiratory limitation',
      '1': 'Mild respiratory limitation',
      '2': 'Moderate respiratory limitation',
      '3': 'Severe respiratory limitation',
      '4': 'Very severe respiratory limitation',
    };
    
    return interpretations[score];
  };

  const handleSelectGrade = (item) => {
    setScore(item.value);
  };

  const ResultCard = () => (
    score ? (
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>Assessment Result</Text>
        <Text style={styles.scoreText}>mMRC Grade: {score}</Text>
        <Text style={styles.interpretationText}>{getResultInterpretation()}</Text>
        <Text style={styles.descriptionText}>
          {dyspneaOptions.find(option => option.value === score)?.label}
        </Text>
      </View>
    ) : null
  );

  const Guidelines = () => (
    <View style={styles.guidelinesContainer}>
      <Text style={styles.guidelineTitle}>Clinical Guidelines</Text>
      <Text style={styles.guidelineText}>
        • Score ≥2 may indicate need for further assessment including spirometry
      </Text>
      <Text style={styles.guidelineText}>
        • Consider GOLD staging for COPD patients
      </Text>
      <Text style={styles.guidelineText}>
        • Evaluate need for pulmonary rehabilitation
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>mMRC Dyspnea Scale</Text>
          <Text style={styles.subtitle}>
            Assess breathlessness severity in respiratory conditions
          </Text>

          <View style={styles.selectContainer}>
            <CustomSelect
              options={dyspneaOptions}
              placeholder="Select Dyspnea Level"
              onSelect={handleSelectGrade}
              label="Dyspnea Grade"
            />
          </View>

          <ResultCard />

          <TouchableOpacity
            style={styles.guidelineButton}
            onPress={() => setShowGuidelines(!showGuidelines)}
          >
            <Text style={styles.guidelineButtonText}>
              {showGuidelines ? 'Hide Guidelines' : 'Show Clinical Guidelines'}
            </Text>
          </TouchableOpacity>

          {showGuidelines && <Guidelines />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  selectContainer: {
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 8,
  },
  interpretationText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  guidelineButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  guidelineButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  guidelinesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guidelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  guidelineText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default MMRCCalculator;