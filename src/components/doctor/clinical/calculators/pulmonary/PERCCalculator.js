import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const PERCCalculator = () => {
  const [inputs, setInputs] = useState({
    age: "",
    heartRate: "",
    oxygenSaturation: "",
    hemoptysis: false,
    estrogenUse: false,
    priorDVTPE: false,
    recentSurgery: false,
    unilateralLegSwelling: false,
  });

  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [showGuidance, setShowGuidance] = useState(false);

  const criteriaDescriptions = {
    age: {
      title: "Age ≥50",
      description: "Patient age 50 years or older",
      scoring: "No = 0, Yes = +1"
    },
    heartRate: {
      title: "HR ≥100",
      description: "Heart rate 100 beats per minute or greater",
      scoring: "No = 0, Yes = +1"
    },
    oxygenSaturation: {
      title: "O₂ sat on room air <95%",
      description: "Oxygen saturation less than 95% on room air",
      scoring: "No = 0, Yes = +1"
    },
    unilateralLegSwelling: {
      title: "Unilateral leg swelling",
      description: "Clinical evidence of leg swelling on one side",
      scoring: "No = 0, Yes = +1"
    },
    hemoptysis: {
      title: "Hemoptysis",
      description: "Coughing up blood",
      scoring: "No = 0, Yes = +1"
    },
    recentSurgery: {
      title: "Recent surgery or trauma",
      description: "Surgery or trauma ≤4 weeks ago requiring treatment with general anesthesia",
      scoring: "No = 0, Yes = +1"
    },
    priorDVTPE: {
      title: "Prior PE or DVT",
      description: "History of previous pulmonary embolism or deep vein thrombosis",
      scoring: "No = 0, Yes = +1"
    },
    estrogenUse: {
      title: "Hormone use",
      description: "Oral contraceptives, hormone replacement or estrogenic hormones use in males or female patients",
      scoring: "No = 0, Yes = +1"
    }
  };

  const clinicalGuidance = {
    management: [
      "In low-risk patients who are not PERC negative, consider d-dimer for further evaluation.",
      "If d-dimer is negative and pre-test probability is <15%, no further testing for PE is required.",
      "If d-dimer is positive, pursue further testing such as CT-angiography or V/Q scan.",
      "For moderate or high-risk patients, PERC cannot be utilized - proceed with d-dimer or imaging based on risk."
    ],
    criticalActions: [
      "Only apply PERC rule to patients being evaluated for PE",
      "Use PERC for low-risk patients to potentially avoid further testing",
      "Do not use PERC for moderate or high-risk patients",
      "Consider pericardial disease in patients with pleuritic complaints"
    ],
    whenToUse: [
      "Use only in patients with suspected PE",
      "Pre-test probability must be ≤15%",
      "Intended to rule out PE when no criteria are present"
    ],
    pearlsPitfalls: [
      "PERC is only valid in low-risk patients",
      "All criteria must be negative to rule out PE",
      "Cannot be used in moderate or high-risk patients",
      "Pre-test probability assessment is crucial"
    ]
  };

  const calculatePERC = () => {
    const {
      age,
      heartRate,
      oxygenSaturation,
      hemoptysis,
      estrogenUse,
      priorDVTPE,
      recentSurgery,
      unilateralLegSwelling,
    } = inputs;

    if (!age || !heartRate || !oxygenSaturation) {
      Alert.alert("Required Fields", "Please complete all numeric fields before calculating PERC score.");
      return;
    }

    const numericAge = parseInt(age, 10);
    const numericHR = parseInt(heartRate, 10);
    const numericO2 = parseInt(oxygenSaturation, 10);

    let totalScore = 0;
    totalScore += numericAge >= 50 ? 1 : 0;
    totalScore += numericHR >= 100 ? 1 : 0;
    totalScore += numericO2 < 95 ? 1 : 0;
    totalScore += hemoptysis ? 1 : 0;
    totalScore += estrogenUse ? 1 : 0;
    totalScore += priorDVTPE ? 1 : 0;
    totalScore += recentSurgery ? 1 : 0;
    totalScore += unilateralLegSwelling ? 1 : 0;

    setScore(totalScore);

    if (totalScore === 0) {
      setResult("PERC Negative: PE can be safely ruled out (<2% chance of PE). No further workup needed if pre-test probability is <15%.");
    } else {
      setResult(`PERC Positive: ${totalScore} criteria present. Further evaluation recommended.`);
    }
    
    setShowGuidance(true);
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderNumericInput = (field, placeholder) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{criteriaDescriptions[field].title}</Text>
      <Text style={styles.inputDescription}>{criteriaDescriptions[field].description}</Text>
      <TextInput
        style={styles.numericInput}
        keyboardType="numeric"
        placeholder={placeholder}
        value={inputs[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholderTextColor="#6B7280"
      />
      <Text style={styles.scoringText}>{criteriaDescriptions[field].scoring}</Text>
    </View>
  );

  const renderToggle = (field) => (
    <View style={styles.toggleContainer}>
      <View style={styles.toggleInfo}>
        <Text style={styles.toggleLabel}>{criteriaDescriptions[field].title}</Text>
        <Text style={styles.toggleDescription}>{criteriaDescriptions[field].description}</Text>
        <Text style={styles.scoringText}>{criteriaDescriptions[field].scoring}</Text>
      </View>
      <TouchableOpacity
        style={[styles.toggle, inputs[field] && styles.toggleActive]}
        onPress={() => handleInputChange(field, !inputs[field])}
      >
        <Text style={[styles.toggleText, inputs[field] && styles.toggleTextActive]}>
          {inputs[field] ? "Yes" : "No"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderGuidanceSection = (title, items) => (
    <View style={styles.guidanceSection}>
      <Text style={styles.guidanceTitle}>{title}</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.guidanceText}>• {item}</Text>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PERC Rule Calculator</Text>
        <Text style={styles.subtitle}>Pulmonary Embolism Rule-out Criteria</Text>
        <Text style={styles.headerDescription}>Rules out PE if no criteria are present and pre-test probability is ≤15%</Text>
      </View>

      <View style={styles.card}>
        {renderNumericInput("age", "Enter age")}
        {renderNumericInput("heartRate", "Enter heart rate")}
        {renderNumericInput("oxygenSaturation", "Enter O₂ saturation")}
        
        <View style={styles.divider} />
        
        {renderToggle("unilateralLegSwelling")}
        {renderToggle("hemoptysis")}
        {renderToggle("recentSurgery")}
        {renderToggle("priorDVTPE")}
        {renderToggle("estrogenUse")}

        <TouchableOpacity style={styles.calculateButton} onPress={calculatePERC}>
          <Text style={styles.calculateButtonText}>Calculate PERC Score</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={[styles.card, styles.resultCard]}>
          <Text style={styles.scoreText}>PERC Score: {score}/8</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      {showGuidance && (
        <View style={styles.card}>
          {renderGuidanceSection("Clinical Management", clinicalGuidance.management)}
          {renderGuidanceSection("Critical Actions", clinicalGuidance.criticalActions)}
          {renderGuidanceSection("When to Use", clinicalGuidance.whenToUse)}
          {renderGuidanceSection("Pearls & Pitfalls", clinicalGuidance.pearlsPitfalls)}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    padding: 20,
    backgroundColor: "#1E40AF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#E5E7EB",
    textAlign: "center",
    marginTop: 4,
  },
  headerDescription: {
    fontSize: 14,
    color: "#E5E7EB",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 4,
  },
  inputDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  scoringText: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
    fontStyle: "italic",
  },
  numericInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleInfo: {
    flex: 1,
    marginRight: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
  },
  toggleDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  toggle: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  toggleActive: {
    backgroundColor: "#1E40AF",
    borderColor: "#1E40AF",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  calculateButton: {
    backgroundColor: "#1E40AF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#1E40AF",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E40AF",
    textAlign: "center",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    lineHeight: 24,
  },
  guidanceSection: {
    marginBottom: 20,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 12,
  },
  guidanceText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 20,
    paddingLeft: 12,
  }
});

export default PERCCalculator;