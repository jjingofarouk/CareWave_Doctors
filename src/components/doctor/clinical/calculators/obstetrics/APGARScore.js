import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const APGARScore = () => {
  const [heartRate, setHeartRate] = useState(""); // Heart Rate
  const [respiration, setRespiration] = useState(""); // Respiration
  const [muscleTone, setMuscleTone] = useState(""); // Muscle Tone
  const [reflexResponse, setReflexResponse] = useState(""); // Reflex Response
  const [color, setColor] = useState(""); // Skin Color
  const [score, setScore] = useState(null); // APGAR Score

  const calculateAPGAR = () => {
    // Parse input values
    const hr = parseInt(heartRate) || 0;
    const resp = parseInt(respiration) || 0;
    const muscle = parseInt(muscleTone) || 0;
    const reflex = parseInt(reflexResponse) || 0;
    const skinColor = parseInt(color) || 0;

    // Validate inputs (scores between 0 and 2 for each field)
    if (
      [hr, resp, muscle, reflex, skinColor].some(
        (value) => value < 0 || value > 2
      )
    ) {
      alert("Each category must have a score between 0 and 2.");
      return;
    }

    // Calculate total score
    const totalScore = hr + resp + muscle + reflex + skinColor;
    setScore(totalScore);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APGAR Score Calculator</Text>

      {/* Input for Heart Rate */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Heart Rate (0-2):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Heart Rate Score"
          value={heartRate}
          onChangeText={(value) => setHeartRate(value)}
        />
      </View>

      {/* Input for Respiration */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Respiration (0-2):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Respiration Score"
          value={respiration}
          onChangeText={(value) => setRespiration(value)}
        />
      </View>

      {/* Input for Muscle Tone */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Muscle Tone (0-2):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Muscle Tone Score"
          value={muscleTone}
          onChangeText={(value) => setMuscleTone(value)}
        />
      </View>

      {/* Input for Reflex Response */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reflex Response (0-2):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Reflex Response Score"
          value={reflexResponse}
          onChangeText={(value) => setReflexResponse(value)}
        />
      </View>

      {/* Input for Skin Color */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Skin Color (0-2):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Skin Color Score"
          value={color}
          onChangeText={(value) => setColor(value)}
        />
      </View>

      {/* Calculate Button */}
      <Button title="Calculate APGAR Score" onPress={calculateAPGAR} />

      {/* Result */}
      {score !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>APGAR Score: {score}</Text>
          <Text style={styles.interpretation}>
            {score >= 7
              ? "Normal (Healthy)"
              : score >= 4
              ? "Moderately Depressed"
              : "Severely Depressed"}
          </Text>
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

export default APGARScore;
