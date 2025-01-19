import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect';

const { width } = Dimensions.get('window');

const VBACRiskCalculator = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfoContent, setActiveInfoContent] = useState('');
  const [patientData, setPatientData] = useState({
    age: '',
    vaginalBirthHistory: '',
    previousCSection: '',
    cervicalEffacement: '',
    cervicalDilation: '',
  });
  const [result, setResult] = useState(null);

  const ageOptions = [
    { label: 'Age ≥ 40 years', value: 'over40' },
    { label: 'Age < 40 years', value: 'under40' },
  ];

  const vaginalBirthOptions = [
    { label: 'Select vaginal birth history', value: '' },
    { label: 'Vaginal birth before AND after first cesarean', value: 'beforeAndAfter' },
    { label: 'Vaginal birth after first cesarean only', value: 'afterOnly' },
    { label: 'Vaginal birth before cesarean only', value: 'beforeOnly' },
    { label: 'No previous vaginal birth', value: 'none' },
  ];

  const previousCSectionOptions = [
    { label: 'Select previous C-section reason', value: '' },
    { label: 'Failure to progress', value: 'failureToProgress' },
    { label: 'Other reason', value: 'other' },
  ];

  const effacementOptions = [
    { label: 'Select cervical effacement', value: '' },
    { label: '> 75%', value: 'high' },
    { label: '25-75%', value: 'medium' },
    { label: '< 25%', value: 'low' },
  ];

  const dilationOptions = [
    { label: 'Select cervical dilation', value: '' },
    { label: '≥ 4 cm', value: 'yes' },
    { label: '< 4 cm', value: 'no' },
  ];

  const criticalActions = [
    'Carefully evaluate uterine scar integrity',
    'Consider facility\'s capability for emergency C-section',
    'Discuss risks and benefits with patient',
    'Ensure continuous fetal monitoring during labor',
    'Have informed consent documented',
  ];

  const handleInputChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateScore = () => {
    let score = 0;

    // Age scoring
    if (patientData.age === 'under40') score += 2;

    // Vaginal birth history scoring
    switch (patientData.vaginalBirthHistory) {
      case 'beforeAndAfter':
        score += 4;
        break;
      case 'afterOnly':
        score += 2;
        break;
      case 'beforeOnly':
        score += 1;
        break;
      default:
        break;
    }

    // Previous C-section reason scoring
    if (patientData.previousCSection === 'other') score += 1;

    // Cervical effacement scoring
    switch (patientData.cervicalEffacement) {
      case 'high':
        score += 2;
        break;
      case 'medium':
        score += 1;
        break;
      default:
        break;
    }

    // Cervical dilation scoring
    if (patientData.cervicalDilation === 'yes') score += 1;

    // Calculate success probability based on Flamm model
    const successProbability = Math.min(Math.round((score / 10) * 100), 100);

    return {
      score,
      probability: successProbability,
      recommendation: getRecommendation(successProbability),
      color: getResultColor(successProbability),
    };
  };

  const getRecommendation = (probability) => {
    if (probability >= 70) {
      return 'High likelihood of successful VBAC. Proceed with careful monitoring.';
    } else if (probability >= 50) {
      return 'Moderate likelihood of successful VBAC. Close monitoring required.';
    } else {
      return 'Lower likelihood of successful VBAC. Consider scheduled C-section.';
    }
  };

  const getResultColor = (probability) => {
    if (probability >= 70) return '#4CAF50';
    if (probability >= 50) return '#FFA726';
    return '#EF5350';
  };

  const showInfo = (info) => {
    setActiveInfoContent(info);
    setShowInfoModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>VBAC Success Calculator</Text>
          <Text style={styles.subtitle}>Flamm Scoring Model</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Assessment</Text>
          <View style={styles.separator} />

          <View style={styles.fieldContainer}>
            <CustomSelect
              options={ageOptions}
              placeholder="Select maternal age"
              onSelect={(item) => handleInputChange('age', item.value)}
              label="Maternal Age"
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomSelect
              options={vaginalBirthOptions}
              placeholder="Select vaginal birth history"
              onSelect={(item) => handleInputChange('vaginalBirthHistory', item.value)}
              label="Vaginal Birth History"
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomSelect
              options={previousCSectionOptions}
              placeholder="Select previous C-section reason"
              onSelect={(item) => handleInputChange('previousCSection', item.value)}
              label="Previous C-section Reason"
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomSelect
              options={effacementOptions}
              placeholder="Select cervical effacement"
              onSelect={(item) => handleInputChange('cervicalEffacement', item.value)}
              label="Cervical Effacement at Admission"
            />
          </View>

          <View style={styles.fieldContainer}>
            <CustomSelect
              options={dilationOptions}
              placeholder="Select cervical dilation"
              onSelect={(item) => handleInputChange('cervicalDilation', item.value)}
              label="Cervical Dilation at Admission"
            />
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={() => setResult(calculateScore())}
          >
            <Text style={styles.calculateButtonText}>Calculate Success Probability</Text>
          </TouchableOpacity>

          {result && (
            <View style={[styles.resultContainer, { backgroundColor: result.color + '20' }]}>
              <Text style={[styles.resultTitle, { color: result.color }]}>
                VBAC Success Probability: {result.probability}%
              </Text>
              <Text style={styles.resultScore}>Flamm Score: {result.score}</Text>
              <Text style={styles.resultRecommendation}>{result.recommendation}</Text>
              
              <View style={styles.criticalActionsContainer}>
                <Text style={styles.criticalActionsTitle}>Critical Actions:</Text>
                {criticalActions.map((action, index) => (
                  <Text key={index} style={styles.criticalAction}>
                    • {action}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showInfoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowInfoModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{activeInfoContent}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowInfoModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  calculateButton: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
  },
  resultRecommendation: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 16,
  },
  criticalActionsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
  },
  criticalActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  criticalAction: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: width * 0.8,
    maxWidth: 400,
  },
  modalText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VBACRiskCalculator;