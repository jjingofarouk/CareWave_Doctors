import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LungAgeCalculator = () => {
  const [age, setAge] = useState("");
  const [fev1, setFEV1] = useState("");
  const [lungAge, setLungAge] = useState("");

  const calculateLungAge = () => {
    const result = Math.round(60 - (fev1 / 2)); // Simplified calculation
    setLungAge(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lung Age Calculator</Text>

      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Age (years)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={fev1}
        onChangeText={(text) => setFEV1(text)}
        placeholder="FEV1 (L)"
        keyboardType="numeric"
      />

      <Button title="Calculate Lung Age" onPress={calculateLungAge} />

      {lungAge && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Lung Age: {lungAge} years</Text>
        </View>
      )}
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
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

export default LungAgeCalculator;
