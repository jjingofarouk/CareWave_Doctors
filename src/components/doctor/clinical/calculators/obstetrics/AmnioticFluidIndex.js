import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AmnioticFluidIndex = () => {
  const [quadrant1, setQuadrant1] = useState("");
  const [quadrant2, setQuadrant2] = useState("");
  const [quadrant3, setQuadrant3] = useState("");
  const [quadrant4, setQuadrant4] = useState("");
  const [afi, setAfi] = useState(null);
  const [interpretation, setInterpretation] = useState("");

  const calculateAFI = () => {
    const q1 = parseFloat(quadrant1) || 0;
    const q2 = parseFloat(quadrant2) || 0;
    const q3 = parseFloat(quadrant3) || 0;
    const q4 = parseFloat(quadrant4) || 0;

    if (isNaN(q1) || isNaN(q2) || isNaN(q3) || isNaN(q4)) {
      alert("Please enter valid numeric values for all quadrants.");
      return;
    }

    const afiValue = q1 + q2 + q3 + q4;

    setAfi(afiValue);

    if (afiValue < 5) {
      setInterpretation("Oligohydramnios (Low Amniotic Fluid Level)");
    } else if (afiValue >= 5 && afiValue <= 24) {
      setInterpretation("Normal Amniotic Fluid Level");
    } else if (afiValue > 24) {
      setInterpretation("Polyhydramnios (High Amniotic Fluid Level)");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amniotic Fluid Index (AFI)</Text>

      {/* Input for Four Quadrants */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quadrant 1 (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quadrant1}
          onChangeText={(value) => setQuadrant1(value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quadrant 2 (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quadrant2}
          onChangeText={(value) => setQuadrant2(value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quadrant 3 (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quadrant3}
          onChangeText={(value) => setQuadrant3(value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quadrant 4 (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quadrant4}
          onChangeText={(value) => setQuadrant4(value)}
        />
      </View>

      {/* Calculate Button */}
      <Button title="Calculate AFI" onPress={calculateAFI} />

      {/* Result Display */}
      {afi !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Amniotic Fluid Index (AFI): {afi} cm</Text>
          <Text style={styles.interpretation}>{interpretation}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  result: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  interpretation: {
    fontSize: 16,
    color: "#27ae60",
    marginTop: 8,
  },
});

export default AmnioticFluidIndex;
