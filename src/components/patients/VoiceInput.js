import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Voice from 'react-native-voice';

const VoiceInput = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechError = (event) => setError(event.error);
    Voice.onSpeechResults = (event) => {
      const command = event.value[0].trim();
      onCommand(command); // Pass the command to the parent component
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners); // Cleanup on component unmount
    };
  }, [onCommand]);

  const toggleListening = () => {
    if (isListening) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }
  };

  return (
    <View style={styles.voiceInput}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <TouchableOpacity
            onPress={toggleListening}
            style={[styles.button, isListening ? styles.listening : null]}
          >
            <Text style={styles.buttonText}>
              {isListening ? 'Stop Listening' : 'Start Voice Input'}
            </Text>
          </TouchableOpacity>
          {isListening && <Text style={styles.listeningText}>Listening for commands...</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  voiceInput: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  listening: {
    backgroundColor: '#FF7043',
  },
  listeningText: {
    marginTop: 10,
    color: '#FF7043',
  },
  errorText: {
    color: '#D32F2D',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default VoiceInput;
