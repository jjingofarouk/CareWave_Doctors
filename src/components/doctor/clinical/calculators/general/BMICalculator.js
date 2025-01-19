import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100; // Convert cm to meters
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi && <Text style={styles.result}>Your BMI is: {bmi}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default BMICalculator;
