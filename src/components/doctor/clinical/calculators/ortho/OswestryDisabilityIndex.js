import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const OswestryDisabilityIndex = () => {
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [oswestryScore, setOswestryScore] = useState(null);

  // Handle score input
  const handleScoreChange = (index, value) => {
    const newAnswers = [...answers];
    if (value === "" || (Number(value) >= 0 && Number(value) <= 5)) {
      newAnswers[index] = value;
    } else {
      Alert.alert("Invalid Input", "Score must be between 0 and 5.");
    }
    setAnswers(newAnswers);
  };

  // Calculate Oswestry Disability Index
  const calculateOswestry = () => {
    const totalScore = answers.reduce((sum, score) => sum + (Number(score) || 0), 0);
    const percentage = ((totalScore / 50) * 100).toFixed(2); // Maximum score is 50
    setOswestryScore(percentage);
  };

  // Reset answers
  const resetAnswers = () => {
    setAnswers(Array(10).fill(""));
    setOswestryScore(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Oswestry Disability Index Calculator</Text>
      <Text style={styles.description}>
        The Oswestry Disability Index (ODI) is used to measure a patient's
        level of disability in performing daily activities due to back pain.
        Please input a score (0-5) for each question.
      </Text>

      {answers.map((answer, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          placeholder={`Question ${index + 1}`}
          value={answer.toString()}
          onChangeText={(value) => handleScoreChange(index, value)}
        />
      ))}

      {/* Calculate Button */}
      <TouchableOpacity style={styles.button} onPress={calculateOswestry}>
        <Text style={styles.buttonText}>Calculate ODI Score</Text>
      </TouchableOpacity>

      {/* Reset Button */}
      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetAnswers}>
        <Text style={[styles.buttonText, styles.resetButtonText]}>Reset Answers</Text>
      </TouchableOpacity>

      {/* Result Display */}
      {oswestryScore !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Oswestry Disability Index Score: {oswestryScore}%</Text>
          <Text style={styles.resultInfo}>
            - 0-20%: Minimal disability{"\n"}
            - 21-40%: Moderate disability{"\n"}
            - 41-60%: Severe disability{"\n"}
            - 61-80%: Crippling disability{"\n"}
            - 81-100%: Bed-bound or exaggerated symptoms
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F4F6F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002432",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  button: {
    backgroundColor: "#27C7B8",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    backgroundColor: "#F78837",
    marginTop: 8,
  },
  resetButtonText: {
    color: "#FFFFFF",
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3052",
    textAlign: "center",
    marginBottom: 8,
  },
  resultInfo: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default OswestryDisabilityIndex;
