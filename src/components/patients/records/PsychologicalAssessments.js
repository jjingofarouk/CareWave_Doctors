import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PsychologicalAssessments() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Psychological Assessments</Text>
      <Text style={styles.content}>Here, you can access your psychological assessments and related information.</Text>
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

export default PsychologicalAssessments;
