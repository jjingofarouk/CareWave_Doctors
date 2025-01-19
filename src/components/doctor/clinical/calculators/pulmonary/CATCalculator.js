import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const CATCalculator = () => {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
    question6: null,
    question7: null,
    question8: null,
  });

  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  const calculateCATScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + (value || 0), 0);

    if (Object.values(answers).some((value) => value === null)) {
      Alert.alert(
        "Incomplete Assessment",
        "Please ensure all questions are answered to generate an accurate assessment.",
        [{ text: "OK" }]
      );
      return;
    }

    setScore(totalScore);
    setResult(getCATInterpretation(totalScore));
  };

  const getCATInterpretation = (score) => {
    if (score <= 10) {
      return {
        impact: "Low impact",
        description: "Mild impact of COPD on daily life. Continue current management and monitoring.",
        recommendation: "Consider bronchodilator therapy. Ensure preventive care is up to date.",
        color: "#4CAF50"
      };
    }
    if (score <= 20) {
      return {
        impact: "Medium impact",
        description: "Moderate impact of COPD on quality of life. May need treatment adjustment.",
        recommendation: "Consider LABA/LAMA combination therapy. Review inhaler technique.",
        color: "#FFA726"
      };
    }
    if (score <= 30) {
      return {
        impact: "High impact",
        description: "Severe impact on daily activities. Treatment optimization recommended.",
        recommendation: "Consider triple therapy. Evaluate for comorbidities.",
        color: "#F44336"
      };
    }
    return {
      impact: "Very high impact",
      description: "Very severe impact on quality of life. Urgent medical attention needed.",
      recommendation: "Immediate specialist referral. Consider hospitalization if acute exacerbation.",
      color: "#D32F2F"
    };
  };

  const questions = [
    {
      text: "Cough",
      description: "I never cough (0) → I cough all the time (5)",
      detail: "Consider frequency, severity, and impact on daily activities"
    },
    {
      text: "Phlegm",
      description: "I have no phlegm in my chest (0) → My chest is completely full of phlegm (5)",
      detail: "Consider color, amount, and consistency of phlegm"
    },
    {
      text: "Chest Tightness",
      description: "My chest does not feel tight (0) → My chest feels very tight (5)",
      detail: "Consider frequency and severity of chest tightness"
    },
    {
      text: "Breathlessness",
      description: "Not breathless climbing stairs (0) → Very breathless climbing stairs (5)",
      detail: "Consider impact on daily activities and exercise tolerance"
    },
    {
      text: "Activity Limitation",
      description: "Not limited in activities (0) → Very limited in activities (5)",
      detail: "Consider impact on household tasks and social activities"
    },
    {
      text: "Confidence",
      description: "Confident leaving home (0) → Not confident leaving home (5)",
      detail: "Consider impact on independence and social interactions"
    },
    {
      text: "Sleep",
      description: "I sleep soundly (0) → I don't sleep soundly due to my condition (5)",
      detail: "Consider quality of sleep and nighttime symptoms"
    },
    {
      text: "Energy",
      description: "I have lots of energy (0) → I have no energy at all (5)",
      detail: "Consider impact on daily energy levels and fatigue"
    }
  ];

  const renderScaleOption = (question, value) => {
    const isSelected = answers[question] === value;
    return (
      <TouchableOpacity
        key={`${question}-${value}`}
        style={[
          styles.scaleOption,
          isSelected && { backgroundColor: "#007AFF", borderColor: "#007AFF" }
        ]}
        onPress={() => setAnswers(prev => ({ ...prev, [question]: value }))}
      >
        <Text style={[styles.scaleText, isSelected && { color: "#FFFFFF" }]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>COPD Assessment Test (CAT)</Text>
          <Text style={styles.subtitle}>
            Evaluate the impact of COPD on patient's health status
          </Text>
        </View>

        {questions.map((q, index) => (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.questionTitle}>{q.text}</Text>
            <Text style={styles.questionDescription}>{q.description}</Text>
            <Text style={styles.questionDetail}>{q.detail}</Text>
            
            <View style={styles.scaleContainer}>
              {[0, 1, 2, 3, 4, 5].map(value => 
                renderScaleOption(`question${index + 1}`, value)
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateCATScore}
        >
          <LinearGradient
            colors={["#007AFF", "#0055FF"]}
            style={styles.gradient}
          >
            <Text style={styles.calculateButtonText}>
              Generate Assessment
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {result && (
          <View style={[styles.resultCard, { borderLeftColor: result.color }]}>
            <Text style={styles.resultTitle}>Assessment Results</Text>
            <Text style={[styles.resultScore, { color: result.color }]}>
              CAT Score: {score}
            </Text>
            <Text style={styles.resultImpact}>{result.impact}</Text>
            <Text style={styles.resultDescription}>{result.description}</Text>
            <Text style={styles.resultRecommendation}>
              Recommendation: {result.recommendation}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  questionDescription: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 8,
  },
  questionDetail: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
    marginBottom: 16,
  },
  scaleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  scaleOption: {
    width: width / 8,
    height: width / 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D1D6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  scaleText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  calculateButton: {
    margin: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    padding: 16,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  resultScore: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultImpact: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 12,
    lineHeight: 24,
  },
  resultRecommendation: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "500",
    backgroundColor: "#F5F6F7",
    padding: 12,
    borderRadius: 8,
    lineHeight: 24,
  },
});

export default CATCalculator;