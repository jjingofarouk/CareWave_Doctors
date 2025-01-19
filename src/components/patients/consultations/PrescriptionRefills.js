import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const PrescriptionRefills = () => {
  const [prescriptionRefill, setPrescriptionRefill] = useState({
    medication: '',
    dosage: '',
    quantity: '',
  });

  const handleSubmit = () => {
    // Validate fields
    if (!prescriptionRefill.medication || !prescriptionRefill.dosage || !prescriptionRefill.quantity) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    console.log('Prescription refill request:', prescriptionRefill);

    // Simulate a backend request (e.g., API call)
    Alert.alert('Request Submitted', 'Your prescription refill request has been submitted.');

    // Clear fields after submitting
    setPrescriptionRefill({
      medication: '',
      dosage: '',
      quantity: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescription Refills</Text>

      {/* Medication Input */}
      <TextInput
        style={styles.input}
        placeholder="Medication"
        value={prescriptionRefill.medication}
        onChangeText={(text) => setPrescriptionRefill({ ...prescriptionRefill, medication: text })}
      />

      {/* Dosage Input */}
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={prescriptionRefill.dosage}
        onChangeText={(text) => setPrescriptionRefill({ ...prescriptionRefill, dosage: text })}
      />

      {/* Quantity Input */}
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={prescriptionRefill.quantity}
        onChangeText={(text) => setPrescriptionRefill({ ...prescriptionRefill, quantity: text })}
      />

      {/* Submit Button */}
      <Button title="Request Refill" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default PrescriptionRefills;
