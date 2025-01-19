// MedicationManagement.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomSelect from '../../../utils/CustomSelect'; // Custom Select component

const MedicationManagement = () => {
  const [medication, setMedication] = useState('');
  const [dose, setDose] = useState('');
  const [notes, setNotes] = useState('');

  const medicationOptions = [
    { label: 'Hydroxyurea (helps reduce pain crises)', value: 'Hydroxyurea' },
    { label: 'Penicillin (helps prevent infections)', value: 'Penicillin' },
    { label: 'Folic Acid (supports healthy red blood cells)', value: 'Folic Acid' },
    { label: 'Crizanlizumab (helps reduce painful episodes)', value: 'Crizanlizumab' },
    { label: 'L-glutamine (helps reduce oxidative stress)', value: 'L-glutamine' },
  ];

  const handleMedicationChange = (selectedOption) => {
    setMedication(selectedOption.label);
  };

  const handleLogMedication = () => {
    alert(`You logged: ${medication} with dose ${dose}. Notes: ${notes}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Your Medications</Text>
      <Text style={styles.info}>
        It's important to track your medications to ensure they are working well for you. Please select the medication you're taking and log your dose and any notes.
      </Text>

      {/* Custom Select for Medication */}
      <CustomSelect 
        options={medicationOptions} 
        placeholder="Select Medication" 
        onSelect={handleMedicationChange} 
        label="Medication"
      />

      {/* Dose Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Enter Dose Taken" 
        value={dose}
        onChangeText={setDose}
      />

      {/* Notes Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Any Notes (e.g., side effects)" 
        value={notes}
        onChangeText={setNotes}
      />

      {/* Button to log the medication */}
      <Button title="Log Medication" onPress={handleLogMedication} color="#FF7043" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Consistent with the other components
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54', // Consistent with other component headers
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333333', // Dark Gray text
    lineHeight: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default MedicationManagement;
