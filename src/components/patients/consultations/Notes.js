import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// DoctorPatientNotes Component
const DoctorPatientNotes = () => {
  // State for managing patient notes
  const [noteText, setNoteText] = useState('');
  const [previousNotes, setPreviousNotes] = useState([
    { id: 1, date: '2024-12-10', text: 'Patient is stable, continue current medication.' },
    { id: 2, date: '2024-12-05', text: 'Increase fluid intake, mild dehydration observed.' },
  ]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState('');
  const [currentTreatment, setCurrentTreatment] = useState('');
  const [followUpRecommendation, setFollowUpRecommendation] = useState('');

  // Function to handle saving new notes
  const handleSaveNote = () => {
    const newNote = {
      id: previousNotes.length + 1,
      date: new Date().toLocaleDateString(),
      text: noteText,
    };
    setPreviousNotes([...previousNotes, newNote]);
    setNoteText(''); // Clear the note input field after saving
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Title Section */}
        <Text style={styles.title}>Patient Notes</Text>
        <Text style={styles.subtitle}>Record your observations, diagnosis, treatments, and follow-up instructions for this patient.</Text>

        {/* Current Diagnosis Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Diagnosis</Text>
          <TextInput
            style={styles.textInput}
            value={currentDiagnosis}
            onChangeText={setCurrentDiagnosis}
            placeholder="Enter patient's current diagnosis..." placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>

        {/* Current Treatment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Treatment</Text>
          <TextInput
            style={styles.textInput}
            value={currentTreatment}
            onChangeText={setCurrentTreatment}
            placeholder="Enter current treatments or medications..."            placeholderTextColor="#9CA3AF"

            multiline
          />
        </View>

        {/* Follow-up Recommendation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow-Up Recommendations</Text>
          <TextInput
            style={styles.textInput}
            value={followUpRecommendation}
            onChangeText={setFollowUpRecommendation}
            placeholder="Enter follow-up care recommendations..."            placeholderTextColor="#9CA3AF"

            multiline
          />
        </View>

        {/* New Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Note</Text>
          <TextInput
            style={styles.textInput}
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Write your notes here..."            placeholderTextColor="#9CA3AF"

            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
            <Text style={styles.saveButtonText}>Save Note</Text>
          </TouchableOpacity>
        </View>

        {/* Previous Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Notes</Text>
          {previousNotes.length > 0 ? (
            previousNotes.map((note) => (
              <View key={note.id} style={styles.noteCard}>
                <Text style={styles.noteDate}>{note.date}</Text>
                <Text style={styles.noteText}>{note.text}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noNotesText}>No previous notes available.</Text>
          )}
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button title="Save All" onPress={() => alert('All notes saved!')} />
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for the DoctorPatientNotes component
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA', 
    padding: 10,
  },
  container: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333', // Dark Gray
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    color: '#333333', // Dark Gray
  },
  saveButton: {
    backgroundColor: '#FF7043', // Accent color (Coral Orange)
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  noteDate: {
    fontSize: 14,
    color: '#009688', // Medium Teal
    fontWeight: '500',
  },
  noteText: {
    fontSize: 16,
    color: '#333333', // Dark Gray
    marginTop: 5,
  },
  noNotesText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default DoctorPatientNotes;
