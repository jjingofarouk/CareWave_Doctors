import React, { useState } from 'react';
import { View, Text, TextInput, Button,  StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EnergyExpenditureCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [totalEnergyExpenditure, setTotalEnergyExpenditure] = useState(null);

  const calculateEnergyExpenditure = () => {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setTotalEnergyExpenditure((bmr * activityLevel).toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energy Expenditure Calculator</Text>

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

      <Picker
        selectedValue={activityLevel}
        style={styles.picker}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
        <Picker.Item label="Sedentary" value={1.2} />
        <Picker.Item label="Lightly Active" value={1.375} />
        <Picker.Item label="Moderately Active" value={1.55} />
        <Picker.Item label="Very Active" value={1.725} />
        <Picker.Item label="Extra Active" value={1.9} />
      </Picker>

      <Button title="Calculate Energy Expenditure" onPress={calculateEnergyExpenditure} />

      {totalEnergyExpenditure && (
        <Text style={styles.result}>
          Your Total Energy Expenditure is: {totalEnergyExpenditure} calories/day
        </Text>
      )}
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

export default EnergyExpenditureCalculator;
