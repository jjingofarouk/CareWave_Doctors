import React, { useState } from 'react';
import { View, Text,  StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const UlcerativeColitisActivity = () => {
  // State variables to store user inputs
  const [stoolFrequency, setStoolFrequency] = useState(0); // Stool frequency (per day)
  const [bloodInStool, setBloodInStool] = useState('None'); // Blood in stool (None, Occasional, Severe)
  const [generalCondition, setGeneralCondition] = useState('Good'); // General condition (Good, Fair, Poor)

  // Calculate UCAI Score
  const calculateUCAI = () => {
    let score = 0;

    // Stool frequency scoring (per day)
    if (stoolFrequency >= 1 && stoolFrequency <= 3) score += 1;
    if (stoolFrequency >= 4 && stoolFrequency <= 6) score += 2;
    if (stoolFrequency >= 7 && stoolFrequency <= 9) score += 3;
    if (stoolFrequency >= 10) score += 4;

    // Blood in stool scoring
    if (bloodInStool === 'Occasional') score += 2;
    if (bloodInStool === 'Severe') score += 4;

    // General condition scoring
    if (generalCondition === 'Fair') score += 2;
    if (generalCondition === 'Poor') score += 4;

    return score;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ulcerative Colitis Activity Index</Text>

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

      {/* Blood in Stool */}
      <View style={styles.inputContainer}>
        <Text>Blood in Stool:</Text>
        <Picker
          selectedValue={bloodInStool}
          style={styles.picker}
          onValueChange={(itemValue) => setBloodInStool(itemValue)}>
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Occasional" value="Occasional" />
          <Picker.Item label="Severe" value="Severe" />
        </Picker>
      </View>

      {/* General Condition */}
      <View style={styles.inputContainer}>
        <Text>General Condition:</Text>
        <Picker
          selectedValue={generalCondition}
          style={styles.picker}
          onValueChange={(itemValue) => setGeneralCondition(itemValue)}>
          <Picker.Item label="Good" value="Good" />
          <Picker.Item label="Fair" value="Fair" />
          <Picker.Item label="Poor" value="Poor" />
        </Picker>
      </View>

      {/* Display calculated UCAI score */}
      <Text style={styles.result}>UCAI Score: {calculateUCAI()}</Text>

      {/* Optional button to reset values */}
      <Button title="Reset" onPress={() => {
        setStoolFrequency(0);
        setBloodInStool('None');
        setGeneralCondition('Good');
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

export default UlcerativeColitisActivity;
