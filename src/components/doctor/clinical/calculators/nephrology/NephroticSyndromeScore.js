import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const NephroticSyndromeScore = () => {
  const [albumin, setAlbumin] = useState('');
  const [proteinuria, setProteinuria] = useState('');
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    const syndromeScore = (albumin * 0.1 + proteinuria * 0.2).toFixed(2);
    setScore(syndromeScore);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nephrotic Syndrome Score</Text>

      <TextInput
        style={styles.input}
        placeholder="Albumin (g/dL) - Reference: 3.5-5.0"
        value={albumin}
        onChangeText={(text) => setAlbumin(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Proteinuria (mg/day) - Reference: < 150"
        value={proteinuria}
        onChangeText={(text) => setProteinuria(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate Score" onPress={calculateScore} />

      {score && <Text style={styles.result}>Nephrotic Syndrome Score: {score}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default NephroticSyndromeScore;
