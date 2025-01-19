// PainManagement.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CustomSelect from '../../../utils/CustomSelect'; // Custom Select component

const PainManagement = ({ onPainLevelChange }) => {
  const [painLevel, setPainLevel] = useState('');
  
  const painOptions = [
    { label: 'Mild (slightly uncomfortable)', value: 'Mild' },
    { label: 'Moderate (uncomfortable but manageable)', value: 'Moderate' },
    { label: 'Severe (intense, needs immediate attention)', value: 'Severe' },
  ];

  const handlePainLevelChange = (selectedOption) => {
    setPainLevel(selectedOption.label);
    onPainLevelChange(selectedOption.label);  // Passing the selected pain level to the parent component
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pain Management</Text>
      <Text style={styles.info}>
        Select your pain level to receive the appropriate advice for managing it.
      </Text>

      {/* Custom Select for Pain Level */}
      <CustomSelect 
        options={painOptions} 
        placeholder="Select Pain Level" 
        onSelect={handlePainLevelChange} 
        label="Pain Level" 
      />

      <View style={styles.painManagementOptions}>
        {painLevel && (
          <>
            <Text style={styles.info}>
              {painLevel === 'Mild' && 'For mild pain, you can use over-the-counter analgesics like acetaminophen. Make sure to drink plenty of fluids and rest.'}
              {painLevel === 'Moderate' && 'For moderate pain, consider non-opioid medications like ibuprofen or naproxen. Ensure proper hydration and rest.'}
              {painLevel === 'Severe' && 'For severe pain, you may need stronger pain relief such as opioids, along with intravenous hydration. Please seek immediate medical attention if the pain is unbearable.'}
            </Text>
            <Button 
              title="Log Pain Relief" 
              onPress={() => alert('Pain relief logged successfully')} 
              color="#FF7043"
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Consistent with the other components
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54', // Consistent with other component headers
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333333', // Dark Gray text
    lineHeight: 24,
  },
  painManagementOptions: {
    marginTop: 20,
  },
});

export default PainManagement;
