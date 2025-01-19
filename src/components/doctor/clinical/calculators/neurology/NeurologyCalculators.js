import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { GlasgowComaScale } from "./GCS";
import NIHStrokeScale from './NIHStrokeScale';
import { PHQ9 } from './PHQ9';
import { GAD7 } from './GAD7';
import { MMSE } from './MMSE';
import MoCA from './MoCa';
import { TBISeverityScore } from './TBISeverityScore';
import ABCD2Score from './ABCD2Score';
import { PHASESScore } from './PHASESScore';
import { EDSS } from './EDSS';
import { RanchoLosAmigos } from './RanchoLosAmigos';
import { EQ5D } from './EQ5D';
import ApacheII from './ApacheII';

const NeurologyCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("Glasgow Coma Scale");
  const [searchQuery, setSearchQuery] = useState("");

  const calculators = [
    "Glasgow Coma Scale",
    "NIH Stroke Scale",
    "APACHE II for Neurology",
    "Traumatic Brain Injury Severity Score",
    "Mini-Mental State Examination (MMSE)",
    "Montreal Cognitive Assessment (MoCA)",
    "ABCD2 Score",
    "PHQ-9",
    "GAD-7",
    "PHASES Score",
    "EDSS",
    "Rancho Los Amigos Scale",
    "EQ-5D",
  ];

  const filteredCalculators = calculators.filter(calculator =>
    calculator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "Glasgow Coma Scale":
        return <GlasgowComaScale />;
      case "NIH Stroke Scale":
        return <NIHStrokeScale />;
      case "APACHE II for Neurology":
        return <ApacheII />;
      case "Traumatic Brain Injury Severity Score":
        return <TBISeverityScore />;
      case "Mini-Mental State Examination (MMSE)":
        return <MMSE />;
      case "Montreal Cognitive Assessment (MoCA)":
        return <MoCA />;
      case "ABCD2 Score":
        return <ABCD2Score />;
      case "PHQ-9":
        return <PHQ9 />;
      case "GAD-7":
        return <GAD7 />;
      case "PHASES Score":
        return <PHASESScore />;
      case "EDSS":
        return <EDSS />;
      case "Rancho Los Amigos Scale":
        return <RanchoLosAmigos />;
      case "EQ-5D":
        return <EQ5D />;
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
    fontFamily: "Inter-Regular",
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
    maxHeight: 50,
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
    fontFamily: "Inter-Regular",
    color: "#1F2937",
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Inter-Light",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NeurologyCalculators;