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

const JointReplacementRiskCalculator = () => {
  const [age, setAge] = useState("");
  const [comorbidities, setComorbidities] = useState("");
  const [previousSurgeries, setPreviousSurgeries] = useState("");
  const [risk, setRisk] = useState(null);

  const validateInput = (value) => {
    if (value === "" || Number(value) >= 0) {
      return value;
    } else {
      Alert.alert("Invalid Input", "Value must be a positive number.");
      return "";
    }
  };

  const handleAgeChange = (value) => setAge(validateInput(value));
  const handleComorbiditiesChange = (value) => setComorbidities(validateInput(value));
  const handlePreviousSurgeriesChange = (value) => setPreviousSurgeries(validateInput(value));

  const calculateJointReplacementRisk = () => {
    const ageValue = Number(age) || 0;
    const comorbiditiesValue = Number(comorbidities) || 0;
    const previousSurgeriesValue = Number(previousSurgeries) || 0;

    if (ageValue < 0 || comorbiditiesValue < 0 || previousSurgeriesValue < 0) {
      setRisk("Invalid input. Please enter positive numbers.");
      return;
    }

    const calculatedRisk = (ageValue + comorbiditiesValue + previousSurgeriesValue) / 10;
    setRisk((calculatedRisk * 100).toFixed(2)); // Risk as a percentage
  };

  const resetInputs = () => {
    setAge("");
    setComorbidities("");
    setPreviousSurgeries("");
    setRisk(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Joint Replacement Risk Calculator</Text>
      <Text style={styles.description}>
        Enter the following values to calculate the risk of joint replacement surgery.
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Age"
        value={age.toString()}
        onChangeText={handleAgeChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Comorbidities (count)"
        value={comorbidities.toString()}
        onChangeText={handleComorbiditiesChange}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Previous Surgeries (count)"
        value={previousSurgeries.toString()}
        onChangeText={handlePreviousSurgeriesChange}
      />

      <TouchableOpacity style={styles.button} onPress={calculateJointReplacementRisk}>
        <Text style={styles.buttonText}>Calculate Risk</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetInputs}>
        <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
      </TouchableOpacity>

      {risk !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Joint Replacement Risk: {risk}%</Text>
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

export default JointReplacementRiskCalculator;
