import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect'; // Import your custom select component

const BodyFatPercentageCalculator = () => {
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bodyFatPercentage, setBodyFatPercentage] = useState(null);

  const calculateBodyFatPercentage = () => {
    let bodyFat;
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waist + neck) - 97.684 * Math.log10(height) - 78.387;
    }
    setBodyFatPercentage(bodyFat.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body Fat Percentage Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Waist (cm)"
        value={waist}
        onChangeText={(text) => setWaist(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Neck (cm)"
        value={neck}
        onChangeText={(text) => setNeck(text)}
        keyboardType="numeric"
      />
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

      <Button title="Calculate Body Fat Percentage" onPress={calculateBodyFatPercentage} />

      {bodyFatPercentage && (
        <Text style={styles.result}>
          Your Body Fat Percentage is: {bodyFatPercentage}%
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#002432',
  },
  input: {
    height: 40,
    borderColor: '#dfe4e5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#002432',
  },
  select: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dfe4e5',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27c7b8',
  },
});

export default BodyFatPercentageCalculator;
