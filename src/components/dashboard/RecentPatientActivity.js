import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecentPatientActivity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Patient Activity</Text>
      <Text>Recent Consultations: John Doe, Jane Smith</Text>
      <Text>Feedback: "Great service!"</Text>
      <Text>Follow-ups: 3 scheduled</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eef9f5',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default RecentPatientActivity;
