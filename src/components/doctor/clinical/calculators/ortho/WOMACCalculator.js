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

const WOMACCalculator = () => {
  const [scores, setScores] = useState(Array(24).fill(""));
  const [result, setResult] = useState(null);

  // Handle score input
  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    if (value === "" || (Number(value) >= 0 && Number(value) <= 4)) {
      newScores[index] = value;
    } else {
      Alert.alert("Invalid Input", "Score must be between 0 and 4.");
    }
    setScores(newScores);
  };

  // Calculate WOMAC Score (percentage)
  const calculateWOMAC = () => {
    const totalScore = scores.reduce((sum, score) => sum + (Number(score) || 0), 0);
    const scorePercentage = ((totalScore / 120) * 100).toFixed(2); // Max score is 120
    setResult(scorePercentage);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>WOMAC Index Calculator</Text>
      <Text style={styles.description}>
        The WOMAC Index assesses pain, stiffness, and physical function in patients with osteoarthritis. Please input scores (0-4) for each question.
      </Text>

      {/* Pain Section */}
      <Text style={styles.sectionHeader}>Pain (Questions 1-5)</Text>
      {scores.slice(0, 5).map((score, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          placeholder={`Question ${index + 1}`}
          value={score.toString()}
          onChangeText={(value) => handleScoreChange(index, value)}
        />
      ))}

      {/* Stiffness Section */}
      <Text style={styles.sectionHeader}>Stiffness (Questions 6-8)</Text>
      {scores.slice(5, 8).map((score, index) => (
        <TextInput
          key={index + 5}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          placeholder={`Question ${index + 6}`}
          value={score.toString()}
          onChangeText={(value) => handleScoreChange(index + 5, value)}
        />
      ))}

      {/* Physical Function Section */}
      <Text style={styles.sectionHeader}>Physical Function (Questions 9-24)</Text>
      {scores.slice(8).map((score, index) => (
        <TextInput
          key={index + 8}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          placeholder={`Question ${index + 9}`}
          value={score.toString()}
          onChangeText={(value) => handleScoreChange(index + 8, value)}
        />
      ))}

      {/* Calculate Button */}
      <TouchableOpacity style={styles.button} onPress={calculateWOMAC}>
        <Text style={styles.buttonText}>Calculate WOMAC Score</Text>
      </TouchableOpacity>

      {/* Result Display */}
      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>WOMAC Score: {result}%</Text>
          <Text style={styles.resultInfo}>
            - Higher scores indicate worse symptoms.{"\n"}
            - Use this score to track patient progress or assess treatment effectiveness.
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E3052",
    marginTop: 16,
    marginBottom: 8,
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

export default WOMACCalculator;
