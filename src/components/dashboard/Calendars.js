// SimpleCalendar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SimpleCalendar = ({ events, onEventPress }) => {
  const generateDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((day, index) => (
      <View key={index} style={styles.dayOfWeek}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
    ));
  };

  const generateCalendar = () => {
    const currentMonthDays = new Date(2024, 11, 1); // December 2024 for demonstration
    const totalDaysInMonth = new Date(2024, 12, 0).getDate(); // Get last day of month
    const calendarDays = [];

    // Fill in leading empty days (start from the first day of the month)
    const firstDay = currentMonthDays.getDay();
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays.map((day, index) => {
      if (!day) return <View key={index} style={styles.emptyDay}></View>;

      // Find events for the specific day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getDate() === day && eventDate.getMonth() === 11; // Match December
      });

      return (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>
          {dayEvents.map((event, eventIndex) => (
            <TouchableOpacity
              key={eventIndex}
              style={styles.event}
              onPress={() => onEventPress(event)}
            >
              <Text style={styles.eventText}>{event.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    });
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.daysOfWeek}>{generateDaysOfWeek()}</View>
      <View style={styles.calendarGrid}>{generateCalendar()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dayOfWeek: {
    width: '13%',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '13%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  emptyDay: {
    width: '13%',
    height: 50,
  },
  event: {
    marginTop: 5,
    backgroundColor: '#27c7b8',
    borderRadius: 5,
    padding: 5,
    width: '100%',
    alignItems: 'center',
  },
  eventText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default SimpleCalendar;
