import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DailySchedule = ({ appointments }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Appointments</Text>
      {appointments.map((appointment, index) => (
        <Text key={index} style={styles.appointment}>
          {appointment.time} - {appointment.patient}
        </Text>
      ))}
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
  appointment: {
    fontSize: 16,
    color: '#002432',
  },
});

export default DailySchedule;
