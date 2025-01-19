import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
  Platform,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReferenceRanges = {
  AST: { low: 10, high: 40, unit: "U/L" },
  ALT: { low: 7, high: 56, unit: "U/L" },
  Platelets: { low: 150, high: 450, unit: "×10⁹/L" },
};

const FIB4Calculator = () => {
  const [patientData, setPatientData] = useState({
    id: "",
    age: "",
    ast: "",
    alt: "",
    plateletCount: "",
    date: new Date(),
  });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem("fib4_history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      await AsyncStorage.setItem("fib4_history", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const validateInput = () => {
    const { age, ast, alt, plateletCount } = patientData;
    if (!age || !ast || !alt || !plateletCount) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }
    
    const values = {
      age: parseFloat(age),
      ast: parseFloat(ast),
      alt: parseFloat(alt),
      plateletCount: parseFloat(plateletCount),
    };

    if (Object.values(values).some(val => val <= 0)) {
      Alert.alert("Validation Error", "All values must be greater than zero.");
      return false;
    }

    if (values.age < 18 || values.age > 130) {
      Alert.alert("Validation Error", "Age must be between 18 and 130 years.");
      return false;
    }

    return values;
  };

  const calculateFIB4 = () => {
    const values = validateInput();
    if (!values) return;

    const fib4 = (values.age * values.ast) / (values.plateletCount * Math.sqrt(values.alt));
    const newResult = {
      score: fib4.toFixed(2),
      date: new Date(),
      values: { ...values },
    };

    setResult(newResult);
    const newHistory = [...history, newResult].slice(-10); // Keep last 10 results
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const interpretResult = (score) => {
    const numScore = parseFloat(score);
    if (numScore < 1.45) {
      return {
        risk: "Low Risk",
        color: "#4CAF50",
        detail: "NPV 90% for advanced fibrosis. Consider medical management.",
        action: "• Regular monitoring recommended\n• Repeat FIB-4 annually\n• Consider non-invasive monitoring",
      };
    } else if (numScore > 3.25) {
      return {
        risk: "High Risk",
        color: "#F44336",
        detail: "PPV 65% for advanced fibrosis. Consider liver biopsy.",
        action: "• Urgent hepatology referral recommended\n• Consider liver biopsy\n• Enhanced monitoring required",
      };
    } else {
      return {
        risk: "Intermediate Risk",
        color: "#FFC107",
        detail: "Indeterminate result requiring further assessment.",
        action: "• Consider additional testing (e.g., elastography)\n• More frequent monitoring\n• Hepatology consultation may be warranted",
      };
    }
  };

  const renderHistoryChart = () => {
    if (history.length < 2) return null;

    const data = {
      labels: history.map((h, i) => `Test ${i + 1}`),
      datasets: [{
        data: history.map(h => parseFloat(h.score)),
        color: (opacity = 1) => `rgba(39, 199, 184, ${opacity})`,
      }],
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>FIB-4 Score Trend</Text>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            backgroundGradientFrom: "#FFFFFF",
            backgroundGradientTo: "#FFFFFF",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 36, 50, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const isAbnormal = (value, type) => {
    const range = ReferenceRanges[type];
    const numValue = parseFloat(value);
    return numValue < range.low || numValue > range.high;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FIB-4 Score Calculator</Text>
        <TouchableOpacity onPress={() => setShowInfo(true)} style={styles.infoButton}>
          <Text style={styles.infoButtonText}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Patient ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Patient ID"
            value={patientData.id}
            onChangeText={(text) => setPatientData({...patientData, id: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age (years)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            keyboardType="numeric"
            value={patientData.age}
            onChangeText={(text) => setPatientData({...patientData, age: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            AST (U/L) 
            <Text style={styles.referenceRange}> [Normal: {ReferenceRanges.AST.low}-{ReferenceRanges.AST.high}]</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              patientData.ast && isAbnormal(patientData.ast, "AST") && styles.abnormalInput
            ]}
            placeholder="Enter AST value"
            keyboardType="numeric"
            value={patientData.ast}
            onChangeText={(text) => setPatientData({...patientData, ast: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            ALT (U/L)
            <Text style={styles.referenceRange}> [Normal: {ReferenceRanges.ALT.low}-{ReferenceRanges.ALT.high}]</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              patientData.alt && isAbnormal(patientData.alt, "ALT") && styles.abnormalInput
            ]}
            placeholder="Enter ALT value"
            keyboardType="numeric"
            value={patientData.alt}
            onChangeText={(text) => setPatientData({...patientData, alt: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Platelet Count (×10⁹/L)
            <Text style={styles.referenceRange}> [Normal: {ReferenceRanges.Platelets.low}-{ReferenceRanges.Platelets.high}]</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              patientData.plateletCount && isAbnormal(patientData.plateletCount, "Platelets") && styles.abnormalInput
            ]}
            placeholder="Enter platelet count"
            keyboardType="numeric"
            value={patientData.plateletCount}
            onChangeText={(text) => setPatientData({...patientData, plateletCount: text})}
          />
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateFIB4}>
          <Text style={styles.calculateButtonText}>Calculate FIB-4 Score</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Results</Text>
          <View style={[styles.scoreContainer, { backgroundColor: interpretResult(result.score).color + '20' }]}>
            <Text style={styles.scoreLabel}>FIB-4 Score</Text>
            <Text style={[styles.scoreValue, { color: interpretResult(result.score).color }]}>
              {result.score}
            </Text>
            <Text style={styles.riskLevel}>{interpretResult(result.score).risk}</Text>
          </View>
          
          <View style={styles.interpretationContainer}>
            <Text style={styles.interpretationTitle}>Clinical Interpretation</Text>
            <Text style={styles.interpretationText}>{interpretResult(result.score).detail}</Text>
            
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
            <Text style={styles.recommendationsText}>{interpretResult(result.score).action}</Text>
          </View>
        </View>
      )}

      {renderHistoryChart()}

      <Modal visible={showInfo} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About FIB-4 Score</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                The FIB-4 index is a non-invasive scoring system that helps identify liver fibrosis in patients with chronic liver disease. It combines:
                {"\n\n"}• Age
                {"\n"}• AST (Aspartate Aminotransferase)
                {"\n"}• ALT (Alanine Aminotransferase)
                {"\n"}• Platelet count
                {"\n\n"}Interpretation Guidelines:
                {"\n\n"}• Score below 1.45: Low risk of advanced fibrosis
                {"\n"}• Score 1.45-3.25: Intermediate risk
                {"\n"}• Score above 3.25: High risk of advanced fibrosis
                {"\n\n"}Clinical Use:
                {"\n\n"}• Initial assessment of liver fibrosis
                {"\n"}• Monitoring disease progression
                {"\n"}• Guiding referral decisions
                {"\n\n"}Limitations:
                {"\n\n"}• Not validated in all liver diseases
                {"\n"}• May be affected by concurrent conditions
                {"\n"}• Should be interpreted in clinical context
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowInfo(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F9",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002432",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 8,
    fontWeight: "500",
  },
  referenceRange: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "normal",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  },
  abnormalInput: {
    borderColor: "#F44336",
    backgroundColor: "#FFF5F5",
  },
  calculateButton: {
    backgroundColor: "#27C7B8",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  calculateButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002432",
    marginBottom: 16,
  },
  scoreContainer: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  riskLevel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4B5563",
  },
  interpretationContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002432",
    marginBottom: 8,
  },
  interpretationText: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002432",
    marginBottom: 8,
  },
  recommendationsText: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002432",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
    marginVertical: 8,
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#27C7B8",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxHeight: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002432",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#27C7B8",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FIB4Calculator;