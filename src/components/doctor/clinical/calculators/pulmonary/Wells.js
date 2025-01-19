import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CriteriaOption = ({ title, value, onToggle, points }) => (
  <TouchableOpacity 
    style={[styles.criteriaCard, value && styles.criteriaCardSelected]} 
    onPress={onToggle}
  >
    <View style={styles.criteriaHeader}>
      <Text style={styles.criteriaTitle}>{title}</Text>
      <Text style={styles.criteriaPoints}>+{points} pts</Text>
    </View>
    <View style={styles.criteriaSelection}>
      <Icon 
        name={value ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"} 
        size={24} 
        color={value ? "#2563EB" : "#94A3B8"}
      />
    </View>
  </TouchableOpacity>
);

const WellsScoreCalculator = () => {
  const [criteria, setCriteria] = useState({
    clinicalSigns: false,
    alternativeDiagnosis: false,
    immobilization: false,
    previousPE: false,
    heartRate: "",
    cancer: false,
    hemoptysis: false,
  });
  const [score, setScore] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateScore = () => {
    if (criteria.heartRate === "") {
      Alert.alert("Required Input", "Please enter the heart rate value.");
      return;
    }

    const heartRateValue = parseInt(criteria.heartRate, 10);
    if (isNaN(heartRateValue)) {
      Alert.alert("Invalid Input", "Please enter a valid heart rate.");
      return;
    }

    let totalScore = 0;
    totalScore += criteria.clinicalSigns ? 3 : 0;
    totalScore += criteria.alternativeDiagnosis ? 3 : 0;
    totalScore += criteria.immobilization ? 1.5 : 0;
    totalScore += criteria.previousPE ? 1.5 : 0;
    totalScore += heartRateValue > 100 ? 1.5 : 0;
    totalScore += criteria.cancer ? 1 : 0;
    totalScore += criteria.hemoptysis ? 1 : 0;

    setScore(totalScore);
    setShowGuidance(true);
  };

  const getRiskLevel = (score) => {
    if (score < 2) return { level: "Low Risk", color: "#059669" };
    if (score <= 6) return { level: "Moderate Risk", color: "#D97706" };
    return { level: "High Risk", color: "#DC2626" };
  };

  const getRecommendation = (score) => {
    if (score < 2) {
      return "Consider D-dimer testing or PERC rule to rule out PE. If D-dimer negative, consider stopping workup.";
    } else if (score <= 6) {
      return "Consider high-sensitivity D-dimer testing or CTA. If D-dimer negative, consider stopping workup.";
    }
    return "CTA recommended. D-dimer testing not recommended at this risk level.";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wells' Criteria</Text>
          <Text style={styles.subtitle}>Pulmonary Embolism Risk Assessment</Text>
        </View>

        <View style={styles.criteriaContainer}>
          <CriteriaOption
            title="Clinical Signs of DVT"
            value={criteria.clinicalSigns}
            onToggle={() => setCriteria({...criteria, clinicalSigns: !criteria.clinicalSigns})}
            points={3}
          />

          <CriteriaOption
            title="PE is #1 Diagnosis"
            value={criteria.alternativeDiagnosis}
            onToggle={() => setCriteria({...criteria, alternativeDiagnosis: !criteria.alternativeDiagnosis})}
            points={3}
          />

          <View style={styles.criteriaCard}>
            <Text style={styles.criteriaTitle}>Heart Rate</Text>
            <TextInput
              style={styles.heartRateInput}
              placeholder="Enter BPM"
              keyboardType="numeric"
              value={criteria.heartRate}
              onChangeText={(value) => setCriteria({...criteria, heartRate: value})}
            />
          </View>

          <CriteriaOption
            title="Immobilization/Recent Surgery"
            value={criteria.immobilization}
            onToggle={() => setCriteria({...criteria, immobilization: !criteria.immobilization})}
            points={1.5}
          />

          <CriteriaOption
            title="Previous PE/DVT"
            value={criteria.previousPE}
            onToggle={() => setCriteria({...criteria, previousPE: !criteria.previousPE})}
            points={1.5}
          />

          <CriteriaOption
            title="Hemoptysis"
            value={criteria.hemoptysis}
            onToggle={() => setCriteria({...criteria, hemoptysis: !criteria.hemoptysis})}
            points={1}
          />

          <CriteriaOption
            title="Active Cancer"
            value={criteria.cancer}
            onToggle={() => setCriteria({...criteria, cancer: !criteria.cancer})}
            points={1}
          />
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateScore}>
          <Text style={styles.calculateButtonText}>Calculate Score</Text>
        </TouchableOpacity>

        {showGuidance && (
          <View style={styles.resultSection}>
            <View style={[styles.scoreCard, { backgroundColor: getRiskLevel(score).color + '20' }]}>
              <Text style={styles.scoreValue}>{score.toFixed(1)}</Text>
              <Text style={[styles.riskLevel, { color: getRiskLevel(score).color }]}>
                {getRiskLevel(score).level}
              </Text>
            </View>

            <View style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>Clinical Recommendation</Text>
              <Text style={styles.recommendationText}>{getRecommendation(score)}</Text>
            </View>

            <View style={styles.clinicalGuidance}>
              <Text style={styles.guidanceTitle}>Critical Actions</Text>
              <Text style={styles.guidanceText}>• Never delay resuscitation for diagnostic testing in unstable patients</Text>
              <Text style={styles.guidanceText}>• Consider age-adjusted D-dimer cutoffs for patients >50 years</Text>
              <Text style={styles.guidanceText}>• High-risk patients should proceed directly to CTA</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginTop: 4,
  },
  criteriaContainer: {
    gap: 12,
  },
  criteriaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  criteriaCardSelected: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
    borderWidth: 1,
  },
  criteriaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  criteriaTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
  },
  criteriaPoints: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  criteriaSelection: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  heartRateInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultSection: {
    gap: 16,
  },
  scoreCard: {
    alignItems: "center",
    padding: 24,
    borderRadius: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "700",
    color: "#1E293B",
  },
  riskLevel: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
  clinicalGuidance: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  guidanceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  guidanceText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default WellsScoreCalculator;