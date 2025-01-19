// components/ProjectManagement/ProjectList.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ProjectList = ({ 
  projects, 
  currentProject, 
  onProjectSelect, 
  onSave,
  lastSaved 
}) => (
  <View style={styles.section}>
    <View style={styles.projectHeader}>
      <Text style={styles.sectionHeader}>Projects</Text>
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={onSave}
      >
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.buttonText}>Save Project</Text>
      </TouchableOpacity>
    </View>

    {lastSaved && (
      <Text style={styles.lastSaved}>
        Last saved: {new Date(lastSaved).toLocaleString()}
      </Text>
    )}

    <FlatList
      data={projects}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={[
            styles.projectItem, 
            currentProject?.id === item.id && styles.activeProject
          ]}
          onPress={() => onProjectSelect(item)}
        >
          <View style={styles.projectInfo}>
            <Text style={styles.projectName}>{item.name}</Text>
            <Text style={styles.projectDate}>
              {new Date(item.lastModified).toLocaleDateString()}
            </Text>
          </View>
          <Icon 
            name="chevron-right" 
            size={20} 
            color="#27C7B8"
          />
        </TouchableOpacity>
      )}
      style={styles.projectList}
    />
  </View>
);

const styles = StyleSheet.create({
  // Section style for the entire component
  section: {
    flex: 1,
    backgroundColor: '#ffffff', // White background for the whole component
    padding: 20,
  },
  // Header section for the project title and save button
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  // Header text style for the "Projects" title
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002432', // Ocean Obsidian for the header text
  },
  // Style for the save button
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27C7B8', // Teal Tide for the button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  // Button text style for the save button
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff', // White text for the save button
  },
  // Style for the "last saved" timestamp text
  lastSaved: {
    fontSize: 14,
    color: '#666', // Gray color for less important text
    marginBottom: 15,
  },
  // FlatList container style for the project list
  projectList: {
    marginBottom: 20,
  },
  // Individual project item in the list
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F4F4F4', // Light gray for the project item background
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Adds a shadow for a card-like appearance
  },
  // Style applied to the active project item
  activeProject: {
    backgroundColor: '#27C7B8', // Teal Tide for the active project
  },
  // Container for the project name and last modified date
  projectInfo: {
    flex: 1,
  },
  // Style for the project name text
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002432', // Ocean Obsidian for project name text
  },
  // Style for the project last modified date text
  projectDate: {
    fontSize: 14,
    color: '#666', // Gray color for the project date
  },
});

