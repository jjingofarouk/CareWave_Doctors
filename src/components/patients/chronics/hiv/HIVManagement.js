// HIVManagement.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MedicationLog from "./MedicationLog";
import SymptomLog from "./SymptomLog";
import ViralLoadLog from "./ViralLoadLog";
import MythDebunking from "./MythDebunking";
import MentalHealthTracking from "./MentalHealthTracking";
import useNotifications from "../hooks/UseNotifications";

const HIVManagement = () => {
  const [medications, setMedications] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const [viralLoad, setViralLoad] = useState("");
  const [mood, setMood] = useState("");
  const { notify } = useNotifications();

  useEffect(() => {
    // Fetch initial data for medications, symptoms, etc.
  }, []);

  const handleLogMedication = (medication) => {
    setMedications([...medications, medication]);
    notify("Medication Logged", `${medication.medication} at ${medication.dose} has been logged.`);
  };

  const handleLogSymptom = () => {
    // Log symptom code here
    notify("Symptom Logged", "Your symptom has been logged successfully.");
  };

  const handleLogViralLoad = (viralLoad) => {
    setViralLoad(viralLoad);
    notify("Viral Load Logged", `Viral load of ${viralLoad} has been recorded.`);
  };

  const handleLogMentalHealth = (mood) => {
    setMood(mood);
    notify("Mental Health Logged", `Your mood has been recorded as: ${mood}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HIV Management</Text>
      <MedicationLog onLogMedication={handleLogMedication} />
      <SymptomLog symptoms={symptoms} setSymptoms={setSymptoms} onLogSymptom={handleLogSymptom} />
      <ViralLoadLog onLogViralLoad={handleLogViralLoad} />
      <MythDebunking />
      <MentalHealthTracking onLogMentalHealth={handleLogMentalHealth} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 30, fontWeight: "bold" },
});

export default HIVManagement;
