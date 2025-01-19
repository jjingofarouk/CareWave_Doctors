import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import from the new package
import { drugOptions } from './drugOptions'; // Import drug options for autosuggestions
import Checkbox from '../../utils/Checkbox'; // Import the custom checkbox component

function MedicationAdherence() {
    const [adherenceData, setAdherenceData] = useState([]);
    const [medication, setMedication] = useState('');
    const [taken, setTaken] = useState(false);
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [time, setTime] = useState(new Date());  // Track the time when the medication was taken
    const [showTimePicker, setShowTimePicker] = useState(false); // State to toggle the Time Picker

    // Handle Medication input change
    const handleMedicationChange = (input) => {
        setMedication(input);

        // Suggest drugs based on user input
        if (input) {
            const filteredSuggestions = drugOptions.filter((drug) =>
                drug.toLowerCase().startsWith(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 5)); // Limit suggestions to 5
        } else {
            setSuggestions([]);
        }
    };

    // Handle selecting a suggestion
    const handleSuggestionClick = (suggestion) => {
        setMedication(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    };

    // Handle logging adherence (including time taken)
    const handleLogAdherence = () => {
        if (!medication) {
            setMessage('Please enter a medication name.');
            return;
        }

        const newLog = {
            medication,
            taken,
            date: new Date().toISOString().split('T')[0],
            time: time.toLocaleTimeString(), // Log the time when medication was taken
        };
        setAdherenceData([...adherenceData, newLog]);
        setMedication('');
        setTaken(false);
        setMessage('Adherence logged successfully!');
        setSuggestions([]);
    };

    // Handle time change in DateTimePicker
    const handleTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || time;
        setShowTimePicker(Platform.OS === 'ios' ? true : false); // Only show on iOS if picked
        setTime(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Medication Adherence Log</Text>
            
            <Text style={styles.label}>Medication Name:</Text>
            <TextInput
                style={styles.input}
                value={medication}
                onChangeText={handleMedicationChange}
                placeholder="Enter Medication Name"
            />
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
                            <Text style={styles.suggestion}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Text style={styles.label}>Medication Taken?</Text>
            {/* Use the custom Checkbox component */}
            <Checkbox 
                label="Taken"
                checked={taken} 
                onChange={setTaken} 
            />

            <Text style={styles.label}>Time Taken:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
                <Text style={styles.timeText}>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>

            {/* DateTimePicker for selecting time */}
            {showTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode="time"
                    is24Hour={true}
                    onChange={handleTimeChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogAdherence}>
                <Text style={styles.buttonText}>Log Adherence</Text>
            </TouchableOpacity>
            
            {message && <Text style={styles.message}>{message}</Text>}

            <Text style={styles.historyHeader}>Adherence History</Text>
            <FlatList
                data={adherenceData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.logItem}>
                        <Text style={styles.logMedication}>{item.medication}</Text>
                        <Text style={styles.logDate}>{item.date} at {item.time}</Text> {/* Display time */}
                        <Text style={[styles.logStatus, item.taken ? styles.taken : styles.notTaken]}>
                            {item.taken ? 'Taken' : 'Not Taken'}
                        </Text>
                    </View>
                )}
            />
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
    },
    suggestion: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        fontSize: 16,
        color: '#004C54', // Deep Teal
    },
    message: {
        marginTop: 20,
        color: '#4CAF50', // Green for success
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
    },
    historyHeader: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#004C54', // Deep Teal
    },
    logItem: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    logMedication: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333', // Dark Gray
    },
    logDate: {
        fontSize: 16,
        color: '#009688', // Medium Teal
        marginVertical: 5,
    },
    logStatus: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taken: {
        color: '#4CAF50', // Green for Taken
    },
    notTaken: {
        color: '#D32F2F', // Red for Not Taken
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
    timeButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 16,
        color: '#333333',
    },
});

export default MedicationAdherence;
