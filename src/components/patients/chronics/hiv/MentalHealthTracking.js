import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomSelect from '../../../utils/CustomSelect'; // Assuming CustomSelect is your custom component

const MentalHealthTracking = ({ onLogMentalHealth }) => {
  const [mood, setMood] = useState('');
  const [selfCare, setSelfCare] = useState('');
  const [supportiveContacts, setSupportiveContacts] = useState('');
  const [stressors, setStressors] = useState('');
  const [triggers, setTriggers] = useState('');
  const [helpSought, setHelpSought] = useState('');
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({
    feelingDown: '',
    copingWithStress: '',
  });
  
  const handleLogMentalHealth = () => {
    const mentalHealthData = {
      mood,
      selfCare,
      supportiveContacts,
      stressors,
      triggers,
      helpSought,
      questionnaireAnswers,
    };
    onLogMentalHealth(mentalHealthData);
    
    // Reset all fields after submission
    setMood('');
    setSelfCare('');
    setSupportiveContacts('');
    setStressors('');
    setTriggers('');
    setHelpSought('');
    setQuestionnaireAnswers({
      feelingDown: '',
      copingWithStress: '',
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Track Mental Health</Text>
      
      {/* Mood - Using CustomSelect */}
      <Text style={styles.label}>How are you feeling?</Text>
      <CustomSelect
        options={[
          { label: "Select your mood", value: "" },
          { label: "Happy", value: "Happy" },
          { label: "Sad", value: "Sad" },
          { label: "Anxious", value: "Anxious" },
          { label: "Stressed", value: "Stressed" },
          { label: "Angry", value: "Angry" },
        ]}
        selectedValue={mood}
        onSelect={(value) => setMood(value)}
      />

      {/* Self-Care Activities - Using CustomSelect */}
      <Text style={styles.label}>What self-care activities have you done?</Text>
      <CustomSelect
        options={[
          { label: "Select an activity", value: "" },
          { label: "Exercise", value: "Exercise" },
          { label: "Meditation", value: "Meditation" },
          { label: "Reading", value: "Reading" },
          { label: "Talking to someone", value: "Talking" },
          { label: "Journaling", value: "Journaling" },
          { label: "Other", value: "Other" },
        ]}
        selectedValue={selfCare}
        onSelect={(value) => setSelfCare(value)}
      />
      
      {/* Supportive Contacts - Text input */}
      <TextInput
        style={styles.textInput}
        placeholder="Who are your supportive contacts?"
        placeholderTextColor="#555"
        value={supportiveContacts}
        onChangeText={setSupportiveContacts}
      />
      
      {/* Stressors and Triggers - Text input */}
      <TextInput
        style={styles.textInput}
        placeholder="What stressors or triggers have you experienced?"
        placeholderTextColor="#555"
        value={stressors}
        onChangeText={setStressors}
      />
      <TextInput
        style={styles.textInput}
        placeholder="What triggered your stress?"
        placeholderTextColor="#555"
        value={triggers}
        onChangeText={setTriggers}
      />

      {/* Mental Health Questionnaire - Using CustomSelect */}
      <Text style={styles.questionnaireTitle}>Short Mental Health Questionnaire</Text>
      <Text style={styles.label}>Have you been feeling down recently?</Text>
      <CustomSelect
        options={[
          { label: "Select an answer", value: "" },
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        selectedValue={questionnaireAnswers.feelingDown}
        onSelect={(value) => setQuestionnaireAnswers({ ...questionnaireAnswers, feelingDown: value })}
      />
      <Text style={styles.label}>Have you been able to cope with stress?</Text>
      <CustomSelect
        options={[
          { label: "Select an answer", value: "" },
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
        selectedValue={questionnaireAnswers.copingWithStress}
        onSelect={(value) => setQuestionnaireAnswers({ ...questionnaireAnswers, copingWithStress: value })}
      />

      {/* Have you sought help? - Text input */}
      <TextInput
        style={styles.textInput}
        placeholder="Have you sought help (Yes/No)?"
        placeholderTextColor="#555"
        value={helpSought}
        onChangeText={setHelpSought}
      />
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogMentalHealth}>
        <Text style={styles.buttonText}>Log Mental Health</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
  cardHeader: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 5 },
  textInput: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5,
    fontSize: 14,
  },
  questionnaireTitle: { fontSize: 16, fontWeight: '500', marginBottom: 10 },
  button: { backgroundColor: '#FF7043', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});

export default MentalHealthTracking;
