import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const CLINICAL_THEME = {
  primary: '#2D3580',     // Medical navy blue
  secondary: '#4B61DD',   // Accent blue
  success: '#00A474',     // Medical green
  warning: '#FF9F3E',     // Warning orange
  danger: '#E53E3E',      // Alert red
  background: '#FFFFFF',  
  surface: '#F7FAFC',    
  border: '#E2E8F0',     
  text: '#1A202C',       
  textLight: '#4A5568',  
};

const QUESTIONS = [
  {
    id: 'q1',
    text: 'During the past 4 weeks, how often did your asthma prevent you from getting as much done at work, school or home?',
    options: [
      { value: 5, label: 'None of the time' },
      { value: 4, label: 'A little of the time' },
      { value: 3, label: 'Some of the time' },
      { value: 2, label: 'Most of the time' },
      { value: 1, label: 'All of the time' }
    ]
  },
  {
    id: 'q2',
    text: 'During the past 4 weeks, how often have you had shortness of breath?',
    options: [
      { value: 5, label: 'Not at all' },
      { value: 4, label: '1-2 times a week' },
      { value: 3, label: '3-6 times a week' },
      { value: 2, label: 'Once a day' },
      { value: 1, label: 'More than once a day' }
    ]
  },
  {
    id: 'q3',
    text: 'During the past 4 weeks, how often did your asthma symptoms (wheezing, coughing, chest tightness, shortness of breath) wake you up at night or earlier than usual in the morning?',
    options: [
      { value: 5, label: 'Not at all' },
      { value: 4, label: 'Once or twice' },
      { value: 3, label: 'Once a week' },
      { value: 2, label: '2-3 nights a week' },
      { value: 1, label: '4 or more times a week' }
    ]
  },
  {
    id: 'q4',
    text: 'During the past 4 weeks, how often have you used your reliever inhaler (usually blue)?',
    options: [
      { value: 5, label: 'Not at all' },
      { value: 4, label: 'Once a week or less' },
      { value: 3, label: '2-3 times a week' },
      { value: 2, label: '1-2 times a day' },
      { value: 1, label: '3 or more times a day' }
    ]
  },
  {
    id: 'q5',
    text: 'How would you rate your asthma control during the past 4 weeks?',
    options: [
      { value: 5, label: 'Completely controlled' },
      { value: 4, label: 'Well controlled' },
      { value: 3, label: 'Somewhat controlled' },
      { value: 2, label: 'Poorly controlled' },
      { value: 1, label: 'Not controlled at all' }
    ]
  }
];

const ACTCalculator = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
  };

  const getScoreInterpretation = (score) => {
    if (score >= 25) return {
      status: 'Well Controlled',
      color: CLINICAL_THEME.success,
      advice: 'Asthma appears to be under control. Continue current management plan. Schedule routine follow-up.'
    };
    if (score >= 20) return {
      status: 'Reasonably Controlled',
      color: CLINICAL_THEME.warning,
      advice: 'Consider reviewing current management plan. May benefit from treatment adjustment.'
    };
    return {
      status: 'Poor Control',
      color: CLINICAL_THEME.danger,
      advice: 'Urgent review of management plan recommended. Schedule follow-up appointment.'
    };
  };

  const Question = ({ question, index }) => (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>Q{index + 1}</Text>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.option,
              answers[question.id] === option.value && styles.selectedOption
            ]}
            onPress={() => setAnswers(prev => ({ ...prev, [question.id]: option.value }))}
          >
            <Text style={[
              styles.optionText,
              answers[question.id] === option.value && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Asthma Control Test™</Text>
          <Text style={styles.subtitle}>Clinical Assessment Tool</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Clinical Guidance</Text>
          <Text style={styles.infoText}>
            • Assessment period: Past 4 weeks{'\n'}
            • Use for monitoring asthma control{'\n'}
            • Validated for ages 12 and above{'\n'}
            • Consider in conjunction with lung function tests
          </Text>
        </View>

        {QUESTIONS.map((question, index) => (
          <Question key={question.id} question={question} index={index} />
        ))}

        <TouchableOpacity
          style={[
            styles.calculateButton,
            Object.keys(answers).length !== 5 && styles.calculateButtonDisabled
          ]}
          onPress={calculateScore}
          disabled={Object.keys(answers).length !== 5}
        >
          <Text style={styles.calculateButtonText}>
            Calculate ACT Score
          </Text>
        </TouchableOpacity>

        {score !== null && (
          <View style={styles.resultSection}>
            <View style={[
              styles.scoreCard,
              { borderLeftColor: getScoreInterpretation(score).color }
            ]}>
              <Text style={styles.scoreTitle}>ACT Score</Text>
              <Text style={styles.scoreValue}>{score}/25</Text>
              <Text style={[
                styles.scoreStatus,
                { color: getScoreInterpretation(score).color }
              ]}>
                {getScoreInterpretation(score).status}
              </Text>
            </View>

            <View style={styles.clinicalAdvice}>
              <Text style={styles.adviceTitle}>Clinical Recommendations</Text>
              <Text style={styles.adviceText}>
                {getScoreInterpretation(score).advice}
              </Text>
            </View>

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                This tool is intended to support clinical decision-making and should be used in conjunction with other clinical assessments. Results should be documented in the patient's medical record.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLINICAL_THEME.background,
  },
  header: {
    padding: 20,
    backgroundColor: CLINICAL_THEME.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CLINICAL_THEME.background,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: CLINICAL_THEME.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  infoCard: {
    margin: 15,
    padding: 15,
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: CLINICAL_THEME.secondary,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CLINICAL_THEME.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: CLINICAL_THEME.textLight,
    lineHeight: 20,
  },
  questionCard: {
    margin: 15,
    padding: 15,
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CLINICAL_THEME.border,
  },
  questionHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CLINICAL_THEME.primary,
    marginRight: 10,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    color: CLINICAL_THEME.text,
    lineHeight: 22,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: CLINICAL_THEME.background,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CLINICAL_THEME.border,
  },
  selectedOption: {
    backgroundColor: CLINICAL_THEME.primary,
    borderColor: CLINICAL_THEME.primary,
  },
  optionText: {
    fontSize: 15,
    color: CLINICAL_THEME.text,
  },
  selectedOptionText: {
    color: CLINICAL_THEME.background,
    fontWeight: '500',
  },
  calculateButton: {
    margin: 15,
    padding: 16,
    backgroundColor: CLINICAL_THEME.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  calculateButtonDisabled: {
    opacity: 0.5,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CLINICAL_THEME.background,
  },
  resultSection: {
    margin: 15,
  },
  scoreCard: {
    padding: 20,
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 8,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    color: CLINICAL_THEME.textLight,
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: CLINICAL_THEME.text,
    marginBottom: 5,
  },
  scoreStatus: {
    fontSize: 18,
    fontWeight: '600',
  },
  clinicalAdvice: {
    marginTop: 15,
    padding: 15,
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 8,
  },
  adviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CLINICAL_THEME.text,
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 14,
    color: CLINICAL_THEME.textLight,
    lineHeight: 20,
  },
  disclaimer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: CLINICAL_THEME.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CLINICAL_THEME.border,
  },
  disclaimerText: {
    fontSize: 12,
    color: CLINICAL_THEME.textLight,
    fontStyle: 'italic',
  },
});

export default ACTCalculator;