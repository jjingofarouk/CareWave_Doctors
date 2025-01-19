// components/Notes/Notes.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export const Notes = ({ notes, onNotesChange }) => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>Clinical Notes</Text>
    <TextInput
      style={[styles.textArea, styles.notesInput]}
      multiline
      value={notes}
      onChangeText={onNotesChange}
      placeholder="Add clinical observations and notes..."
      placeholderTextColor="#666"
    />
  </View>
);

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: '#ffffff', // White background for the notes section
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002432', // Ocean Obsidian for section header text
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F4F4F4', // Light gray background for the text area
    fontSize: 16,
    color: '#333', // Dark gray for the text
    textAlignVertical: 'top', // Ensures text aligns to the top of the input box
  },
  notesInput: {
    fontFamily: 'Arial', // Modern and legible font
  },
});
