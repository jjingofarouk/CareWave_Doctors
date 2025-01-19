import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const DenverII = () => {
  const [grossMotor, setGrossMotor] = useState(0); // scale for gross motor skills (0-2)
  const [fineMotor, setFineMotor] = useState(0); // scale for fine motor skills (0-2)
  const [language, setLanguage] = useState(0); // scale for language skills (0-2)
  const [personalSocial, setPersonalSocial] = useState(0); // scale for personal/social skills (0-2)
  const [score, setScore] = useState(0);

  const calculateDenverII = () => {
    // Calculate total score
    let totalScore = grossMotor + fineMotor + language + personalSocial;
    setScore(totalScore);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Denver II Developmental Screening Test</Text>

      {/* Input fields for Denver II scoring */}
      <Text>Gross Motor Skills (0-2):</Text>
      <TextInput value={grossMotor.toString()} onChangeText={(text) => setGrossMotor(parseInt(text))} keyboardType="numeric" />

      <Text>Fine Motor Skills (0-2):</Text>
      <TextInput value={fineMotor.toString()} onChangeText={(text) => setFineMotor(parseInt(text))} keyboardType="numeric" />

      <Text>Language Skills (0-2):</Text>
      <TextInput value={language.toString()} onChangeText={(text) => setLanguage(parseInt(text))} keyboardType="numeric" />

      <Text>Personal/Social Skills (0-2):</Text>
      <TextInput value={personalSocial.toString()} onChangeText={(text) => setPersonalSocial(parseInt(text))} keyboardType="numeric" />

      <Button title="Calculate" onPress={calculateDenverII} />

      <Text>Total Score: {score}</Text>
    </View>
  );
};
