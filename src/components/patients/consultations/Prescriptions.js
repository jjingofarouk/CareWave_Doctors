import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Prescriptions = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    date: '',
    medication: '',
    dosage: '',
    instructions: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Validate form inputs
    let newErrors = {};

    if (!formData.patient_id) newErrors.patient_id = 'Patient ID is required';
    if (!formData.doctor_id) newErrors.doctor_id = 'Doctor ID is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.medication) newErrors.medication = 'Medication is required';
    if (!formData.dosage) newErrors.dosage = 'Dosage is required';

    setErrors(newErrors);

    // Submit data if no errors
    if (Object.keys(newErrors).length === 0) {
      console.log('Prescription created successfully:', formData);
      // Here, you can make an API call to submit the data
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Prescription</Text>

      <View style={styles.formField}>
        <Text>Patient ID:</Text>
        <TextInput
          style={styles.input}
          value={formData.patient_id}
          onChangeText={(text) => handleChange('patient_id', text)}
          placeholder="Enter Patient ID"
        />
        {errors.patient_id && <Text style={styles.error}>{errors.patient_id}</Text>}
      </View>

      <View style={styles.formField}>
        <Text>Doctor ID:</Text>
        <TextInput
          style={styles.input}
          value={formData.doctor_id}
          onChangeText={(text) => handleChange('doctor_id', text)}
          placeholder="Enter Doctor ID"
        />
        {errors.doctor_id && <Text style={styles.error}>{errors.doctor_id}</Text>}
      </View>

      <View style={styles.formField}>
        <Text>Date:</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(text) => handleChange('date', text)}
          placeholder="YYYY-MM-DD"
        />
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}
      </View>

      <View style={styles.formField}>
        <Text>Medication:</Text>
        <TextInput
          style={styles.input}
          value={formData.medication}
          onChangeText={(text) => handleChange('medication', text)}
          placeholder="Enter Medication"
        />
        {errors.medication && <Text style={styles.error}>{errors.medication}</Text>}
      </View>

      <View style={styles.formField}>
        <Text>Dosage:</Text>
        <TextInput
          style={styles.input}
          value={formData.dosage}
          onChangeText={(text) => handleChange('dosage', text)}
          placeholder="Enter Dosage"
        />
        {errors.dosage && <Text style={styles.error}>{errors.dosage}</Text>}
      </View>

      <View style={styles.formField}>
        <Text>Instructions:</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={formData.instructions}
          onChangeText={(text) => handleChange('instructions', text)}
          multiline
          numberOfLines={3}
          placeholder="Enter Instructions"
        />
      </View>

      <Button title="Create Prescription" onPress={handleSubmit} />

      <TouchableOpacity style={styles.link} onPress={() => { /* Navigate to another screen */ }}>
        <Text style={styles.linkText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formField: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#004C54',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 5,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#004C54',
    textDecorationLine: 'underline',
  },
});

export default Prescriptions;
