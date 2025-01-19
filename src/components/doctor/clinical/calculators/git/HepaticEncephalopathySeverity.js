import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HepaticEncephalopathySeverity = () => {
  // State variables for the different factors
  const [mentalState, setMentalState] = useState('');
  const [asterixis, setAsterixis] = useState('');
  const [levelOfConsciousness, setLevelOfConsciousness] = useState('');

  // Calculate the Hepatic Encephalopathy Severity Score
  const calculateScore = () => {
    let score = 0;

    // Mental State scoring (West Haven Criteria)
    if (mentalState === 'Coma') score += 4;
    else if (mentalState === 'Confused') score += 3;
    else if (mentalState === 'Drowsy') score += 2;
    else if (mentalState === 'Normal') score += 0;

    // Asterixis (Presence of asterixis increases severity)
    if (asterixis === 'Present') score += 2;
    else if (asterixis === 'Absent') score += 0;

    // Level of Consciousness (changes based on alertness)
    if (levelOfConsciousness === 'Comatose') score += 4;
    else if (levelOfConsciousness === 'Somnolent') score += 2;
    else if (levelOfConsciousness === 'Alert') score += 0;

    return score;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hepatic Encephalopathy Severity Score</Text>

      {/* Mental State Input */}
      <View style={styles.inputContainer}>
        <Text>Mental State:</Text>
        <TextInput
          style={styles.input}
          value={mentalState}
          onChangeText={(value) => setMentalState(value)}
          placeholder="Enter 'Normal', 'Drowsy', 'Confused', or 'Coma'"
        />
      </View>

      {/* Asterixis Input */}
      <View style={styles.inputContainer}>
        <Text>Asterixis (Present/Absent):</Text>
        <TextInput
          style={styles.input}
          value={asterixis}
          onChangeText={(value) => setAsterixis(value)}
          placeholder="Enter 'Present' or 'Absent'"
        />
      </View>

      {/* Level of Consciousness Input */}
      <View style={styles.inputContainer}>
        <Text>Level of Consciousness:</Text>
        <TextInput
          style={styles.input}
          value={levelOfConsciousness}
          onChangeText={(value) => setLevelOfConsciousness(value)}
          placeholder="Enter 'Alert', 'Somnolent', or 'Comatose'"
        />
      </View>

      {/* Display the calculated score */}
      <Text style={styles.result}>Severity Score: {calculateScore()}</Text>

      {/* Reset Button */}
      <Button
        title="Reset"
        onPress={() => {
          setMentalState('');
          setAsterixis('');
          setLevelOfConsciousness('');
        }}
      />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HepaticEncephalopathySeverity;
