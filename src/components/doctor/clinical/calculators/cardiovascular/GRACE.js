import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ScrollView,
  Alert,
} from "react-native";

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 30,
    color: "#002432",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#002432",
  },
  inputField: {
    height: 45,
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 10,
    color: "#002432",
  },
  button: {
    backgroundColor: "#27c7b8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  resultContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#d0d0d0",
    paddingTop: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#27c7b8",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#002432",
  },
};

const GRACECalculator = () => {
  const [age, setAge] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [killipClass, setKillipClass] = useState(0);
  const [cardiacArrest, setCardiacArrest] = useState(false);
  const [stSegmentDeviation, setSTSegmentDeviation] = useState(false);
  const [elevatedBiomarkers, setElevatedBiomarkers] = useState(false);
  const [result, setResult] = useState(null);

  const calculateGRACE = () => {
    const ageNum = parseInt(age);
    const heartRateNum = parseInt(heartRate);
    const systolicBPNum = parseInt(systolicBP);
    const creatinineNum = parseFloat(creatinine);

    if (
      isNaN(ageNum) ||
      isNaN(heartRateNum) ||
      isNaN(systolicBPNum) ||
      isNaN(creatinineNum)
    ) {
      Alert.alert("Invalid Input", "Please enter valid numeric values.");
      return;
    }

    let score = 0;

    // Age scoring
    if (ageNum < 30) score += 0;
    else if (ageNum <= 39) score += 8;
    else if (ageNum <= 49) score += 25;
    else if (ageNum <= 59) score += 41;
    else if (ageNum <= 69) score += 58;
    else if (ageNum <= 79) score += 75;
    else if (ageNum <= 89) score += 91;
    else score += 100;

    // Heart rate scoring
    if (heartRateNum < 50) score += 0;
    else if (heartRateNum <= 69) score += 3;
    else if (heartRateNum <= 89) score += 9;
    else if (heartRateNum <= 109) score += 15;
    else if (heartRateNum <= 149) score += 24;
    else if (heartRateNum <= 199) score += 38;
    else score += 46;

    // Systolic blood pressure scoring
    if (systolicBPNum < 80) score += 58;
    else if (systolicBPNum <= 99) score += 53;
    else if (systolicBPNum <= 119) score += 43;
    else if (systolicBPNum <= 139) score += 34;
    else if (systolicBPNum <= 159) score += 24;
    else if (systolicBPNum <= 199) score += 10;
    else score += 0;

    // Creatinine scoring
    if (creatinineNum < 0.4) score += 1;
    else if (creatinineNum <= 0.79) score += 4;
    else if (creatinineNum <= 1.19) score += 7;
    else if (creatinineNum <= 1.59) score += 10;
    else if (creatinineNum <= 1.99) score += 13;
    else if (creatinineNum <= 3.99) score += 21;
    else score += 28;

    // Killip class scoring
    if (killipClass === 1) score += 0;
    else if (killipClass === 2) score += 20;
    else if (killipClass === 3) score += 39;
    else if (killipClass === 4) score += 59;

    // Additional factors
    if (cardiacArrest) score += 39;
    if (stSegmentDeviation) score += 28;
    if (elevatedBiomarkers) score += 14;

    setResult(score);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>GRACE Risk Calculator</Text>

      <Text style={styles.inputLabel}>Age</Text>
      <TextInput
        style={styles.inputField}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Enter Age"
      />

      <Text style={styles.inputLabel}>Heart Rate (bpm)</Text>
      <TextInput
        style={styles.inputField}
        keyboardType="numeric"
        value={heartRate}
        onChangeText={setHeartRate}
        placeholder="Enter Heart Rate"
      />

      <Text style={styles.inputLabel}>Systolic Blood Pressure (mmHg)</Text>
      <TextInput
        style={styles.inputField}
        keyboardType="numeric"
        value={systolicBP}
        onChangeText={setSystolicBP}
        placeholder="Enter Systolic BP"
      />

      <Text style={styles.inputLabel}>Creatinine (mg/dl)</Text>
      <TextInput
        style={styles.inputField}
        keyboardType="numeric"
        value={creatinine}
        onChangeText={setCreatinine}
        placeholder="Enter Serum Creatinine"
      />

      <Text style={styles.inputLabel}>Killip Class</Text>
      <TextInput
        style={styles.inputField}
        keyboardType="numeric"
        value={String(killipClass)}
        onChangeText={(text) => setKillipClass(parseInt(text) || 0)}
        placeholder="Enter Killip Class (1-4)"
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Cardiac Arrest at Admission</Text>
        <Switch value={cardiacArrest} onValueChange={setCardiacArrest} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>ST Segment Deviation</Text>
        <Switch value={stSegmentDeviation} onValueChange={setSTSegmentDeviation} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Elevated Cardiac Biomarkers</Text>
        <Switch value={elevatedBiomarkers} onValueChange={setElevatedBiomarkers} />
      </View>

      <View style={styles.button}>
        <Button title="Calculate GRACE" onPress={calculateGRACE} color="#fff" />
      </View>

      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>GRACE Score</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default GRACECalculator;
