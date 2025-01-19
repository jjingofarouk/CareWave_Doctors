import React, { useState } from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BristolStoolChart = () => {
  const [stoolType, setStoolType] = useState('1'); // Default to type 1

  // Function to get description based on stool type
  const getStoolDescription = () => {
    switch (stoolType) {
      case '1':
        return "Type 1: Separate hard lumps, like nuts (difficult to pass)";
      case '2':
        return "Type 2: Sausage-shaped but lumpy";
      case '3':
        return "Type 3: Like a sausage but with cracks on the surface";
      case '4':
        return "Type 4: Like a sausage or snake, smooth and soft";
      case '5':
        return "Type 5: Soft blobs with clear-cut edges (passed easily)";
      case '6':
        return "Type 6: Fluffy pieces with ragged edges, a mushy stool";
      case '7':
        return "Type 7: Watery, no solid pieces (entirely liquid)";
      default:
        return "Select a stool type";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bristol Stool Chart</Text>

      <View style={styles.inputContainer}>
        <Text>Select Stool Type:</Text>
        <Picker
          selectedValue={stoolType}
          style={styles.picker}
          onValueChange={(itemValue) => setStoolType(itemValue)}>
          <Picker.Item label="Type 1" value="1" />
          <Picker.Item label="Type 2" value="2" />
          <Picker.Item label="Type 3" value="3" />
          <Picker.Item label="Type 4" value="4" />
          <Picker.Item label="Type 5" value="5" />
          <Picker.Item label="Type 6" value="6" />
          <Picker.Item label="Type 7" value="7" />
        </Picker>
      </View>

      <Text style={styles.result}>{getStoolDescription()}</Text>
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

export default BristolStoolChart;
