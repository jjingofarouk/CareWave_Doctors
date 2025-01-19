import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import CustomSelect from "../../../../utils/CustomSelect"; // Import your custom select component

const IdealBodyWeightCalculator = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [idealWeight, setIdealWeight] = useState(null);

  const calculateIdealWeight = () => {
    let idealWeightValue;
    if (gender === 'male') {
      idealWeightValue = 50 + 2.3 * ((height / 2.54) - 60); // Convert height from cm to inches
    } else {
      idealWeightValue = 45.5 + 2.3 * ((height / 2.54) - 60);
    }
    setIdealWeight(idealWeightValue.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ideal Body Weight Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />

      <CustomSelect
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
        style={styles.select}
      />

      <Button title="Calculate Ideal Weight" onPress={calculateIdealWeight} />

      {idealWeight && <Text style={styles.result}>Your Ideal Body Weight is: {idealWeight} kg</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f5f5f5', // Consistent background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#002432', // Consistent title color
  },
  input: {
    height: 40,
    borderColor: '#dfe4e5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#ffffff', // Input background
    color: '#002432', // Input text color
  },
  select: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff', // Dropdown background
    borderWidth: 1,
    borderColor: '#dfe4e5',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27c7b8', // Highlighted result color
  },
});

export default IdealBodyWeightCalculator;
