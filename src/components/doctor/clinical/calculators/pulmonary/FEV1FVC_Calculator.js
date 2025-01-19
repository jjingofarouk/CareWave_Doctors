import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const FEV1FVC_Calculator = () => {
  const [fev1, setFEV1] = useState("");
  const [fvc, setFVC] = useState("");
  const [ratio, setRatio] = useState("");

  const calculateRatio = () => {
    const fev1Value = parseFloat(fev1);
    const fvcValue = parseFloat(fvc);

    if (isNaN(fev1Value) || isNaN(fvcValue)) {
      Alert.alert("Invalid Input", "Please enter valid numeric values for FEV1 and FVC.");
      return;
    }

    if (fvcValue > 0) {
      const result = (fev1Value / fvcValue) * 100;
      setRatio(result.toFixed(2) + "%");
    } else {
      Alert.alert("Error", "FVC must be greater than 0.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FEV1/FVC Ratio Calculator</Text>

      {/* FEV1 Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter FEV1 (L):</Text>
        <TextInput
          style={styles.input}
          value={fev1}
          onChangeText={(value) => setFEV1(value)}
          placeholder="e.g., 2.5"
          keyboardType="numeric"
        />
      </View>

      {/* FVC Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter FVC (L):</Text>
        <TextInput
          style={styles.input}
          value={fvc}
          onChangeText={(value) => setFVC(value)}
          placeholder="e.g., 3.0"
          keyboardType="numeric"
        />
      </View>

      {/* Calculate Button */}
      <TouchableOpacity style={styles.button} onPress={calculateRatio}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {/* Display Result */}
      {ratio ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>FEV1/FVC Ratio: {ratio}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
  },
});

export default FEV1FVC_Calculator;
