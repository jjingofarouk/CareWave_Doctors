import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const PreeclampsiaRisk = () => {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [hasHistory, setHasHistory] = useState(false);
  const [multiplePregnancy, setMultiplePregnancy] = useState(false);
  const [risk, setRisk] = useState(null);

  const calculateRisk = () => {
    const parsedAge = parseFloat(age);
    const parsedBmi = parseFloat(bmi);
    const parsedSystolicBP = parseFloat(systolicBP);
    const parsedDiastolicBP = parseFloat(diastolicBP);

    // Validate inputs
    if (
      isNaN(parsedAge) ||
      isNaN(parsedBmi) ||
      isNaN(parsedSystolicBP) ||
      isNaN(parsedDiastolicBP)
    ) {
      Alert.alert("Invalid Input", "Please enter valid numeric values for all parameters.");
      return;
    }

    // Risk calculation logic based on some common factors
    let riskScore = 0;

    // Age > 35 years adds risk
    if (parsedAge > 35) riskScore += 2;

    // BMI >= 30 adds risk
    if (parsedBmi >= 30) riskScore += 2;

    // High blood pressure (Systolic >= 140 or Diastolic >= 90) adds risk
    if (parsedSystolicBP >= 140 || parsedDiastolicBP >= 90) riskScore += 3;

    // History of preeclampsia adds risk
    if (hasHistory) riskScore += 4;

    // Multiple pregnancy adds risk
    if (multiplePregnancy) riskScore += 5;

    // Determine risk level
    if (riskScore >= 8) {
      setRisk("High Risk");
    } else if (riskScore >= 4) {
      setRisk("Moderate Risk");
    } else {
      setRisk("Low Risk");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preeclampsia Risk Calculator</Text>

      {/* Input for Age */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age (years):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={(value) => setAge(value)}
          placeholder="Enter age"
        />
      </View>

      {/* Input for BMI */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>BMI (kg/m²):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bmi}
          onChangeText={(value) => setBmi(value)}
          placeholder="Enter BMI"
        />
      </View>

      {/* Input for Systolic Blood Pressure */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Systolic Blood Pressure (mmHg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={systolicBP}
          onChangeText={(value) => setSystolicBP(value)}
          placeholder="Enter systolic BP"
        />
      </View>

      {/* Input for Diastolic Blood Pressure */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Diastolic Blood Pressure (mmHg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={diastolicBP}
          onChangeText={(value) => setDiastolicBP(value)}
          placeholder="Enter diastolic BP"
        />
      </View>

      {/* History of Preeclampsia */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>History of Preeclampsia (Yes/No):</Text>
        <Button
          title={hasHistory ? "Yes" : "No"}
          onPress={() => setHasHistory(!hasHistory)}
          color={hasHistory ? "green" : "gray"}
        />
      </View>

      {/* Multiple Pregnancy */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Multiple Pregnancy (Yes/No):</Text>
        <Button
          title={multiplePregnancy ? "Yes" : "No"}
          onPress={() => setMultiplePregnancy(!multiplePregnancy)}
          color={multiplePregnancy ? "green" : "gray"}
        />
      </View>

      {/* Calculate Button */}
      <Button title="Calculate Risk" onPress={calculateRisk} />

      {/* Display the result */}
      {risk && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Preeclampsia Risk: {risk}</Text>
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

export default PreeclampsiaRisk;
