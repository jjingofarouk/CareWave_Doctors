import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TasksAndReminders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks & Reminders</Text>
      <Text>To-Do: Review lab results</Text>
      <Text>New Messages: 4 unread</Text>
      <Text>Alerts: Complete patient notes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff8e1',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default TasksAndReminders;
