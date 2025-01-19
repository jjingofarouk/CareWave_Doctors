import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConsultationStatus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultation Status</Text>
      <Text>Pending: 3</Text>
      <Text>In Progress: 1</Text>
      <Text>Completed: 20</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eaf4fc',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ConsultationStatus;
