import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ApacheIICalculator = () => {
    const [scores, setScores] = useState({
        age: '',
        temperature: '',
        heartRate: '',
        respiratoryRate: '',
        systolicBP: '',
        oxygen: '',
        arterialPH: '',
        sodium: '',
        potassium: '',
        creatinine: '',
        hematocrit: '',
        whiteBloodCellCount: '',
        glasgowComaScore: '',
    });

    const [totalScore, setTotalScore] = useState(null);

    // Function to validate inputs and calculate APACHE II score
    const calculateAPACHEII = () => {
        let score = 0;
        // Validate if all fields are filled
        for (let key in scores) {
            if (scores[key] === '') {
                Alert.alert('Error', `Please fill out the ${key.replace(/([A-Z])/g, ' $1').toUpperCase()} field.`);
                return;
            }
        }

        // Calculate the score based on the criteria
        score += parseInt(scores.age) > 44 ? 1 : 0;
        score += parseFloat(scores.temperature) < 30 || parseFloat(scores.temperature) > 39 ? 1 : 0;
        score += parseInt(scores.heartRate) > 180 ? 1 : 0;
        score += parseInt(scores.respiratoryRate) > 30 ? 1 : 0;
        score += parseInt(scores.systolicBP) < 70 ? 1 : 0;
        score += parseInt(scores.oxygen) < 60 ? 1 : 0;
        score += parseFloat(scores.arterialPH) < 7.2 || parseFloat(scores.arterialPH) > 7.5 ? 1 : 0;
        score += parseInt(scores.sodium) < 130 || parseInt(scores.sodium) > 150 ? 1 : 0;
        score += parseFloat(scores.potassium) < 3 || parseFloat(scores.potassium) > 6 ? 1 : 0;
        score += parseFloat(scores.creatinine) > 1.2 ? 1 : 0;
        score += parseFloat(scores.hematocrit) < 30 ? 1 : 0;
        score += parseInt(scores.whiteBloodCellCount) < 4000 || parseInt(scores.whiteBloodCellCount) > 12000 ? 1 : 0;
        score += parseInt(scores.glasgowComaScore) < 13 ? 1 : 0;

        setTotalScore(score);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardHeader}>APACHE II Score Calculator</Text>
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
                            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                            value={scores[key]}
                            onChangeText={(text) => setScores({ ...scores, [key]: text })}
                        />
                    </View>
                ))}
                
                {/* Button to calculate APACHE II score */}
                <Button title="Calculate Score" onPress={calculateAPACHEII} />

                {/* Display the calculated APACHE II score */}
                {totalScore !== null && (
                    <Text style={styles.result}>Total APACHE II Score: {totalScore}</Text>
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

export default ApacheIICalculator;
