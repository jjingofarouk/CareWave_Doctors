import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNotifications } from './hooks/UseNotifications';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For icons

const AsthmaManagement = () => {
  const [medications, setMedications] = useState([]);
  const [asthmaControlLevel, setAsthmaControlLevel] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [peakFlowReadings, setPeakFlowReadings] = useState([]);
  const [actionPlan, setActionPlan] = useState('');
  const { notify } = useNotifications();

  useEffect(() => {
    // Fetch medication options, peak flow data, etc.
  }, []);

  const handleControlLevelSelect = (controlLevel) => {
    setAsthmaControlLevel(controlLevel);
    // Notify user
    notify('Asthma Control Level Selected', `You selected ${controlLevel}`);
  };

  const handleSymptomLog = () => {
    // Log symptoms
    notify('Symptom Logged', 'Your symptom has been logged successfully.');
  };

  const handlePeakFlowUpload = (reading) => {
    setPeakFlowReadings([...peakFlowReadings, reading]);
    notify('Peak Flow Uploaded', 'Your peak flow reading has been uploaded successfully.');
  };

  const handleActionPlanUpdate = () => {
    notify('Action Plan Updated', 'Your asthma action plan has been updated.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Asthma Management</Text>

      {/* Asthma Control Level */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Asthma Control Level</Text>
        <Text style={styles.cardText}>
          Monitoring your asthma control is crucial. Select the current control level based on your symptoms and peak flow readings.
        </Text>
        <Picker
          selectedValue={asthmaControlLevel}
          onValueChange={(itemValue) => handleControlLevelSelect(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Well Controlled" value="Well Controlled" />
          <Picker.Item label="Partly Controlled" value="Partly Controlled" />
          <Picker.Item label="Poorly Controlled" value="Poorly Controlled" />
        </Picker>
      </View>

      {/* Medication Management */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Medication Management</Text>
        <Text style={styles.cardText}>
          Asthma medications are typically divided into two types: controllers (taken daily) and relievers (used for immediate symptom relief). Please ensure adherence to both types.
        </Text>
        <Picker
          selectedValue={medications}
          onValueChange={(itemValue) => setMedications(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="ICS (Inhaled Corticosteroids)" value="ICS (Inhaled Corticosteroids)" />
          <Picker.Item label="LABA (Long-acting Beta Agonists)" value="LABA (Long-acting Beta Agonists)" />
          <Picker.Item label="SABA (Short-acting Beta Agonists)" value="SABA (Short-acting Beta Agonists)" />
          <Picker.Item label="LTRA (Leukotriene Receptor Antagonists)" value="LTRA (Leukotriene Receptor Antagonists)" />
        </Picker>
      </View>

      {/* Symptom Logging */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Log Symptoms</Text>
        <TextInput
          style={styles.textInput}
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="Enter Symptom"
        />
        <Button
          title="Log Symptom"
          onPress={handleSymptomLog}
          icon={<MaterialCommunityIcons name="lungs" size={24} color="white" />}
        />
      </View>

      {/* Peak Flow Monitoring */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Peak Flow Monitoring</Text>
        <Text style={styles.cardText}>
          Regularly tracking your peak flow readings helps monitor your lung function and predict asthma flare-ups. Upload your peak flow reading below.
        </Text>
        <Button
          title="Upload Peak Flow Reading"
          onPress={() => handlePeakFlowUpload('New Peak Flow Reading')}
          icon={<MaterialCommunityIcons name="clipboard" size={24} color="white" />}
        />
        <FlatList
          data={peakFlowReadings}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Asthma Action Plan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Asthma Action Plan</Text>
        <Text style={styles.cardText}>
          Follow your personalized asthma action plan for managing symptoms and controlling flare-ups. Update it as necessary in consultation with your healthcare provider.
        </Text>
        <Button
          title="Update Action Plan"
          onPress={handleActionPlanUpdate}
          icon={<MaterialCommunityIcons name="procedures" size={24} color="white" />}
        />
      </View>

      {/* Emergency Protocols */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Emergency Protocols</Text>
        <Text style={styles.cardText}>
          In case of severe asthma exacerbations (e.g., difficulty speaking, breathing, or bluish lips), immediate medical intervention is required. Use your quick-relief inhaler and seek emergency help.
        </Text>
        <Button
          title="Initiate Emergency Protocol"
          onPress={() => notify('Emergency Protocol', 'Emergency protocol initiated.')}
          icon={<MaterialCommunityIcons name="hospital" size={24} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004C54',
  },
  card: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default AsthmaManagement;
