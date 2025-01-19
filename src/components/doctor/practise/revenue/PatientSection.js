// components/revenue/RevenueCharts.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomSelect from '../../../utils/CustomSelect';

export const PatientSection = ({ patient, setPatient }) => {
  const patientTypes = [
    { label: 'New Patient', value: 'new' },
    { label: 'Returning Patient', value: 'returning' },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Patient ID"
          value={patient.id}
          onChangeText={(text) => setPatient({ ...patient, id: text })}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={patient.name}
          onChangeText={(text) => setPatient({ ...patient, name: text })}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <CustomSelect
        options={patientTypes}
        placeholder="Patient Type"
        onSelect={(option) => setPatient({ ...patient, type: option.value })}
        value={patientTypes.find(type => type.value === patient.type)}
        label="Patient Type"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  inputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#374151',
  },
});

export default PatientSection;