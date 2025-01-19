import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Full symptoms list for auto-suggest
export const symptomList = [
  "fever", "cough", "headache", "chills", "fatigue", "sore throat", "muscle pain", 
  "nausea", "vomiting", "diarrhea", "abdominal pain", "chest pain", "shortness of breath", 
  "dizziness", "lightheadedness", "loss of appetite", "weight loss", "weight gain", 
  "swelling", "rash", "itching", "hives", "blurred vision", "double vision", 
  "sensitivity to light", "ringing in ears", "hearing loss", "ear pain", "runny nose", 
  "nasal congestion", "sneezing", "dry mouth", "sore gums", "toothache", "jaw pain", 
  "difficulty swallowing", "heartburn", "indigestion", "bloating", "constipation", 
  "blood in stool", "mucus in stool", "urinary urgency", "urinary frequency", 
  "painful urination", "blood in urine", "pelvic pain", "lower back pain", "joint pain", 
  "joint stiffness", "severe headache", "vision changes", "dehydration", "muscle weakness", 
  "tingling", "numbness", "tremors", "seizures", "fainting", "memory loss", "confusion", 
  "anxiety", "depression", "irritability", "insomnia", "loss of weight", "night sweats", 
  "hot flashes", "excessive thirst", "frequent urination", "dry skin", "hair loss", "bruising", "bleeding gums"
];

const SymptomLog = ({ symptoms, setSymptoms, onLogSymptom }) => {
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);

  // Handle the input and filter symptoms
  const handleSymptomChange = (input) => {
    setSymptoms(input);
    if (input) {
      const filtered = symptomList.filter((symptom) =>
        symptom.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    } else {
      setFilteredSymptoms([]);
    }
  };

  // Handle selecting a symptom from the suggestions
  const handleSelectSymptom = (selectedSymptom) => {
    setSymptoms(selectedSymptom);
    setFilteredSymptoms([]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Log Symptoms</Text>
      
      {/* Symptom input with custom autocomplete */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter Symptom"
        value={symptoms}
        onChangeText={handleSymptomChange}
        autoCapitalize="words"
      />

      {/* Render suggestions if there are any */}
      {filteredSymptoms.length > 0 && (
        <FlatList
          data={filteredSymptoms}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSymptom(item)}>
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}

      {/* Log button */}
      <TouchableOpacity style={styles.button} onPress={onLogSymptom}>
        <Text style={styles.buttonText}>Log Symptom</Text>
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

export default SymptomLog;
