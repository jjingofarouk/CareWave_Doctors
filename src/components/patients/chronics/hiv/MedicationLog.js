import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { drugOptions } from '../../consultations/drugOptions';


const MedicationLog = ({ onLogMedication }) => {
  const [medication, setMedication] = useState('');
  const [dose, setDose] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Handle autosuggest filtering based on user input
  const handleMedicationChange = (input) => {
    setMedication(input);
    if (input) {
      const filtered = drugOptions.filter((drug) =>
        drug.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  // Handle selecting a suggestion
  const handleSelectMedication = (selectedMedication) => {
    setMedication(selectedMedication);
    setFilteredData([]); // Hide suggestions once a selection is made
  };

  const handleLogMedication = () => {
    onLogMedication({ medication, dose });
    setMedication('');
    setDose('');
    setFilteredData([]);  // Clear filtered data after logging
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Log Medication</Text>

      {/* Medication input with custom autocomplete */}
      <TextInput
        style={styles.textInput}
        placeholder="Medication Name"
        value={medication}
        onChangeText={handleMedicationChange}
        autoCapitalize="words"
      />

      {/* Render suggestions if there are any */}
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectMedication(item)}>
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}

      {/* Dose input */}
      <TextInput
        style={styles.textInput}
        placeholder="Dose"
        value={dose}
        onChangeText={setDose}
        keyboardType="numeric"
      />

      {/* Log button */}
      <TouchableOpacity style={styles.button} onPress={handleLogMedication}>
        <Text style={styles.buttonText}>Log Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionList: {
    maxHeight: 180,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF7043',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MedicationLog;
