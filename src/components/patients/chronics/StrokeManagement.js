import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Use vector icons in React Native
import useNotifications from "./hooks/UseNotifications";
import { Picker } from '@react-native-picker/picker';

const StrokeManagement = () => {
  const [strokeType, setStrokeType] = useState("");
  const [symptomLog, setSymptomLog] = useState("");
  const [riskFactors, setRiskFactors] = useState([]);
  const [medication, setMedication] = useState("");
  const [rehabilitationGoals, setRehabilitationGoals] = useState("");
  const [emergencyPlan, setEmergencyPlan] = useState("");
  const { notify } = useNotifications();

  useEffect(() => {
    // Fetch initial data for stroke management, risk factors, and medications
  }, []);

  const handleStrokeTypeSelect = (selectedType) => {
    setStrokeType(selectedType);
    notify("Stroke Type Selected", `You selected stroke type: ${selectedType}`);
  };

  const handleSymptomLog = () => {
    // Log symptoms
    notify("Symptoms Logged", "Your symptoms have been logged successfully.");
  };

  const handleMedicationChange = (selectedMedication) => {
    setMedication(selectedMedication);
  };

  const handleRehabilitationGoalsSubmit = () => {
    // Submit rehabilitation goals
    notify("Rehabilitation Goals Submitted", "Your rehabilitation goals have been submitted.");
  };

  const handleEmergencyPlanUpdate = () => {
    // Update emergency plan
    notify("Emergency Plan Updated", "Your emergency plan has been updated.");
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Stroke Management</Text>

      {/* Stroke Type Selection */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8 }}>Select Stroke Type</Text>
        <Picker
          selectedValue={strokeType}
          onValueChange={(itemValue) => handleStrokeTypeSelect(itemValue)}
        >
          <Picker.Item label="Ischemic Stroke" value="Ischemic Stroke" />
          <Picker.Item label="Hemorrhagic Stroke" value="Hemorrhagic Stroke" />
          <Picker.Item label="Transient Ischemic Attack (TIA)" value="Transient Ischemic Attack (TIA)" />
        </Picker>
        <Text style={{ marginTop: 8 }}>
          Identifying the stroke type is essential for determining treatment and management strategies.
        </Text>
      </View>

      {/* Symptom Logging */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8 }}>Log Symptoms</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 5,
            marginBottom: 10,
            height: 100,
            textAlignVertical: "top",
          }}
          placeholder="Enter Symptoms"
          value={symptomLog}
          onChangeText={setSymptomLog}
          multiline
        />
        <Button title="Log Symptoms" onPress={handleSymptomLog} />
      </View>

      {/* Risk Factors Management */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8 }}>Manage Risk Factors</Text>
        <Text style={{ marginBottom: 8 }}>Common risk factors include:</Text>
        <Text>• High blood pressure</Text>
        <Text>• Diabetes</Text>
        <Text>• High cholesterol</Text>
        <Text>• Smoking</Text>
        <Text>• Obesity</Text>
        <Picker
          selectedValue={riskFactors}
          onValueChange={(itemValue) => setRiskFactors(itemValue)}
          multiple
        >
          <Picker.Item label="High Blood Pressure" value="High Blood Pressure" />
          <Picker.Item label="Diabetes" value="Diabetes" />
          <Picker.Item label="High Cholesterol" value="High Cholesterol" />
          <Picker.Item label="Smoking" value="Smoking" />
          <Picker.Item label="Obesity" value="Obesity" />
        </Picker>
      </View>

      {/* Medication Management */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8 }}>Medication Management</Text>
        <Text style={{ marginBottom: 8 }}>Select your medication:</Text>
        <Picker
          selectedValue={medication}
          onValueChange={handleMedicationChange}
        >
          <Picker.Item label="Aspirin" value="Aspirin" />
          <Picker.Item label="Clopidogrel" value="Clopidogrel" />
          <Picker.Item label="Warfarin" value="Warfarin" />
          <Picker.Item label="Dabigatran" value="Dabigatran" />
        </Picker>
      </View>

      {/* Rehabilitation Goals */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8 }}>Set Rehabilitation Goals</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 5,
            marginBottom: 10,
            height: 100,
            textAlignVertical: "top",
          }}
          placeholder="Enter Rehabilitation Goals"
          value={rehabilitationGoals}
          onChangeText={setRehabilitationGoals}
          multiline
        />
        <Button title="Submit Goals" onPress={handleRehabilitationGoalsSubmit} />
        <Text style={{ marginTop: 8 }}>
          Setting clear rehabilitation goals is essential for recovery and overall well-being.
        </Text>
      </View>

      {/* Emergency Plan */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8 }}>Emergency Plan</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 5,
            marginBottom: 10,
            height: 100,
            textAlignVertical: "top",
          }}
          placeholder="Enter Emergency Plan Details"
          value={emergencyPlan}
          onChangeText={setEmergencyPlan}
          multiline
        />
        <Button title="Update Emergency Plan" onPress={handleEmergencyPlanUpdate} />
        <Text style={{ marginTop: 8 }}>
          Having an emergency plan is crucial for timely intervention in case of stroke symptoms.
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

export default StrokeManagement;
