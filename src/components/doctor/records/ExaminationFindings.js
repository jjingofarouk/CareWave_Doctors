import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { examinationSystems } from './ExaminationSystems';

const ExaminationFindings = () => {
  const [findings, setFindings] = useState({});
  const [activeSystem, setActiveSystem] = useState('General');
  const [expandedCategories, setExpandedCategories] = useState({});

  const handleFindingChange = (systemName, category, finding, value) => {
    setFindings(prev => {
      // Initialize the nested structure if it doesn't exist
      const systemFindings = prev[systemName] || {};
      const categoryFindings = systemFindings[category] || {};
      const findingValues = categoryFindings[finding.name] || [];

      let updatedValues;
      if (finding.type === 'options') {
        // For option-type findings, handle multiple selections
        if (findingValues.includes(value)) {
          // Remove value if already selected
          updatedValues = findingValues.filter(v => v !== value);
        } else {
          // Add new value to the array
          updatedValues = [...findingValues, value];
        }
      } else {
        // For custom input, just use the single value
        updatedValues = [value];
      }

      // Remove the key entirely if no values are selected
      if (updatedValues.length === 0) {
        const newCategoryFindings = { ...categoryFindings };
        delete newCategoryFindings[finding.name];
        return {
          ...prev,
          [systemName]: {
            ...systemFindings,
            [category]: newCategoryFindings
          }
        };
      }

      return {
        ...prev,
        [systemName]: {
          ...systemFindings,
          [category]: {
            ...categoryFindings,
            [finding.name]: updatedValues
          }
        }
      };
    });
  };

  const toggleCategory = (systemName, category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [`${systemName}-${category}`]: !prev[`${systemName}-${category}`]
    }));
  };

  const renderQuickValueButtons = (systemName, category, finding, currentValues) => {
    return (
      <View style={styles.quickValueContainer}>
        {finding.expected.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.quickValueButton,
              currentValues.includes(option) && styles.quickValueButtonSelected
            ]}
            onPress={() => handleFindingChange(systemName, category, finding, option)}
          >
            <Text style={[
              styles.quickValueText,
              currentValues.includes(option) && styles.quickValueTextSelected
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCustomInput = (systemName, category, finding) => {
    const currentValues = findings[systemName]?.[category]?.[finding.name] || [];
    const currentValue = currentValues[0] || ''; // Use first value for custom inputs
    
    return (
      <TextInput
        style={styles.customInput}
        value={currentValue}
        onChangeText={(text) => handleFindingChange(systemName, category, finding, text)}
        placeholder="Enter value"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
      />
    );
  };

  const renderFinding = (systemName, category, finding) => {
    const currentValues = findings[systemName]?.[category]?.[finding.name] || [];
    
    return (
      <View style={styles.findingRow} key={finding.name}>
        <View style={styles.findingLabelContainer}>
          <Text style={styles.findingLabel}>{finding.name}</Text>
          {currentValues.length > 0 && (
            <View style={styles.selectedCount}>
              <Text style={styles.selectedCountText}>
                {currentValues.length} selected
              </Text>
            </View>
          )}
        </View>
        <View style={styles.findingInputContainer}>
          {finding.type === 'options' ? 
            renderQuickValueButtons(systemName, category, finding, currentValues) :
            renderCustomInput(systemName, category, finding)
          }
        </View>
      </View>
    );
  };

  const renderCategory = (systemName, category, findings) => {
    const isExpanded = expandedCategories[`${systemName}-${category}`];
    const hasFindings = findings.length > 0;

    return (
      <View key={category} style={styles.categoryContainer}>
        <Pressable 
          style={[styles.categoryHeader, isExpanded && styles.categoryHeaderActive]}
          onPress={() => toggleCategory(systemName, category)}
        >
          <Text style={styles.categoryTitle}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          <MaterialIcons 
            name={isExpanded ? 'expand-less' : 'expand-more'} 
            size={24} 
            color="#64748b"
          />
        </Pressable>

        {isExpanded && hasFindings && (
          <View style={styles.categoryContent}>
            {findings.map(finding => renderFinding(systemName, category, finding))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.systemTabs}
          contentContainerStyle={styles.systemTabsContent}
        >
          {examinationSystems.map((system) => (
            <TouchableOpacity
              key={system.name}
              style={[
                styles.systemTab,
                activeSystem === system.name && styles.systemTabActive
              ]}
              onPress={() => setActiveSystem(system.name)}
            >
              <Text style={[
                styles.systemTabText,
                activeSystem === system.name && styles.systemTabTextActive
              ]}>
                {system.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {examinationSystems
          .find(system => system.name === activeSystem)
          ?.findings && Object.entries(examinationSystems
            .find(system => system.name === activeSystem)
            .findings)
            .map(([category, categoryFindings]) => 
              renderCategory(activeSystem, category, categoryFindings)
            )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  systemTabs: {
    maxHeight: 56,
  },
  systemTabsContent: {
    paddingHorizontal: 16,
  },
  systemTab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  systemTabActive: {
    backgroundColor: '#e0f2fe',
  },
  systemTabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748b',
    letterSpacing: 0.3,
  },
  systemTabTextActive: {
    color: '#0284c7',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  categoryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryHeaderActive: {
    backgroundColor: '#f8fafc',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    letterSpacing: 0.3,
  },
  categoryContent: {
    padding: 16,
  },
  findingRow: {
    marginBottom: 20,
  },
  findingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  findingInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickValueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickValueButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickValueButtonSelected: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0284c7',
  },
  quickValueText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  quickValueTextSelected: {
    color: '#0284c7',
  },
  customInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#334155',
    backgroundColor: '#ffffff',
  },
  findingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  selectedCount: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  selectedCountText: {
    fontSize: 12,
    color: '#0284c7',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  systemTabs: {
    maxHeight: 56,
  },
  systemTabsContent: {
    paddingHorizontal: 16,
  },
  systemTab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  systemTabActive: {
    backgroundColor: '#e0f2fe',
  },
  systemTabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#64748b',
    letterSpacing: 0.3,
  },
  systemTabTextActive: {
    color: '#0284c7',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  categoryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryHeaderActive: {
    backgroundColor: '#f8fafc',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    letterSpacing: 0.3,
  },
  categoryContent: {
    padding: 16,
  },
  findingRow: {
    marginBottom: 20,
  },
  findingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    letterSpacing: 0.2,
  },
  findingInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickValueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickValueButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickValueButtonSelected: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0284c7',
  },
  quickValueText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  quickValueTextSelected: {
    color: '#0284c7',
  },
  customInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#334155',
    backgroundColor: '#ffffff',
  },

});

export default ExaminationFindings;