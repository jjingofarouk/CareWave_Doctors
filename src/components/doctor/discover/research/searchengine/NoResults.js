// NoResults.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const NoResults = () => {
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={64} color="#BDC3C7" />
      <Text style={styles.message}>No results found</Text>
      <Text style={styles.suggestion}>Try adjusting your search terms or filters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 20,
    color: '#2C3E50',
    marginTop: 20,
    fontWeight: 'bold',
  },
  suggestion: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 10,
    textAlign: 'center',
  },
});
