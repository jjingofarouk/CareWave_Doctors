import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QSOFAScoreCalculator from './QSOFAScoreCalculator';  // Ensure correct import paths
import SOFACalculator from './SOFACalculator';
import ApacheIICalculator from './APACHE';

// Main ICU component
const ICU = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Intensive Care Unit Calculators</Text>
            
            {/* ScrollView to handle screen overflow for smaller devices */}
            <ScrollView style={styles.scrollContainer}>
                <ApacheIICalculator />
                <SOFACalculator />
                <QSOFAScoreCalculator />
                {/* Additional calculators can be added here */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f7fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    cardHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: 'column',
    },
    inputWrapper: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
    },
    result: {
        fontSize: 18,
        marginTop: 12,
        fontWeight: 'bold',
    },
});

export default ICU;
