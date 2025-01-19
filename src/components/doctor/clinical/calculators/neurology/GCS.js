import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect';
import { MaterialIcons } from '@expo/vector-icons';

export const GlasgowComaScale = () => {
  const [eyeOpening, setEyeOpening] = useState(null);
  const [verbalResponse, setVerbalResponse] = useState(null);
  const [motorResponse, setMotorResponse] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [timestamp] = useState(new Date());

  const totalScore = (eyeOpening || 0) + (verbalResponse || 0) + (motorResponse || 0);

  const CLINICAL_GUIDELINES = {
    assessment: `
    Key Assessment Points:
    • Assess eye opening first
    • Test verbal response before painful stimuli
    • Assess best motor response last
    • Document any factors affecting assessment (e.g., intubation)
    • Always use standardized painful stimuli
    • Record actual responses, not just scores
    `,
    interventions: {
      mild: [
        'Neurological observations every 2-4 hours',
        'Monitor for deterioration',
        'Consider CT scan if indicated',
        'Review medication history'
      ],
      moderate: [
        'Hourly neurological observations',
        'Immediate CT scan',
        'Consider neurosurgical consult',
        'Ensure airway protection',
        'Monitor ICP if indicated'
      ],
      severe: [
        'Immediate airway assessment',
        'Consider intubation (GCS ≤ 8)',
        'Urgent CT scan',
        'Neurosurgical evaluation',
        'ICU admission',
        'Continuous ICP monitoring'
      ]
    },
    confounding: [
      'Alcohol intoxication',
      'Drug effects',
      'Metabolic disturbances',
      'Hypothermia',
      'Non-neurological trauma',
      'Language barriers',
      'Intubation status'
    ]
  };

  const gradeGCS = (score) => {
    if (score === 15) {
      return {
        grade: 'Normal',
        color: '#4CAF50',
        guidance: 'Fully alert and oriented. No neurological impairment.',
        interventions: []
      };
    } else if (score >= 14) {
      return {
        grade: 'Mild impairment',
        color: '#4CAF50',
        guidance: 'Alert with mild neurological impairment. Further evaluation needed.',
        interventions: CLINICAL_GUIDELINES.interventions.mild
      };
    } else if (score >= 9) {
      return {
        grade: 'Moderate impairment',
        color: '#FFC107',
        guidance: 'Moderate impairment present. Requires close monitoring.',
        interventions: CLINICAL_GUIDELINES.interventions.moderate
      };
    } else if (score >= 3) {
      return {
        grade: 'Severe impairment',
        color: '#F44336',
        guidance: 'Severe impairment. Immediate intervention required.',
        interventions: CLINICAL_GUIDELINES.interventions.severe
      };
    } else {
      return {
        grade: 'No response',
        color: '#000000',
        guidance: 'No response. Critical intervention required.',
        interventions: CLINICAL_GUIDELINES.interventions.severe
      };
    }
  };

  const eyeOpeningOptions = [
    { label: 'No eye opening (1)', value: 1, details: 'No eye opening with any stimulation' },
    { label: 'Eye opening to pain (2)', value: 2, details: 'Eyes open in response to painful stimuli' },
    { label: 'Eye opening to sound (3)', value: 3, details: 'Eyes open in response to voice' },
    { label: 'Eyes open spontaneously (4)', value: 4, details: 'Eyes open without stimulation' },
  ];

  const verbalResponseOptions = [
    { label: 'No verbal response (1)', value: 1, details: 'No vocalization of any type' },
    { label: 'Incomprehensible sounds (2)', value: 2, details: 'Moans/groans, no words' },
    { label: 'Inappropriate words (3)', value: 3, details: 'Random or exclamatory articulated speech' },
    { label: 'Confused (4)', value: 4, details: 'Attention can be held, disoriented' },
    { label: 'Orientated (5)', value: 5, details: 'Fully oriented to time, place, person' },
  ];

  const motorResponseOptions = [
    { label: 'No motor response (1)', value: 1, details: 'No movement to any stimulation' },
    { label: 'Extension to pain (2)', value: 2, details: 'Decerebrate posturing' },
    { label: 'Abnormal flexion (3)', value: 3, details: 'Decorticate posturing' },
    { label: 'Withdrawal from pain (4)', value: 4, details: 'Withdraws from painful stimuli' },
    { label: 'Localizing pain (5)', value: 5, details: 'Purposeful movement to painful stimuli' },
    { label: 'Obeys commands (6)', value: 6, details: 'Follows simple commands' },
  ];

  const { grade, color, guidance, interventions } = gradeGCS(totalScore);

  const renderAssessmentSection = (title, options, value, setValue) => (
    <View style={styles.assessmentSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <CustomSelect
        options={options}
        value={value}
        placeholder={`Select ${title}`}
        onSelect={(item) => setValue(item.value)}
        renderOption={(item) => (
          <View style={styles.optionContainer}>
            <Text style={styles.optionTitle}>{item.label}</Text>
            <Text style={styles.optionDetails}>{item.details}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Glasgow Coma Scale</Text>
        <TouchableOpacity 
          style={styles.guidelineButton}
          onPress={() => setShowGuidelines(true)}
        >
          <MaterialIcons name="info-outline" size={24} color="#fff" />
          <Text style={styles.guidelineButtonText}>Guidelines</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeStamp}>
        <Text style={styles.timeStampText}>
          Assessment Time: {timestamp.toLocaleTimeString()}
        </Text>
      </View>

      {renderAssessmentSection('Eye Opening', eyeOpeningOptions, eyeOpening, setEyeOpening)}
      {renderAssessmentSection('Verbal Response', verbalResponseOptions, verbalResponse, setVerbalResponse)}
      {renderAssessmentSection('Motor Response', motorResponseOptions, motorResponse, setMotorResponse)}

      <View style={[styles.scoreCard, { backgroundColor: color + '15' }]}>
        <Text style={styles.totalScore}>Total GCS Score: {totalScore}/15</Text>
        <Text style={[styles.gradeText, { color }]}>{grade}</Text>
        <Text style={styles.guidanceText}>{guidance}</Text>
      </View>

      <View style={styles.interventionsContainer}>
        <Text style={styles.interventionsTitle}>Recommended Interventions:</Text>
        {interventions?.map((intervention, index) => (
          <View key={index} style={styles.interventionItem}>
            <MaterialIcons name="arrow-right" size={20} color="#004C54" />
            <Text style={styles.interventionText}>{intervention}</Text>
          </View>
        ))}
      </View>

      <Modal
        visible={showGuidelines}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clinical Guidelines</Text>
            
            <Text style={styles.modalSubtitle}>Assessment Protocol</Text>
            <Text style={styles.modalText}>{CLINICAL_GUIDELINES.assessment}</Text>
            
            <Text style={styles.modalSubtitle}>Confounding Factors</Text>
            {CLINICAL_GUIDELINES.confounding.map((factor, index) => (
              <Text key={index} style={styles.modalListItem}>• {factor}</Text>
            ))}

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowGuidelines(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#004C54',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timeStamp: {
    padding: 8,
    backgroundColor: '#E8EDF1',
  },
  timeStampText: {
    color: '#004C54',
    fontSize: 14,
  },
  assessmentSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    marginBottom: 12,
  },
  optionContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF1',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#004C54',
  },
  optionDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scoreCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    textAlign: 'center',
  },
  gradeText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  guidanceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  interventionsContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  interventionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    marginBottom: 12,
  },
  interventionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  interventionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  guidelineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 4,
  },
  guidelineButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  modalListItem: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    marginVertical: 4,
  },
  closeButton: {
    backgroundColor: '#004C54',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GlasgowComaScale;