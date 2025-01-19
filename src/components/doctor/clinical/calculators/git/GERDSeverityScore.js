import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GERDSeverityScore = () => {
  // State variables to store user inputs
  const [frequency, setFrequency] = useState('None'); // Frequency of symptoms
  const [duration, setDuration] = useState('None'); // Duration of symptoms
  const [impact, setImpact] = useState('None'); // Impact of symptoms on daily life
  const [heartburn, setHeartburn] = useState('No'); // Heartburn symptoms
  const [regurgitation, setRegurgitation] = useState('No'); // Regurgitation symptoms

  // Function to calculate GERD severity score
  const calculateGERDScore = () => {
    let score = 0;

    // Frequency of symptoms (higher frequency = higher score)
    if (frequency === 'Occasional') score += 1;
    if (frequency === 'Frequent') score += 2;
    if (frequency === 'Constant') score += 3;

    // Duration of symptoms (longer duration = higher score)
    if (duration === 'Days') score += 1;
    if (duration === 'Weeks') score += 2;
    if (duration === 'Months') score += 3;

    // Impact on daily life (higher impact = higher score)
    if (impact === 'Mild') score += 1;
    if (impact === 'Moderate') score += 2;
    if (impact === 'Severe') score += 3;

    // Heartburn and regurgitation symptoms (more symptoms = higher score)
    if (heartburn === 'Yes') score += 2;
    if (regurgitation === 'Yes') score += 2;

    return score;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GERD Severity Score</Text>

      {/* Frequency of symptoms */}
      <View style={styles.inputContainer}>
        <Text>Frequency of Symptoms:</Text>
        <Picker
          selectedValue={frequency}
          style={styles.picker}
          onValueChange={(itemValue) => setFrequency(itemValue)}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Occasional" value="Occasional" />
          <Picker.Item label="Frequent" value="Frequent" />
          <Picker.Item label="Constant" value="Constant" />
        </Picker>
      </View>

      {/* Duration of symptoms */}
      <View style={styles.inputContainer}>
        <Text>Duration of Symptoms:</Text>
        <Picker
          selectedValue={duration}
          style={styles.picker}
          onValueChange={(itemValue) => setDuration(itemValue)}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Days" value="Days" />
          <Picker.Item label="Weeks" value="Weeks" />
          <Picker.Item label="Months" value="Months" />
        </Picker>
      </View>

      {/* Impact of symptoms on daily life */}
      <View style={styles.inputContainer}>
        <Text>Impact on Daily Life:</Text>
        <Picker
          selectedValue={impact}
          style={styles.picker}
          onValueChange={(itemValue) => setImpact(itemValue)}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Mild" value="Mild" />
          <Picker.Item label="Moderate" value="Moderate" />
          <Picker.Item label="Severe" value="Severe" />
        </Picker>
      </View>

      {/* Heartburn symptom */}
      <View style={styles.inputContainer}>
        <Text>Heartburn:</Text>
        <Picker
          selectedValue={heartburn}
          style={styles.picker}
          onValueChange={(itemValue) => setHeartburn(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Regurgitation symptom */}
      <View style={styles.inputContainer}>
        <Text>Regurgitation:</Text>
        <Picker
          selectedValue={regurgitation}
          style={styles.picker}
          onValueChange={(itemValue) => setRegurgitation(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Display calculated GERD severity score */}
      <Text style={styles.result}>
        GERD Severity Score: {calculateGERDScore()} (Higher score indicates more severe symptoms)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
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
  picker: {
    height: 50,
    width: 200,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default GERDSeverityScore;
