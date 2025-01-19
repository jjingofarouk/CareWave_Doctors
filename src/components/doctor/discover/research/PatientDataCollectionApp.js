import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import CustomSelect from '../../../utils/CustomSelect';
import Checkbox from '../../../utils/Checkbox';

// Define colors
const COLORS = {
  CORAL_CLOUD: '#DFE4E5',
  OCEAN_OBSIDIAN: '#002432',
  TEAL_TIDE: '#27C7B8',
  TANGERINE_TANGO: '#F78837',
};

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
];

const PatientDataCollectionApp = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    medicalHistory: '',
    symptoms: '',
    consent: false,
    location: '',
  });

  const [alert, setAlert] = useState({ show: false, message: '' });
  const [dataCollectionMode, setDataCollectionMode] = useState('standard');

  const handleChange = (name, value) => {
    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    return patientData.name && patientData.age && patientData.gender && patientData.consent;
  };

  const collectPatientData = () => {
    if (validateForm()) {
      setAlert({
        show: true,
        message: 'Patient data collected successfully!'
      });
    } else {
      setAlert({
        show: true,
        message: 'Please fill in all required fields.'
      });
    }
  };

  const handleGeolocation = () => {
    console.log('Getting location...');
  };

  const ModeButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[
        styles.modeButton,
        isActive && { backgroundColor: COLORS.TEAL_TIDE }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.modeButtonText,
        isActive && { color: '#fff' }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {/* Mode Selection */}
          <View style={styles.modeContainer}>
            <ModeButton
              title="Standard Mode"
              isActive={dataCollectionMode === 'standard'}
              onPress={() => setDataCollectionMode('standard')}
            />
            <ModeButton
              title="Survey Mode"
              isActive={dataCollectionMode === 'survey'}
              onPress={() => setDataCollectionMode('survey')}
            />
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              style={styles.input}
              value={patientData.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Enter patient name"
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={patientData.age}
              onChangeText={(text) => handleChange('age', text)}
              keyboardType="numeric"
              placeholder="Enter age"
              placeholderTextColor="#666"
            />

            <CustomSelect
              label="Gender"
              options={genderOptions}
              value={patientData.gender}
              onSelect={(option) => handleChange('gender', option.value)}
              placeholder="Select gender"
            />

            <Text style={styles.label}>Medical History</Text>
            <TextInput
              style={styles.textArea}
              value={patientData.medicalHistory}
              onChangeText={(text) => handleChange('medicalHistory', text)}
              multiline
              numberOfLines={4}
              placeholder="Enter medical history"
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Current Symptoms</Text>
            <TextInput
              style={styles.textArea}
              value={patientData.symptoms}
              onChangeText={(text) => handleChange('symptoms', text)}
              multiline
              numberOfLines={4}
              placeholder="Enter current symptoms"
              placeholderTextColor="#666"
            />

            <View style={styles.checkboxContainer}>
              <Checkbox
                value={patientData.consent}
                onValueChange={(value) => handleChange('consent', value)}
                tintColors={{ true: COLORS.TEAL_TIDE }}
              />
              <Text style={styles.checkboxLabel}>
                I consent to the collection and processing of my data
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={collectPatientData}
            >
              <Text style={styles.submitButtonText}>Submit Data</Text>
            </TouchableOpacity>

            <View style={styles.secondaryButtonsContainer}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleGeolocation}
              >
                <Text style={styles.secondaryButtonText}>Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => console.log('Exporting...')}
              >
                <Text style={styles.secondaryButtonText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Alert */}
          {alert.show && (
            <View style={styles.alert}>
              <Text style={styles.alertText}>{alert.message}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.CORAL_CLOUD,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  modeButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  formContainer: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.OCEAN_OBSIDIAN,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: COLORS.TANGERINE_TANGO,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.OCEAN_OBSIDIAN,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.OCEAN_OBSIDIAN,
    fontWeight: '600',
  },
  alert: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  alertText: {
    textAlign: 'center',
    color: '#333',
  },
});

export default PatientDataCollectionApp;