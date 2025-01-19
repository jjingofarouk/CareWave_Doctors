import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Data fetch simulation for patient appointment history (Replace with real API call)
const fetchAppointmentHistory = async () => {
  // Sample data to mimic appointments
  return [
    {
      id: '1',
      date: '2024-11-15',
      time: '10:30 AM',
      doctor: 'Dr. John Doe',
      status: 'Completed',
      notes: 'Routine checkup. No concerns.',
    },
    {
      id: '2',
      date: '2024-11-20',
      time: '2:00 PM',
      doctor: 'Dr. Jane Smith',
      status: 'Upcoming',
      notes: 'Follow-up for blood tests.',
    },
    {
      id: '3',
      date: '2024-11-25',
      time: '1:15 PM',
      doctor: 'Dr. Alan White',
      status: 'Cancelled',
      notes: 'Patient cancelled due to personal reasons.',
    },
  ];
};

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await fetchAppointmentHistory();
      setAppointments(data);
    };
    
    loadAppointments();
  }, []);

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Appointment with {item.doctor}</Text>
      <Text style={styles.cardDescription}>
        {item.date} at {item.time}
      </Text>
      <Text style={styles.cardDescription}>Status: {item.status}</Text>
      <Text style={styles.cardDescription}>Notes: {item.notes}</Text>
      {item.status === 'Upcoming' && (
        <TouchableOpacity
          style={styles.rescheduleButton}
          onPress={() => navigation.navigate('RescheduleAppointment', { appointmentId: item.id })}>
          <Text style={styles.rescheduleButtonText}>Reschedule</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment History</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
  },
  cardDescription: {
    color: '#555',
    marginVertical: 5,
    fontSize: 16,
  },
  rescheduleButton: {
    marginTop: 15,
    backgroundColor: '#FF7043', // Coral Orange
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default AppointmentHistory;
