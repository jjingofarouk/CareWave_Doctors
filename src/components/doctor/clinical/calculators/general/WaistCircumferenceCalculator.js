import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const WaistCircumferenceCalculator = () => {
  const [waistCircumference, setWaistCircumference] = useState('');
  const [risk, setRisk] = useState('');

  const calculateRisk = () => {
    if (waistCircumference) {
      if (waistCircumference > 94) {
        setRisk('Increased risk of metabolic complications.');
      } else {
        setRisk('Normal risk.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waist Circumference Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Waist Circumference (cm)"
        value={waistCircumference}
        onChangeText={(text) => setWaistCircumference(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate Risk" onPress={calculateRisk} />

      {risk && <Text style={styles.result}>{risk}</Text>}
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

export default WaistCircumferenceCalculator;
