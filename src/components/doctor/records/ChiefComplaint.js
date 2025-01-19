import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import CustomSelect from '../../utils/CustomSelect';
import { symptomsList } from './symptomsList';

const ChiefComplaint = ({ chiefComplaints = ['', '', ''], durations = ['', '', ''], handleInputChange }) => {
  const [inputValues, setInputValues] = useState(chiefComplaints);
  const [durationValues, setDurationValues] = useState(durations);
  const [durationUnits, setDurationUnits] = useState(['days', 'days', 'days']);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => {
    setInputValues(chiefComplaints);
    setDurationValues(durations);
  }, [chiefComplaints, durations]);

  const handleChange = (index, text) => {
    const updatedComplaints = [...inputValues];
    updatedComplaints[index] = text;
    setInputValues(updatedComplaints);
    handleInputChange(`chiefComplaints[${index}]`, '', text);

    if (text.length > 0) {
      const filteredSuggestions = symptomsList
        .filter(symptom => symptom.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, index) => {
    const updatedComplaints = [...inputValues];
    updatedComplaints[index] = suggestion;
    setInputValues(updatedComplaints);
    handleInputChange(`chiefComplaints[${index}]`, '', suggestion);
    setSuggestions([]);
    setActiveInput(null);
  };

  const handleDurationChange = (index, text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const updatedDurations = [...durationValues];
    updatedDurations[index] = numericText;
    setDurationValues(updatedDurations);
    handleInputChange(`durations[${index}]`, '', numericText);
  };

  const handleUnitChange = (index, item) => {
    const updatedUnits = [...durationUnits];
    updatedUnits[index] = item.value;
    setDurationUnits(updatedUnits);
    handleInputChange(`durationUnits[${index}]`, '', item.value);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Chief Complaints</Text>
          
          {[0, 1, 2].map((index) => (
            <View key={index} style={styles.complaintGroup}>
              <Text style={styles.sectionTitle}>Complaint {index + 1}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your complaint"
                  placeholderTextColor="#A0AEC0"

                  value={inputValues[index]}
                  onChangeText={(text) => handleChange(index, text)}
                  onFocus={() => setActiveInput(index)}
                  multiline
                />
                
                {activeInput === index && suggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    {suggestions.map((suggestion, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.suggestionItem}
                        onPress={() => handleSuggestionClick(suggestion, index)}
                      >
                        <Text>{suggestion}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Duration</Text>
                <TextInput
                  style={styles.durationInput}
                  placeholder="Enter duration"
                  placeholderTextColor="#A0AEC0"

                  value={durationValues[index]}
                  onChangeText={(text) => handleDurationChange(index, text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Duration Unit</Text>
                <CustomSelect
                  options={[
                    { label: 'Days', value: 'days' },
                    { label: 'Weeks', value: 'weeks' },
                    { label: 'Months', value: 'months' },
                    { label: 'Years', value: 'years' },
                  ]}
                  placeholder="Select unit"
                  placeholderTextColor="#A0AEC0"

                  onSelect={(item) => handleUnitChange(index, item)}
                  value={durationUnits[index]}
                />
              </View>

              {index < 2 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    color: '#333',
  },
  complaintGroup: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: '#444',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  durationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 24,
  }
});

export default ChiefComplaint;