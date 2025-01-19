// components/referral/ReferralForm.js
import React, { useState } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { Button } from './Button';
import { PatientSelector } from './Tools';
import { FileUploader } from './Tools';
import { PrioritySelector } from './Tools';
import { ConsentForm } from './Tools';

const ReferralForm = ({ route, navigation }) => {
  const { doctor } = route.params;
  const [referralData, setReferralData] = useState({
    patient: null,
    reason: '',
    priority: 'routine',
    files: [],
    notes: '',
    consent: false
  });

  const handleSubmit = async () => {
    try {
      // Validate and submit referral
      // Handle EHR integration
      // Send notifications
      navigation.navigate('ReferralTracking');
    } catch (error) {
      // Handle error
    }
  };

  return (
    <ScrollView>
      <PatientSelector
        onSelect={(patient) => setReferralData({ ...referralData, patient })}
      />
      <TextInput
        multiline
        placeholder="Reason for referral"
        value={referralData.reason}
        onChangeText={(reason) => setReferralData({ ...referralData, reason })}
      />
      <PrioritySelector
        value={referralData.priority}
        onChange={(priority) => setReferralData({ ...referralData, priority })}
      />
      <FileUploader
        files={referralData.files}
        onUpload={(files) => setReferralData({ ...referralData, files })}
      />
      <ConsentForm
        onConsent={(consent) => setReferralData({ ...referralData, consent })}
      />
      <Button title="Submit Referral" onPress={handleSubmit} />
    </ScrollView>
  );
};