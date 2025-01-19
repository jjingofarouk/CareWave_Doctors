import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export const MSSS = () => {
  const [motorFunction, setMotorFunction] = useState(0);
  const [cognitiveStatus, setCognitiveStatus] = useState(0);
  const [totalScore, setTotalScore] = useState(null);

  const calculateScore = () => {
    const score = motorFunction + cognitiveStatus;
    setTotalScore(score);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MSSS (Multiple Sclerosis)</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Motor Function Score (0-6)"
        value={motorFunction.toString()}
        onChangeText={(text) => setMotorFunction(parseInt(text, 10))}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Cognitive Status Score (0-6)"
        value={cognitiveStatus.toString()}
        onChangeText={(text) => setCognitiveStatus(parseInt(text, 10))}
      />
      <Button title="Calculate Total Score" onPress={calculateScore} />
      {totalScore !== null && <Text>Total MSSS Score: {totalScore}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
