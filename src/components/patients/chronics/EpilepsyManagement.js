import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import useNotifications from './hooks/UseNotifications';
import { Picker } from '@react-native-picker/picker';

const EpilepsyManagement = () => {
  const [seizureType, setSeizureType] = useState('');
  const [seizureLog, setSeizureLog] = useState('');
  const [medications, setMedications] = useState([]);
  const [medicationAdherence, setMedicationAdherence] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [emergencyPlan, setEmergencyPlan] = useState('');
  const { notify } = useNotifications();

  useEffect(() => {
    // Fetch medications and guidelines for epilepsy management
  }, []);

  const handleSeizureTypeSelect = (selectedType) => {
    setSeizureType(selectedType);
    notify('Seizure Type Selected', `You selected seizure type: ${selectedType}`);
  };

  const handleSeizureLog = () => {
    notify('Seizure Logged', 'Your seizure has been logged successfully.');
  };

  const handleMedicationAdherenceLog = () => {
    notify('Adherence Logged', 'Your medication adherence has been logged.');
  };

  const handleAppointmentSchedule = () => {
    notify('Appointment Scheduled', `Your appointment is scheduled for ${appointmentDate}`);
  };

  const handleEmergencyPlanUpdate = () => {
    notify('Emergency Plan Updated', 'Your emergency plan has been updated.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Epilepsy Management</Text>

      {/* Seizure Type Selection */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Select Seizure Type</Text>
        <Picker
          selectedValue={seizureType}
          onValueChange={handleSeizureTypeSelect}
          style={styles.picker}
        >
          <Picker.Item label="Focal Seizure" value="Focal Seizure" />
          <Picker.Item label="Generalized Seizure" value="Generalized Seizure" />
          <Picker.Item label="Unknown Onset" value="Unknown Onset" />
        </Picker>
        <Text style={styles.cardContent}>
          Identifying seizure types is essential for effective management and treatment planning.
        </Text>
      </View>

      {/* Seizure Logging */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Log Seizures</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Seizure Details"
          value={seizureLog}
          onChangeText={setSeizureLog}
        />
        <Button
          title="Log Seizure"
          onPress={handleSeizureLog}
          icon={<FontAwesome5 name="brain" size={20} />}
        />
      </View>

      {/* Medication Management */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Medication Management</Text>
        <Text style={styles.cardContent}>
          Adherence to prescribed medications is crucial in managing epilepsy. Common medications include:
        </Text>
        <Text>- Levetiracetam (Keppra)</Text>
        <Text>- Lamotrigine (Lamictal)</Text>
        <Text>- Valproate (Depakote)</Text>
        <Text>- Carbamazepine (Tegretol)</Text>
        <Picker
          selectedValue={medications}
          onValueChange={(itemValue) => setMedications(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Levetiracetam" value="Levetiracetam" />
          <Picker.Item label="Lamotrigine" value="Lamotrigine" />
          <Picker.Item label="Valproate" value="Valproate" />
          <Picker.Item label="Carbamazepine" value="Carbamazepine" />
        </Picker>
      </View>

      {/* Medication Adherence Tracking */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Log Medication Adherence</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Adherence Details"
          value={medicationAdherence}
          onChangeText={setMedicationAdherence}
        />
        <Button
          title="Log Adherence"
          onPress={handleMedicationAdherenceLog}
          icon={<FontAwesome5 name="notes-medical" size={20} />}
        />
      </View>

      {/* Appointment Scheduling */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Schedule Appointment</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Select Appointment Date"
          value={appointmentDate}
          onChangeText={setAppointmentDate}
        />
        <Button
          title="Schedule Appointment"
          onPress={handleAppointmentSchedule}
          icon={<Ionicons name="ios-clock" size={20} />}
        />
      </View>

      {/* Emergency Plan */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Emergency Plan</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Emergency Plan Details"
          value={emergencyPlan}
          onChangeText={setEmergencyPlan}
        />
        <Button
          title="Update Emergency Plan"
          onPress={handleEmergencyPlanUpdate}
          icon={<FontAwesome5 name="file-medical-alt" size={20} />}
        />
        <Text style={styles.cardContent}>
          Having an emergency plan is essential for safety during seizures. Ensure caregivers are aware of the plan.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default EpilepsyManagement;
