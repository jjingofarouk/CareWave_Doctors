import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const ComplicationsTracking = () => {
  const [footCare, setFootCare] = useState("");
  const [eyeHealth, setEyeHealth] = useState("");
  const [kidneyHealth, setKidneyHealth] = useState("");

  const handleLogComplications = () => {
    console.log("Foot care:", footCare, "Eye health:", eyeHealth, "Kidney health:", kidneyHealth);

    // Provide helpful suggestions and alerts based on input
    if (footCare === "Check for sores" || footCare === "Pain or discomfort") {
      Alert.alert("Foot Health Alert", "Please check your feet carefully and consult a doctor if necessary.");
    }
    if (eyeHealth === "Blurry vision" || eyeHealth === "Frequent headaches") {
      Alert.alert("Eye Health Alert", "These may be signs of diabetes-related eye issues. Please see an eye specialist.");
    }
    if (kidneyHealth === "Frequent urination" || kidneyHealth === "Swelling in ankles") {
      Alert.alert("Kidney Health Alert", "These symptoms could indicate kidney problems. Consult your healthcare provider.");

    }

    // Clear inputs after logging
    setFootCare("");
    setEyeHealth("");
    setKidneyHealth("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Complications Tracking</Text>

      <Text style={styles.subTitle}>Foot Care</Text>
      <TextInput
        style={styles.input}
        value={footCare}
        onChangeText={setFootCare}
        placeholder="Foot care status"
        placeholderTextColor="#888"
      />
      <Text style={styles.subTitle}>Eye Health</Text>
      <TextInput
        style={styles.input}
        value={eyeHealth}
        onChangeText={setEyeHealth}
        placeholder="Eye health status"
        placeholderTextColor="#888"
      />
      <Text style={styles.subTitle}>Kidney Health</Text>
      <TextInput
        style={styles.input}
        value={kidneyHealth}
        onChangeText={setKidneyHealth}
        placeholder="Kidney health status"
        placeholderTextColor="#888"
      />

      {/* Visual Indicators */}
      <View style={styles.indicatorContainer}>
        <Text style={[styles.indicator, getIndicatorStyle(footCare)]}>Foot Health Status: {footCare}</Text>
        <Text style={[styles.indicator, getIndicatorStyle(eyeHealth)]}>Eye Health Status: {eyeHealth}</Text>
        <Text style={[styles.indicator, getIndicatorStyle(kidneyHealth)]}>Kidney Health Status: {kidneyHealth}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogComplications}>
        <Text style={styles.buttonText}>Log Complications</Text>
      </TouchableOpacity>
    </View>
  );
};

const getIndicatorStyle = (status) => {
  if (status === "Good") {
    return styles.goodStatus;
  } else if (status === "Caution") {
    return styles.cautionStatus;
  } else if (status === "Poor") {
    return styles.poorStatus;
  }
  return styles.neutralStatus;
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
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004C54",
    marginTop: 15,
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
  indicatorContainer: {
    marginTop: 20,
  },
  indicator: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "600",
  },
  goodStatus: {
    color: "#4CAF50", // Green
  },
  cautionStatus: {
    color: "#FFEB3B", // Yellow
  },
  poorStatus: {
    color: "#D32F2F", // Red
  },
  neutralStatus: {
    color: "#888", // Gray
  },
});

export default ComplicationsTracking;
