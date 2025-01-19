import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomSelect from "../../utils/CustomSelect"; // Import your custom select component

import DiabetesManagement from "./diabetes/DiabetesManagement";
import HypertensionManagement from "./HypertensionManagement";
import HIVManagement from "./hiv/HIVManagement";
import TuberculosisManagement from "./TuberculosisManagement";
import AsthmaManagement from "./AsthmaManagement";
import SickleCellManagement from "./sicklecell/SickleCellManagement";
import CKDManagement from "./CKDManagement"; // Chronic Kidney Disease
import EpilepsyManagement from "./EpilepsyManagement";
import StrokeManagement from "./StrokeManagement";

const ChronicsContent = () => {
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleSelectCondition = (item) => {
    setSelectedCondition(item.value); // Use the selected value (item.value) to set state
  };

  const renderManagementComponent = () => {
    switch (selectedCondition) {
      case "diabetes":
        return <DiabetesManagement />;
      case "hypertension":
        return <HypertensionManagement />;
      case "hiv":
        return <HIVManagement />;
      case "tuberculosis":
        return <TuberculosisManagement />;
      case "asthma":
        return <AsthmaManagement />;
      case "sickleCell":
        return <SickleCellManagement />;
      case "ckd":
        return <CKDManagement />;
      case "epilepsy":
        return <EpilepsyManagement />;
      case "stroke":
        return <StrokeManagement />;
      default:
        return (
          <Text style={styles.placeholderText}>
            Please select a chronic disease to manage.
          </Text>
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Select Your Chronic Condition</Text>

        {/* Custom Select Component */}
        <CustomSelect
          placeholder="Select Condition"
          options={[
            { label: "Diabetes", value: "diabetes" },
            { label: "Hypertension", value: "hypertension" },
            { label: "HIV/AIDS", value: "hiv" },
            { label: "Tuberculosis", value: "tuberculosis" },
            { label: "Asthma", value: "asthma" },
            { label: "Sickle Cell Anemia", value: "sickleCell" },
            { label: "Chronic Kidney Disease", value: "ckd" },
            { label: "Epilepsy", value: "epilepsy" },
            { label: "Stroke", value: "stroke" },
          ]}
          onSelect={handleSelectCondition}
        />
      </View>

      {/* Management Content */}
      <View style={styles.managementContainer}>
        {renderManagementComponent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#004C54",
    textAlign: "center",
  },
  managementContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    marginBottom: 16,
  },
  placeholderText: {
    textAlign: "center",
    fontSize: 18,
    color: "#777",
    marginTop: 16,
  },
});

export default ChronicsContent;
