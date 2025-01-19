import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  SafeAreaView,
  StatusBar
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import calculator components (kept from original)
import CardiovascularCalculators from "./cardiovascular/CardiovascularCalculators";
import NeurologyCalculators from "./neurology/NeurologyCalculators";
import PulmonaryCalculators from "./pulmonary/PulmonaryCalculators";
import GastroenterologyCalculators from "./git/GastroenterologyCalculators";
import ObstetricsCalculators from "./obstetrics/ObstetricsCalculators";
import OrthopedicsCalculators from "./ortho/OrthopedicsCalculators";
import NephrologyCalculators from "./nephrology/NephrologyCalculators";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 2 cards per row with margins

const ClinicalCalculators = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCalculators, setRecentCalculators] = useState([]);

  // Calculator categories with metadata
  const calculatorCategories = [
    {
      id: "cardiovascular",
      label: "Cardiovascular",
      icon: "heart-pulse",
      color: "#FF4757",
      component: CardiovascularCalculators,
      description: "Heart rate, BP, risk scores"
    },
    {
      id: "neurology",
      label: "Neurology",
      icon: "brain",
      color: "#5352ED",
      component: NeurologyCalculators,
      description: "Stroke scales, GCS"
    },
    {
      id: "pulmonary",
      label: "Pulmonary",
      icon: "lungs",
      color: "#1E90FF",
      component: PulmonaryCalculators,
      description: "Respiratory scores, O2 calc"
    },
    {
      id: "gastrointestinal",
      label: "Gastroenterology",
      icon: "stomach",
      color: "#FF6B6B",
      component: GastroenterologyCalculators,
      description: "GI scores, hepatic calc"
    },
    {
      id: "obstetrics",
      label: "Obstetrics",
      icon: "baby-face-outline",
      color: "#FF9FF3",
      component: ObstetricsCalculators,
      description: "Due date, pregnancy calc"
    },

 
    {
      id: "orthopedics",
      label: "Orthopedics",
      icon: "bone",
      color: "#FFA502",
      component: OrthopedicsCalculators,
      description: "Joint scores, fractures"
    },
    {
      id: "nephrology",
      label: "Nephrology",
      icon: "water",
      color: "#747D8C",
      component: NephrologyCalculators,
      description: "Renal function, electrolytes"
    }
  ];

  // Load recent calculators on mount
  useEffect(() => {
    loadRecentCalculators();
  }, []);

  const loadRecentCalculators = async () => {
    try {
      const recentData = await AsyncStorage.getItem("recentCalculators");
      if (recentData) {
        setRecentCalculators(JSON.parse(recentData));
      }
    } catch (error) {
      console.error("Error loading recent calculators:", error);
    }
  };

  const handleCategoryPress = async (category) => {
    try {
      // Update recents
      const updatedRecents = [
        category.id,
        ...recentCalculators.filter((calc) => calc !== category.id)
      ].slice(0, 5);
      
      await AsyncStorage.setItem("recentCalculators", JSON.stringify(updatedRecents));
      setRecentCalculators(updatedRecents);
      
      // Navigate to the calculator screen
      navigation.navigate(category.label, { component: category.component });
    } catch (error) {
      console.error("Error handling category selection:", error);
    }
  };

  // Filter categories based on search
  const filteredCategories = calculatorCategories.filter(
    (category) =>
      category.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.card, { backgroundColor: category.color + '15' }]}
      onPress={() => handleCategoryPress(category)}
    >
      <MaterialCommunityIcons
        name={category.icon}
        size={32}
        color={category.color}
      />
      <Text style={styles.cardTitle}>{category.label}</Text>
      <Text style={styles.cardDescription}>{category.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Clinical Calculators</Text>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color="#747D8C"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search calculators..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {recentCalculators.length > 0 && (
        <View style={styles.recentsContainer}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentCalculators.map((recentId) => {
              const category = calculatorCategories.find(cat => cat.id === recentId);
              if (!category) return null;

              return (
                <TouchableOpacity
                  key={recentId}
                  style={styles.recentItem}
                  onPress={() => handleCategoryPress(category)}
                >
                  <MaterialCommunityIcons
                    name={category.icon}
                    size={24}
                    color={category.color}
                  />
                  <Text style={styles.recentItemText}>{category.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.gridContainer}>
          {filteredCategories.map(renderCategoryCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F3542",
    marginBottom: 16
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F6",
    borderRadius: 8,
    paddingHorizontal: 12
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#2F3542"
  },
  container: {
    padding: 16
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  card: {
    width: cardWidth,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F3542",
    marginTop: 8,
    textAlign: "center"
  },
  cardDescription: {
    fontSize: 12,
    color: "#747D8C",
    marginTop: 4,
    textAlign: "center"
  },
  recentsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F3542",
    marginBottom: 8
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8
  },
  recentItemText: {
    fontSize: 14,
    color: "#2F3542",
    marginLeft: 8
  }
});

export default ClinicalCalculators;