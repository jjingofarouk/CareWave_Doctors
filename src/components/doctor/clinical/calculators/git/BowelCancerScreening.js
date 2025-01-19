import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BowelCancerScreening = () => {
  const [age, setAge] = useState('');
  const [familyHistory, setFamilyHistory] = useState('No');
  const [diet, setDiet] = useState('Unhealthy');
  const [smoking, setSmoking] = useState('No');
  const [symptoms, setSymptoms] = useState('No');
  const [screeningRecommendation, setScreeningRecommendation] = useState('');

  const calculateRisk = () => {
    let riskScore = 0;

    // Age-based risk
    if (age >= 50 && age <= 74) {
      riskScore += 1; // Moderate risk, usually eligible for screening in many guidelines
    } else if (age > 74) {
      riskScore += 2; // Higher risk, need more attention or might need earlier screening
    }

    // Family history
    if (familyHistory === 'Yes') {
      riskScore += 2; // Higher risk if family history is positive
    }

    // Diet
    if (diet === 'Unhealthy') {
      riskScore += 1; // Unhealthy diet increases the risk
    }

    // Smoking
    if (smoking === 'Yes') {
      riskScore += 1; // Smoking increases the risk
    }

    // Symptoms (e.g., blood in stool, persistent abdominal pain)
    if (symptoms === 'Yes') {
      riskScore += 2; // Immediate attention is needed if symptoms are present
    }

    return riskScore;
  };

  // Function to get screening recommendation based on risk score
  const getScreeningRecommendation = () => {
    const score = calculateRisk();
    if (score >= 5) {
      return 'High Risk: Immediate referral for screening is recommended.';
    } else if (score >= 3) {
      return 'Moderate Risk: Screening is recommended within the next 1-2 years.';
    } else {
      return 'Low Risk: Screening is recommended at the usual intervals or based on physician advice.';
    }
  };

  const handleSubmit = () => {
    setScreeningRecommendation(getScreeningRecommendation());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bowel Cancer Screening Tool</Text>

      {/* Age input */}
      <View style={styles.inputContainer}>
        <Text>Age:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
        />
      </View>

      {/* Family History input */}
      <View style={styles.inputContainer}>
        <Text>Family History of Bowel Cancer:</Text>
        <Picker
          selectedValue={familyHistory}
          style={styles.picker}
          onValueChange={(itemValue) => setFamilyHistory(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Diet input */}
      <View style={styles.inputContainer}>
        <Text>Diet:</Text>
        <Picker
          selectedValue={diet}
          style={styles.picker}
          onValueChange={(itemValue) => setDiet(itemValue)}>
          <Picker.Item label="Unhealthy" value="Unhealthy" />
          <Picker.Item label="Healthy" value="Healthy" />
        </Picker>
      </View>

      {/* Smoking input */}
      <View style={styles.inputContainer}>
        <Text>Smoking:</Text>
        <Picker
          selectedValue={smoking}
          style={styles.picker}
          onValueChange={(itemValue) => setSmoking(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Symptoms input */}
      <View style={styles.inputContainer}>
        <Text>Do you have any bowel-related symptoms? (e.g., blood in stool, persistent pain):</Text>
        <Picker
          selectedValue={symptoms}
          style={styles.picker}
          onValueChange={(itemValue) => setSymptoms(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Submit Button */}
      <Button title="Get Screening Recommendation" onPress={handleSubmit} />

      {/* Displaying recommendation */}
      {screeningRecommendation ? (
        <Text style={styles.recommendation}>{screeningRecommendation}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 5,
  },
  recommendation: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
  },
});

export default BowelCancerScreening;
