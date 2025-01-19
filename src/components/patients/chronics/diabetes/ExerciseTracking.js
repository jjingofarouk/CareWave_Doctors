import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import CustomSelect from "../../../utils/CustomSelect"; // Import your custom select component

const ExerciseTracking = () => {
  const [exerciseDetails, setExerciseDetails] = useState("");
  const [exerciseType, setExerciseType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const exerciseOptions = [
    { label: "Walking", value: "walking" },
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Swimming", value: "swimming" },
    { label: "Strength Training", value: "strength_training" },
    { label: "Yoga", value: "yoga" },
    { label: "Other", value: "other" },
  ];

  const intensityOptions = [
    { label: "Light", value: "light" },
    { label: "Moderate", value: "moderate" },
    { label: "Vigorous", value: "vigorous" },
  ];

  const handleLogExercise = () => {
    console.log("Exercise details logged:", {
      exerciseType,
      duration,
      intensity,
      glucoseLevel,
      heartRate,
      symptoms,
    });
    setExerciseDetails("");
    setExerciseType("");
    setDuration("");
    setIntensity("");
    setGlucoseLevel("");
    setHeartRate("");
    setSymptoms("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Exercise Tracking</Text>

      <Text style={styles.label}>Type of Exercise</Text>
      <CustomSelect
        selectedValue={exerciseType}
        options={exerciseOptions}
        onValueChange={setExerciseType}
        placeholder="Select Exercise Type"
      />

      <Text style={styles.label}>Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Intensity</Text>
      <CustomSelect
        selectedValue={intensity}
        options={intensityOptions}
        onValueChange={setIntensity}
        placeholder="Select Exercise Intensity"
      />

      <Text style={styles.label}>Pre-Exercise Glucose Level</Text>
      <TextInput
        style={styles.input}
        value={glucoseLevel}
        onChangeText={setGlucoseLevel}
        placeholder="Enter blood glucose level"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Heart Rate</Text>
      <TextInput
        style={styles.input}
        value={heartRate}
        onChangeText={setHeartRate}
        placeholder="Enter heart rate"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Symptoms (if any)</Text>
      <TextInput
        style={styles.input}
        value={symptoms}
        onChangeText={setSymptoms}
        placeholder="Enter any symptoms (e.g., dizziness)"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogExercise}>
        <Text style={styles.buttonText}>Log Exercise</Text>
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004C54",
    marginTop: 15,
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

export default ExerciseTracking;
