// SavedSearches.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SavedSearches = ({ searches, onSearchSelect, onSearchDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Searches</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {searches.map((search) => (
          <View key={search.id} style={styles.searchItem}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => onSearchSelect(search)}
            >
              <Text style={styles.searchText}>{search.query}</Text>
              <Text style={styles.dateText}>{search.date}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onSearchDelete(search.id)}
            >
              <Icon name="close-circle" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 15,
    marginBottom: 10,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  searchButton: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },
  searchText: {
    color: '#2C3E50',
    fontSize: 14,
  },
  dateText: {
    color: '#95A5A6',
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    padding: 5,
  },
});