import React, { useState } from 'react';
import { View, Text, TextInput, Button,  StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { FontAwesome } from '@expo/vector-icons'; // For additional icons
import { Picker } from '@react-native-picker/picker';

const ClinicalTrialProtocolGenerator = () => {
  // State for protocol fields
  const [trialTitle, setTrialTitle] = useState('');
  const [objectives, setObjectives] = useState('');
  const [studyDesign, setStudyDesign] = useState('');
  const [participantCriteria, setParticipantCriteria] = useState('');
  const [treatmentDetails, setTreatmentDetails] = useState('');
  const [regulatoryCompliance, setRegulatoryCompliance] = useState('');
  const [fundingSource, setFundingSource] = useState('');
  const [studyDuration, setStudyDuration] = useState('');
  const [primaryOutcome, setPrimaryOutcome] = useState('');
  const [secondaryOutcome, setSecondaryOutcome] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [randomizationMethod, setRandomizationMethod] = useState('');
  const [ethicsApproval, setEthicsApproval] = useState('');
  const [safetyMonitoring, setSafetyMonitoring] = useState('');
  const [studyTimeline, setStudyTimeline] = useState('');
  const [localGuidelines, setLocalGuidelines] = useState('');
  const [stakeholderEngagement, setStakeholderEngagement] = useState('');
  const [traditionalMedicine, setTraditionalMedicine] = useState('');
  const [trainingResources, setTrainingResources] = useState('');
  const [costEffectiveness, setCostEffectiveness] = useState('');
  const [postTrialAccess, setPostTrialAccess] = useState('');

  const createTrialProtocol = () => {
    console.log("Creating clinical trial protocol...");
    // Implement protocol generation logic here
  };

  const downloadProtocol = () => {
    console.log("Downloading clinical trial protocol...");
    // Implement document generation and download functionality
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clinical Trial Protocol Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Trial Title"
        value={trialTitle}
        onChangeText={setTrialTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Objectives"
        value={objectives}
        onChangeText={setObjectives}
        multiline
      />

      <Picker
        selectedValue={studyDesign}
        style={styles.input}
        onValueChange={setStudyDesign}>
        <Picker.Item label="-- Select Study Design --" value="" />
        <Picker.Item label="Randomized Controlled Trial (RCT)" value="RCT" />
        <Picker.Item label="Observational Study" value="Observational" />
        <Picker.Item label="Cohort Study" value="Cohort" />
        <Picker.Item label="Case-Control Study" value="CaseControl" />
        <Picker.Item label="Cross-Sectional Study" value="CrossSectional" />
      </Picker>

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Participant Criteria"
        value={participantCriteria}
        onChangeText={setParticipantCriteria}
        multiline
      />
      
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Treatment Details"
        value={treatmentDetails}
        onChangeText={setTreatmentDetails}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Regulatory Compliance"
        value={regulatoryCompliance}
        onChangeText={setRegulatoryCompliance}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Funding Source"
        value={fundingSource}
        onChangeText={setFundingSource}
      />

      <TextInput
        style={styles.input}
        placeholder="Study Duration (weeks)"
        value={studyDuration}
        onChangeText={setStudyDuration}
      />

      <TextInput
        style={[styles.input, { height: 50 }]}
        placeholder="Primary Outcome Measures"
        value={primaryOutcome}
        onChangeText={setPrimaryOutcome}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 50 }]}
        placeholder="Secondary Outcome Measures"
        value={secondaryOutcome}
        onChangeText={setSecondaryOutcome}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Sample Size Calculation"
        value={sampleSize}
        onChangeText={setSampleSize}
      />

      <TextInput
        style={styles.input}
        placeholder="Randomization Method"
        value={randomizationMethod}
        onChangeText={setRandomizationMethod}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Ethics Approval Details"
        value={ethicsApproval}
        onChangeText={setEthicsApproval}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Safety Monitoring Plan"
        value={safetyMonitoring}
        onChangeText={setSafetyMonitoring}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Stakeholder Engagement Plan"
        value={stakeholderEngagement}
        onChangeText={setStakeholderEngagement}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Traditional Medicine Considerations"
        value={traditionalMedicine}
        onChangeText={setTraditionalMedicine}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Training Resources for Local Workers"
        value={trainingResources}
        onChangeText={setTrainingResources}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Cost-Effectiveness Analysis"
        value={costEffectiveness}
        onChangeText={setCostEffectiveness}
        multiline
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Post-Trial Access Plan"
        value={postTrialAccess}
        onChangeText={setPostTrialAccess}
        multiline
      />

      <View style={styles.buttonsContainer}>
        <Button
          title="Create Protocol"
          onPress={createTrialProtocol}
          icon={<Ionicons name="create" size={24} />}
        />
        <Button
          title="Download Protocol"
          onPress={downloadProtocol}
          icon={<FontAwesome name="download" size={24} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 8,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ClinicalTrialProtocolGenerator;
