import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import CustomSelect from "../../../utils/CustomSelect"; // Import your custom select component

const InsulinAndMedicationTracking = () => {
  const [insulinDose, setInsulinDose] = useState("");
  const [medication, setMedication] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [adherenceNotes, setAdherenceNotes] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [unitsRemaining, setUnitsRemaining] = useState("");
  const [nextRefill, setNextRefill] = useState("");

  const medicationOptions = [
    { label: "Metformin", value: "metformin" },
    { label: "Insulin Glargine", value: "insulin_glargine" },
    { label: "Dapagliflozin", value: "dapagliflozin" },
    { label: "Empagliflozin", value: "empagliflozin" },
    { label: "Other", value: "other" },
  ];

  const handleLogMedication = () => {
    console.log("Medication Logged:", {
      insulinDose,
      medication,
      timeTaken,
      adherenceNotes,
      sideEffects,
      unitsRemaining,
      nextRefill,
    });

    // Reset fields
    setInsulinDose("");
    setMedication("");
    setTimeTaken("");
    setAdherenceNotes("");
    setSideEffects("");
    setUnitsRemaining("");
    setNextRefill("");
  };

  return (
    <ScrollView contentContainerStyle={styles.card}>
      <Text style={styles.cardTitle}>Insulin and Medication Tracking</Text>

      {/* Insulin Dose */}
      <Text style={styles.label}>Insulin Dose (Units)</Text>
      <TextInput
        style={styles.input}
        value={insulinDose}
        onChangeText={setInsulinDose}
        placeholder="Enter insulin dose"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      {/* Medication Name */}
      <Text style={styles.label}>Medication Name</Text>
      <CustomSelect
        selectedValue={medication}
        options={medicationOptions}
        onValueChange={setMedication}
        placeholder="Select Medication"
      />

      {/* Time Taken */}
      <Text style={styles.label}>Time Taken</Text>
      <TextInput
        style={styles.input}
        value={timeTaken}
        onChangeText={setTimeTaken}
        placeholder="Enter time of intake (e.g., 8:00 AM)"
        placeholderTextColor="#888"
      />

      {/* Adherence Notes */}
      <Text style={styles.label}>Adherence Notes</Text>
      <TextInput
        style={styles.input}
        value={adherenceNotes}
        onChangeText={setAdherenceNotes}
        placeholder="Notes on adherence (e.g., missed dose, on time)"
        placeholderTextColor="#888"
      />

      {/* Side Effects */}
      <Text style={styles.label}>Side Effects (if any)</Text>
      <TextInput
        style={styles.input}
        value={sideEffects}
        onChangeText={setSideEffects}
        placeholder="Log any side effects experienced"
        placeholderTextColor="#888"
      />

      {/* Insulin Units Remaining */}
      <Text style={styles.label}>Insulin Units Remaining</Text>
      <TextInput
        style={styles.input}
        value={unitsRemaining}
        onChangeText={setUnitsRemaining}
        placeholder="Enter units remaining in vial/pen"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      {/* Next Refill Date */}
      <Text style={styles.label}>Next Refill Date</Text>
      <TextInput
        style={styles.input}
        value={nextRefill}
        onChangeText={setNextRefill}
        placeholder="Enter next refill date (e.g., 12/15/2024)"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogMedication}>
        <Text style={styles.buttonText}>Log Medication</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004C54",
    marginBottom: 5,
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

export default InsulinAndMedicationTracking;
