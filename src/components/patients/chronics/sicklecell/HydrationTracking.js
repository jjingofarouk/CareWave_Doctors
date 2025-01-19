// HydrationTracking.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HydrationTracking = () => {
  const [hydration, setHydration] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleLogHydration = () => {
    // Alert for logging hydration
    alert(`Your hydration level of ${hydration} Liters has been logged. Frequency: ${frequency}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Your Hydration</Text>
      <Text style={styles.info}>
        Staying hydrated is crucial to managing your condition. Log your daily hydration intake and how often you drink.
      </Text>

      {/* Hydration Level Input */}
      <TextInput
        style={styles.input}
        placeholder="How much water did you drink? (in Liters)"
        value={hydration}
        onChangeText={setHydration}
        keyboardType="numeric"
      />
      
      {/* Hydration Frequency Input */}
      <TextInput
        style={styles.input}
        placeholder="How often do you drink? (e.g., hourly, daily)"
        value={frequency}
        onChangeText={setFrequency}
      />
      
      {/* Log Hydration Button */}
      <Button title="Log Hydration" onPress={handleLogHydration} color="#FF7043" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Light gray background for consistency
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54', // Deep Teal for the header
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333333', // Dark Gray text color for readability
    lineHeight: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default HydrationTracking;
