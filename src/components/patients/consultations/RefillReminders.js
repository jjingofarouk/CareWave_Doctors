import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { drugOptions } from './drugOptions'; // Import drug options for autosuggestions
import DateTimePicker from '@react-native-community/datetimepicker';

function RefillReminders() {
    const [medication, setMedication] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddReminder = () => {
        if (!medication || !reminderDate) {
            setMessage('Please fill in all fields.');
            return;
        }

        // Suggest drugs based on user input
        if (medication) {
            const filteredSuggestions = drugOptions.filter((drug) =>
                drug.toLowerCase().startsWith(medication.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 5)); // Limit suggestions to 5
        } else {
            setSuggestions([]);
        }

        // Here you could save the reminder to a database or send a notification.
        setMessage(`Reminder set for ${medication} on ${reminderDate}`);
        setMedication('');
        setReminderDate('');
    };

    const handleSuggestionClick = (suggestion) => {
        setMedication(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || reminderDate;
        setShowDatePicker(Platform.OS === 'ios' ? true : false);
        setReminderDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Refill Reminders</Text>
            
            <Text style={styles.label}>Medication Name:</Text>
            <TextInput
                style={styles.input}
                value={medication}
                onChangeText={setMedication}
                placeholder="Enter Medication Name"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSuggestionClick(item)} style={styles.suggestionItem}>
                            <Text style={styles.suggestionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Text style={styles.label}>Reminder Date:</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>{reminderDate ? reminderDate.toLocaleDateString() : 'Select a date'}</Text>
            </TouchableOpacity>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={reminderDate ? new Date(reminderDate) : new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleAddReminder}>
                <Text style={styles.buttonText}>Set Reminder</Text>
            </TouchableOpacity>

            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F7FA', // Light Gray
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#004C54', // Deep Teal
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333333', // Dark Gray
        marginBottom: 5,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#333333', // Dark Gray
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333333', // Dark Gray
        textAlign: 'center',
    },
    suggestionItem: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 5,
    },
    suggestionText: {
        fontSize: 16,
        color: '#004C54', // Deep Teal
    },
    button: {
        backgroundColor: '#009688', // Medium Teal
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    message: {
        marginTop: 20,
        color: '#4CAF50', // Green for success
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default RefillReminders;
