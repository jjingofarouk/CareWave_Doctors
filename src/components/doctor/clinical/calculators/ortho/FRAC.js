import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CheckBox from "../neurology/CheckBox";

const FRAXCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmd, setBMD] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [glucocorticoids, setGlucocorticoids] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [fractureRisk, setFractureRisk] = useState(null);

  // Function to validate inputs
  const validateInputs = () => {
    if (age === "" || bmd === "") {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return false;
    }
    if (isNaN(age) || isNaN(bmd) || age <= 0 || bmd <= 0) {
      Alert.alert(
        "Validation Error",
        "Please enter valid numeric values for age and BMD."
      );
      return false;
    }
    return true;
  };

  // Enhanced FRAX calculation (simplified version with some risk factors)
  const calculateFRAX = () => {
    if (!validateInputs()) return;

    let risk = (parseFloat(age) + (gender === "female" ? 10 : 0) + parseFloat(bmd)) / 100; // Simplified calculation

    // Adjusting based on other factors
    if (smoking) risk += 0.05;
    if (alcohol) risk += 0.05;
    if (glucocorticoids) risk += 0.1;
    if (familyHistory) risk += 0.1;

    setFractureRisk((risk * 100).toFixed(2) + "%");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FRAX® Fracture Risk Assessment</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={gender === "female"}
          onValueChange={() => setGender(gender === "female" ? "male" : "female")}
        />
        <Text style={styles.label}>Female</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="BMD (g/cm²)"
        keyboardType="numeric"
        value={bmd}
        onChangeText={setBMD}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={smoking} onValueChange={setSmoking} />
        <Text style={styles.label}>Smoker</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={alcohol} onValueChange={setAlcohol} />
        <Text style={styles.label}>Alcohol Consumption</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={glucocorticoids} onValueChange={setGlucocorticoids} />
        <Text style={styles.label}>Glucocorticoid Therapy</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={familyHistory} onValueChange={setFamilyHistory} />
        <Text style={styles.label}>Family History of Fractures</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={calculateFRAX}>
        <Text style={styles.buttonText}>Calculate Risk</Text>
      </TouchableOpacity>
      {fractureRisk && <Text style={styles.result}>Fracture Risk: {fractureRisk}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FRAXCalculator;
