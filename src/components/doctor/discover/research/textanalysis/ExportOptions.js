// components/Export/ExportOptions.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ExportOptions = ({ 
  exportFormat, 
  onFormatChange, 
  onExport 
}) => (
  <View style={styles.section}>
    <View style={styles.exportContainer}>
      <TouchableOpacity 
        style={styles.exportButton}
        onPress={onExport}
      >
        <Icon name="download" size={20} color="#fff" />
        <Text style={styles.buttonText}>Export Analysis</Text>
      </TouchableOpacity>
      <View style={styles.formatSelector}>
        {['json', 'csv'].map((format) => (
          <TouchableOpacity
            key={format}
            style={[ 
              styles.formatButton,
              exportFormat === format && styles.activeFormat
            ]}
            onPress={() => onFormatChange(format)}
          >
            <Text style={styles.formatText}>
              {format.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  exportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27C7B8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
  formatSelector: {
    flexDirection: 'row',
  },
  formatButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F4F4F4',
    marginLeft: 10,
    borderRadius: 5,
  },
  activeFormat: {
    backgroundColor: '#27C7B8',
  },
  formatText: {
    fontSize: 16,
    color: '#002432',
  },
});
