import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-big-calendar';

const events = [
  {
    title: 'Consultation with Dr. Smith',
    start: new Date(2024, 8, 10, 10, 0), // September is month 8 (zero-based index)
    end: new Date(2024, 8, 10, 11, 0),
    description: 'Follow-up consultation for diabetes treatment.',
  },
  {
    title: 'Health Checkup',
    start: new Date(2024, 8, 12, 14, 0),
    end: new Date(2024, 8, 12, 15, 0),
    description: 'General health checkup appointment.',
  },
];

const Calendar = () => {
  const handleEventPress = (event) => {
    Alert.alert(
      'Event Details',
      `Title: ${event.title}\nStart: ${event.start.toLocaleString()}\nEnd: ${event.end.toLocaleString()}\nDescription: ${event.description || 'No description provided.'}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Appointment Calendar</Text>
      <Calendar
        events={events}
        height={600} // Adjust height as needed
        onPressEvent={handleEventPress}
        mode="month" // Options: "day", "week", "month"
        eventCellStyle={styles.eventCell} // Custom event styling
        headerContainerStyle={styles.headerContainer}
        weekDayHeaderStyle={styles.weekDayHeader}
        activeDateStyle={styles.activeDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002432',
    marginBottom: 10,
  },
  eventCell: {
    backgroundColor: '#27c7b8',
    borderRadius: 5,
    padding: 5,
  },
  headerContainer: {
    backgroundColor: '#002432',
    borderRadius: 5,
    marginBottom: 10,
  },
  weekDayHeader: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activeDate: {
    backgroundColor: '#f78837',
    color: '#ffffff',
    borderRadius: 20,
    padding: 5,
  },
});

export default ICalendar;
