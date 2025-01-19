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

export const GAD7 = () => {
  const [responses, setResponses] = useState(Array(7).fill(null));
  const [showGuide, setShowGuide] = useState(false);

  const totalScore = responses.reduce((a, b) => a + (b || 0), 0);

  const getSeverity = () => {
    if (totalScore >= 15) return { text: "Severe anxiety", color: '#DC2626' };
    if (totalScore >= 10) return { text: "Moderate anxiety", color: '#EA580C' };
    if (totalScore >= 5) return { text: "Mild anxiety", color: '#78716C' };
    return { text: "Minimal anxiety", color: '#047857' };
  };

  const questions = [
    {
      text: "Feeling nervous, anxious, or on edge",
      clinical: "Assesses general anxiety symptoms"
    },
    {
      text: "Not being able to stop or control worrying",
      clinical: "Evaluates worry control"
    },
    {
      text: "Worrying too much about different things",
      clinical: "Measures worry generalization"
    },
    {
      text: "Trouble relaxing",
      clinical: "Assesses physical tension"
    },
    {
      text: "Being so restless that it's hard to sit still",
      clinical: "Evaluates psychomotor agitation"
    },
    {
      text: "Becoming easily annoyed or irritable",
      clinical: "Measures irritability"
    },
    {
      text: "Feeling afraid as if something awful might happen",
      clinical: "Assesses anticipatory anxiety"
    }
  ];

  const frequencyOptions = [
    { text: "Not at all", value: 0, color: '#047857' },
    { text: "Several days", value: 1, color: '#78716C' },
    { text: "More than half the days", value: 2, color: '#EA580C' },
    { text: "Nearly every day", value: 3, color: '#DC2626' }
  ];

  const handleResponse = (questionIndex, value) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = value;
    setResponses(newResponses);

    if (totalScore >= 15) {
      Alert.alert(
        "⚠️ High Anxiety Score Alert",
        "Patient shows signs of severe anxiety. Consider immediate clinical assessment.",
        [{ text: "Acknowledge", style: "cancel" }]
      );
    }
  };

  const renderQuestion = (question, index) => (
    <View key={index} style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionNumber}>Q{index + 1}</Text>
        <View style={styles.questionTextContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
          <Text style={styles.clinicalNote}>{question.clinical}</Text>
        </View>
      </View>
      <View style={styles.optionsGrid}>
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
            <Text style={[
              styles.optionScore,
              responses[index] === option.value && styles.selectedOptionText
            ]}>
              {option.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const severity = getSeverity();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>GAD-7 Anxiety Assessment</Text>
          <Text style={styles.subtitle}>
            Assessment period: Past 2 weeks
          </Text>
        </View>

        <View style={styles.questionsContainer}>
          {questions.map((question, index) => renderQuestion(question, index))}
        </View>

        <View style={[styles.scoreContainer, { backgroundColor: severity.color + '20' }]}>
          <Text style={styles.scoreText}>Total Score: {totalScore}/21</Text>
          <Text style={[styles.severityText, { color: severity.color }]}>
            {severity.text}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.guideButton}
          onPress={() => setShowGuide(!showGuide)}
        >
          <Text style={styles.guideButtonText}>
            {showGuide ? "Hide Clinical Guide" : "Show Clinical Guide"}
          </Text>
        </TouchableOpacity>

        {showGuide && (
          <View style={styles.guideContainer}>
            <Text style={styles.guideTitle}>Clinical Interpretation Guide</Text>
            
            <View style={styles.guideSection}>
              <Text style={styles.guideSectionTitle}>Score Interpretation:</Text>
              <View style={styles.guideContent}>
                <Text style={styles.guideText}>• 0-4: Minimal anxiety</Text>
                <Text style={styles.guideText}>• 5-9: Mild anxiety - Monitor</Text>
                <Text style={styles.guideText}>• 10-14: Moderate anxiety - Possible clinically significant condition</Text>
                <Text style={styles.guideText}>• ≥15: Severe anxiety - Active treatment warranted</Text>
              </View>
            </View>

            <View style={styles.guideSection}>
              <Text style={styles.guideSectionTitle}>Critical Actions:</Text>
              <View style={styles.guideContent}>
                <Text style={styles.guideText}>• Score ≥10: Consider referral to mental health professional</Text>
                <Text style={styles.guideText}>• Rule out medical causes (thyroid, cardiac, etc.)</Text>
                <Text style={styles.guideText}>• For Panic Disorder, Social Phobia, & PTSD: Consider using 8 as cutoff</Text>
                <Text style={styles.guideText}>• Conduct comprehensive mental status examination</Text>
              </View>
            </View>

            <View style={styles.guideSection}>
              <Text style={styles.guideSectionTitle}>Management Guidelines:</Text>
              <View style={styles.guideContent}>
                <Text style={styles.guideText}>• Mild: Monitor and reassess at follow-up</Text>
                <Text style={styles.guideText}>• Moderate: Consider psychotherapy or medication</Text>
                <Text style={styles.guideText}>• Severe: Active treatment with combined approach recommended</Text>
              </View>
            </View>
          </View>
        )}

        <Text style={styles.disclaimer}>
          For clinical use only. Final diagnosis requires comprehensive evaluation.
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
  clinicalNote: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    fontStyle: 'italic',
  },
  optionsGrid: {
    marginTop: 8,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  optionScore: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  scoreContainer: {
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
  guideButton: {
    backgroundColor: '#1E293B',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  guideButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  guideContainer: {
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
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  guideSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  guideSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  guideContent: {
    paddingLeft: 8,
  },
  guideText: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 6,
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