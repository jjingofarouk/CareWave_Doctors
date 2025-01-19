import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Prescriptions from './Prescriptions'; // New component for prescriptions

const ViewMedicalHistory = ({ navigation }) => {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]); // State for prescriptions
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error handling

  const handleSubmit = () => {
    setLoading(true);
    setError('');
    
    // Assuming we have an API endpoint to fetch patient data
    fetch(`/api/patient/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data.patient);
        setHistory(data.history);
        setPrescriptions(data.prescriptions); // Assuming prescriptions come from the same API call
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch patient data. Please try again.');
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Medical History</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Patient ID"
        value={patientId}
        onChangeText={(text) => setPatientId(text)}
      />

      <Button title="View Medical History" onPress={handleSubmit} />

      {loading && <ActivityIndicator size="large" color="#004C54" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}

      {patient && (
        <>
          <Text style={styles.subHeader}>Patient Information:</Text>
          <Text>Name: {patient.name}</Text>
          <Text>Age: {patient.age}</Text>
          {/* Other patient details can be displayed here */}

          <Prescriptions prescriptions={prescriptions} /> {/* New prescriptions component */}
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to Home</Text>
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
  input: {
    height: 40,
    borderColor: '#004C54',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },
  link: {
    color: '#004C54',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default ViewMedicalHistory;
