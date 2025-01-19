import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import PersonalInfo from './PersonalInfo';
import ChiefComplaint from './ChiefComplaint';
import HistoryOfPresentIllness from './HistoryOfPresentIllness';
import PastMedicalHistory from './PastMedicalHistory';
import FamilyHistory from './FamilyHistory';
import SocialHistory from './SocialHistory';
import ReviewOfSystems from './ReviewOfSystems';
import ExaminationFindings from './ExaminationFindings';

const History = () => {
  const [patientData, setPatientData] = useState({
    personalInfo: {},
    chiefComplaint: '',
    historyOfPresentIllness: '',
    pastMedicalHistory: {},
    familyHistory: '',
    socialHistory: {},
  });

  const [selectedSection, setSelectedSection] = useState("");

  const handleInputChange = (section, field, value) => {
    setPatientData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "personalInfo":
        return <PersonalInfo personalInfo={patientData.personalInfo} handleInputChange={handleInputChange} />;
      case "chiefComplaint":
        return <ChiefComplaint chiefComplaint={patientData.chiefComplaint} handleInputChange={handleInputChange} />;
      case "historyOfPresentIllness":
        return <HistoryOfPresentIllness historyOfPresentIllness={patientData.historyOfPresentIllness} handleInputChange={handleInputChange} />;
      case "pastMedicalHistory":
        return <PastMedicalHistory pastMedicalHistory={patientData.pastMedicalHistory} handleInputChange={handleInputChange} />;
      case "familyHistory":
        return <FamilyHistory familyHistory={patientData.familyHistory} handleInputChange={handleInputChange} />;
      case "socialHistory":
        return <SocialHistory socialHistory={patientData.socialHistory} handleInputChange={handleInputChange} />;
      case "reviewOfSystems":
        return <ReviewOfSystems patientData={patientData} handleInputChange={handleInputChange} />;
      case "examinationFindings":
        return <ExaminationFindings />;
      default:
        return <Text>Please select a section to fill out.</Text>;
    }
  };

  const handleSectionSelect = (itemValue) => {
    setSelectedSection(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Record Patient History</Text>

      <View style={styles.selectContainer}>
        <Text style={styles.label}>Select Section</Text>
        <Picker
          selectedValue={selectedSection}
          onValueChange={handleSectionSelect}
          style={styles.picker}
        >
          <Picker.Item label="-- Select Section --" value="" />
          <Picker.Item label="Patient Demographics" value="personalInfo" />
          <Picker.Item label="Presenting Complaint" value="chiefComplaint" />
          <Picker.Item label="History of Present Complaint" value="historyOfPresentIllness" />
          <Picker.Item label="Past Medical History" value="pastMedicalHistory" />
          <Picker.Item label="Family History" value="familyHistory" />
          <Picker.Item label="Social History" value="socialHistory" />
          <Picker.Item label="Review of Systems" value="reviewOfSystems" />
          <Picker.Item label="Examination Findings" value="examinationFindings" />
        </Picker>
      </View>

      <View style={styles.sectionContainer}>
        {renderSection()}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => console.log(patientData)}>
        <Text style={styles.buttonText}>Submit Patient History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  selectContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF7043',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default History;
