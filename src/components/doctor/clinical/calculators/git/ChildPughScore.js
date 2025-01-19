import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Modal
} from 'react-native';

const ChildPughScore = () => {
  const [bilirubin, setBilirubin] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [inr, setInr] = useState('');
  const [ascites, setAscites] = useState('');
  const [encephalopathy, setEncephalopathy] = useState('');
  const [score, setScore] = useState(null);
  const [classification, setClassification] = useState('');
  const [showEncephalopathyGuide, setShowEncephalopathyGuide] = useState(false);

  const encephalopathyGrades = [
    { grade: 0, description: 'Normal consciousness, personality, neurological examination' },
    { grade: 1, description: 'Restless, sleep disturbed, irritable/agitated, tremor' },
    { grade: 2, description: 'Lethargic, time-disoriented, inappropriate behavior, asterixis' },
    { grade: 3, description: 'Somnolent, stuporous, place-disoriented, hyperactive reflexes' },
    { grade: 4, description: 'Unrousable coma, no personality/behavior, decerebrate' }
  ];

  const calculateScore = () => {
    if (!bilirubin || !albumin || !inr || !ascites || !encephalopathy) {
      return;
    }

    let totalScore = 0;
    const bilirubinValue = parseFloat(bilirubin);
    const albuminValue = parseFloat(albumin);
    const inrValue = parseFloat(inr);
    const ascitesValue = parseInt(ascites);
    const encephalopathyValue = parseInt(encephalopathy);

    // Bilirubin scoring
    if (bilirubinValue < 2) totalScore += 1;
    else if (bilirubinValue <= 3) totalScore += 2;
    else totalScore += 3;

    // Albumin scoring
    if (albuminValue > 3.5) totalScore += 1;
    else if (albuminValue >= 2.8) totalScore += 2;
    else totalScore += 3;

    // INR scoring
    if (inrValue < 1.7) totalScore += 1;
    else if (inrValue <= 2.3) totalScore += 2;
    else totalScore += 3;

    // Add ascites and encephalopathy scores
    totalScore += ascitesValue;
    totalScore += encephalopathyValue;

    setScore(totalScore);

    // Set classification
    if (totalScore <= 6) setClassification('Class A');
    else if (totalScore <= 9) setClassification('Class B');
    else setClassification('Class C');
  };

  useEffect(() => {
    calculateScore();
  }, [bilirubin, albumin, inr, ascites, encephalopathy]);

  const renderScoreButton = (value, setter, currentValue, label) => (
    <TouchableOpacity
      style={[
        styles.scoreButton,
        currentValue === value.toString() && styles.scoreButtonActive
      ]}
      onPress={() => setter(value.toString())}
    >
      <Text style={[
        styles.scoreButtonText,
        currentValue === value.toString() && styles.scoreButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Child-Pugh Score</Text>
          <Text style={styles.subtitle}>Cirrhosis Severity Assessment</Text>
        </View>

        {/* Clinical Parameters */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Laboratory Values</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Bilirubin (mg/dL)</Text>
            <TextInput
              style={styles.input}
              value={bilirubin}
              onChangeText={setBilirubin}
              keyboardType="decimal-pad"
              placeholder="Enter bilirubin"
              placeholderTextColor="#999"
            />
            <Text style={styles.rangeText}>Normal: 0.3-1.2 mg/dL</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Serum Albumin (g/dL)</Text>
            <TextInput
              style={styles.input}
              value={albumin}
              onChangeText={setAlbumin}
              keyboardType="decimal-pad"
              placeholder="Enter albumin"
              placeholderTextColor="#999"
            />
            <Text style={styles.rangeText}>Normal: 3.5-5.5 g/dL</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>INR</Text>
            <TextInput
              style={styles.input}
              value={inr}
              onChangeText={setInr}
              keyboardType="decimal-pad"
              placeholder="Enter INR"
              placeholderTextColor="#999"
            />
            <Text style={styles.rangeText}>Normal: 0.8-1.1</Text>
          </View>
        </View>

        {/* Clinical Findings */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clinical Assessment</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ascites</Text>
            <View style={styles.buttonGroup}>
              {renderScoreButton(1, setAscites, ascites, 'None')}
              {renderScoreButton(2, setAscites, ascites, 'Mild')}
              {renderScoreButton(3, setAscites, ascites, 'Moderate-Severe')}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Encephalopathy</Text>
              <TouchableOpacity onPress={() => setShowEncephalopathyGuide(true)}>
                <Text style={styles.infoButton}>ℹ️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              {renderScoreButton(1, setEncephalopathy, encephalopathy, 'None')}
              {renderScoreButton(2, setEncephalopathy, encephalopathy, 'Grade I-II')}
              {renderScoreButton(3, setEncephalopathy, encephalopathy, 'Grade III-IV')}
            </View>
          </View>
        </View>

        {/* Results */}
        {score && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>
            <View style={styles.scoreDisplay}>
              <Text style={styles.scoreValue}>{score}</Text>
              <Text style={styles.classificationText}>{classification}</Text>
            </View>
            <View style={styles.prognosisContainer}>
              <Text style={styles.prognosisTitle}>Prognosis:</Text>
              <Text style={styles.prognosisText}>
                {classification === 'Class A' && '1-year survival: 100%, 2-year survival: 85%'}
                {classification === 'Class B' && '1-year survival: 81%, 2-year survival: 57%'}
                {classification === 'Class C' && '1-year survival: 45%, 2-year survival: 35%'}
              </Text>
            </View>
          </View>
        )}

        {/* Encephalopathy Guide Modal */}
        <Modal
          visible={showEncephalopathyGuide}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Hepatic Encephalopathy Grades</Text>
              {encephalopathyGrades.map((item) => (
                <View key={item.grade} style={styles.gradeItem}>
                  <Text style={styles.gradeTitle}>Grade {item.grade}</Text>
                  <Text style={styles.gradeDescription}>{item.description}</Text>
                </View>
              ))}
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowEncephalopathyGuide(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#fff',
  },
  rangeText: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  scoreButtonActive: {
    backgroundColor: '#3498db',
  },
  scoreButtonText: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '500',
  },
  scoreButtonTextActive: {
    color: '#fff',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  scoreDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3498db',
  },
  classificationText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 8,
  },
  prognosisContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  prognosisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  prognosisText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  infoButton: {
    fontSize: 20,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  gradeItem: {
    marginBottom: 16,
  },
  gradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  gradeDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChildPughScore;