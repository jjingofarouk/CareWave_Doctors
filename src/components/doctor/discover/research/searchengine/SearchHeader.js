// SearchHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SearchHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Medical Literature Search</Text>
      <Text style={styles.subHeaderText}>Find evidence-based research</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2C3E50',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#BDC3C7',
    marginTop: 5,
  },
});