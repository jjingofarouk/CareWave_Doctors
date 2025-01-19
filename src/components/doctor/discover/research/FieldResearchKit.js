import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CustomSelect from '../../../utils/CustomSelect';

const COLORS = {
  CORAL_CLOUD: '#DFE4E5',
  OCEAN_OBSIDIAN: '#002432',
  TEAL_TIDE: '#27C7B8',
  TANGERINE_TANGO: '#F78837',
};

const researchCategories = [
  { label: 'Clinical Trial', value: 'clinical_trial' },
  { label: 'Observational Study', value: 'observational' },
  { label: 'Case Study', value: 'case_study' },
  { label: 'Survey Research', value: 'survey' },
  { label: 'Longitudinal Study', value: 'longitudinal' },
];

const dataTypes = [
  { label: 'Quantitative', value: 'quantitative' },
  { label: 'Qualitative', value: 'qualitative' },
  { label: 'Mixed Methods', value: 'mixed' },
];

const FieldResearchKit = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [expanded, setExpanded] = useState({});
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  const [researchData, setResearchData] = useState({
    title: '',
    category: '',
    dataType: '',
    objective: '',
    methodology: '',
    variables: [],
    participants: {
      total: '',
      criteria: '',
      groups: [],
    },
    timeline: '',
    notes: '',
  });

  const [variables, setVariables] = useState([]);
  const [newVariable, setNewVariable] = useState({
    name: '',
    type: '',
    description: '',
  });

  const handleAddVariable = () => {
    if (newVariable.name && newVariable.type) {
      setVariables([...variables, { ...newVariable, id: Date.now() }]);
      setNewVariable({ name: '', type: '', description: '' });
    }
  };

  const toggleAccordion = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field, value) => {
    setResearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const AccordionSection = ({ title, children, section }) => (
    <View style={styles.accordionContainer}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={() => toggleAccordion(section)}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <MaterialIcons 
          name={expanded[section] ? 'expand-less' : 'expand-more'} 
          size={24} 
          color={COLORS.OCEAN_OBSIDIAN}
        />
      </TouchableOpacity>
      {expanded[section] && (
        <View style={styles.accordionContent}>
          {children}
        </View>
      )}
    </View>
  );

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.tabContainer}>
        <TabButton
          title="Setup"
          isActive={activeTab === 'setup'}
          onPress={() => setActiveTab('setup')}
        />
        <TabButton
          title="Variables"
          isActive={activeTab === 'variables'}
          onPress={() => setActiveTab('variables')}
        />
        <TabButton
          title="Analysis"
          isActive={activeTab === 'analysis'}
          onPress={() => setActiveTab('analysis')}
        />
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'setup' && (
          <View style={styles.section}>
            <AccordionSection title="Basic Information" section="basic">
              <TextInput
                style={styles.input}
                placeholder="Research Title"
                value={researchData.title}
                onChangeText={(text) => handleChange('title', text)}
                placeholderTextColor="#666"
              />
              
              <CustomSelect
                label="Research Category"
                options={researchCategories}
                value={researchData.category}
                onSelect={(option) => handleChange('category', option.value)}
                placeholder="Select research category"
              />

              <CustomSelect
                label="Data Type"
                options={dataTypes}
                value={researchData.dataType}
                onSelect={(option) => handleChange('dataType', option.value)}
                placeholder="Select data type"
              />
            </AccordionSection>

            <AccordionSection title="Research Objectives" section="objectives">
              <TextInput
                style={styles.textArea}
                placeholder="Define research objectives"
                multiline
                numberOfLines={4}
                value={researchData.objective}
                onChangeText={(text) => handleChange('objective', text)}
                placeholderTextColor="#666"
              />
            </AccordionSection>

            <AccordionSection title="Methodology" section="methodology">
              <TextInput
                style={styles.textArea}
                placeholder="Describe research methodology"
                multiline
                numberOfLines={4}
                value={researchData.methodology}
                onChangeText={(text) => handleChange('methodology', text)}
                placeholderTextColor="#666"
              />
            </AccordionSection>
          </View>
        )}

        {activeTab === 'variables' && (
          <View style={styles.section}>
            <View style={styles.variableForm}>
              <Text style={styles.sectionTitle}>Add New Variable</Text>
              <TextInput
                style={styles.input}
                placeholder="Variable Name"
                value={newVariable.name}
                onChangeText={(text) => setNewVariable({...newVariable, name: text})}
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                placeholder="Variable Type"
                value={newVariable.type}
                onChangeText={(text) => setNewVariable({...newVariable, type: text})}
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.textArea}
                placeholder="Variable Description"
                multiline
                numberOfLines={3}
                value={newVariable.description}
                onChangeText={(text) => setNewVariable({...newVariable, description: text})}
                placeholderTextColor="#666"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddVariable}
              >
                <Text style={styles.addButtonText}>Add Variable</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.variableList}>
              <Text style={styles.sectionTitle}>Variables List</Text>
              {variables.map((variable, index) => (
                <View key={variable.id} style={styles.variableCard}>
                  <Text style={styles.variableName}>{variable.name}</Text>
                  <Text style={styles.variableType}>{variable.type}</Text>
                  <Text style={styles.variableDescription}>{variable.description}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'analysis' && (
          <View style={styles.section}>
            <AccordionSection title="Data Analysis Plan" section="analysis">
              <TextInput
                style={styles.textArea}
                placeholder="Describe your data analysis approach"
                multiline
                numberOfLines={4}
                value={researchData.analysis}
                onChangeText={(text) => handleChange('analysis', text)}
                placeholderTextColor="#666"
              />
            </AccordionSection>

            <AccordionSection title="Timeline" section="timeline">
              <TextInput
                style={styles.textArea}
                placeholder="Define research timeline"
                multiline
                numberOfLines={4}
                value={researchData.timeline}
                onChangeText={(text) => handleChange('timeline', text)}
                placeholderTextColor="#666"
              />
            </AccordionSection>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.CORAL_CLOUD,
  },
  header: {
    backgroundColor: COLORS.OCEAN_OBSIDIAN,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  activeTabButton: {
    backgroundColor: COLORS.TEAL_TIDE,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  accordionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.OCEAN_OBSIDIAN,
  },
  accordionContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.OCEAN_OBSIDIAN,
    marginBottom: 16,
  },
  variableForm: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: COLORS.TANGERINE_TANGO,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  variableList: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  variableCard: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  variableName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.OCEAN_OBSIDIAN,
    marginBottom: 4,
  },
  variableType: {
    fontSize: 14,
    color: COLORS.TEAL_TIDE,
    marginBottom: 4,
  },
  variableDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default FieldResearchKit;