import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import CustomSelect from "../../../../utils/CustomSelect";

const BishopScore = () => {
  const [dilation, setDilation] = useState("");
  const [effacement, setEffacement] = useState("");
  const [station, setStation] = useState("");
  const [consistency, setConsistency] = useState("");
  const [position, setPosition] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const calculateScore = () => {
    let score = 0;

    // More precise dilation scoring based on ACOG guidelines
    const dilationScore = {
      0: 0,
      1: 0,
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      6: 3
    };
    score += dilationScore[Math.min(6, Math.floor(dilation))] || 0;

    // Precise effacement scoring
    if (effacement <= 30) score += 0;
    else if (effacement > 30 && effacement <= 50) score += 1;
    else if (effacement > 50 && effacement <= 70) score += 2;
    else if (effacement > 70) score += 3;

    // Station scoring with precise measurements
    const stationScores = {
      "-3": 0,
      "-2": 1,
      "-1": 2,
      "0": 2,
      "+1": 3,
      "+2": 3
    };
    score += stationScores[station] || 0;

    // Consistency and position scoring
    const consistencyScores = { "Firm": 0, "Medium": 1, "Soft": 2 };
    const positionScores = { "Posterior": 0, "Mid": 1, "Anterior": 2 };
    
    score += consistencyScores[consistency] || 0;
    score += positionScores[position] || 0;

    return score;
  };

  const getInterpretation = (score) => {
    if (score <= 5) {
      return {
        text: "Unfavorable for induction",
        detail: "Success rate <50%. Consider cervical ripening.",
        color: "#FF6B6B"
      };
    } else if (score >= 6 && score <= 8) {
      return {
        text: "Moderately favorable",
        detail: "Success rate 65-85%",
        color: "#4ECDC4"
      };
    } else {
      return {
        text: "Highly favorable",
        detail: "Success rate >85%",
        color: "#2ECC71"
      };
    }
  };

  const score = calculateScore();
  const interpretation = getInterpretation(score);

  const stationOptions = [
    { label: "-3 (High)", value: "-3" },
    { label: "-2", value: "-2" },
    { label: "-1", value: "-1" },
    { label: "0 (Engaged)", value: "0" },
    { label: "+1", value: "+1" },
    { label: "+2 (Low)", value: "+2" },
  ];

  const consistencyOptions = [
    { label: "Firm (like cartilage)", value: "Firm" },
    { label: "Medium", value: "Medium" },
    { label: "Soft (like vaginal wall)", value: "Soft" },
  ];

  const positionOptions = [
    { label: "Posterior", value: "Posterior" },
    { label: "Mid-position", value: "Mid" },
    { label: "Anterior", value: "Anterior" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bishop Score Assessment</Text>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => setShowInfo(!showInfo)}
        >
          <Text style={styles.infoButtonText}>ℹ️</Text>
        </TouchableOpacity>
      </View>

      {showInfo && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Clinical Information</Text>
          <Text style={styles.infoText}>
            • The Bishop Score (1964) is the most widely used pre-induction cervical scoring system
            {"\n"}• Scores ≥8 are associated with high probability of vaginal delivery
            {"\n"}• Modified Bishop Score includes five components, each scored 0-2 or 0-3
            {"\n"}• Meta-analysis shows 85% success rate for scores above 8
            {"\n"}• ACOG recommends assessment before labor induction
          </Text>
        </View>
      )}

      <View style={styles.inputSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cervical Dilation</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter 0-6 cm"
            value={dilation}
            onChangeText={setDilation}
            maxLength={3}
          />
          <Text style={styles.sublabel}>Measured in centimeters</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cervical Effacement</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter 0-100%"
            value={effacement}
            onChangeText={setEffacement}
            maxLength={3}
          />
          <Text style={styles.sublabel}>Percentage of cervical thinning</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fetal Station</Text>
          <CustomSelect
            options={stationOptions}
            placeholder="Select station"
            onSelect={(item) => setStation(item.value)}
            label="Fetal Station"
            containerStyle={styles.select}
          />
          <Text style={styles.sublabel}>Relation to ischial spines</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cervical Consistency</Text>
          <CustomSelect
            options={consistencyOptions}
            placeholder="Select consistency"
            onSelect={(item) => setConsistency(item.value)}
            label="Cervical Consistency"
            containerStyle={styles.select}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cervical Position</Text>
          <CustomSelect
            options={positionOptions}
            placeholder="Select position"
            onSelect={(item) => setPosition(item.value)}
            label="Cervical Position"
            containerStyle={styles.select}
          />
        </View>
      </View>

      <View style={[styles.resultCard, { borderLeftColor: interpretation.color }]}>
        <Text style={styles.scoreText}>Bishop Score: {score}/13</Text>
        <Text style={[styles.interpretationText, { color: interpretation.color }]}>
          {interpretation.text}
        </Text>
        <Text style={styles.detailText}>{interpretation.detail}</Text>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#212529",
  },
  infoButton: {
    padding: 8,
  },
  infoButtonText: {
    fontSize: 20,
  },
  infoCard: {
    margin: 15,
    padding: 15,
    backgroundColor: "#E7F5FF",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#339AF0",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1971C2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },
  inputSection: {
    padding: 15,
  },
  inputGroup: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 12,
    color: "#868E96",
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#212529",
    backgroundColor: "#F8F9FA",
  },
  select: {
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  resultCard: {
    margin: 15,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 8,
  },
  interpretationText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: "#495057",
  },
};

export default BishopScore;