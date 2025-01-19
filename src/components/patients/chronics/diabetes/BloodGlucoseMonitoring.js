import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit"; // You can install this library for a simple graph
import { Dimensions } from "react-native";

const BloodGlucoseMonitoring = () => {
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [glucoseHistory, setGlucoseHistory] = useState([100, 120, 110, 115, 125]); // Sample data for graph

  const handleLogGlucoseLevel = () => {
    const parsedLevel = parseFloat(glucoseLevel);
    if (isNaN(parsedLevel)) {
      Alert.alert("Invalid Input", "Please enter a valid glucose level.");
      return;
    }

    console.log("Glucose level logged:", parsedLevel);
    setGlucoseHistory([...glucoseHistory, parsedLevel]);

    // Provide guidance based on the glucose level
    if (parsedLevel < 70) {
      Alert.alert("Low Glucose", "Your blood glucose level is too low. Please consume something with sugar.");
    } else if (parsedLevel > 130) {
      Alert.alert("High Glucose", "Your blood glucose level is too high. Please consult your healthcare provider.");
    }

    setGlucoseLevel(""); // Clear input after logging
  };

  const getGlucoseRangeIndicator = (level) => {
    if (level < 70) return "Low";
    if (level >= 70 && level <= 130) return "Normal";
    return "High";
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Daily Blood Glucose Monitoring</Text>
      
      <TextInput
        style={styles.input}
        value={glucoseLevel}
        onChangeText={setGlucoseLevel}
        placeholder="Enter blood glucose level"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogGlucoseLevel}>
        <Text style={styles.buttonText}>Log Glucose Level</Text>
      </TouchableOpacity>

      {glucoseLevel && (
        <Text style={styles.referenceRange}>
          Reference Range: 70-130 mg/dL - Your entry is {getGlucoseRangeIndicator(parseFloat(glucoseLevel))}.
        </Text>
      )}

      {/* Line chart for glucose trend */}
      <Text style={styles.graphTitle}>Glucose Level Trend</Text>
      <LineChart
        data={{
          labels: ["1", "2", "3", "4", "5"], // Example X axis labels
          datasets: [
            {
              data: glucoseHistory,
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(255, 112, 67, ${opacity})`, // Chart color
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // Responsive width
        height={220}
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 76, 84, ${opacity})`, // Graph color
          labelColor: (opacity = 1) => `rgba(0, 76, 84, ${opacity})`,
        }}
        style={styles.chart}
      />
    </View>
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
  referenceRange: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  graphTitle: {
    fontSize: 16,
    color: "#004C54",
    marginTop: 20,
    fontWeight: "600",
  },
  chart: {
    marginTop: 20,
    borderRadius: 10,
  },
});

export default BloodGlucoseMonitoring;
