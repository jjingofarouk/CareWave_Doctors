import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function VisitHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Visit History</Text>
      <Text style={styles.content}>Here, you can check your past medical visits and consultations.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

export default VisitHistory;
