import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { drugOptions } from './drugOptions'; // Import drug options for autosuggestions
import drugEducation from '../DrugEducation'; // Import the drug education data

function EducationalContent() {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Handle input change and suggest topics
    const handleTopicChange = (input) => {
        setTopic(input);

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

    const handleSuggestionClick = (suggestion) => {
        setTopic(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    };

    const handleFetchContent = () => {
        if (!topic) {
            setError('Please enter a medication topic.');
            return;
        }

        setLoading(true);
        setError('');
        setContent(null); // Clear previous content

        // Fetch drug information from the drugEducation object
        const drugData = drugEducation[topic];
        if (!drugData) {
            setError('Medication not found. Please check the name.');
            setLoading(false);
            return;
        }

        // Format the content for display
        const formattedContent = (
            <View style={styles.contentCard}>
                <Text style={styles.contentText}><Text style={styles.bold}>Uses:</Text> {drugData.use}</Text>
                <Text style={styles.contentText}><Text style={styles.bold}>Contraindications:</Text> {drugData.contraindications}</Text>
                <Text style={styles.contentText}><Text style={styles.bold}>Side Effects:</Text> {drugData.sideEffects}</Text>
            </View>
        );

        setContent(formattedContent);
        setLoading(false);
    };

    const handleReset = () => {
        setTopic('');
        setContent(null);
        setError('');
        setSuggestions([]); // Clear suggestions
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Know Your Medications Better</Text>
            <TextInput
                style={styles.input}
                value={topic}
                onChangeText={handleTopicChange}
                placeholder="Enter medication"
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

            <TouchableOpacity
                style={[styles.button, styles.getContentButton]}
                onPress={handleFetchContent}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Fetching...' : 'Get Content'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={handleReset}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            
            {error && <Text style={styles.error}>{error}</Text>}
            {content && <View style={styles.content}>{content}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#F5F7FA', // Light Gray
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#004C54', // Deep Teal
        marginBottom: 20,
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
    error: {
        color: '#D32F2F', // Red for error
        marginTop: 10,
    },
    contentCard: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    contentText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333333', // Dark Gray
    },
    bold: {
        fontWeight: 'bold',
        color: '#004C54', // Deep Teal
    },
    button: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    getContentButton: {
        backgroundColor: '#009688', // Medium Teal
    },
    resetButton: {
        backgroundColor: '#FF7043', // Coral Orange
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default EducationalContent;
