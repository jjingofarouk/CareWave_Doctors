import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const InsuranceManager = () => {
  const [insuranceDetails, setInsuranceDetails] = useState({
    provider: '',
    policyNumber: '',
    coverage: '',
    expiryDate: '',
  });
  const [claims, setClaims] = useState([]); // Array of claims
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  useEffect(() => {
    // Simulate fetching insurance details and claims from backend
    setInsuranceDetails({
      provider: 'Blue Shield',
      policyNumber: '123-456-789',
      coverage: 'General Consultation, Lab Tests',
      expiryDate: '2025-12-31',
    });
    setClaims([
      { id: 1, service: 'Consultation', status: 'Approved', date: '2024-10-10' },
      { id: 2, service: 'MRI Scan', status: 'Pending', date: '2024-10-11' },
    ]);
  }, []);

  const handleEligibilityCheck = () => {
    Alert.alert('Eligibility Check', 'Insurance is active and covers this service.');
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        setUploadedDocuments((prevDocs) => [...prevDocs, result]);
        Alert.alert('Success', 'Document uploaded successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload document.');
    }
  };

  const handleClaimSubmission = () => {
    const newClaim = {
      id: claims.length + 1,
      service: 'Lab Test',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };
    setClaims([...claims, newClaim]);
    Alert.alert('Claim Submitted', 'Your claim has been submitted successfully.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Insurance Management</Text>

      {/* Insurance Details */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Insurance Details</Text>
        <Text>Provider: {insuranceDetails.provider}</Text>
        <Text>Policy Number: {insuranceDetails.policyNumber}</Text>
        <Text>Coverage: {insuranceDetails.coverage}</Text>
        <Text>Expiry Date: {insuranceDetails.expiryDate}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEligibilityCheck}
        >
          <Text style={styles.buttonText}>Check Eligibility</Text>
        </TouchableOpacity>
      </View>

      {/* Claims */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Claims</Text>
        <FlatList
          data={claims}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.claimItem}>
              <Text>Service: {item.service}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Date: {item.date}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleClaimSubmission}
        >
          <Text style={styles.buttonText}>Submit New Claim</Text>
        </TouchableOpacity>
      </View>

      {/* Document Upload */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Uploaded Documents</Text>
        <FlatList
          data={uploadedDocuments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>- {item.name}</Text>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleDocumentUpload}
        >
          <Text style={styles.buttonText}>Upload Document</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#27c7b8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  claimItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default InsuranceManager;
