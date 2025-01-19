import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import UploadLabForm from './UploadLabForm';

const Labs = () => {
  const [labResults, setLabResults] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLabResults();
  }, []);

  const fetchLabResults = async () => {
    try {
      // Simulated fetching data
      setLabResults([
        { id: '1', labName: 'Blood Sugar', result: '95', units: 'mg/dL', date: Date.now() - 1000000 },
        { id: '2', labName: 'Cholesterol', result: '200', units: 'mg/dL', date: Date.now() - 2000000 },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch lab results');
    }
  };

  const handleLabResultSubmit = (newLabResult) => {
    if (!newLabResult.labName || !newLabResult.result || isNaN(newLabResult.result)) {
      setErrorMessage('Please enter valid test name and numeric result.');
      return;
    }

    const submittedResult = {
      ...newLabResult,
      id: Date.now().toString(),
      date: Date.now(),
    };
    setLabResults((prev) => [...prev, submittedResult]);
    setIsUploading(false);
    setErrorMessage('');
    Alert.alert('Success', 'Lab result uploaded successfully');
  };

  const getTrend = (labName) => {
    const trend = labResults.filter(result => result.labName === labName).map(result => ({
      date: new Date(result.date).toLocaleDateString(),
      value: result.result,
    }));
    return trend.length ? trend : null;
  };

  const renderLabResultItem = (lab) => (
    <View key={lab.id} style={styles.labResultItem}>
      <Text style={styles.labName}>{lab.labName}</Text>
      <Text>{lab.result} {lab.units}</Text>
      <Text>{new Date(lab.date).toLocaleDateString()}</Text>
      <Text>Trend: {getTrend(lab.labName)?.map(item => `${item.date}: ${item.value}`).join(', ')}</Text>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => showResultInterpretation(lab)}
      >
        <Text style={styles.infoButtonText}>View Interpretation</Text>
      </TouchableOpacity>
    </View>
  );

  const showResultInterpretation = (lab) => {
    // Interpretation logic based on lab name
    const interpretations = {
      'Blood Sugar': 'Normal range: 70-100 mg/dL. High levels might indicate diabetes.',
      'Cholesterol': 'Normal range: <200 mg/dL. High levels may indicate a risk of heart disease.',
    };
    const interpretation = interpretations[lab.labName] || 'No interpretation available for this test.';
    Alert.alert('Result Interpretation', interpretation);
  };

  const educativeContent = (
    <View style={styles.educativeContainer}>
      <Text style={styles.educativeTitle}>Understanding Lab Results</Text>
      <Text style={styles.educativeText}>
        Lab tests help your doctor assess your health and diagnose potential issues. Each test has a
        reference range, which indicates the normal values. Results outside this range might
        indicate health concerns, but they should always be interpreted in context by a medical professional.
      </Text>
      <Text style={styles.educativeText}>
        When entering your lab results:
      </Text>
      <Text style={styles.bulletPoint}>• Ensure the values match the units provided in your report.</Text>
      <Text style={styles.bulletPoint}>• Add any notes that might help your doctor understand the result.</Text>
      <Text style={styles.bulletPoint}>• Consult your healthcare provider for further guidance if needed.</Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          setShowIntro(false);
          setIsUploading(true); // Show the form directly
        }}
      >
        <Text style={styles.continueButtonText}>Got It! Proceed to Add Results</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {showIntro ? (
        educativeContent
      ) : (
        <>
          {isUploading ? (
            <UploadLabForm 
              onSubmit={handleLabResultSubmit} 
              onCancel={() => setIsUploading(false)} 
            />
          ) : (
            <>
              {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
              <Text style={styles.title}>Lab Results</Text>
              <ScrollView>
                {labResults.map(renderLabResultItem)}
              </ScrollView>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsUploading(true)}
              >
                <Text style={styles.addButtonText}>+ Add Lab Result</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 20,
  },
  labResultItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  labName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  infoButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF7043',
    borderRadius: 5,
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  educativeContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  educativeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
  },
  educativeText: {
    color: '#555',
    marginVertical: 10,
    fontSize: 16,
  },
  bulletPoint: {
    marginLeft: 20,
    fontSize: 14,
    color: '#333',
  },
  continueButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#009688',
    borderRadius: 5,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF7043',
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Labs;


