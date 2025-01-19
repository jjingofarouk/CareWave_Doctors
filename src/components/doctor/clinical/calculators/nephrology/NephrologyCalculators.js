import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import GFRCalculator from "./GFRCalculator";
import CKDEpiCalculator from "./CKDEpiCalculator";
import CreatinineClearanceCalculator from "./CreatinineClearanceCalculator";
import UrineProteinToCreatinineRatio from "./UrineProteinToCreatinineRatio";
import ChronicKidneyDiseaseStageCalculator from "./ChronicKidneyDiseaseStageCalculator";
import ElectrolyteCalculator from "./ElectrolyteImbalanceCalculator";
import UricAcidCalculator from "./UricAcidCalculator";

const NephrologyCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("GFR Calculator");
  const [searchQuery, setSearchQuery] = useState("");

  const calculators = [
    "GFR Calculator",
    "CKD-EPI Calculator",
    "Creatinine Clearance Calculator",
    "Urine Protein to Creatinine Ratio",
    "Chronic Kidney Disease Stage Calculator",
    "Electrolyte Calculator",
    "Uric Acid Calculator",
  ];

  const filteredCalculators = calculators.filter((calculator) =>
    calculator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "GFR Calculator":
        return <GFRCalculator />;
      case "CKD-EPI Calculator":
        return <CKDEpiCalculator />;
      case "Creatinine Clearance Calculator":
        return <CreatinineClearanceCalculator />;
      case "Urine Protein to Creatinine Ratio":
        return <UrineProteinToCreatinineRatio />;
      case "Chronic Kidney Disease Stage Calculator":
        return <ChronicKidneyDiseaseStageCalculator />;
      case "Electrolyte Calculator":
        return <ElectrolyteCalculator />;
      case "Uric Acid Calculator":
        return <UricAcidCalculator />;

      default:
        return <Text style={styles.infoText}>Select a calculator to get started</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search calculators..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#6B7280"
        />
      </View>

      {/* Calculator Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {filteredCalculators.map((calculator) => (
          <TouchableOpacity
            key={calculator}
            style={[
              styles.tab,
              selectedCalculator === calculator && styles.activeTab,
            ]}
            onPress={() => setSelectedCalculator(calculator)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCalculator === calculator && styles.activeTabText,
              ]}
            >
              {calculator}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Calculator Body */}
      <ScrollView style={styles.bodyContainer}>{renderCalculator()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFE4E5",
  },
  searchContainer: {
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    color: "#1F2937",
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 6,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    maxHeight: 60,

  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  activeTab: {
    backgroundColor: "#27C7B8",
    borderWidth: 0,
    shadowColor: "#27C7B8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    color: "#1F2937",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NephrologyCalculators;