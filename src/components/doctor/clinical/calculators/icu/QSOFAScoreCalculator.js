import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const QSOFAScoreCalculator = () => {
    const [scores, setScores] = useState({
        respiratoryRate: '',
        systolicBP: '',
        alteredMentalStatus: false
    });
    const [totalScore, setTotalScore] = useState(0);

    // Handle score calculation logic
    const calculateQSOFA = () => {
        let score = 0;

        // Validate inputs
        if (!scores.respiratoryRate || !scores.systolicBP) {
            Alert.alert('Error', 'Please fill all fields correctly.');
            return;
        }

        // Convert inputs to numbers for proper comparison
        const respiratoryRate = parseInt(scores.respiratoryRate, 10);
        const systolicBP = parseInt(scores.systolicBP, 10);

        // Calculate score based on criteria
        if (respiratoryRate > 22) score += 1;
        if (systolicBP < 100) score += 1;
        if (scores.alteredMentalStatus) score += 1;

        setTotalScore(score);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardHeader}>QSOFA Score Calculator</Text>
            <View style={styles.cardContent}>
                {/* Respiratory Rate Input */}
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Respiratory Rate</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter Respiratory Rate"
                        value={scores.respiratoryRate}
                        onChangeText={(text) => setScores({ ...scores, respiratoryRate: text })}
                    />
                </View>

                {/* Systolic BP Input */}
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Systolic BP</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter Systolic BP"
                        value={scores.systolicBP}
                        onChangeText={(text) => setScores({ ...scores, systolicBP: text })}
                    />
                </View>

                {/* Altered Mental Status Input */}
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Altered Mental Status</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter 1 for Yes, 0 for No"
                        value={scores.alteredMentalStatus ? '1' : '0'}
                        onChangeText={(text) => setScores({ ...scores, alteredMentalStatus: text === '1' })}
                    />
                </View>

                {/* Calculate Button */}
                <Button title="Calculate Score" onPress={calculateQSOFA} />

                {/* Result */}
                <Text style={styles.result}>Total QSOFA Score: {totalScore}</Text>
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

export default QSOFAScoreCalculator;
