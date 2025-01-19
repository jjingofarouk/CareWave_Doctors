import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (feedback.trim() === '') {
      Alert.alert('Please enter feedback before submitting.');
      return;
    }
    console.log('Feedback submitted:', feedback);
    setSuccess(true);
    // Later, you can send a POST request to your backend to submit feedback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback</Text>
      
      {success ? (
        <Text style={styles.successMessage}>Thank you for your feedback!</Text>
      ) : (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your feedback here..."
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            multiline
            numberOfLines={5}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlignVertical: 'top', // Ensures text starts from the top of the TextInput
  },
  submitButton: {
    backgroundColor: '#FF7043',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for success
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Feedback;
