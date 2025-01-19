import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import CustomSelect from '../../utils/CustomSelect';

// Expanded options for select fields
const housingOptions = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'Detached House', value: 'detached_house' },
  { label: 'Shared Housing', value: 'shared_housing' },
  { label: 'Temporary Shelter', value: 'temporary_shelter' },
  { label: 'Homeless', value: 'homeless' },
  { label: 'Dormitory', value: 'dormitory' },   // New option
  { label: 'Mobile Home', value: 'mobile_home' },  // New option
  { label: 'Other', value: 'other_housing' },   // New option
];

const workOptions = [
  { label: 'Office Job', value: 'office_job' },
  { label: 'Manual Labor', value: 'manual_labor' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Retired', value: 'retired' },
  { label: 'Freelance', value: 'freelance' },  // New option
  { label: 'Self-Employed', value: 'self_employed' },  // New option
  { label: 'Student', value: 'student' },  // New option
];

const foodOptions = [
  { label: 'Home-cooked', value: 'home_cooked' },
  { label: 'Fast Food', value: 'fast_food' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Mixed Diet', value: 'mixed_diet' },
  { label: 'Other', value: 'other' },
  { label: 'Pescatarian', value: 'pescatarian' },  // New option
  { label: 'Keto', value: 'keto' },  // New option
  { label: 'Gluten-Free', value: 'gluten_free' },  // New option
];

const violenceHistoryOptions = [
  { label: 'No History', value: 'no_history' },
  { label: 'Physical Violence', value: 'physical_violence' },
  { label: 'Emotional Abuse', value: 'emotional_abuse' },
  { label: 'Sexual Violence', value: 'sexual_violence' },
  { label: 'Financial Abuse', value: 'financial_abuse' },
  { label: 'Verbal Abuse', value: 'verbal_abuse' },  // New option
  { label: 'Stalking', value: 'stalking' },  // New option
  { label: 'Other', value: 'other_abuse' },  // New option
];

const SocialHistory = ({ socialHistory, handleInputChange }) => {
  const [selectedHousing, setSelectedHousing] = useState(socialHistory.housing || '');
  const [selectedWork, setSelectedWork] = useState(socialHistory.work || '');
  const [selectedFood, setSelectedFood] = useState(socialHistory.food || '');
  const [selectedViolenceHistory, setSelectedViolenceHistory] = useState(socialHistory.violenceHistory || '');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Social History</Text>

      {/* Smoking History */}
      <Text style={styles.label}>Smoking (e.g., Pack-years):</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter smoking history"
        placeholderTextColor="#888888"
        value={socialHistory.smoking}
        onChangeText={(text) => handleInputChange('socialHistory', 'smoking', text)}
      />

      {/* Alcohol Consumption */}
      <Text style={styles.label}>Alcohol (Amount, Duration, When stopped?):</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter alcohol consumption details"
        placeholderTextColor="#888888"
        value={socialHistory.alcohol}
        onChangeText={(text) => handleInputChange('socialHistory', 'alcohol', text)}
      />

      {/* Dietary Habits */}
      <Text style={styles.label}>Dietary Habits:</Text>
      <CustomSelect
        selectedValue={selectedFood}
        onValueChange={(value) => {
          setSelectedFood(value);
          handleInputChange('socialHistory', 'food', value);
        }}
        options={foodOptions}
        placeholder="Select dietary habits"
      />

      {/* Exercise Habits */}
      <Text style={styles.label}>Exercise (Type, Frequency, Limitations?):</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter exercise details"
        placeholderTextColor="#888888"
        value={socialHistory.exercise}
        onChangeText={(text) => handleInputChange('socialHistory', 'exercise', text)}
        multiline
      />

      {/* Sexual History */}
      <Text style={styles.label}>Sexual History (Any concerns? Number of partners?):</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter sexual history"
        placeholderTextColor="#888888"
        value={socialHistory.sexualHistory}
        onChangeText={(text) => handleInputChange('socialHistory', 'sexualHistory', text)}
        multiline
      />

      {/* Housing Situation */}
      <Text style={styles.label}>Housing Situation:</Text>
      <CustomSelect
        selectedValue={selectedHousing}
        onValueChange={(value) => {
          setSelectedHousing(value);
          handleInputChange('socialHistory', 'housing', value);
        }}
        options={housingOptions}
        placeholder="Select housing situation"
      />

      {/* Work Type */}
      <Text style={styles.label}>Type of Work:</Text>
      <CustomSelect
        selectedValue={selectedWork}
        onValueChange={(value) => {
          setSelectedWork(value);
          handleInputChange('socialHistory', 'work', value);
        }}
        options={workOptions}
        placeholder="Select type of work"
      />

      {/* History of Gender-Based Violence */}
      <Text style={styles.label}>History of Gender-Based Violence:</Text>
      <CustomSelect
        selectedValue={selectedViolenceHistory}
        onValueChange={(value) => {
          setSelectedViolenceHistory(value);
          handleInputChange('socialHistory', 'violenceHistory', value);
        }}
        options={violenceHistoryOptions}
        placeholder="Select history of violence"
      />

      {/* Additional Factors */}
      <Text style={styles.label}>Additional Factors (Who lives at home? Mobility needs?):</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter additional factors"
        placeholderTextColor="#888888"
        value={socialHistory.additionalFactors}
        onChangeText={(text) => handleInputChange('socialHistory', 'additionalFactors', text)}
        multiline
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    height: 80,
    marginBottom: 16,
    fontSize: 14,
    textAlignVertical: 'top',
  },
});

export default SocialHistory;
