// components/referral/PatientConsent.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import SignatureCapture from 'react-native-signature-capture';
import DocumentPicker from 'expo-document-picker';
import { updateReferralConsent } from './ReferralSlice';

const PatientConsent = ({ referralId, patientData, onConsentComplete }) => {
  const dispatch = useDispatch();
  const [consentData, setConsentData] = useState({
    isRead: false,
    signature: null,
    timestamp: null,
    additionalDocuments: [],
    witnesses: []
  });

  const consentText = `
    I hereby authorize the sharing of my medical information, including but not limited to:
    - Medical history and examination results
    - Laboratory test results and imaging reports
    - Treatment plans and medications
    - Any other relevant medical information

    This information will be shared with the referred healthcare provider for the purpose
    of medical consultation and treatment. I understand that:
    
    1. I have the right to revoke this authorization at any time
    2. This consent will remain valid for 90 days from the date of signature
    3. My treatment is not conditional upon signing this consent
    4. The information shared will be kept confidential according to HIPAA regulations
  `;

  const handleDocumentUpload = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setConsentData(prev => ({
        ...prev,
        additionalDocuments: [...prev.additionalDocuments, ...results]
      }));
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to upload document');
      }
    }
  };

  const handleSignature = (signature) => {
    setConsentData(prev => ({
      ...prev,
      signature,
      timestamp: new Date().toISOString()
    }));
  };

  const handleWitnessAdd = (witnessData) => {
    setConsentData(prev => ({
      ...prev,
      witnesses: [...prev.witnesses, {
        ...witnessData,
        timestamp: new Date().toISOString()
      }]
    }));
  };

  const handleSubmit = async () => {
    if (!consentData.signature) {
      Alert.alert('Error', 'Signature is required');
      return;
    }

    try {
      await dispatch(updateReferralConsent({
        referralId,
        consentData: {
          ...consentData,
          patientId: patientData.id,
          submittedAt: new Date().toISOString()
        }
      }));
      
      onConsentComplete && onConsentComplete(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to save consent form');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.consentScroll}>
        <Text style={styles.title}>Patient Consent Form</Text>
        
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>
            Patient: {patientData?.firstName} {patientData?.lastName}
          </Text>
          <Text style={styles.patientDOB}>
            DOB: {patientData?.dateOfBirth}
          </Text>
        </View>

        <View style={styles.consentTextContainer}>
          <Text style={styles.consentText}>{consentText}</Text>
        </View>

        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={handleDocumentUpload}
        >
          <Text style={styles.buttonText}>Upload Additional Documents</Text>
        </TouchableOpacity>

        {consentData.additionalDocuments.map((doc, index) => (
          <Text key={index} style={styles.documentName}>
            {doc.name}
          </Text>
        ))}

        <View style={styles.signatureContainer}>
          <Text style={styles.signatureLabel}>Patient Signature:</Text>
          <SignatureCapture
            style={styles.signature}
            onSave={handleSignature}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Consent</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  consentScroll: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  patientInfo: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  patientName: {
    fontSize: 18,
    fontWeight: '500'
  },
  patientDOB: {
    fontSize: 16,
    color: '#666'
  },
  consentTextContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16
  },
  consentText: {
    fontSize: 16,
    lineHeight: 24
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  submitButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 32
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  signatureContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8
  },
  signatureLabel: {
    fontSize: 16,
    marginBottom: 8
  },
  signature: {
    height: 200,
    backgroundColor: '#f9f9f9'
  },
  documentName: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 4
  }
});

export default PatientConsent;