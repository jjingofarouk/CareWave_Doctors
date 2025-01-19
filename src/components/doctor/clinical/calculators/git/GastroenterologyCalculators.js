import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Search } from "lucide-react-native";
import MELDScore from "./MELD";
import ChildPughScore from "./ChildPughScore";
import RansonsCriteria from "./RansonsCriteria";
import RockallScore from "./RockallScore";
import GlasgowBlatchfordScore from "./GlasgowBlatchfordScore";
import BISAPCalculator from "./BISAPCalculator";
import FIB4Calculator from "./FIB4Calculator";

const CALCULATORS = [
  "MELD Score",
  "Child-Pugh Score",
  "Ranson's Criteria",
  "Rockall Score",
  "Glasgow Blatchford Score",
  "BISAP Calculator",
  "FIB4 Calculator",
];

const MAX_RECENT_CALCULATORS = 3;

const GastroenterologyCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("MELD Score");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCalculators, setFilteredCalculators] = useState(CALCULATORS);



  useEffect(() => {
    const filtered = CALCULATORS.filter(calculator =>
      calculator.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCalculators(filtered);
  }, [searchQuery]);





  const handleCalculatorSelect = (calculator) => {
    setSelectedCalculator(calculator);
  };

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "MELD Score":
        return <MELDScore />;
      case "Child-Pugh Score":
        return <ChildPughScore />;
      case "Ranson's Criteria":
        return <RansonsCriteria />;
      case "Rockall Score":
        return <RockallScore />;
      case "Glasgow Blatchford Score":
        return <GlasgowBlatchfordScore />;
      case "BISAP Calculator":
        return <BISAPCalculator />;
      case "FIB4 Calculator":
        return <FIB4Calculator />;
      default:
        return <Text style={styles.infoText}>Select a calculator to get started</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search calculators..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>


      {/* Calculator Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.tabContainer}
      >
        {filteredCalculators.map((calculator) => (
          <TouchableOpacity
            key={calculator}
            style={[
              styles.tab,
              selectedCalculator === calculator && styles.activeTab,
            ]}
            onPress={() => handleCalculatorSelect(calculator)}
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
      <ScrollView style={styles.bodyContainer}>
        {filteredCalculators.length === 0 ? (
          <Text style={styles.noResultsText}>No calculators found matching "{searchQuery}"</Text>
        ) : (
          renderCalculator()
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFE4E5",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "Inter-Regular",
  },
  recentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
  },
  recentTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#6B7280",
    marginBottom: 8,
  },
  recentScroll: {
    flexDirection: "row",
  },
  recentItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  recentItemText: {
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
  noResultsText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 40,
  },
});

export default GastroenterologyCalculators;