// CaseDetails.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './FullStyles';

export const CaseDetails = ({ selectedCase, selectedSection, setSelectedSection }) => {
  if (!selectedCase) return null;

  const renderFindings = () => {
    const { findings } = selectedCase;
    return Object.entries(findings).map(([category, details]) => (
      <View key={category} style={styles.findingsSection}>
        <Text style={styles.findingsCategory}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
        {Object.entries(details).map(([key, value]) => (
          <Text key={key} style={styles.findingItem}>• {key}: {value}</Text>
        ))}
      </View>
    ));
  };

  const renderDiagnosis = () => (
    <View style={styles.diagnosisSection}>
      {selectedCase.diagnosis.map((item, index) => (
        <Text key={index} style={styles.diagnosisItem}>• {item}</Text>
      ))}
    </View>
  );

  const renderManagementPlan = () => (
    <View style={styles.managementSection}>
      {selectedCase.managementPlan.map((item, index) => (
        <Text key={index} style={styles.managementItem}>• {item}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.sectionTabs}>
        <TouchableOpacity 
          style={[styles.sectionTab, selectedSection === 'description' && styles.activeTab]}
          onPress={() => setSelectedSection('description')}
        >
          <Text style={styles.sectionTabText}>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sectionTab, selectedSection === 'findings' && styles.activeTab]}
          onPress={() => setSelectedSection('findings')}
        >
          <Text style={styles.sectionTabText}>Findings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sectionTab, selectedSection === 'diagnosis' && styles.activeTab]}
          onPress={() => setSelectedSection('diagnosis')}
        >
          <Text style={styles.sectionTabText}>Diagnosis</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sectionTab, selectedSection === 'management' && styles.activeTab]}
          onPress={() => setSelectedSection('management')}
        >
          <Text style={styles.sectionTabText}>Management</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContent}>
        {selectedSection === 'description' && (
          <Text style={styles.descriptionText}>{selectedCase.description}</Text>
        )}
        {selectedSection === 'findings' && renderFindings()}
        {selectedSection === 'diagnosis' && renderDiagnosis()}
        {selectedSection === 'management' && renderManagementPlan()}
      </View>
    </View>
  );
};