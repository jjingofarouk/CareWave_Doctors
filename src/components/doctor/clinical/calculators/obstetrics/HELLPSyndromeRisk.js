import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const HELLPSyndromeRisk = () => {
  const [plateletCount, setPlateletCount] = useState("");
  const [astLevel, setAstLevel] = useState("");
  const [altLevel, setAltLevel] = useState("");
  const [ldhLevel, setLdhLevel] = useState("");
  const [risk, setRisk] = useState(null);

  const calculateRisk = () => {
    const parsedPlateletCount = parseFloat(plateletCount);
    const parsedAstLevel = parseFloat(astLevel);
    const parsedAltLevel = parseFloat(altLevel);
    const parsedLdhLevel = parseFloat(ldhLevel);

    // Validate inputs
    if (
      isNaN(parsedPlateletCount) ||
      isNaN(parsedAstLevel) ||
      isNaN(parsedAltLevel) ||
      isNaN(parsedLdhLevel)
    ) {
      Alert.alert("Invalid Input", "Please enter valid numeric values for all parameters.");
      return;
    }

    // Risk calculation logic based on common HELLP syndrome criteria
    let riskScore = 0;

    // Platelet count < 100,000/mm³ adds significant risk
    if (parsedPlateletCount < 100000) riskScore += 3;

    // AST > 70 IU/L or ALT > 70 IU/L adds risk
    if (parsedAstLevel > 70 || parsedAltLevel > 70) riskScore += 2;

    // LDH > 600 IU/L adds risk
    if (parsedLdhLevel > 600) riskScore += 2;

    // Determine risk level
    if (riskScore >= 5) {
      setRisk("High Risk for HELLP Syndrome");
    } else if (riskScore >= 3) {
      setRisk("Moderate Risk for HELLP Syndrome");
    } else {
      setRisk("Low Risk for HELLP Syndrome");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HELLP Syndrome Risk Calculator</Text>

      {/* Input for Platelet Count */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Platelet Count (per mm³):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={plateletCount}
          onChangeText={(value) => setPlateletCount(value)}
          placeholder="Enter platelet count"
        />
      </View>

      {/* Input for AST */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>AST Level (IU/L):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={astLevel}
          onChangeText={(value) => setAstLevel(value)}
          placeholder="Enter AST level"
        />
      </View>

      {/* Input for ALT */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ALT Level (IU/L):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={altLevel}
          onChangeText={(value) => setAltLevel(value)}
          placeholder="Enter ALT level"
        />
      </View>

      {/* Input for LDH */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>LDH Level (IU/L):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={ldhLevel}
          onChangeText={(value) => setLdhLevel(value)}
          placeholder="Enter LDH level"
        />
      </View>

      {/* Calculate Button */}
      <Button title="Calculate Risk" onPress={calculateRisk} />

      {/* Display the result */}
      {risk && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Result: {risk}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HELLPSyndromeRisk;
