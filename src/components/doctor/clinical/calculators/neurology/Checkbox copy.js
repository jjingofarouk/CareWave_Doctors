import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ label, checked, onChange, style }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={[styles.checkbox, checked && styles.checked]} 
                onPress={() => onChange(!checked)}>
                {checked && <View style={styles.innerCircle} />}
            </TouchableOpacity>
            {label && <Text style={styles.label}>{label}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'white',
    },
    checked: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default Checkbox;
