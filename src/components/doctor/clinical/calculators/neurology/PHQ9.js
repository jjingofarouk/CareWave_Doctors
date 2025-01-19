import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';

export const PHQ9 = () => {
  const [responses, setResponses] = useState(Array(9).fill(null));
  const [showInterpretation, setShowInterpretation] = useState(false);

  const totalScore = responses.reduce((a, b) => a + (b || 0), 0);

  const getSeverity = () => {
    if (totalScore >= 20) return { text: "Severe depression", color: '#DC2626' };
    if (totalScore >= 15) return { text: "Moderately severe depression", color: '#EA580C' };
    if (totalScore >= 10) return { text: "Moderate depression", color: '#D97706' };
    if (totalScore >= 5) return { text: "Mild depression", color: '#78716C' };
    return { text: "Minimal depression", color: '#047857' };
  };

  const handleResponse = (questionIndex, value) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);
    
    // Alert for suicide risk
    if (questionIndex === 8 && value >= 1) {
      Alert.alert(
        "⚠️ Suicide Risk Alert",
        "Patient has indicated thoughts of self-harm or suicide. Immediate clinical assessment is recommended.",
        [{ text: "Acknowledge", style: "cancel" }]
      );
    }
  };

  const questions = [
    {
      text: "Little interest or pleasure in doing things?",
      subtext: "Anhedonia assessment"
    },
    {
      text: "Feeling down, depressed, or hopeless?",
      subtext: "Mood evaluation"
    },
    {
      text: "Trouble falling or staying asleep, or sleeping too much?",
      subtext: "Sleep patterns"
    },
    {
      text: "Feeling tired or having little energy?",
      subtext: "Energy levels"
    },
    {
      text: "Poor appetite or overeating?",
      subtext: "Eating patterns"
    },
    {
      text: "Feeling bad about yourself — or that you are a failure?",
      subtext: "Self-worth assessment"
    },
    {
      text: "Trouble concentrating on things?",
      subtext: "Cognitive function"
    },
    {
      text: "Moving or speaking very slowly or being fidgety/restless?",
      subtext: "Psychomotor observation"
    },
    {
      text: "Thoughts of being better off dead or hurting yourself?",
      subtext: "Suicide risk assessment"
    }
  ];

  const frequencyOptions = [
    { text: "Not at all", value: 0, color: '#047857' },
    { text: "Several days", value: 1, color: '#78716C' },
    { text: "More than half the days", value: 2, color: '#EA580C' },
    { text: "Nearly every day", value: 3, color: '#DC2626' }
  ];

  const renderQuestion = (question, index) => (
    <View key={index} style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>Q{index + 1}</Text>
        <View style={styles.questionTextContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
          <Text style={styles.subtext}>{question.subtext}</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {frequencyOptions.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={[
              styles.optionButton,
              responses[index] === option.value && {
                backgroundColor: option.color,
                borderColor: option.color,
              },
            ]}
            onPress={() => handleResponse(index, option.value)}
          >
            <Text style={[
              styles.optionText,
              responses[index] === option.value && styles.selectedOptionText
            ]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const severity = getSeverity();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>PHQ-9 Depression Screening</Text>
          <Text style={styles.subtitle}>
            Patient assessment for the past 2 weeks
          </Text>
        </View>

        <View style={styles.questionsContainer}>
          {questions.map((question, index) => renderQuestion(question, index))}
        </View>

        <View style={[styles.resultContainer, { backgroundColor: severity.color + '20' }]}>
          <Text style={styles.scoreText}>Total Score: {totalScore}/27</Text>
          <Text style={[styles.severityText, { color: severity.color }]}>
            {severity.text}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.interpretationButton}
          onPress={() => setShowInterpretation(!showInterpretation)}
        >
          <Text style={styles.interpretationButtonText}>
            {showInterpretation ? "Hide Clinical Guide" : "Show Clinical Guide"}
          </Text>
        </TouchableOpacity>

        {showInterpretation && (
          <View style={styles.interpretationContainer}>
            <Text style={styles.interpretationTitle}>Clinical Action Guide</Text>
            <View style={styles.interpretationContent}>
              <Text style={styles.interpretationSubtitle}>Score Interpretation:</Text>
              <Text style={styles.interpretationText}>• 0-4: Monitor; may not require treatment</Text>
              <Text style={styles.interpretationText}>• 5-9: Mild symptoms; use clinical judgment</Text>
              <Text style={styles.interpretationText}>• 10-14: Consider active treatment</Text>
              <Text style={styles.interpretationText}>• 15-19: Active treatment needed</Text>
              <Text style={styles.interpretationText}>• 20-27: Urgent intervention required</Text>
              
              <Text style={[styles.interpretationSubtitle, styles.marginTop]}>
                Required Actions:
              </Text>
              <Text style={styles.interpretationText}>• Conduct suicide risk assessment for positive response to Q9</Text>
              <Text style={styles.interpretationText}>• Screen for bipolar disorder</Text>
              <Text style={styles.interpretationText}>• Assess for medical causes of depression</Text>
              <Text style={styles.interpretationText}>• Consider referral to mental health specialist for scores ≥15</Text>
            </View>
          </View>
        )}

        <Text style={styles.disclaimer}>
          For clinical use only. Final diagnosis should be based on comprehensive evaluation.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
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
  questionsContainer: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748B',
    marginRight: 12,
    marginTop: 2,
  },
  questionTextContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 22,
    fontWeight: '500',
  },
  subtext: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '500',
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
  severityText: {
    fontSize: 18,
    fontWeight: '600',
  },
  interpretationButton: {
    backgroundColor: '#1E293B',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  interpretationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  interpretationContainer: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  interpretationContent: {
    padding: 16,
  },
  interpretationSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  interpretationText: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 6,
    lineHeight: 22,
  },
  marginTop: {
    marginTop: 16,
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