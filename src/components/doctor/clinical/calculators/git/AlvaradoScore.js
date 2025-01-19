import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AlvaradoScore = () => {
  const [painLocation, setPainLocation] = useState('');
  const [anorexia, setAnorexia] = useState('No');
  const [nausea, setNausea] = useState('No');
  const [reboundTenderness, setReboundTenderness] = useState('No');
  const [temperature, setTemperature] = useState('');
  const [leucocytosis, setLeucocytosis] = useState('No');

  // Function to calculate Alvarado score
  const calculateAlvaradoScore = () => {
    let score = 0;

    // Pain location (Right lower quadrant pain = 2 points)
    if (painLocation === 'Right lower quadrant') score += 2;

    // Anorexia (Yes = 1 point)
    if (anorexia === 'Yes') score += 1;

    // Nausea (Yes = 1 point)
    if (nausea === 'Yes') score += 1;

    // Rebound tenderness (Yes = 1 point)
    if (reboundTenderness === 'Yes') score += 1;

    // Temperature (Above 37.3°C = 1 point)
    if (parseFloat(temperature) > 37.3) score += 1;

    // Leucocytosis (Yes = 2 points)
    if (leucocytosis === 'Yes') score += 2;

    return score;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alvarado Score for Appendicitis</Text>

      {/* Pain location */}
      <View style={styles.inputContainer}>
        <Text>Pain Location:</Text>
        <Picker
          selectedValue={painLocation}
          style={styles.picker}
          onValueChange={(itemValue) => setPainLocation(itemValue)}>
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="Right lower quadrant" value="Right lower quadrant" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Anorexia */}
      <View style={styles.inputContainer}>
        <Text>Anorexia:</Text>
        <Picker
          selectedValue={anorexia}
          style={styles.picker}
          onValueChange={(itemValue) => setAnorexia(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Nausea */}
      <View style={styles.inputContainer}>
        <Text>Nausea:</Text>
        <Picker
          selectedValue={nausea}
          style={styles.picker}
          onValueChange={(itemValue) => setNausea(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Rebound Tenderness */}
      <View style={styles.inputContainer}>
        <Text>Rebound Tenderness:</Text>
        <Picker
          selectedValue={reboundTenderness}
          style={styles.picker}
          onValueChange={(itemValue) => setReboundTenderness(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Temperature */}
      <View style={styles.inputContainer}>
        <Text>Temperature (°C):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={temperature}
          onChangeText={(text) => setTemperature(text)}
        />
      </View>

      {/* Leucocytosis */}
      <View style={styles.inputContainer}>
        <Text>Leucocytosis:</Text>
        <Picker
          selectedValue={leucocytosis}
          style={styles.picker}
          onValueChange={(itemValue) => setLeucocytosis(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Display calculated score */}
      <Text style={styles.result}>
        Alvarado Score: {calculateAlvaradoScore()} (Lower score suggests less likelihood of appendicitis)
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    marginTop: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AlvaradoScore;
