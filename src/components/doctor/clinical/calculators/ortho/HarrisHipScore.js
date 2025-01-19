import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const HarrisHipScore = () => {
  const [pain, setPain] = useState("");
  const [functionScore, setFunctionScore] = useState("");
  const [rangeOfMotion, setRangeOfMotion] = useState("");
  const [totalScore, setTotalScore] = useState(null);

  // Handle input changes and validation
  const validateInput = (value, max) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= max)) {
      return value;
    } else {
      Alert.alert("Invalid Input", `Value must be between 0 and ${max}.`);
      return "";
    }
  };

  const handlePainChange = (value) => setPain(validateInput(value, 44));
  const handleFunctionChange = (value) => setFunctionScore(validateInput(value, 47));
  const handleRangeOfMotionChange = (value) => setRangeOfMotion(validateInput(value, 5));

  // Calculate the Harris Hip Score
  const calculateHarrisHipScore = () => {
    const painScore = Number(pain) || 0;
    const functionValue = Number(functionScore) || 0;
    const romScore = Number(rangeOfMotion) || 0;
    const total = painScore + functionValue + romScore;
    setTotalScore(total);
  };

  // Reset all values
  const resetScores = () => {
    setPain("");
    setFunctionScore("");
    setRangeOfMotion("");
    setTotalScore(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Harris Hip Score Calculator</Text>
      <Text style={styles.description}>
        The Harris Hip Score is used to assess the outcomes of hip surgeries or treatments. Enter the scores for each category below.
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Pain (0-44)"
        value={pain.toString()}
        onChangeText={handlePainChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Function (0-47)"
        value={functionScore.toString()}
        onChangeText={handleFunctionChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        placeholder="Range of Motion (0-5)"
        value={rangeOfMotion.toString()}
        onChangeText={handleRangeOfMotionChange}
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={calculateHarrisHipScore}>
        <Text style={styles.buttonText}>Calculate Score</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetScores}>
        <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
      </TouchableOpacity>

      {/* Result Display */}
      {totalScore !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Harris Hip Score: {totalScore}</Text>
          <Text style={styles.resultInfo}>
            - 90-100: Excellent{"\n"}
            - 80-89: Good{"\n"}
            - 70-79: Fair{"\n"}
            - below 70: Poor
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

export default HarrisHipScore;
