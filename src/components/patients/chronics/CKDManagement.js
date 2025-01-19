import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { FaHeartbeat, FaWater, FaNotesMedical, FaCalendarAlt } from 'react-icons/fa';
import useNotifications from './hooks/UseNotifications';
import { Picker } from '@react-native-picker/picker';

const CKDManagement = () => {
  const [stage, setStage] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [fluidIntake, setFluidIntake] = useState('');
  const [medications, setMedications] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const { notify } = useNotifications();

  useEffect(() => {
    // Fetch medications, dietary guidelines, and other necessary data
  }, []);

  const handleStageSelect = (selectedStage) => {
    setStage(selectedStage);
    notify('Stage Selected', `You selected CKD Stage: ${selectedStage}`);
  };

  const handleSymptomLog = () => {
    notify('Symptom Logged', 'Your symptom has been logged successfully.');
  };

  const handleFluidIntakeLog = () => {
    notify('Fluid Intake Logged', 'Your fluid intake has been logged.');
  };

  const handleDietaryRestrictionUpdate = () => {
    notify('Dietary Restrictions Updated', 'Your dietary restrictions have been updated.');
  };

  const handleAppointmentSchedule = () => {
    notify('Appointment Scheduled', `Your appointment is scheduled for ${appointmentDate}`);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Chronic Kidney Disease (CKD) Management</Text>

      {/* CKD Stage Selection */}
      <View style={{ marginBottom: 20 }}>
        <Text>Select CKD Stage</Text>
        <Picker selectedValue={stage} onValueChange={handleStageSelect} style={{ height: 50 }}>
          <Picker.Item label="Stage 1" value="Stage 1" />
          <Picker.Item label="Stage 2" value="Stage 2" />
          <Picker.Item label="Stage 3a" value="Stage 3a" />
          <Picker.Item label="Stage 3b" value="Stage 3b" />
          <Picker.Item label="Stage 4" value="Stage 4" />
          <Picker.Item label="Stage 5 (End-stage Kidney Disease)" value="Stage 5" />
        </Picker>
        <Text>Management strategies vary by stage and may include lifestyle modifications, medication adherence, and regular monitoring.</Text>
      </View>

      {/* Symptom Logging */}
      <View style={{ marginBottom: 20 }}>
        <Text>Log Symptoms</Text>
        <TextInput
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Enter Symptoms"
          value={symptoms}
          onChangeText={setSymptoms}
        />
        <Button title="Log Symptoms" onPress={handleSymptomLog} />
      </View>

      {/* Fluid Intake Tracking */}
      <View style={{ marginBottom: 20 }}>
        <Text>Fluid Intake Tracking</Text>
        <TextInput
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Enter Fluid Intake (Liters)"
          value={fluidIntake}
          onChangeText={setFluidIntake}
        />
        <Button title="Log Fluid Intake" onPress={handleFluidIntakeLog} />
        <Text>Proper fluid intake is essential in CKD management. Be sure to follow your healthcare provider’s recommendations.</Text>
      </View>

      {/* Medication Management */}
      <View style={{ marginBottom: 20 }}>
        <Text>Medication Management</Text>
        <Text>Adherence to prescribed medications is crucial in managing CKD. Common medications may include:</Text>
        <Text>- ACE inhibitors or ARBs (for blood pressure control)</Text>
        <Text>- Statins (for cholesterol management)</Text>
        <Text>- Phosphate binders (to manage phosphorus levels)</Text>
        <Text>- Erythropoiesis-stimulating agents (for anemia)</Text>
        <Picker selectedValue={medications} onValueChange={(itemValue) => setMedications(itemValue)} style={{ height: 50 }}>
          <Picker.Item label="Lisinopril" value="Lisinopril" />
          <Picker.Item label="Losartan" value="Losartan" />
          <Picker.Item label="Atorvastatin" value="Atorvastatin" />
          <Picker.Item label="Sevelamer" value="Sevelamer" />
          <Picker.Item label="Epoetin alfa" value="Epoetin alfa" />
        </Picker>
      </View>

      {/* Dietary Restrictions */}
      <View style={{ marginBottom: 20 }}>
        <Text>Dietary Restrictions</Text>
        <TextInput
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Enter Dietary Restrictions"
          value={dietaryRestrictions}
          onChangeText={setDietaryRestrictions}
        />
        <Button title="Update Dietary Restrictions" onPress={handleDietaryRestrictionUpdate} />
        <Text>Common dietary considerations include:</Text>
        <Text>- Limiting sodium intake to help control blood pressure.</Text>
        <Text>- Controlling protein intake based on kidney function.</Text>
        <Text>- Managing potassium and phosphorus levels to prevent complications.</Text>
      </View>

      {/* Appointment Scheduling */}
      <View style={{ marginBottom: 20 }}>
        <Text>Schedule Appointment</Text>
        <TextInput
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Select Appointment Date"
          value={appointmentDate}
          onChangeText={setAppointmentDate}
        />
        <Button title="Schedule Appointment" onPress={handleAppointmentSchedule} />
      </View>

      {/* Patient Education */}
      <View style={{ marginBottom: 20 }}>
        <Text>Patient Education</Text>
        <Text>Understanding CKD is crucial for effective management. Here are key points:</Text>
        <Text>- CKD is a progressive disease; early detection and management are vital.</Text>
        <Text>- Regular monitoring of kidney function and related parameters is essential.</Text>
        <Text>- Involve a multidisciplinary team for comprehensive care.</Text>
        <Text>- Stay informed about advances in CKD management and treatment options.</Text>
      </View>
    </ScrollView>
  );
};

export default CKDManagement;
