import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { drugOptions } from '../consultations/drugOptions';

function CurrentMedications() {
  const [medication, setMedication] = useState('');
  const [medicationsList, setMedicationsList] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);

  // Function to handle adding the medication
  const handleAddMedication = () => {
    if (medication.trim()) {
      setMedicationsList([...medicationsList, medication]);
      setMedication('');  // Clear the input field after adding
    }
  };

  // Function to filter drug options based on user input
  const handleInputChange = (text) => {
    setMedication(text);
    if (text) {
      const filtered = drugOptions.filter((drug) =>
        drug.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDrugs(filtered);
    } else {
      setFilteredDrugs([]);  // Clear suggestions if input is empty
    }
  };

  // Function to select a drug from the suggestion list
  const handleSelectDrug = (drug) => {
    setMedication(drug);
    setFilteredDrugs([]);  // Clear suggestions after selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Medications</Text>
      <Text style={styles.content}>Here, you can view and manage the medications you are currently taking.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter medication name"
        value={medication}
        onChangeText={handleInputChange}
      />
      
      <Button title="Add Medication" onPress={handleAddMedication} color="#FF7043" />

      {/* Display suggestions if any */}
      {filteredDrugs.length > 0 && (
        <FlatList
          data={filteredDrugs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectDrug(item)}>
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}

      {/* Display list of current medications */}
      <FlatList
        data={medicationsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationText}>{item}</Text>
          </View>
        )}
        style={styles.medicationsList}
      />
    </View>
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
  content: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  suggestionsList: {
    marginTop: 10,
    maxHeight: 200, // Limit the height of the suggestions list
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  medicationsList: {
    marginTop: 20,
  },
  medicationItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  medicationText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CurrentMedications;
