import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import BloodGlucoseMonitoring from "./BloodGlucoseMonitoring";
import InsulinAndMedicationTracking from "./InsulinAndMedicationTracking";
import ExerciseTracking from "./ExerciseTracking";
import SymptomLog from "../hiv/SymptomLog";
import ComplicationsTracking from "./ComplicationsTracking";

const DiabetesManagement = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BloodGlucoseMonitoring />
      <InsulinAndMedicationTracking />
      <ExerciseTracking />
      <SymptomLog />
      <ComplicationsTracking />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});

export default DiabetesManagement;
