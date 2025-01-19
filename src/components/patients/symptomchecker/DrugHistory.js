import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { drugOptions } from './DrugOptions';

const DrugHistory = ({ drugHistory = [], onAddDrug }) => {
  const [newDrug, setNewDrug] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Update input and filter suggestions
  const handleInputChange = (text) => {
    setNewDrug(text);
    if (text.trim()) {
      const filteredOptions = drugOptions.filter((drug) =>
        drug.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredOptions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle adding a selected drug
  const handleAddDrug = (drug) => {
    const drugToAdd = drug || newDrug; // Use parameter if provided, fallback to input value
    if (drugToAdd && !drugHistory.includes(drugToAdd)) {
      onAddDrug(drugToAdd);
      setNewDrug('');
      setSuggestions([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drug History</Text>

      {/* Render existing drug history */}
      <FlatList
        data={drugHistory}
        renderItem={({ item, index }) => (
          <Text style={styles.listItem} key={index}>
            {item}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Input field for adding drugs */}
      <TextInput
        style={styles.input}
        value={newDrug}
        onChangeText={handleInputChange}
        placeholder="Enter drug name"
      />

      {/* Autosuggest dropdown */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleAddDrug(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item}-${index}`}
          style={styles.suggestionsList}
          keyboardShouldPersistTaps="handled"
        />
      )}

      {/* Add drug button */}
      <Button title="Add Drug" onPress={() => handleAddDrug()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 10,
  },
  suggestionsList: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 120,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default DrugHistory;
