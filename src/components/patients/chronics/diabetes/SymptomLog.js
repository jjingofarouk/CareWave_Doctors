import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SymptomLog = () => {
  const [symptoms, setSymptoms] = useState("");

  const handleLogSymptom = () => {
    console.log("Symptom logged:", symptoms);
    setSymptoms("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Log Your Symptoms</Text>
      <TextInput
        style={styles.input}
        value={symptoms}
        onChangeText={setSymptoms}
        placeholder="Enter symptoms"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogSymptom}>
        <Text style={styles.buttonText}>Log Symptoms</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#004C54",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FF7043",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SymptomLog;
