import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export const SF36 = () => {
  const [scores, setScores] = useState({
    physicalFunctioning: 0,
    roleLimitations: 0,
    bodilyPain: 0,
    generalHealth: 0,
    vitality: 0,
    socialFunctioning: 0,
    mentalHealth: 0,
  });

  const handleScoreChange = (scoreName, value) => {
    setScores({ ...scores, [scoreName]: value });
  };

  const calculateScore = () => {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    return totalScore;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SF-36 (Health-Related Quality of Life)</Text>

      <Text>Physical Functioning:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.physicalFunctioning.toString()}
        onChangeText={(value) => handleScoreChange("physicalFunctioning", value)}
      />

      <Text>Role Limitations:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.roleLimitations.toString()}
        onChangeText={(value) => handleScoreChange("roleLimitations", value)}
      />

      <Text>Bodily Pain:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.bodilyPain.toString()}
        onChangeText={(value) => handleScoreChange("bodilyPain", value)}
      />

      <Text>General Health:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.generalHealth.toString()}
        onChangeText={(value) => handleScoreChange("generalHealth", value)}
      />

      <Text>Vitality:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.vitality.toString()}
        onChangeText={(value) => handleScoreChange("vitality", value)}
      />

      <Text>Social Functioning:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.socialFunctioning.toString()}
        onChangeText={(value) => handleScoreChange("socialFunctioning", value)}
      />

      <Text>Mental Health:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scores.mentalHealth.toString()}
        onChangeText={(value) => handleScoreChange("mentalHealth", value)}
      />

      <Button title="Calculate SF-36 Total Score" onPress={calculateScore} />
      <Text>Total SF-36 Score: {calculateScore()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
});
