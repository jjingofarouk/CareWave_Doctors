import React, { useState } from 'react';
import { View, Text, TextInput,  StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HepaticEncephalopathy = () => {
  // State for grading scale parameters
  const [grade, setGrade] = useState('0'); // '0', '1', '2', '3', '4'

  // Calculate Hepatic Encephalopathy Score
  const calculateScore = () => {
    // Hepatic Encephalopathy Grading Scale (0 - 4)
    switch (grade) {
      case '0':
        return "Grade 0: No encephalopathy";
      case '1':
        return "Grade 1: Mild confusion, disorientation, or altered sleep pattern";
      case '2':
        return "Grade 2: More marked confusion, lethargy, or personality changes";
      case '3':
        return "Grade 3: Severe confusion, stupor, or inability to follow commands";
      case '4':
        return "Grade 4: Coma";
      default:
        return "Select a grade";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hepatic Encephalopathy Grading Scale</Text>

      <View style={styles.inputContainer}>
        <Text>Select Grade of Encephalopathy:</Text>
        <Picker
          selectedValue={grade}
          style={styles.picker}
          onValueChange={(itemValue) => setGrade(itemValue)}>
          <Picker.Item label="Grade 0" value="0" />
          <Picker.Item label="Grade 1" value="1" />
          <Picker.Item label="Grade 2" value="2" />
          <Picker.Item label="Grade 3" value="3" />
          <Picker.Item label="Grade 4" value="4" />
        </Picker>
      </View>

      {/* Display calculated result */}
      <View>
        <Text style={styles.result}>{calculateScore()}</Text>
      </View>
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

export default HepaticEncephalopathy;
