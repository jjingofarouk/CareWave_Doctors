import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const initialAppointments = [
  { id: 1, patient: 'John Doe', time: '10:00 AM', date: '2024-10-10' },
  { id: 2, patient: 'Jane Smith', time: '11:30 AM', date: '2024-10-10' },
  { id: 3, patient: 'Sam Kato', time: '2:00 PM', date: '2024-10-10' },
];

const SmartScheduler = () => {
  const [newAppointment, setNewAppointment] = useState({ patient: '', time: '', date: '' });
  const [scheduledAppointments, setScheduledAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAppointment = () => {
    if (!newAppointment.patient || !newAppointment.time || !newAppointment.date) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (editingId) {
      // Edit existing appointment
      setScheduledAppointments((prev) =>
        prev.map((appt) =>
          appt.id === editingId ? { ...appt, ...newAppointment } : appt
        )
      );
      setEditingId(null);
    } else {
      // Add new appointment
      const newId = scheduledAppointments.length
        ? scheduledAppointments[scheduledAppointments.length - 1].id + 1
        : 1;
      setScheduledAppointments([
        ...scheduledAppointments,
        { id: newId, ...newAppointment },
      ]);
    }

    setNewAppointment({ patient: '', time: '', date: '' });
  };

  const handleEdit = (appointment) => {
    setNewAppointment({ patient: appointment.patient, time: appointment.time, date: appointment.date });
    setEditingId(appointment.id);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setScheduledAppointments((prev) => prev.filter((appt) => appt.id !== id));
          },
        },
      ]
    );
  };

  const filteredAppointments = scheduledAppointments.filter(
    (appt) =>
      appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.date.includes(searchTerm) ||
      appt.time.includes(searchTerm)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Scheduler</Text>

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search by patient, date, or time"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Appointment Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={newAppointment.patient}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, patient: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Appointment Time (e.g., 10:00 AM)"
          value={newAppointment.time}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, time: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Appointment Date (YYYY-MM-DD)"
          value={newAppointment.date}
          onChangeText={(text) => setNewAppointment({ ...newAppointment, date: text })}
        />
        <Button
          title={editingId ? 'Update Appointment' : 'Schedule Appointment'}
          onPress={handleAppointment}
          color="#27c7b8"
        />
      </View>

      {/* Appointments List */}
      <Text style={styles.subHeader}>Upcoming Appointments</Text>
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentText}>
              {item.patient} - {item.time} on {item.date}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  form: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 10,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  appointmentText: {
    fontSize: 16,
    color: '#004C54',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    marginHorizontal: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27c7b8',
  },
});

export default SmartScheduler;
