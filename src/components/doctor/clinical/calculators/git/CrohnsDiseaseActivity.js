import React, { useState } from 'react';
import { View, Text, TextInput,  Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CrohnsDiseaseActivity = () => {
  // State variables to store user inputs
  const [abdominalPain, setAbdominalPain] = useState(0); // Pain level (0 to 3)
  const [stoolFrequency, setStoolFrequency] = useState(0); // Stool frequency (per day)
  const [wellBeing, setWellBeing] = useState(0); // Well-being (0 to 3)
  const [complications, setComplications] = useState('None'); // Complications (None, Fistulas, etc.)
  const [extraintestinalManifestations, setExtraintestinalManifestations] = useState('None'); // None, Arthritis, etc.

  // Calculate CDAI Score
  const calculateCDAI = () => {
    let score = 0;

    // Abdominal pain scoring (0 to 3)
    score += abdominalPain;

    // Stool frequency scoring (per day)
    score += stoolFrequency * 5; // Stool frequency is multiplied by 5 for the score

    // Well-being scoring (0 to 3)
    score += wellBeing * 7; // Well-being is multiplied by 7 for the score

    // Complications scoring
    if (complications === 'Fistulas') score += 50;
    if (complications === 'Abscesses') score += 50;

    // Extra-intestinal manifestations scoring
    if (extraintestinalManifestations === 'Arthritis') score += 10;
    if (extraintestinalManifestations === 'Erythema Nodosum') score += 10;

    return score;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crohn's Disease Activity Index (CDAI)</Text>

      {/* Abdominal Pain */}
      <View style={styles.inputContainer}>
        <Text>Abdominal Pain (0 to 3):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(abdominalPain)}
          onChangeText={(value) => setAbdominalPain(Number(value))}
        />
      </View>

      {/* Stool Frequency */}
      <View style={styles.inputContainer}>
        <Text>Stool Frequency (per day):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(stoolFrequency)}
          onChangeText={(value) => setStoolFrequency(Number(value))}
        />
      </View>

      {/* Well-being */}
      <View style={styles.inputContainer}>
        <Text>Well-being (0 to 3):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(wellBeing)}
          onChangeText={(value) => setWellBeing(Number(value))}
        />
      </View>

      {/* Complications */}
      <View style={styles.inputContainer}>
        <Text>Complications:</Text>
        <Picker
          selectedValue={complications}
          style={styles.picker}
          onValueChange={(itemValue) => setComplications(itemValue)}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Fistulas" value="Fistulas" />
          <Picker.Item label="Abscesses" value="Abscesses" />
        </Picker>
      </View>

      {/* Extra-intestinal Manifestations */}
      <View style={styles.inputContainer}>
        <Text>Extra-intestinal Manifestations:</Text>
        <Picker
          selectedValue={extraintestinalManifestations}
          style={styles.picker}
          onValueChange={(itemValue) => setExtraintestinalManifestations(itemValue)}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Arthritis" value="Arthritis" />
          <Picker.Item label="Erythema Nodosum" value="Erythema Nodosum" />
        </Picker>
      </View>

      {/* Display calculated CDAI score */}
      <Text style={styles.result}>CDAI Score: {calculateCDAI()}</Text>

      {/* Optional button to reset values */}
      <Button title="Reset" onPress={() => {
        setAbdominalPain(0);
        setStoolFrequency(0);
        setWellBeing(0);
        setComplications('None');
        setExtraintestinalManifestations('None');
      }} />
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

export default CrohnsDiseaseActivity;
