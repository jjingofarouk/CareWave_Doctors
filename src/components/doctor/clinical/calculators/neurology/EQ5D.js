import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import CustomSelect from '../../../../utils/CustomSelect';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

// Define the missing GUIDANCE_TEXT constant
const GUIDANCE_TEXT = {
  general: "Please indicate which statements best describe your health state today",
  visualAnalog: "We would like to know how good or bad your health is TODAY.\n• This scale is numbered from 0 to 100\n• 100 means the best health you can imagine\n• 0 means the worst health you can imagine"
};

export const EQ5D = () => {
  const [dimensions, setDimensions] = useState({
    mobility: "1",
    selfCare: "1",
    usualActivities: "1",
    painDiscomfort: "1",
    anxietyDepression: "1"
  });
  const [visualAnalogScore, setVisualAnalogScore] = useState(100);
  const [score, setScore] = useState(null);
  const [showInterpretationGuide, setShowInterpretationGuide] = useState(false);

  const CLINICAL_INTERPRETATION = {
    general: `The EQ-5D-5L provides three key metrics for patient health assessment:

1. Health State Profile (5-digit number)
- Each digit represents severity (1-5) for each dimension
- Example: 11111 indicates perfect health
- Example: 55555 indicates worst health state

2. EQ VAS Score (0-100)
- Patient's self-rated health
- Useful for tracking subjective health changes
- Independent of the dimension scores

3. Index Value (0-1)
- Derived from population preference weights
- 1 represents full health
- Negative values possible (states worse than death)
- Country-specific value sets available`,

    visualAnalog: `We would like to know how good or bad your health is TODAY.
• This scale is numbered from 0 to 100
• 100 means the best health you can imagine
• 0 means the worst health you can imagine`,

    dimensionScoring: `Dimension Severity Levels:
1 = No problems
2 = Slight problems
3 = Moderate problems
4 = Severe problems
5 = Extreme problems/Unable to`,

    clinicalRelevance: `Clinical Significance:

• Minimal Important Difference (MID):
- Index Value: 0.037-0.069
- VAS Score: 7-10 points

• Red Flags:
- Two-level deterioration in any dimension
- VAS score drop >10 points
- Index value drop >0.1`,

    recommendations: `Treatment Considerations:

• Score 1-2 in dimensions: 
- Monitor and preventive care
- Consider maintenance therapy

• Score 3:
- Active intervention likely needed
- Specialist referral may be indicated

• Score 4-5:
- Urgent intervention often required
- Comprehensive care plan needed
- Multi-disciplinary approach recommended`
  };

  const dimensionOptions = {
    mobility: [
      { label: "I have no problems in walking about", value: "1" },
      { label: "I have slight problems in walking about", value: "2" },
      { label: "I have moderate problems in walking about", value: "3" },
      { label: "I have severe problems in walking about", value: "4" },
      { label: "I am unable to walk about", value: "5" }
    ],
    selfCare: [
      { label: "I have no problems washing or dressing myself", value: "1" },
      { label: "I have slight problems washing or dressing myself", value: "2" },
      { label: "I have moderate problems washing or dressing myself", value: "3" },
      { label: "I have severe problems washing or dressing myself", value: "4" },
      { label: "I am unable to wash or dress myself", value: "5" }
    ],
    usualActivities: [
      { label: "I have no problems doing my usual activities", value: "1" },
      { label: "I have slight problems doing my usual activities", value: "2" },
      { label: "I have moderate problems doing my usual activities", value: "3" },
      { label: "I have severe problems doing my usual activities", value: "4" },
      { label: "I am unable to do my usual activities", value: "5" }
    ],
    painDiscomfort: [
      { label: "I have no pain or discomfort", value: "1" },
      { label: "I have slight pain or discomfort", value: "2" },
      { label: "I have moderate pain or discomfort", value: "3" },
      { label: "I have severe pain or discomfort", value: "4" },
      { label: "I have extreme pain or discomfort", value: "5" }
    ],
    anxietyDepression: [
      { label: "I am not anxious or depressed", value: "1" },
      { label: "I am slightly anxious or depressed", value: "2" },
      { label: "I am moderately anxious or depressed", value: "3" },
      { label: "I am severely anxious or depressed", value: "4" },
      { label: "I am extremely anxious or depressed", value: "5" }
    ]
  };

  const calculateScore = () => {
    const dimensionScore = Object.values(dimensions)
      .map(value => parseInt(value, 10) - 1)
      .reduce((a, b) => a + b, 0);
    
    const utilityScore = (100 - dimensionScore * 5) / 100;
    const healthState = Object.values(dimensions).join('');
    
    setScore({
      dimensions: dimensionScore,
      visualAnalog: visualAnalogScore,
      utilityScore: utilityScore,
      healthState: healthState,
      interpretation: interpretScore(dimensionScore, visualAnalogScore, utilityScore)
    });
  };

  const interpretScore = (dimensionScore, vas, utility) => {
    let interpretation = [];

    if (dimensionScore <= 4) {
      interpretation.push("Patient reports relatively good health status with minimal impairments.");
    } else if (dimensionScore <= 10) {
      interpretation.push("Patient shows moderate health impairment. Consider targeted interventions.");
    } else {
      interpretation.push("Significant health impairment indicated. Comprehensive care plan recommended.");
    }

    if (vas < 50) {
      interpretation.push("Patient's self-rated health is concerning. Detailed assessment recommended.");
    } else if (vas < 70) {
      interpretation.push("Moderate self-rated health. Monitor for changes.");
    }

    if (utility < 0.5) {
      interpretation.push("Quality of life significantly impacted. Consider specialist referral.");
    }

    return interpretation;
  };

  const renderDimensionSection = (dimension, title, subtitle = '') => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        <CustomSelect
          options={dimensionOptions[dimension]}
          value={dimensions[dimension]}
          onValueChange={(value) => setDimensions(prev => ({ ...prev, [dimension]: value }))}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EQ-5D-5L Clinical Assessment</Text>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => setShowInterpretationGuide(true)}
        >
          <MaterialIcons name="info-outline" size={24} color="#2196F3" />
          <Text style={styles.infoButtonText}>Clinical Guide</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.guidance}>
        <Text style={styles.guidanceText}>{GUIDANCE_TEXT.general}</Text>
      </View>

      {renderDimensionSection('mobility', 'MOBILITY', 'Walking ability')}
      {renderDimensionSection('selfCare', 'SELF-CARE', 'Washing and dressing')}
      {renderDimensionSection('usualActivities', 'USUAL ACTIVITIES', 'e.g. work, study, housework, family or leisure activities')}
      {renderDimensionSection('painDiscomfort', 'PAIN / DISCOMFORT')}
      {renderDimensionSection('anxietyDepression', 'ANXIETY / DEPRESSION')}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your health today</Text>
        <Text style={styles.guidanceText}>{GUIDANCE_TEXT.visualAnalog}</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>0</Text>
          <Slider
            style={styles.slider}
            value={visualAnalogScore}
            onValueChange={setVisualAnalogScore}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#2196F3"
            maximumTrackTintColor="#000000"
          />
          <Text style={styles.sliderLabel}>100</Text>
        </View>
        <Text style={styles.sliderValue}>Selected value: {visualAnalogScore}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateScore}>
        <Text style={styles.buttonText}>Calculate EQ-5D Score</Text>
      </TouchableOpacity>

      {score && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Clinical Assessment Results</Text>
          
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>Health State:</Text>
            <Text style={styles.resultValue}>{score.healthState}</Text>
            <Text style={styles.resultExplanation}>
              5-digit profile representing severity in each dimension
            </Text>
          </View>

          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>EQ VAS Score:</Text>
            <Text style={styles.resultValue}>{score.visualAnalog}/100</Text>
            <Text style={styles.resultExplanation}>
              Patient's self-rated health status
            </Text>
          </View>

          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>Utility Index:</Text>
            <Text style={styles.resultValue}>{score.utilityScore.toFixed(3)}</Text>
            <Text style={styles.resultExplanation}>
              Population-weighted health state value
            </Text>
          </View>

          <View style={styles.interpretationSection}>
            <Text style={styles.interpretationTitle}>Clinical Interpretation:</Text>
            {score.interpretation.map((note, index) => (
              <Text key={index} style={styles.interpretationNote}>• {note}</Text>
            ))}
          </View>
        </View>
      )}

      <Modal
        visible={showInterpretationGuide}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>EQ-5D-5L Clinical Interpretation Guide</Text>
            
            {Object.entries(CLINICAL_INTERPRETATION).map(([key, text]) => (
              <View key={key} style={styles.modalSection}>
                <Text style={styles.modalText}>{text}</Text>
              </View>
            ))}

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowInterpretationGuide(false)}
            >
              <Text style={styles.closeButtonText}>Close Guide</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButtonText: {
    marginLeft: 5,
    color: '#2196F3',
  },
  guidance: {
    marginBottom: 20,
  },
  guidanceText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderValue: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  results: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '90%',
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultSection: {
    marginVertical: 10,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 18,
    color: '#2196F3',
  },
  resultExplanation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  interpretationSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  interpretationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  interpretationNote: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default EQ5D;