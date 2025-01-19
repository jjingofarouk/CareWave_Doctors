import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CancelAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [appointmentId, setAppointmentId] = useState('');
    const [cancellationReason, setCancellationReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/appointments/my-appointments', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setAppointments(data.appointments);
                } else {
                    setError(data.message || 'Error fetching appointments.');
                }
            } catch (error) {
                setError('Error fetching appointments.');
            }
        };

        fetchAppointments();
    }, []);

    const handleSubmit = async () => {
        if (!appointmentId) {
            setError('Please select a valid appointment to cancel.');
            return;
        }

        try {
            const response = await fetch(`/appointments/cancel/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ reason: cancellationReason }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Appointment canceled successfully!');
                setAppointmentId('');
                setCancellationReason('');
            } else {
                setError(data.message || 'Failed to cancel appointment.');
            }
        } catch (error) {
            setError('An error occurred while canceling the appointment.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cancel Appointment</Text>

            {message && <Text style={styles.successMessage}>{message}</Text>}
            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <View style={styles.formGroup}>
                <Text style={styles.label}>Select Appointment:</Text>
                <Picker
                    selectedValue={appointmentId}
                    onValueChange={(itemValue) => setAppointmentId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select an appointment" value="" />
                    {appointments.map((appointment) => (
                        <Picker.Item
                            key={appointment.id}
                            label={`ID: ${appointment.id}, Date: ${new Date(appointment.appointment_date).toLocaleString()}`}
                            value={appointment.id}
                        />
                    ))}
                </Picker>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Reason for Cancellation:</Text>
                <Picker
                    selectedValue={cancellationReason}
                    onValueChange={(itemValue) => setCancellationReason(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a reason" value="" />
                    <Picker.Item label="Schedule Conflict" value="Schedule Conflict" />
                    <Picker.Item label="Personal Reasons" value="Personal Reasons" />
                    <Picker.Item label="Doctor Availability" value="Doctor Availability" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </View>

            <Button title="Cancel Appointment" onPress={handleSubmit} color="#FF5733" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default CancelAppointment;
