import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Button } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');
  
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    Alert.alert('Selected Date', `You selected: ${day.dateString}`);
  };

  const events = [
    {
      title: 'Consultation with Dr. Smith',
      start: '2024-09-10',
      end: '2024-09-10',
    },
    {
      title: 'Health Checkup',
      start: '2024-09-12',
      end: '2024-09-12',
    },
  ];

  const markedDates = events.reduce((acc, event) => {
    acc[event.start] = { marked: true, dotColor: '#27c7b8' }; // marking the date with teal
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Calendar</Text>
      <RNCalendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'simple'}
        theme={{
          selectedDayBackgroundColor: '#27c7b8',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ff6347', // Today's date color
        }}
      />
      {selectedDate && (
        <View style={styles.details}>
          <Text>Selected Date: {selectedDate}</Text>
        </View>
      )}
      <Button title="Show Event Details" onPress={() => Alert.alert('Event Details', 'Consultation with Dr. Smith on 2024-09-10 from 10:00 AM to 11:00 AM.')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  details: {
    marginTop: 16,
  },
});

export default CalendarComponent;
