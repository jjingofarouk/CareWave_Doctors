// components/FileUpload/FileUpload.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'expo-document-picker';

export const FileUpload = ({ onFileSelect }) => {
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText, DocumentPicker.types.pdf],
      });

      if (result.type === 'application/pdf') {
        Alert.alert('Info', 'PDF parsing would be implemented here');
        return;
      }

      const fileContent = await result.text();
      onFileSelect(fileContent);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'File upload failed');
      }
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Document Input</Text>
      <View style={styles.uploadContainer}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleFileUpload}
        >
          <Icon name="file-text-o" size={24} color="#27C7B8" />
          <Text style={styles.uploadButtonText}>Upload Medical Document</Text>
        </TouchableOpacity>
        <Text style={styles.supportedFormats}>
          Supported: .txt, .pdf, .docx
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: '#002432', // Ocean Obsidian for a sleek background
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Adds depth for modern style
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DFE4E5', // Coral Cloud for header text
    textAlign: 'center',
    marginBottom: 15,
  },
  uploadContainer: {
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27C7B8', // Teal Tide for a fresh button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FFFFFF', // White for a clean, readable text
    marginLeft: 10,
    fontFamily: 'Helvetica Neue', // Modern font style
  },
  supportedFormats: {
    fontSize: 14,
    color: '#F78837', // Tangerine Tango for a warm accent color
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
  },
});
