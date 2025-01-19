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

const ConstantMurleyScore = () => {
  const [pain, setPain] = useState("");
  const [functionScore, setFunctionScore] = useState("");
  const [activeMotion, setActiveMotion] = useState("");
  const [totalScore, setTotalScore] = useState(null);

  const validateInput = (value, max) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= max)) {
      return value;
    } else {
      Alert.alert("Invalid Input", `Value must be between 0 and ${max}.`);
      return "";
    }
  };

  const handlePainChange = (value) => setPain(validateInput(value, 15));
  const handleFunctionChange = (value) => setFunctionScore(validateInput(value, 35));
  const handleActiveMotionChange = (value) => setActiveMotion(validateInput(value, 20));

  const calculateConstantMurleyScore = () => {
    const painValue = Number(pain) || 0;
    const functionValue = Number(functionScore) || 0;
    const activeMotionValue = Number(activeMotion) || 0;

    if (painValue < 0 || functionValue < 0 || activeMotionValue < 0) {
      setTotalScore("Invalid input. Please enter positive numbers.");
      return;
    }

    const total = painValue + functionValue + activeMotionValue;
    setTotalScore(total);
  };

  const resetScores = () => {
    setPain("");
    setFunctionScore("");
    setActiveMotion("");
    setTotalScore(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Constant-Murley Shoulder Score</Text>
      <Text style={styles.description}>
        Use this tool to calculate the Constant-Murley Shoulder Score. Enter values for each category below.
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Pain Score (0-15)"
        value={pain.toString()}
        onChangeText={handlePainChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Function Score (0-35)"
        value={functionScore.toString()}
        onChangeText={handleFunctionChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Active Motion Score (0-20)"
        value={activeMotion.toString()}
        onChangeText={handleActiveMotionChange}
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={calculateConstantMurleyScore}>
        <Text style={styles.buttonText}>Calculate Score</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetScores}>
        <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
      </TouchableOpacity>

      {/* Result Display */}
      {totalScore !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Constant-Murley Score: {totalScore}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F4F6F9",
    flexGrow: 1,
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
  },
});

export default ConstantMurleyScore;
