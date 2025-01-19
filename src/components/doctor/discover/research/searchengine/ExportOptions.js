// ExportOptions.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ExportOptions = ({ onExport }) => {
  const exportOptions = [
    { id: 'pdf', icon: 'document-text', label: 'PDF' },
    { id: 'bibtex', icon: 'code-slash', label: 'BibTeX' },
    { id: 'citation', icon: 'quote', label: 'Citation' },
  ];

  return (
    <View style={styles.container}>
      {exportOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.exportButton}
          onPress={() => onExport(option.id)}
        >
          <Icon name={option.icon} size={24} color="#3498DB" />
          <Text style={styles.exportText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  exportButton: {
    alignItems: 'center',
    padding: 10,
  },
  exportText: {
    color: '#2C3E50',
    fontSize: 12,
    marginTop: 5,
  },
});