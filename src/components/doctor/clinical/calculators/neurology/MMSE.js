import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export const MMSE = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    education: '',
    testDate: new Date().toISOString().split('T')[0],
    previousScore: '',
    notes: '',
    examiner: '',
    location: ''
  });

  const [responses, setResponses] = useState(Array(11).fill(0));
  const [totalScore, setTotalScore] = useState(0);
  const scrollViewRef = useRef(null);
  
  // Scoring guidelines for each question
  const scoringGuides = {
    0: {
      max: 5,
      guide: "• Year (1 point)\n• Season (1 point)\n• Date (1 point)\n• Day (1 point)\n• Month (1 point)\n\nMust be exact. No partial credit.",
      placeholder: "Enter 0-5"
    },
    1: {
      max: 5,
      guide: "• State (1 point)\n• Country (1 point)\n• Town/City (1 point)\n• Hospital/Building (1 point)\n• Floor/Room (1 point)",
      placeholder: "Enter 0-5"
    },
    2: {
      max: 3,
      guide: "Name three unrelated objects clearly and slowly, one second for each.\nThen ask the patient to repeat all three.\n• 1 point for each correct on first attempt\n• Keep repeating until patient learns all three (up to 6 trials)",
      placeholder: "Enter 0-3"
    },
    3: {
      max: 5,
      guide: "Serial 7s: Start at 100\n• 93 (1 point)\n• 86 (1 point)\n• 79 (1 point)\n• 72 (1 point)\n• 65 (1 point)\n\nOR\n\nSpell 'WORLD' backwards:\n• D (1 point)\n• L (1 point)\n• R (1 point)\n• O (1 point)\n• W (1 point)",
      placeholder: "Enter 0-5"
    },
    4: {
      max: 3,
      guide: "Ask for the three objects repeated in Question 3\n• 1 point for each correct recall\n• Order doesn't matter",
      placeholder: "Enter 0-3"
    },
    5: {
      max: 2,
      guide: "Show a pencil and wristwatch\n• 1 point for naming pencil\n• 1 point for naming watch\n• Must use exact terms",
      placeholder: "Enter 0-2"
    },
    6: {
      max: 1,
      guide: "Ask patient to repeat 'No ifs, ands, or buts'\n• 1 point for perfect repetition\n• Must be exact, no errors",
      placeholder: "Enter 0-1"
    },
    7: {
      max: 3,
      guide: "• Takes paper (1 point)\n• Folds in half (1 point)\n• Places on floor (1 point)\n\nDon't demonstrate or help. Score only what patient does.",
      placeholder: "Enter 0-3"
    },
    8: {
      max: 1,
      guide: "Show written command: 'CLOSE YOUR EYES'\n• 1 point for closing eyes\n• Patient must read and execute command",
      placeholder: "Enter 0-1"
    },
    9: {
      max: 1,
      guide: "Ask patient to write a sentence\n• Must contain subject and verb\n• Must make sense\n• Ignore spelling errors",
      placeholder: "Enter 0-1"
    },
    10: {
      max: 1,
      guide: "Show intersecting pentagons\n• All 10 angles must be present\n• Intersection must form four-sided figure\n• Figures must be approximately equal",
      placeholder: "Enter 0-1"
    }
  };

// Calculate total score whenever responses change
useEffect(() => {
  const newTotal = responses.reduce((sum, value) => {
    const numValue = parseInt(value) || 0;
    return sum + numValue;
  }, 0);
  setTotalScore(newTotal);
}, [responses]);

const handleChange = (index, value) => {
  if (value === '') {
    const newResponses = [...responses];
    newResponses[index] = '';
    setResponses(newResponses);
    return;
  }

  const newValue = parseInt(value) || 0;
  const maxScore = scoringGuides[index].max;
  
  if (newValue > maxScore) {
    Alert.alert(
      "Invalid Score",
      `Maximum score for this question is ${maxScore}`,
      [{ text: "OK" }]
    );
    return;
  }
    
  const newResponses = [...responses];
  newResponses[index] = value;
  setResponses(newResponses);
};

  
const getScoreInterpretation = (score) => {
  if (score >= 27) return "Normal cognition";
  if (score >= 24) return "Normal to Mild cognitive impairment";
  if (score >= 19) return "Mild cognitive impairment";
  if (score >= 10) return "Moderate cognitive impairment";
  return "Severe cognitive impairment";
};

const getEducationAdjustedInterpretation = (score, education) => {
  const eduYears = parseInt(education) || 0;
  let adjustment = 0;
  
  if (eduYears < 8) adjustment = -2;
  else if (eduYears >= 8 && eduYears <= 12) adjustment = -1;
  else if (eduYears > 16) adjustment = +1;
  
  const adjustedScore = score + adjustment;
  return {
    score: adjustedScore,
    adjustment: adjustment,
    interpretation: `Education-adjusted score: ${adjustedScore}/30 (${adjustment > 0 ? '+' : ''}${adjustment} point adjustment)`
  };
};

const getCognitiveProfile = (responses) => {
  const profiles = {
    orientation: (parseInt(responses[0]) || 0) + (parseInt(responses[1]) || 0),
    memory: (parseInt(responses[2]) || 0) + (parseInt(responses[4]) || 0),
    attention: parseInt(responses[3]) || 0,
    language: (parseInt(responses[5]) || 0) + (parseInt(responses[6]) || 0) + (parseInt(responses[9]) || 0),
    visualSpatial: parseInt(responses[10]) || 0,
    executiveFunction: parseInt(responses[7]) || 0 + (parseInt(responses[8]) || 0)
  };
  
  return profiles;
};


const renderQuestion = (index, label, subLabel = null) => (
  <View style={styles.questionContainer}>
    <View style={styles.questionHeader}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => Alert.alert("Scoring Guide", scoringGuides[index].guide)}
        style={styles.helpButton}
      >
        <Text style={styles.helpButtonText}>?</Text>
      </TouchableOpacity>
    </View>
    {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
    <View style={styles.scoreInputContainer}>
      <TextInput
        style={[
          styles.input,
          responses[index] === '' && styles.inputEmpty
        ]}
        keyboardType="numeric"
        maxLength={1}
        value={responses[index].toString()}
        onChangeText={(text) => handleChange(index, text)}
        placeholder={scoringGuides[index].placeholder}
        placeholderTextColor="#999"
      />
      <Text style={styles.maxScore}>/ {scoringGuides[index].max}</Text>
    </View>
  </View>
);

const cognitiveProfile = getCognitiveProfile(responses);



  return (
    <ScrollView 
      style={styles.container}
      ref={scrollViewRef}
    >
      <Text style={styles.header}>Mini-Mental State Examination (MMSE)</Text>

      {/* Patient Information Section */}
      <View style={styles.patientInfoContainer}>
        <TextInput
          style={styles.patientInfoInput}
          placeholder="Patient Name"
          placeholderTextColor="#808080" // Using hex code for gray

          value={patientInfo.name}
          onChangeText={(text) => setPatientInfo({...patientInfo, name: text})}
        />
        <View style={styles.patientInfoRow}>
          <TextInput
            style={[styles.patientInfoInput, styles.halfWidth]}
            placeholder="Age"
            placeholderTextColor="#808080" // Using hex code for gray
            keyboardType="numeric"
            value={patientInfo.age}
            onChangeText={(text) => setPatientInfo({...patientInfo, age: text})}
          />
          <TextInput
            style={[styles.patientInfoInput, styles.halfWidth]}
            placeholder="Years of Education"
            placeholderTextColor="#808080" // Using hex code for gray

            keyboardType="numeric"
            value={patientInfo.education}
            onChangeText={(text) => setPatientInfo({...patientInfo, education: text})}
          />
        </View>
        <TextInput
          style={styles.patientInfoInput}
          placeholder="Previous MMSE Score (if any)"
          placeholderTextColor="#808080" // Using hex code for gray

          keyboardType="numeric"
          value={patientInfo.previousScore}
          onChangeText={(text) => setPatientInfo({...patientInfo, previousScore: text})}
        />
      </View>

      {renderQuestion(0, "1. Orientation to Time", "Year, Season, Date, Day, Month")}
      {renderQuestion(1, "2. Orientation to Place", "State, Country, Town, Hospital, Floor")}
      {renderQuestion(2, "3. Registration", "Name and repeat: APPLE, PENNY, TABLE")}
      {renderQuestion(3, "4. Attention & Calculation", "Serial 7s from 100 OR spell 'WORLD' backwards")}
      {renderQuestion(4, "5. Recall", "Recall the 3 objects from question 3")}
      {renderQuestion(5, "6. Naming", "Name the pencil and watch shown")}
      {renderQuestion(6, "7. Repetition", '"No ifs, ands, or buts"')}
      {renderQuestion(7, "8. Three-Stage Command", "Take paper, fold in half, place on floor")}
      {renderQuestion(8, "9. Reading", "Read and obey: CLOSE YOUR EYES")}
      {renderQuestion(9, "10. Writing", "Write a complete sentence")}
      {renderQuestion(10, "11. Drawing", "Copy the intersecting pentagons")}

      {/* Notes Section */}
      <View style={styles.notesContainer}>
        <Text style={styles.notesLabel}>Clinical Notes:</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          placeholder="Enter any observations, concerns, or follow-up notes"
          placeholderTextColor="#808080" // Custom placeholder text color (Tomato color)

          value={patientInfo.notes}
          onChangeText={(text) => setPatientInfo({...patientInfo, notes: text})}
        />
      </View>

    {/* Enhanced Results Section */}
    <View style={styles.resultsContainer}>
        <Text style={styles.resultHeader}>Assessment Results</Text>
        <Text style={styles.resultScore}>Total Score: {totalScore}/30</Text>
        <Text style={[
          styles.resultInterpretation,
          totalScore < 24 && styles.resultWarning
        ]}>
          {getScoreInterpretation(totalScore)}
        </Text>
        {patientInfo.education && (
          <Text style={styles.resultAdjusted}>
            {getEducationAdjustedInterpretation(totalScore, patientInfo.education).interpretation}
          </Text>
        )}

                {/* Cognitive Domain Analysis */}
                <View style={styles.domainAnalysis}>
          <Text style={styles.domainHeader}>Cognitive Domain Analysis:</Text>
          <Text style={styles.domainText}>Orientation: {cognitiveProfile.orientation}/10</Text>
          <Text style={styles.domainText}>Memory: {cognitiveProfile.memory}/6</Text>
          <Text style={styles.domainText}>Attention: {cognitiveProfile.attention}/5</Text>
          <Text style={styles.domainText}>Language: {cognitiveProfile.language}/4</Text>
          <Text style={styles.domainText}>Visual-Spatial: {cognitiveProfile.visualSpatial}/1</Text>
          <Text style={styles.domainText}>Executive Function: {cognitiveProfile.executiveFunction}/4</Text>
        </View>
      </View>

    {/* Enhanced Key Information */}
    <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Clinical Guidelines:</Text>
        
        <Text style={styles.infoSubheader}>Score Interpretation:</Text>
        <Text style={styles.infoText}>
          • 27-30: Normal cognition
          {'\n'}• 24-26: Normal to Mild impairment
          {'\n'}• 19-23: Mild cognitive impairment
          {'\n'}• 10-18: Moderate impairment
          {'\n'}• ≤9: Severe impairment
        </Text>

        <Text style={styles.infoSubheader}>Education Adjustments:</Text>
        <Text style={styles.infoText}>
          • 0-7 years: -2 points
          {'\n'}• 8-12 years: -1 point
          {'\n'}• 13-16 years: no adjustment
          {'\n'}• above 16 years: +1 point
        </Text>

        <Text style={styles.infoSubheader}>Risk Factors to Consider:</Text>
        <Text style={styles.infoText}>
          • Age (increased risk above 65)
          {'\n'}• Family history of dementia
          {'\n'}• Cardiovascular conditions
          {'\n'}• Depression/anxiety
          {'\n'}• Recent medication changes
          {'\n'}• Sleep disorders
          {'\n'}• Substance use
        </Text>

        <Text style={styles.infoSubheader}>Recommended Follow-up:</Text>
        <Text style={styles.infoText}>
          • Score drop ≥3 points in 6 months
          {'\n'}• Score ≤24 with high education
          {'\n'}• Score ≤19 with limited education
          {'\n'}• Significant domain-specific deficits
        </Text>

        <Text style={styles.infoSubheader}>Additional Assessments to Consider:</Text>
        <Text style={styles.infoText}>
          • Clock Drawing Test
          {'\n'}• Trail Making Test
          {'\n'}• Geriatric Depression Scale
          {'\n'}• Activities of Daily Living
          {'\n'}• Instrumental Activities of Daily Living
          {'\n'}• Montreal Cognitive Assessment (MoCA)
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#004C54',
    textAlign: 'center',
  },
  patientInfoContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  patientInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  patientInfoInput: {
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  halfWidth: {
    width: '48%',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#004C54',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  scoreInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: 60,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginRight: 8,
  },
  maxScore: {
    fontSize: 16,
    color: '#666',
  },
  notesContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  resultsContainer: {
    backgroundColor: '#E8F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 8,
  },
  resultInterpretation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  resultAdjusted: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  resultComparison: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004C54',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  inputEmpty: {
    backgroundColor: '#f8f9fa',
    borderColor: '#dee2e6',
  },
  resultWarning: {
    color: '#dc3545',
    fontWeight: '500',
  },
  domainAnalysis: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  domainHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#004C54',
  },
  domainText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  infoSubheader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#004C54',
    marginTop: 12,
    marginBottom: 8,
  },
});