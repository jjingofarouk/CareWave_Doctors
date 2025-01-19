import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Animated,
  Platform,
} from 'react-native';

const BISAPCalculator = () => {
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [criteria, setCriteria] = useState({
    bun: { value: false, detail: '> 25 mg/dL (8.92 mmol/L)' },
    mentalStatus: { 
      value: false, 
      detail: 'Disorientation, lethargy, somnolence, coma or stupor' 
    },
    sirs: { 
      value: false, 
      detail: '≥2 SIRS Criteria (Temp >38°C/100.4°F or <36°C/96.8°F, HR >90, RR >20, WBC >12k or <4k)' 
    },
    age: { value: false, detail: '> 60 years' },
    pleuralEffusion: { 
      value: false, 
      detail: 'Present on imaging' 
    },
  });

  const calculateRisk = () => {
    const totalScore = Object.values(criteria).filter(c => c.value).length;
    setScore(totalScore);
    animateResults();
    setShowResults(true);
  };

  const animateResults = () => {
    Animated.spring(animation, {
      toValue: 1,
      tension: 30,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const ResultsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showResults}
      onRequestClose={() => setShowResults(false)}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreTitle}>BISAP Score</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>

          <View style={styles.riskAssessment}>
            <Text style={styles.riskTitle}>Risk Assessment</Text>
            <Text style={styles.riskText}>
              {score === 0
                ? "Less than 1% mortality risk"
                : score <= 2
                ? "Approximately 1.9% mortality risk"
                : "Significantly elevated mortality risk (>15%)"}
            </Text>
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.recommendationsTitle}>Recommended Actions</Text>
            <View style={styles.recommendationsList}>
              {score === 0 ? (
                <>
                  <RecommendationItem text="Consider outpatient management" />
                  <RecommendationItem text="Monitor for 24-48 hours" />
                  <RecommendationItem text="Standard supportive care" />
                </>
              ) : score <= 2 ? (
                <>
                  <RecommendationItem text="Inpatient admission recommended" />
                  <RecommendationItem text="Serial vital sign monitoring" />
                  <RecommendationItem text="Early enteral nutrition if possible" />
                  <RecommendationItem text="Consider CT if deterioration occurs" />
                </>
              ) : (
                <>
                  <RecommendationItem text="Consider ICU admission" priority="high" />
                  <RecommendationItem text="Aggressive fluid resuscitation" priority="high" />
                  <RecommendationItem text="Monitor organ function closely" />
                  <RecommendationItem text="Early surgical consultation" />
                  <RecommendationItem text="CT imaging recommended" />
                </>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setShowResults(false);
                animation.setValue(0);
              }}
            >
              <Text style={styles.primaryButtonText}>Close</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                // Save to EMR functionality would go here
                console.log('Saving to EMR...');
              }}
            >
              <Text style={styles.secondaryButtonText}>Save to EMR</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );

  const RecommendationItem = ({ text, priority }) => (
    <View style={[
      styles.recommendationItem,
      priority === 'high' && styles.highPriorityItem
    ]}>
      <View style={[
        styles.recommendationDot,
        priority === 'high' && styles.highPriorityDot
      ]} />
      <Text style={[
        styles.recommendationText,
        priority === 'high' && styles.highPriorityText
      ]}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BISAP Score</Text>
        <Text style={styles.subtitle}>
          Bedside Index for Severity in Acute Pancreatitis
        </Text>
      </View>

      <View style={styles.timeframeCard}>
        <Text style={styles.timeframeText}>
          ⏰ Evaluate within first 24 hours of presentation
        </Text>
      </View>

      <View style={styles.criteriaContainer}>
        {Object.entries(criteria).map(([key, { value, detail }]) => (
          <TouchableOpacity
            key={key}
            style={[styles.criteriaCard, value && styles.criteriaCardSelected]}
            onPress={() => setCriteria({
              ...criteria,
              [key]: { ...criteria[key], value: !value }
            })}
          >
            <View style={styles.criteriaContent}>
              <View style={styles.criteriaHeader}>
                <Text style={[
                  styles.criteriaTitle,
                  value && styles.criteriaTitleSelected
                ]}>
                  {key.replace(/([A-Z])/g, ' $1')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Text>
                <View style={[
                  styles.checkmark,
                  value && styles.checkmarkSelected
                ]}>
                  {value && <Text style={styles.checkmarkText}>✓</Text>}
                </View>
              </View>
              <Text style={[
                styles.criteriaDetail,
                value && styles.criteriaDetailSelected
              ]}>
                {detail}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.calculateButton}
        onPress={calculateRisk}
      >
        <Text style={styles.calculateButtonText}>Calculate Risk</Text>
      </TouchableOpacity>

      <ResultsModal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  timeframeCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3182CE',
  },
  timeframeText: {
    fontSize: 15,
    color: '#2C5282',
    fontWeight: '500',
  },
  criteriaContainer: {
    padding: 16,
  },
  criteriaCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  criteriaCardSelected: {
    backgroundColor: '#2B6CB0',
    borderColor: '#2B6CB0',
  },
  criteriaContent: {
    flex: 1,
  },
  criteriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  criteriaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  criteriaTitleSelected: {
    color: '#FFF',
  },
  criteriaDetail: {
    fontSize: 14,
    color: '#718096',
  },
  criteriaDetailSelected: {
    color: '#E2E8F0',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkSelected: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
  },
  checkmarkText: {
    color: '#2B6CB0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calculateButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#3182CE',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calculateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3182CE',
  },
  riskAssessment: {
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C5282',
    marginBottom: 8,
  },
  riskText: {
    fontSize: 15,
    color: '#2C5282',
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  recommendationsList: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#718096',
    marginRight: 12,
  },
  highPriorityDot: {
    backgroundColor: '#E53E3E',
  },
  recommendationText: {
    fontSize: 14,
    color: '#4A5568',
  },
  highPriorityText: {
    color: '#E53E3E',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3182CE',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#2D3748',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BISAPCalculator;