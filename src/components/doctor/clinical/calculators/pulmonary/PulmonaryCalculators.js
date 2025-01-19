import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CURB65Calculator from "./CURB65";
import WellsScoreCalculator from "./Wells";
import PSICalculator from "./PSICalculator";
import PERCCalculator from "./PERCCalculator";
import BODECalculator from "./BODECalculator";
import ACTCalculator from "./ACTCalculator";
import CATCalculator from "./CATCalculator";
import PEFRCalculator from "./PEFRCalculator";
import MMRC_Calculator from "./MMRC_Calculator";

const PulmonaryCalculators = () => {
  const calculators = [
    { title: "CURB-65 Pneumonia Severity", component: CURB65Calculator },
    { title: "Wells Score for PE", component: WellsScoreCalculator },
    { title: "PSI/PORT Score", component: PSICalculator },
    { title: "PERC Rule for PE", component: PERCCalculator },
    { title: "BODE Index", component: BODECalculator },
    { title: "Asthma Control Test (ACT)", component: ACTCalculator },
    { title: "COPD Assessment Test (CAT)", component: CATCalculator },
    { title: "Peak Expiratory Flow Rate (PEFR) Calculator", component: PEFRCalculator },
    { title: "Modified Medical Research Council (mMRC) Dyspnea Scale", component: MMRC_Calculator },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCalculator, setSelectedCalculator] = useState(null);

  const filteredCalculators = calculators.filter((calc) =>
    calc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCalculator = () => {
    if (selectedCalculator) {
      const CalculatorComponent = selectedCalculator.component;
      return <CalculatorComponent />;
    }
    return (
      <Text style={styles.infoText}>
        Select a calculator to get started.
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search calculators..."
        placeholderTextColor="#6B7280"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Calculator Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {filteredCalculators.map((calculator) => (
          <TouchableOpacity
            key={calculator.title}
            style={[
              styles.tab,
              selectedCalculator?.title === calculator.title &&
                styles.activeTab,
            ]}
            onPress={() => setSelectedCalculator(calculator)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCalculator?.title === calculator.title &&
                  styles.activeTabText,
              ]}
            >
              {calculator.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Calculator Body */}
      <ScrollView style={styles.bodyContainer}>
        {renderCalculator()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFE4E5", // Coral Cloud for background
  },
  searchInput: {
    height: 40,
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF", // White background for input
    borderWidth: 1,
    borderColor: "#E5E7EB", // Subtle border
    fontSize: 14,
    color: "#1F2937", // Neutral dark gray for text
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 6,
    backgroundColor: "#F9FAFB", // Subtle light gray for contrast
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // Neutral divider line for structure
    maxHeight: 60,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    borderRadius: 12, // Smooth rounded corners
    backgroundColor: "#FFFFFF", // Default tab background
    borderWidth: 1,
    borderColor: "#E5E7EB", // Subtle border for tabs
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, // Light shadow for depth
    shadowRadius: 2,
    maxHeight: 50,
  },
  activeTab: {
    backgroundColor: "#27C7B8", // Teal Tide for active tab
    borderWidth: 0, // Remove border for active tab
    shadowColor: "#27C7B8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Slightly stronger shadow for active tab
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Inter-Regular", // Modern, clean font
    color: "#1F2937", // Neutral dark gray for default tab text
    letterSpacing: 0.3, // Slight letter spacing for readability
  },
  activeTabText: {
    color: "#FFFFFF", // White text for active tab
    fontFamily: "Inter-SemiBold", // Modern, semi-bold font for active tab
    fontSize: 14,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Inter-Light", // Light typography for placeholder text
    color: "#6B7280", // Subtle gray for inactive text
    textAlign: "center",
    marginTop: 20,
  },
});

export default PulmonaryCalculators;
