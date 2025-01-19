import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import FamilyHistory from '../../doctor/history/FamilyHistory';
import PastMedicalHistory from '../../doctor/history/PastMedicalHistory';
import SocialHistory from '../../doctor/history/SocialHistory'; // Import the SocialHistory component

function PersonalInformation() {
  const [familyHistory, setFamilyHistory] = useState({
    disease: false,
    alcohol: false,
    smoking: '',
    exercise: '',
    tuberculosis: '',
    additionalFactors: '',
  });
  const [pastMedicalHistory, setPastMedicalHistory] = useState({
    hospitalizations: '',
    medications: [],
    allergies: [],
    specificIllnesses: [],
    conditions: [],
    otherDrugUse: '',
  });
  const [socialHistory, setSocialHistory] = useState({
    smoking: false,
    alcohol: false,
    diet: '',
    exercise: '',
    sexualHistory: '',
    additionalFactors: '',
  });

  const handleInputChange = (section, field, value) => {
    if (section === 'familyHistory') {
      setFamilyHistory({ ...familyHistory, [field]: value });
    } else if (section === 'pastMedicalHistory') {
      setPastMedicalHistory({ ...pastMedicalHistory, [field]: value });
    } else if (section === 'socialHistory') {
      setSocialHistory({ ...socialHistory, [field]: value });
    }
  };

  const handleCheckboxChange = (section, field) => {
    if (section === 'familyHistory') {
      setFamilyHistory({ ...familyHistory, [field]: !familyHistory[field] });
    } else if (section === 'socialHistory') {
      setSocialHistory({ ...socialHistory, [field]: !socialHistory[field] });
    }
  };

  const handleArrayInputChange = (section, field, value) => {
    if (section === 'pastMedicalHistory') {
      setPastMedicalHistory({ ...pastMedicalHistory, [field]: value });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <Text style={styles.content}>
        This is the personal information page. You can view and edit your personal details here.
      </Text>

      {/* Patient Basic Info (e.g., Name, Age) */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#888888" // Visible placeholder color
        value={pastMedicalHistory.name}
        onChangeText={(text) => handleInputChange('pastMedicalHistory', 'name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="#888888" // Visible placeholder color
        value={pastMedicalHistory.age}
        onChangeText={(text) => handleInputChange('pastMedicalHistory', 'age', text)}
      />

      {/* Family History Component */}
      <FamilyHistory
        familyHistory={familyHistory}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
      />

      {/* Past Medical History Component */}
      <PastMedicalHistory
        pastMedicalHistory={pastMedicalHistory}
        handleInputChange={handleInputChange}
        handleArrayInputChange={handleArrayInputChange}
      />

      {/* Social History Component */}
      <SocialHistory
        socialHistory={socialHistory}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
      />

      {/* Chronic Conditions */}
      <Text style={styles.subHeader}>Chronic Conditions</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Chronic Conditions (e.g., Asthma, Hypertension)"
        placeholderTextColor="#888888" // Visible placeholder color
        value={pastMedicalHistory.conditions.join(', ')}
        onChangeText={(text) =>
          handleArrayInputChange('pastMedicalHistory', 'conditions', text.split(', '))
        }
      />

      {/* Surgical History */}
      <TextInput
        style={styles.input}
        placeholder="Enter Surgical History"
        placeholderTextColor="#888888" // Visible placeholder color
        value={pastMedicalHistory.surgicalHistory}
        onChangeText={(text) => handleInputChange('pastMedicalHistory', 'surgicalHistory', text)}
      />

      {/* Save Information Button */}
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>Save Information</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonalInformation;
