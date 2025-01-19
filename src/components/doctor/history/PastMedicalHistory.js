import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomSelect from '../../utils/CustomSelect'; // Import your custom select component
import { chronicConditionsOptions } from './ChronicConditions'; // Adjust paths as needed
import { specificIllnessesOptions } from './SpecificIllnesses';
import { medicationOptions } from './MedicationOptions';
import { vaccinationOptions } from './VaccinationOptions'; // Add vaccination options if available

const PastMedicalHistory = ({ pastMedicalHistory, handleInputChange, handleArrayInputChange }) => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [medications, setMedications] = useState(pastMedicalHistory.medications || []);
  const [allergies, setAllergies] = useState(pastMedicalHistory.allergies || []);
  const [specificIllnesses, setSpecificIllnesses] = useState(pastMedicalHistory.specificIllnesses || []);
  const [surgeries, setSurgeries] = useState(pastMedicalHistory.surgeries || []);
  const [vaccinations, setVaccinations] = useState(pastMedicalHistory.vaccinations || []);
  const [otherNotes, setOtherNotes] = useState(pastMedicalHistory.otherNotes || '');

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    if (condition && !pastMedicalHistory.conditions?.includes(condition)) {
      handleArrayInputChange('conditions', [...(pastMedicalHistory.conditions || []), condition]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Past Medical History</Text>

      {/* Chronic Conditions */}
      <Text style={styles.sectionHeader}>Chronic Conditions</Text>
      <CustomSelect
        selectedValue={selectedCondition}
        onValueChange={handleConditionSelect}
        options={chronicConditionsOptions || []}
        placeholder="Select chronic conditions"
        multiple
      />

      {/* Previous Hospitalizations */}
      <Text style={styles.sectionHeader}>Hospitalizations</Text>
      <Text style={styles.label}>Include dates and reasons for past hospitalizations:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g., 2018 - Pneumonia treatment"
        placeholderTextColor="#888888"
        value={pastMedicalHistory.hospitalizations || ''}
        onChangeText={(text) => handleInputChange('pastMedicalHistory', 'hospitalizations', text)}
        multiline
      />

      {/* Surgeries */}
      <Text style={styles.sectionHeader}>Surgeries</Text>
      <Text style={styles.label}>List previous surgeries with dates:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g., 2020 - Appendectomy"
        placeholderTextColor="#888888"
        value={surgeries.join(', ')}
        onChangeText={(text) => {
          setSurgeries(text.split(',').map((surgery) => surgery.trim()));
          handleArrayInputChange('surgeries', surgeries);
        }}
        multiline
      />

      {/* Allergies */}
      <Text style={styles.sectionHeader}>Allergies</Text>
      <Text style={styles.label}>List allergies (medications, food, environment):</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g., Penicillin - Rash, Peanuts - Anaphylaxis"
        placeholderTextColor="#888888"
        value={allergies.join(', ')}
        onChangeText={(text) => {
          setAllergies(text.split(',').map((allergy) => allergy.trim()));
          handleArrayInputChange('allergies', allergies);
        }}
        multiline
      />

      {/* Medications */}
      <Text style={styles.sectionHeader}>Medications</Text>
      <CustomSelect
        selectedValue={medications}
        onValueChange={(value) => {
          setMedications(value);
          handleArrayInputChange('medications', value);
        }}
        options={medicationOptions || []}
        placeholder="Select medications"
        multiple
      />

      {/* Specific Illnesses */}
      <Text style={styles.sectionHeader}>Specific Illnesses</Text>
      <CustomSelect
        selectedValue={specificIllnesses}
        onValueChange={(value) => {
          setSpecificIllnesses(value);
          handleArrayInputChange('specificIllnesses', value);
        }}
        options={specificIllnessesOptions || []}
        placeholder="Select illnesses"
        multiple
      />

      {/* Vaccinations */}
      <Text style={styles.sectionHeader}>Vaccinations</Text>
      <CustomSelect
        selectedValue={vaccinations}
        onValueChange={(value) => {
          setVaccinations(value);
          handleArrayInputChange('vaccinations', value);
        }}
        options={vaccinationOptions || []}
        placeholder="Select vaccinations"
        multiple
      />

      {/* Other Notes */}
      <Text style={styles.sectionHeader}>Additional Notes</Text>
      <Text style={styles.label}>Other relevant medical history:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter any additional information"
        placeholderTextColor="#888888"
        value={otherNotes}
        onChangeText={(text) => {
          setOtherNotes(text);
          handleInputChange('pastMedicalHistory', 'otherNotes', text);
        }}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Past Medical History Saved')}>
        <Text style={styles.buttonText}>Save Information</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PastMedicalHistory;
