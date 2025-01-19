// components/DoctorHome/AppointmentCalendar.js
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Clock, VideoIcon, MessageSquare } from 'lucide-react-native';
import { useTheme } from '../utils/useTheme';

const AppointmentCalendar = ({ appointments, onAppointmentPress }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { theme } = useTheme();

  const getMarkedDates = () => {
    const marked = {};
    appointments.forEach(appointment => {
      const date = appointment.date.split('T')[0];
      marked[date] = {
        marked: true,
        dotColor: appointment.isVideoCall ? theme.colors.primary : theme.colors.secondary
      };
    });
    return marked;
  };

  const filteredAppointments = appointments.filter(
    app => app.date.split('T')[0] === selectedDate
  );

  const AppointmentItem = ({ appointment }) => (
    <TouchableOpacity
      style={styles.appointmentItem}
      onPress={() => onAppointmentPress(appointment)}
    >
      <View style={styles.timeContainer}>
        <Clock size={16} color={theme.colors.primary} />
        <Text style={styles.timeText}>{appointment.time}</Text>
      </View>
      
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{appointment.patientName}</Text>
        <Text style={styles.appointmentType}>
          {appointment.isVideoCall ? 
            <VideoIcon size={16} color={theme.colors.primary} /> :
            <MessageSquare size={16} color={theme.colors.secondary} />
          }
          {appointment.type}
        </Text>
      </View>
      
      <View style={[
        styles.statusBadge,
        { backgroundColor: appointment.status === 'confirmed' ? '#E8F5E9' : '#FFF3E0' }
      ]}>
        <Text style={[
          styles.statusText,
          { color: appointment.status === 'confirmed' ? '#2E7D32' : '#EF6C00' }
        ]}>
          {appointment.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          ...getMarkedDates(),
          [selectedDate]: {
            selected: true,
            selectedColor: theme.colors.primary,
          }
        }}
        theme={{
          selectedDayBackgroundColor: theme.colors.primary,
          todayTextColor: theme.colors.primary,
          arrowColor: theme.colors.primary,
        }}
      />
      
      <View style={styles.appointmentsList}>
        <Text style={styles.dateTitle}>
          Appointments for {new Date(selectedDate).toLocaleDateString()}
        </Text>
        <FlatList
          data={filteredAppointments}
          renderItem={({ item }) => <AppointmentItem appointment={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No appointments for this date</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // ... additional styles
};

export default AppointmentCalendar;