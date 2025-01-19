import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const CustomSelect = ({ options, selectedValue, onSelect, placeholder }) => {
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.placeholderText}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        editable={false}
        value={selectedValue}
        placeholder={placeholder}
      />
      {options && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => onSelect(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  placeholderText: {
    color: '#9e9e9e',
    fontSize: 14,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomSelect;
