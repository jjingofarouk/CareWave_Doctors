// LoadingIndicator.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3498DB" />
      <Text style={styles.loadingText}>Searching medical literature...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#7F8C8D',
    fontSize: 16,
  },
});
