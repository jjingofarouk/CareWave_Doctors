import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const SOFACalculator = () => {
    const [scores, setScores] = useState({
        respiratory: '',
        coagulation: '',
        liver: '',
        cardiovascular: '',
        neurological: '',
        renal: '',
    });

    const [totalScore, setTotalScore] = useState(null);

    // Handle SOFA score calculation
    const calculateSOFA = () => {
        // Validate all inputs
        for (let key in scores) {
            if (scores[key] === '') {
                Alert.alert('Error', 'Please fill out all fields.');
                return;
            }
        }

        // Calculate the total score based on user input
        const total = Object.values(scores).reduce((acc, val) => acc + (parseInt(val) || 0), 0);
        setTotalScore(total);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardHeader}>SOFA Score Calculator</Text>
            <View style={styles.cardContent}>
                {/* Dynamic input fields for each score */}
                {Object.keys(scores).map((key) => (
                    <View key={key} style={styles.inputWrapper}>
                        <Text style={styles.label}>
                            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder={`Enter ${key}`}
                            value={scores[key]}
                            onChangeText={(text) => setScores({ ...scores, [key]: text })}
                        />
                    </View>
                ))}
                
                {/* Button to calculate SOFA score */}
                <Button title="Calculate Score" onPress={calculateSOFA} />

                {/* Display the calculated SOFA score */}
                {totalScore !== null && (
                    <Text style={styles.result}>Total SOFA Score: {totalScore}</Text>
                )}
            </View>
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 20,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    cardContent: {
        marginBottom: 20,
    },
    inputWrapper: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        color: '#00796b',
    },
});

export default SOFACalculator;
