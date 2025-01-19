import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView,
  Modal,
  Dimensions,
  Switch,
} from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect';

const { width } = Dimensions.get('window');

const GDMScreening = () => {
  const [screeningPhase, setScreeningPhase] = useState('initial');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeInfoContent, setActiveInfoContent] = useState('');
  const [patientData, setPatientData] = useState({
    gestationalAge: '',
    fastingGlucose: '',
    oneHourGlucose: '',
    twoHourGlucose: '',
    threeHourGlucose: '',
    age: '',
    bmi: '',
    ethnicity: '',
    familyHistory: false,
    previousGDM: false,
    macrosomia: false,
    pcos: false,
    preDiabetes: false,
  });
  const [result, setResult] = useState(null);

  const ethnicityOptions = [
    { label: 'Select Ethnicity', value: '' },
    { label: 'Hispanic', value: 'Hispanic' },
    { label: 'African American', value: 'African American' },
    { label: 'Native American', value: 'Native American' },
    { label: 'Asian', value: 'Asian' },
    { label: 'Pacific Islander', value: 'Pacific Islander' },
    { label: 'Other', value: 'Other' },
  ];

  const riskFactors = [
    {
      id: 'age',
      label: 'Age ≥35 years',
      type: 'number',
      info: 'Advanced maternal age is a significant risk factor for GDM',
    },
    {
      id: 'bmi',
      label: 'Pre-pregnancy BMI ≥30 kg/m²',
      type: 'number',
      info: 'Obesity significantly increases GDM risk',
    },
    {
      id: 'ethnicity',
      label: 'High-risk ethnicity',
      type: 'picker',
      info: 'Certain ethnic groups have higher GDM risk',
    },
    {
      id: 'familyHistory',
      label: 'First-degree relative with diabetes',
      type: 'switch',
      info: 'Family history increases risk by 2-6 times',
    },
    {
      id: 'previousGDM',
      label: 'History of GDM in previous pregnancy',
      type: 'switch',
      info: '33-50% recurrence rate in subsequent pregnancies',
    },
    {
      id: 'macrosomia',
      label: 'Previous macrosomic baby (>4000g)',
      type: 'switch',
      info: 'Previous large baby indicates potential undiagnosed GDM',
    },
    {
      id: 'pcos',
      label: 'Polycystic ovary syndrome',
      type: 'switch',
      info: 'PCOS increases insulin resistance',
    },
    {
      id: 'preDiabetes',
      label: 'History of prediabetes',
      type: 'switch',
      info: 'Prediabetes indicates existing glucose metabolism issues',
    },
  ];

  const handleInputChange = (field, value) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateRiskLevel = () => {
    let riskScore = 0;
    const gestAge = parseFloat(patientData.gestationalAge);

    if (parseFloat(patientData.age) >= 35) riskScore += 2;
    if (parseFloat(patientData.bmi) >= 30) riskScore += 2;
    if (patientData.familyHistory) riskScore += 2;
    if (patientData.previousGDM) riskScore += 3;
    if (patientData.macrosomia) riskScore += 2;
    if (patientData.pcos) riskScore += 1;
    if (patientData.preDiabetes) riskScore += 3;
    if (['Hispanic', 'African American', 'Native American', 'Asian', 'Pacific Islander'].includes(patientData.ethnicity)) {
      riskScore += 2;
    }

    if (gestAge < 20) {
      return {
        risk: riskScore >= 6 ? 'High Risk - Early Screening' : 'Standard Screening',
        score: riskScore,
        recommendation: riskScore >= 6 
          ? 'Recommend immediate fasting glucose or HbA1c testing'
          : 'Schedule routine screening at 24-28 weeks gestation',
        color: riskScore >= 6 ? '#FF6B6B' : '#4ECDC4',
      };
    }

    if (gestAge >= 24 && gestAge <= 28) {
      return {
        risk: 'Universal Screening Window',
        score: riskScore,
        recommendation: 'Proceed with standard two-step screening (50g GCT)',
        color: '#45B7D1',
      };
    }

    return {
      risk: 'Outside Standard Window',
      score: riskScore,
      recommendation: 'Clinical judgment required for screening timing',
      color: '#FFD93D',
    };
  };

  const showInfo = (info) => {
    setActiveInfoContent(info);
    setShowInfoModal(true);
  };

  const renderInputField = (factor) => {
    switch (factor.type) {
      case 'number':
        return (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={patientData[factor.id]}
              onChangeText={(value) => handleInputChange(factor.id, value)}
              placeholder={`Enter ${factor.label}`}
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => showInfo(factor.info)}
            >
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>
        );
      case 'picker':
        return (
          <View style={styles.pickerContainer}>
            <CustomSelect
              options={ethnicityOptions}
              placeholder="Select Ethnicity"
              onSelect={(item) => handleInputChange(factor.id, item.value)}
              label={factor.label}
            />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => showInfo(factor.info)}
            >
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>
        );
      case 'switch':
        return (
          <View style={styles.switchContainer}>
            <Switch
              value={patientData[factor.id]}
              onValueChange={(value) => handleInputChange(factor.id, value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={patientData[factor.id] ? '#f5dd4b' : '#f4f3f4'}
            />
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => showInfo(factor.info)}
            >
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>GDM Risk Assessment</Text>
          <Text style={styles.subtitle}>Clinical Screening Tool</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.separator} />

          {riskFactors.map((factor) => (
            <View key={factor.id} style={styles.fieldContainer}>
              {factor.type !== 'picker' && <Text style={styles.label}>{factor.label}</Text>}
              {renderInputField(factor)}
            </View>
          ))}

          <TouchableOpacity
            style={styles.assessButton}
            onPress={() => setResult(calculateRiskLevel())}
          >
            <Text style={styles.assessButtonText}>Calculate Risk</Text>
          </TouchableOpacity>

          {result && (
            <View style={[styles.resultContainer, { backgroundColor: result.color + '20' }]}>
              <Text style={[styles.resultTitle, { color: result.color }]}>
                {result.risk}
              </Text>
              <Text style={styles.resultScore}>Risk Score: {result.score}</Text>
              <Text style={styles.resultRecommendation}>
                {result.recommendation}
              </Text>
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#34495E',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#2C3E50',
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  assessButton: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  assessButtonText: {
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

export default GDMScreening;