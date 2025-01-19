import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, StyleSheet } from 'react-native';

const PatientDetailsForm = ({ onSave }) => {
  const [patientDetails, setPatientDetails] = useState({
    age: '',
    sex: '',
    nationality: '',
    occupation: '',
    emergencyContact: {
      name: '',
      relationship: '',
      contact: '',
    },
    insurance: {
      coverageType: '',
      provider: '',
      number: '',
    },
    currentMedications: '',
    allergies: '',
    currentIllnesses: '',
    consent: false,
  });

  const handleInputChange = (field, value) => {
    setPatientDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (field, subField, value) => {
    setPatientDetails((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Patient Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={patientDetails.age}
        onChangeText={(value) => handleInputChange('age', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sex"
        value={patientDetails.sex}
        onChangeText={(value) => handleInputChange('sex', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nationality"
        value={patientDetails.nationality}
        onChangeText={(value) => handleInputChange('nationality', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={patientDetails.occupation}
        onChangeText={(value) => handleInputChange('occupation', value)}
      />

      <Text style={styles.sectionTitle}>Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={patientDetails.emergencyContact.name}
        onChangeText={(value) => handleNestedInputChange('emergencyContact', 'name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={patientDetails.emergencyContact.relationship}
        onChangeText={(value) => handleNestedInputChange('emergencyContact', 'relationship', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={patientDetails.emergencyContact.contact}
        onChangeText={(value) => handleNestedInputChange('emergencyContact', 'contact', value)}
        keyboardType="phone-pad"
      />

      <Text style={styles.sectionTitle}>Insurance Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Coverage Type"
        value={patientDetails.insurance.coverageType}
        onChangeText={(value) => handleNestedInputChange('insurance', 'coverageType', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Provider"
        value={patientDetails.insurance.provider}
        onChangeText={(value) => handleNestedInputChange('insurance', 'provider', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Policy Number"
        value={patientDetails.insurance.number}
        onChangeText={(value) => handleNestedInputChange('insurance', 'number', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Current Medications"
        value={patientDetails.currentMedications}
        onChangeText={(value) => handleInputChange('currentMedications', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Allergies"
        value={patientDetails.allergies}
        onChangeText={(value) => handleInputChange('allergies', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Illnesses or Chronic Conditions"
        value={patientDetails.currentIllnesses}
        onChangeText={(value) => handleInputChange('currentIllnesses', value)}
      />

      <View style={styles.switchContainer}>
        <Text>Consent to Share Information</Text>
        <Switch
          value={patientDetails.consent}
          onValueChange={(value) => handleInputChange('consent', value)}
        />
      </View>

      <Button
        title="Save Information"
        color="#FF7043"
        onPress={() => onSave(patientDetails)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

export default PatientDetailsForm;
