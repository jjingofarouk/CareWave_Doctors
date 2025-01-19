import React, { useState } from "react";
import { View, Text, TextInput, Button,  StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

const CaloricNeedsCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [caloricNeeds, setCaloricNeeds] = useState(null);

  const calculateCaloricNeeds = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const activityFactor = 1.2; // Sedentary activity level
    setCaloricNeeds((bmr * activityFactor).toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caloric Needs Calculator</Text>
      
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

      <TextInput
        style={styles.input}
        placeholder="Age (years)"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Button title="Calculate Caloric Needs" onPress={calculateCaloricNeeds} />

      {caloricNeeds && <Text style={styles.result}>Your caloric needs are: {caloricNeeds} calories/day</Text>}
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default CaloricNeedsCalculator;
