import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import CustomSelect from '../../utils/CustomSelect'; // Adjust the path to your custom select component

const FamilyHistory = ({ familyHistory, handleInputChange, handleCheckboxChange }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.header}>Family History</Text>

    {/* Hereditary Diseases */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Hereditary Diseases</Text>
      <CustomSelect
        options={[
          { label: 'Diabetes', value: 'diabetes' },
          { label: 'Cancer', value: 'cancer' },
          { label: 'Cardiovascular Diseases', value: 'cardiovascular' },
          { label: 'Hypertension', value: 'hypertension' },
          { label: 'Other', value: 'other' },
        ]}
        selectedValue={familyHistory.hereditaryDiseases}
        onSelect={(value) => handleInputChange('familyHistory', 'hereditaryDiseases', value)}
      />
    </View>

    {/* Hypertension */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Hypertension (Any family history?)</Text>
      <CustomSelect
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Unknown', value: 'unknown' },
        ]}
        selectedValue={familyHistory.hypertension}
        onSelect={(value) => handleInputChange('familyHistory', 'hypertension', value)}
      />
    </View>

    {/* Cardiovascular Diseases */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Cardiovascular Diseases</Text>
      <CustomSelect
        options={[
          { label: 'Heart Attack', value: 'heart_attack' },
          { label: 'Stroke', value: 'stroke' },
          { label: 'Arrhythmias', value: 'arrhythmias' },
          { label: 'Other', value: 'other' },
        ]}
        selectedValue={familyHistory.cardiovascular}
        onSelect={(value) => handleInputChange('familyHistory', 'cardiovascular', value)}
      />
    </View>

    {/* Cancer */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Cancer</Text>
      <CustomSelect
        options={[
          { label: 'Breast Cancer', value: 'breast_cancer' },
          { label: 'Colon Cancer', value: 'colon_cancer' },
          { label: 'Lung Cancer', value: 'lung_cancer' },
          { label: 'Other', value: 'other' },
        ]}
        selectedValue={familyHistory.cancer}
        onSelect={(value) => handleInputChange('familyHistory', 'cancer', value)}
      />
    </View>

    {/* Tuberculosis */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Tuberculosis</Text>
      <CustomSelect
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Unknown', value: 'unknown' },
        ]}
        selectedValue={familyHistory.tuberculosis}
        onSelect={(value) => handleInputChange('familyHistory', 'tuberculosis', value)}
      />
    </View>

    {/* Smoking */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Smoking</Text>
      <CustomSelect
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Occasional', value: 'occasional' },
          { label: 'Unknown', value: 'unknown' },
        ]}
        selectedValue={familyHistory.smoking}
        onSelect={(value) => handleInputChange('familyHistory', 'smoking', value)}
      />
    </View>

    {/* Alcohol */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Alcohol Consumption</Text>
      <CustomSelect
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Occasional', value: 'occasional' },
          { label: 'Unknown', value: 'unknown' },
        ]}
        selectedValue={familyHistory.alcohol}
        onSelect={(value) => handleInputChange('familyHistory', 'alcohol', value)}
      />
    </View>

    {/* Mental Health */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Mental Health</Text>
      <CustomSelect
        options={[
          { label: 'Depression', value: 'depression' },
          { label: 'Anxiety', value: 'anxiety' },
          { label: 'Bipolar Disorder', value: 'bipolar_disorder' },
          { label: 'Other', value: 'other' },
        ]}
        selectedValue={familyHistory.mentalHealth}
        onSelect={(value) => handleInputChange('familyHistory', 'mentalHealth', value)}
      />
    </View>

    {/* Additional Factors */}
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Additional Factors</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter other relevant family history"
        placeholderTextColor="#888888"
        value={familyHistory.additionalFactors}
        onChangeText={(text) => handleInputChange('familyHistory', 'additionalFactors', text)}
      />
    </View>

    {/* Save Button */}
    <TouchableOpacity style={styles.button} onPress={() => alert('Family History Saved')}>
      <Text style={styles.buttonText}>Save Information</Text>
    </TouchableOpacity>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FamilyHistory;
