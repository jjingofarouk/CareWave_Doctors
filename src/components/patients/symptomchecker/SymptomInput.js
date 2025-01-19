import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { symptomList } from './SymptomList';
import { symptomCombinations } from './SymptomCombinations';

const Select = ({ label, value, options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={value ? styles.selectText : styles.placeholderText}>
          {value || placeholder}
        </Text>
        <MaterialIcons 
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={24} 
          color="#94A3B8" 
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.option, value === option && styles.selectedOption]}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={[
                styles.optionText, 
                value === option && styles.selectedOptionText
              ]}>
                {option}
              </Text>
              {value === option && (
                <MaterialIcons name="check" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const SymptomInput = ({ onSelectSymptoms, patientInfo, onPatientInfoChange }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleInputChange = (text) => {
    setInput(text);
    if (text.trim()) {
      // Filter individual symptoms
      const filteredSymptoms = symptomList
        .filter(symptom => 
          symptom.toLowerCase().includes(text.toLowerCase()) && 
          !selectedSymptoms.includes(symptom)
        )
        .slice(0, 5);

      // Filter symptom combinations
      const combinationKeys = Object.keys(symptomCombinations);
      const filteredCombinations = combinationKeys
        .filter(combination => {
          const symptoms = combination.split(', ');
          return symptoms.some(symptom => 
            symptom.toLowerCase().includes(text.toLowerCase())
          ) && 
          symptoms.some(symptom => !selectedSymptoms.includes(symptom));
        })
        .slice(0, 5);

      const combinedSuggestions = [
        ...filteredCombinations.map(combination => ({
          type: 'combination',
          text: combination,
          symptoms: combination.split(', ')
        })),
        ...filteredSymptoms.map(symptom => ({
          type: 'single',
          text: symptom
        }))
      ];

      setSuggestions(combinedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSymptomSelect = (suggestion) => {
    let symptomsToAdd = [];
    if (suggestion.type === 'combination') {
      symptomsToAdd = suggestion.symptoms;
    } else {
      symptomsToAdd = [suggestion.text];
    }
    
    const uniqueNewSymptoms = symptomsToAdd.filter(
      symptom => !selectedSymptoms.includes(symptom)
    );

    if (uniqueNewSymptoms.length > 0) {
      const updatedSymptoms = [...selectedSymptoms, ...uniqueNewSymptoms];
      setSelectedSymptoms(updatedSymptoms);
      onSelectSymptoms(updatedSymptoms);
    }
    
    setInput('');
    setSuggestions([]);
  };

  const removeSymptom = (symptomToRemove) => {
    const updatedSymptoms = selectedSymptoms.filter(s => s !== symptomToRemove);
    setSelectedSymptoms(updatedSymptoms);
    onSelectSymptoms(updatedSymptoms);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={patientInfo.age}
          onChangeText={(value) => onPatientInfoChange('age', value)}
        />
      </View>

      <Select
        label="Gender"
        value={patientInfo.gender}
        options={['Male', 'Female', 'Other']}
        onSelect={(value) => onPatientInfoChange('gender', value)}
        placeholder="Select your gender"
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Symptoms</Text>
        <TextInput
          style={styles.input}
          placeholder="Type to search symptoms..."
          placeholderTextColor="#94A3B8"
          value={input}
          onChangeText={handleInputChange}
        />

        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.suggestion,
                  suggestion.type === 'combination' && styles.combinationSuggestion
                ]}
                onPress={() => handleSymptomSelect(suggestion)}
              >
                <Text style={[
                  styles.suggestionText,
                  suggestion.type === 'combination' && styles.combinationText
                ]}>
                  {suggestion.type === 'combination' ? '🔗 ' : ''}
                  {suggestion.text}
                </Text>
                <MaterialIcons name="add" size={18} color="#3B82F6" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedSymptoms.length > 0 && (
          <View style={styles.selectedContainer}>
            {selectedSymptoms.map((symptom) => (
              <View key={symptom} style={styles.selectedSymptom}>
                <Text style={styles.selectedSymptomText}>{symptom}</Text>
                <TouchableOpacity onPress={() => removeSymptom(symptom)}>
                  <MaterialIcons name="close" size={16} color="#64748B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.rowContainer}>
        <View style={[styles.inputGroup, styles.durationInput]}>
          <Text style={styles.label}>Duration</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={patientInfo.duration}
            onChangeText={(value) => onPatientInfoChange('duration', value)}
          />
        </View>

        <View style={[styles.inputGroup, styles.durationUnit]}>
          <Text style={styles.label}>&nbsp;</Text>
          <Select
            value={patientInfo.durationUnit}
            options={['Days', 'Weeks', 'Months']}
            onSelect={(value) => onPatientInfoChange('durationUnit', value)}
            placeholder="Unit"
          />
        </View>
      </View>

      <Select
        label="Severity"
        value={patientInfo.severity}
        options={['Mild', 'Moderate', 'Severe']}
        onSelect={(value) => onPatientInfoChange('severity', value)}
        placeholder="Select severity level"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectButton: {
    height: 56,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: '#1E293B',
  },
  placeholderText: {
    fontSize: 16,
    color: '#94A3B8',
  },
  optionsContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    zIndex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectedOption: {
    backgroundColor: '#F1F5F9',
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
  },
  selectedOptionText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  durationInput: {
    flex: 2,
    marginBottom: 0,
  },
  durationUnit: {
    flex: 1,
    marginBottom: 0,
  },
  suggestionsContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    zIndex: 1,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  combinationSuggestion: {
    backgroundColor: '#F0F9FF',
  },
  suggestionText: {
    fontSize: 16,
    color: '#1E293B',
  },
  combinationText: {
    color: '#0369A1',
    fontWeight: '500',
  },
  selectedContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedSymptom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  selectedSymptomText: {
    fontSize: 14,
    color: '#475569',
  },
});

export default SymptomInput;