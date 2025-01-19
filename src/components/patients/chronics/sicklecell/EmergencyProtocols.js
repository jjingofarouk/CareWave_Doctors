// EmergencyProtocols.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EmergencyProtocols = () => {
  const handleProtocol = () => {
    alert('Emergency protocol initiated. Seek immediate medical attention!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Protocols</Text>
      <Text style={styles.info}>
        If you experience severe pain, trouble breathing, or swelling, it's important to seek immediate medical care. Here are some steps to follow in case of an emergency:
      </Text>
      <Text style={styles.info}>
        1. Call emergency services or go to the nearest hospital if you experience severe pain that doesn't improve with your usual medications.
      </Text>
      <Text style={styles.info}>
        2. If you are unable to breathe or experience shortness of breath, call 911 immediately.
      </Text>
      <Text style={styles.info}>
        3. In case of swelling or swelling of the limbs, contact your doctor for further instructions.
      </Text>
      <Button title="Initiate Emergency Protocol" onPress={handleProtocol} color="#FF7043" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Light Gray background
    borderRadius: 8, // Rounded corners for better UI
    marginBottom: 20,
    shadowColor: '#000', // Shadow for elevation effect
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Elevation for Android
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54', // Primary Deep Teal color
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333333', // Dark Gray text color
    lineHeight: 24, // Improved line height for readability
  },
});

export default EmergencyProtocols;
