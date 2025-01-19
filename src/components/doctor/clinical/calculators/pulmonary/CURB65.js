import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from "react-native";

const CURB65Calculator = () => {
  const [confusion, setConfusion] = useState(false);
  const [urea, setUrea] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState({
    systolic: "",
    diastolic: "",
  });
  const [age, setAge] = useState("");
  const [score, setScore] = useState(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateScore = () => {
    if (!urea || !respiratoryRate || !bloodPressure.systolic || !bloodPressure.diastolic || !age) {
      Alert.alert("Missing Information", "Please complete all fields for accurate assessment.");
      return;
    }

    const ureaValue = parseFloat(urea);
    const ureaMgDl = ureaValue * 2.8; // Convert mmol/L to mg/dL
    const respiratoryRateValue = parseInt(respiratoryRate, 10);
    const systolicBP = parseInt(bloodPressure.systolic, 10);
    const diastolicBP = parseInt(bloodPressure.diastolic, 10);
    const ageValue = parseInt(age, 10);

    let newScore = 0;
    if (confusion) newScore += 1;
    if (ureaMgDl > 19) newScore += 1;
    if (respiratoryRateValue >= 30) newScore += 1;
    if (systolicBP < 90 || diastolicBP <= 60) newScore += 1;
    if (ageValue >= 65) newScore += 1;

    setScore(newScore);
  };

  const getRecommendations = () => {
    if (score === null) return null;
    
    const recommendations = {
      0: {
        risk: "Low Risk",
        mortality: "0.6% 30-day mortality",
        disposition: "Consider outpatient treatment",
        management: [
          "Consider oral antibiotics",
          "Ensure reliable follow-up",
          "Patient education on warning signs",
          "Follow-up within 48 hours recommended"
        ]
      },
      1: {
        risk: "Low Risk",
        mortality: "2.7% 30-day mortality",
        disposition: "Consider outpatient treatment with close follow-up",
        management: [
          "Consider oral antibiotics",
          "Ensure reliable follow-up",
          "Consider observation if other risk factors present",
          "Follow-up within 24-48 hours required"
        ]
      },
      2: {
        risk: "Moderate Risk",
        mortality: "9.2% 30-day mortality",
        disposition: "Consider short inpatient admission or observation",
        management: [
          "IV antibiotics likely needed",
          "Blood cultures before antibiotics",
          "Consider chest imaging",
          "Monitor vital signs closely"
        ]
      },
      3: {
        risk: "High Risk",
        mortality: "14.5% 30-day mortality",
        disposition: "Inpatient admission required",
        management: [
          "Urgent IV antibiotics required",
          "Blood cultures mandatory",
          "Consider respiratory support",
          "Regular vital sign monitoring"
        ]
      },
      4: {
        risk: "Severe Risk",
        mortality: "40% 30-day mortality",
        disposition: "ICU admission consideration required",
        management: [
          "Immediate IV antibiotics",
          "Possible ventilatory support",
          "Intensive monitoring",
          "Consider sepsis protocol"
        ]
      },
      5: {
        risk: "Very Severe Risk",
        mortality: "57% 30-day mortality",
        disposition: "ICU admission strongly recommended",
        management: [
          "Immediate critical care consultation",
          "Aggressive intervention likely needed",
          "Consider mechanical ventilation",
          "Implement sepsis protocol"
        ]
      }
    };

    return recommendations[score];
  };

  const ClinicalGuidanceModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showGuidance}
      onRequestClose={() => setShowGuidance(false)}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <Text style={styles.modalTitle}>Clinical Guidance</Text>
          <Text style={styles.modalSubtitle}>When to Use</Text>
          <Text style={styles.modalText}>
            • Use for adult patients with suspected community-acquired pneumonia
            • Best used at initial patient evaluation
            • Aids in determining appropriate level of care
          </Text>

          <Text style={styles.modalSubtitle}>Pearls/Pitfalls</Text>
          <Text style={styles.modalText}>
            • Score should not override clinical judgment
            • Consider additional risk factors not captured in score
            • Regular reassessment is crucial
            • Don't forget to assess for sepsis in high-risk patients
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowGuidance(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  const recommendations = getRecommendations();

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>CURB-65 Assessment</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowGuidance(true)}
          >
            <Text style={styles.infoButtonText}>ⓘ Clinical Guidance</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confusion</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>No</Text>
              <Switch
                value={confusion}
                onValueChange={setConfusion}
                trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
                thumbColor={confusion ? "#FFFFFF" : "#FFFFFF"}
                ios_backgroundColor="#E0E0E0"
              />
              <Text style={styles.switchLabel}>Yes</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Urea (mmol/L)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter value"
              keyboardType="decimal-pad"
              value={urea}
              onChangeText={setUrea}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Respiratory Rate (breaths/min)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter value"
              keyboardType="number-pad"
              value={respiratoryRate}
              onChangeText={setRespiratoryRate}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood Pressure (mmHg)</Text>
            <View style={styles.bpContainer}>
              <TextInput
                style={[styles.input, styles.bpInput]}
                placeholder="Systolic"
                keyboardType="number-pad"
                value={bloodPressure.systolic}
                onChangeText={(text) => setBloodPressure(prev => ({...prev, systolic: text}))}
              />
              <Text style={styles.bpSeparator}>/</Text>
              <TextInput
                style={[styles.input, styles.bpInput]}
                placeholder="Diastolic"
                keyboardType="number-pad"
                value={bloodPressure.diastolic}
                onChangeText={(text) => setBloodPressure(prev => ({...prev, diastolic: text}))}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age (years)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              keyboardType="number-pad"
              value={age}
              onChangeText={setAge}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateScore}>
          <Text style={styles.calculateButtonText}>Calculate Score</Text>
        </TouchableOpacity>

        {score !== null && recommendations && (
          <View style={styles.resultsCard}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>CURB-65 Score</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>

            <View style={styles.recommendationSection}>
              <Text style={styles.recommendationTitle}>{recommendations.risk}</Text>
              <Text style={styles.mortalityText}>{recommendations.mortality}</Text>
              <Text style={styles.dispositionText}>{recommendations.disposition}</Text>
              
              <Text style={styles.managementTitle}>Recommended Management:</Text>
              {recommendations.management.map((item, index) => (
                <Text key={index} style={styles.managementItem}>• {item}</Text>
              ))}
            </View>
          </View>
        )}

        <ClinicalGuidanceModal />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A5568",
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: "#F7FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#2D3748",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "#4A5568",
  },
  bpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bpInput: {
    flex: 1,
  },
  bpSeparator: {
    fontSize: 24,
    marginHorizontal: 12,
    color: "#4A5568",
  },
  calculateButton: {
    backgroundColor: "#4299E1",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  resultsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4299E1",
  },
  recommendationSection: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 20,
  },
  recommendationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 8,
  },
  mortalityText: {
    fontSize: 18,
    color: "#E53E3E",
    marginBottom: 8,
  },
  dispositionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 16,
  },
  managementTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 12,
  },
  managementItem: {
    fontSize: 16,
    color: "#4A5568",
    marginBottom: 8,
    paddingLeft: 8,
  },
  infoButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#EBF8FF",
  },
  infoButtonText: {
    color: "#4299E1",
    fontSize: 16,
    fontWeight: "600",
  },
  modalView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4A5568",
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#4299E1",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CURB65Calculator;