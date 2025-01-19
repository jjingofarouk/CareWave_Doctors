// SymptomLogging.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SymptomLogging = () => {
  const [symptom, setSymptom] = useState('');
  const [details, setDetails] = useState('');
  
  const handleLogSymptom = () => {
    alert(`Your symptom has been logged: ${symptom}. Additional details: ${details}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log Your Symptoms</Text>
      <Text style={styles.info}>
        It's important to keep track of any new symptoms. This helps your healthcare provider understand how you're feeling and adjust your care if necessary.
      </Text>
      <TextInput 
        style={styles.input} 
        placeholder="What symptoms are you feeling?" 
        value={symptom}
        onChangeText={setSymptom}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Provide additional details (e.g., how long, how severe)" 
        value={details}
        onChangeText={setDetails}
      />
      <Button title="Log Symptom" onPress={handleLogSymptom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default SymptomLogging;
