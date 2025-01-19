import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuickStats = ({ consultations, activeAppointments, pendingTasks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Stats</Text>
      <Text>Total Consultations: {consultations}</Text>
      <Text>Active Appointments: {activeAppointments}</Text>
      <Text>Pending Tasks: {pendingTasks}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuickStats;
