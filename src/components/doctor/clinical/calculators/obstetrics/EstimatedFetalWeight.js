import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const EstimatedFetalWeight = () => {
  const [biparietalDiameter, setBiparietalDiameter] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [abdominalCircumference, setAbdominalCircumference] = useState("");
  const [femurLength, setFemurLength] = useState("");
  const [efw, setEfw] = useState(null);

  const calculateEFW = () => {
    const bpd = parseFloat(biparietalDiameter);
    const hc = parseFloat(headCircumference);
    const ac = parseFloat(abdominalCircumference);
    const fl = parseFloat(femurLength);

    // Validate inputs
    if (isNaN(bpd) || isNaN(hc) || isNaN(ac) || isNaN(fl)) {
      Alert.alert("Invalid Input", "Please enter valid numeric values for all parameters.");
      return;
    }

    // Hadlock's formula: log10(EFW) = 1.3596 + (0.0016 × BPD) + (0.0424 × AC) + (0.174 × FL) + (0.0067 × HC)
    const logEfw = 1.3596 + 0.0016 * bpd + 0.0424 * ac + 0.174 * fl + 0.0067 * hc;
    const efwValue = Math.pow(10, logEfw); // Convert log10 to grams
    setEfw(efwValue.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Fetal Weight (EFW)</Text>

      {/* Input for Biparietal Diameter */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Biparietal Diameter (mm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={biparietalDiameter}
          onChangeText={(value) => setBiparietalDiameter(value)}
          placeholder="Enter BPD"
        />
      </View>

      {/* Input for Head Circumference */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Head Circumference (mm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={headCircumference}
          onChangeText={(value) => setHeadCircumference(value)}
          placeholder="Enter HC"
        />
      </View>

      {/* Input for Abdominal Circumference */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Abdominal Circumference (mm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={abdominalCircumference}
          onChangeText={(value) => setAbdominalCircumference(value)}
          placeholder="Enter AC"
        />
      </View>

      {/* Input for Femur Length */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Femur Length (mm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={femurLength}
          onChangeText={(value) => setFemurLength(value)}
          placeholder="Enter FL"
        />
      </View>

      {/* Calculate Button */}
      <Button title="Calculate EFW" onPress={calculateEFW} />

      {/* Display the result */}
      {efw && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Estimated Fetal Weight (EFW): {efw} grams
          </Text>
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

export default EstimatedFetalWeight;
