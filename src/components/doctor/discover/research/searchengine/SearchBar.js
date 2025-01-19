// SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchBar = ({ onSearch, value, onChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search medical literature..."
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#95A5A6"
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Icon name="search" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 8,
  },
});
