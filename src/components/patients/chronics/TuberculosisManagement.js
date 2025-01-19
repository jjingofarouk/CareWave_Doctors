import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Alert
} from "react-native";
import { FaSyringe, FaCapsules, FaLungs, FaStethoscope, FaFileMedical, FaUserMd } from "react-icons/fa";
import useNotifications from "./hooks/UseNotifications";
import { Picker } from '@react-native-picker/picker';

const TuberculosisManagement = () => {
  const [medications, setMedications] = useState([]);
  const [treatmentStage, setTreatmentStage] = useState("");
  const [adherenceLevel, setAdherenceLevel] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosticTests, setDiagnosticTests] = useState([]);
  const { notify } = useNotifications();

  useEffect(() => {
    // Fetch medications, diagnostic tests, etc.
  }, []);

  const handleTreatmentStageSelect = (stage) => {
    setTreatmentStage(stage);
    notify("Treatment Stage Selected", `You selected ${stage}`);
  };

  const handleMedicationAdherence = (level) => {
    setAdherenceLevel(level);
    notify("Adherence Level Set", `Your adherence level is ${level}`);
  };

  const handleSymptomLog = () => {
    notify("Symptom Logged", "Your symptom has been logged successfully.");
  };

  const handleDiagnosticTestUpload = (test) => {
    setDiagnosticTests([...diagnosticTests, test]);
    notify("Diagnostic Test Uploaded", "Your diagnostic test has been uploaded successfully.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tuberculosis (TB) Management</Text>

      {/* TB Treatment Stages */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Treatment Stage</Text>
        <Text>
          TB treatment includes options for drug-resistant TB. Ensure you're in the correct phase based on your provider's recommendation.
        </Text>
        <Picker
          selectedValue={treatmentStage}
          onValueChange={handleTreatmentStageSelect}
          style={styles.picker}
        >
          <Picker.Item label="Intensive Phase" value="Intensive Phase" />
          <Picker.Item label="Continuation Phase" value="Continuation Phase" />
          <Picker.Item label="MDR-TB Short Regimen" value="MDR-TB Short Regimen" />
          <Picker.Item label="MDR-TB Long Regimen" value="MDR-TB Long Regimen" />
        </Picker>
      </View>

      {/* Medication Adherence */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Medication Adherence</Text>
        <Text>
          TB treatment requires strict adherence. Please ensure full adherence to avoid resistance.
        </Text>
        <Picker
          selectedValue={adherenceLevel}
          onValueChange={handleMedicationAdherence}
          style={styles.picker}
        >
          <Picker.Item label="High Adherence" value="High" />
          <Picker.Item label="Moderate Adherence" value="Moderate" />
          <Picker.Item label="Low Adherence" value="Low" />
        </Picker>
      </View>

      {/* Symptom Logging */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Log Symptoms</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Symptom"
          value={symptoms}
          onChangeText={setSymptoms}
        />
        <Button
          title="Log Symptom"
          onPress={handleSymptomLog}
        />
      </View>

      {/* Diagnostic Test Upload */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Upload Diagnostic Test Results</Text>
        <Button
          title="Upload Test Result"
          onPress={() => handleDiagnosticTestUpload("New Test Result")}
        />
        <FlatList
          data={diagnosticTests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>

      {/* Follow-Up and Sputum Monitoring */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Follow-Up and Sputum Monitoring</Text>
        <Text>
          Regular follow-up is critical. Sputum smear tests should be repeated at 2, 5, and 6 months of treatment.
        </Text>
        <Button
          title="Schedule Follow-Up"
          onPress={() => {}}
        />
      </View>

      {/* DOTS (Directly Observed Therapy) Support */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Directly Observed Therapy (DOTS)</Text>
        <Text>
          Enroll in a DOTS program where a healthcare provider supervises your treatment adherence.
        </Text>
        <Button
          title="Join DOTS Program"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
});

export default TuberculosisManagement;
