import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import SymptomInput from './SymptomInput';
import calculateDiagnosis from './SymptomCalculations';
import CustomButton from './CustomButton';
import RiskTravelSelector from './RiskTravelSelector';
import { guidance } from './guidance';
import { riskFactorWeights } from './RiskFactorWeights';
import { travelRiskFactors } from './TravelRiskFactors';
import * as Haptics from 'expo-haptics';

const capitalizeWords = (str) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const LoadingBar = ({ progress }) => {
  return (
    <View style={styles.loadingBarContainer}>
      <Animated.View 
        style={[
          styles.loadingBar,
          {
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%']
            })
          }
        ]}
      />
    </View>
  );
};

const DiagnosisCard = ({ diagnosis, index, isExpanded, onToggle }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const confidenceColor = getConfidenceColor(diagnosis.confidence);
  const guidanceContent = guidance[diagnosis.diagnosis]?.content;

  return (
    <Animated.View
      style={[
        styles.diagnosisCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.cardHeader}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onToggle();
        }}
      >
        <View style={styles.rankingBadge}>
          <Text style={styles.rankingText}>{index + 1}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.diagnosisTitle}>
            {capitalizeWords(diagnosis.diagnosis)}
          </Text>
          <View style={[styles.confidenceBadge, { backgroundColor: confidenceColor + '20' }]}>
            <Text style={[styles.confidenceText, { color: confidenceColor }]}>
              {diagnosis.confidence} • {diagnosis.probability}% Match
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <View style={styles.cardContent}>
          {guidanceContent && (
            <View style={styles.guidanceSection}>
              <Text style={styles.sectionTitle}>Medical Guidance</Text>
              <Text style={styles.guidanceText}>{guidanceContent}</Text>
            </View>
          )}

          <View style={styles.matchingFactorsSection}>
            <Text style={styles.sectionTitle}>Diagnosis Factors</Text>
            <View style={styles.factorGrid}>
              <View style={styles.factorItem}>
                <Text style={styles.factorLabel}>Symptom Match</Text>
                <Text style={styles.factorValue}>{diagnosis.matchingFactors.symptomMatch}</Text>
              </View>
              <View style={styles.factorItem}>
                <Text style={styles.factorLabel}>Risk Factors</Text>
                <Text style={styles.factorValue}>{diagnosis.matchingFactors.riskFactorMatch}</Text>
              </View>
              <View style={styles.factorItem}>
                <Text style={styles.factorLabel}>Travel Risk</Text>
                <Text style={styles.factorValue}>{diagnosis.matchingFactors.travelRiskMatch}</Text>
              </View>
            </View>
          </View>
        </View>
      </Collapsible>
    </Animated.View>
  );
};

const Checker = () => {
  // State for symptoms and diagnosis
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [error, setError] = useState(null);

  // Patient information states
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    duration: '',
    durationUnit: 'Days',
    severity: ''
  });

  // Risk and travel states
  const [drugHistory, setDrugHistory] = useState('');
  const [travelRegion, setTravelRegion] = useState('');
  const [selectedRiskFactors, setSelectedRiskFactors] = useState([]);
  const [openRiskFactors, setOpenRiskFactors] = useState(false);
  const [openTravelRegion, setOpenTravelRegion] = useState(false);

  // Collapsible state for guidance sections
  const [collapsed, setCollapsed] = useState({});

  const handleSymptomSelect = (updatedSymptoms) => {
    // The SymptomInput component now manages the symptoms array internally
    // and provides us with the complete updated array
    setSelectedSymptoms(updatedSymptoms);
  };

  const handlePatientInfoChange = (field, value) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectRiskFactors = (value) => {
    setSelectedRiskFactors(value || []);
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const [expandedDiagnosis, setExpandedDiagnosis] = useState(null);

  const simulateAnalysis = (result) => {
    setIsAnalyzing(true);
    progress.setValue(0);

    Animated.sequence([
      Animated.timing(progress, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(progress, {
        toValue: 85,
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(progress, {
        toValue: 100,
        duration: 700,
        useNativeDriver: false
      })
    ]).start(() => {
      setIsAnalyzing(false);
      setDiagnosis(result.detailed.slice(0, 5));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });
  };

  const handleCheckDiagnosis = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('No Symptoms Selected', 'Please select at least one symptom.');
      return;
    }

    const result = calculateDiagnosis(
      selectedSymptoms,
      parseInt(patientInfo.duration),
      patientInfo.durationUnit.toLowerCase(),
      patientInfo.severity.toLowerCase(),
      patientInfo.age,
      patientInfo.gender.toLowerCase(),
      drugHistory,
      travelRegion,
      selectedRiskFactors
    );

    if (result.error) {
      setError(result.error);
      setDiagnosis([]);
      Alert.alert('Diagnosis Error', result.error);
      return;
    }
    setDiagnosis(result.detailed.slice(0, 5));

    setError(null);
    simulateAnalysis(result);

  };

  const handleClear = () => {
    setSelectedSymptoms([]);
    setDiagnosis([]);
    setPatientInfo({
      age: '',
      gender: '',
      duration: '',
      durationUnit: 'Days',
      severity: ''
    });
    setDrugHistory('');
    setTravelRegion('');
    setSelectedRiskFactors([]);
    setError(null);
  };

  const toggleCollapsible = (disease) => {
    setCollapsed(prev => ({
      ...prev,
      [disease]: !prev[disease]
    }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>Premium Symptom Analyzer</Text>

      <SymptomInput 
        onSelectSymptoms={handleSymptomSelect}
        patientInfo={patientInfo}
        onPatientInfoChange={handlePatientInfoChange}
      />

      <RiskTravelSelector
        openRiskFactors={openRiskFactors}
        setOpenRiskFactors={setOpenRiskFactors}
        selectedRiskFactors={selectedRiskFactors}
        handleSelectRiskFactors={handleSelectRiskFactors}
        openTravelRegion={openTravelRegion}
        setOpenTravelRegion={setOpenTravelRegion}
        travelRegion={travelRegion}
        setTravelRegion={setTravelRegion}
        riskFactorWeights={riskFactorWeights}
        travelRiskFactors={travelRiskFactors}
      />

      <View style={styles.buttonContainer}>
        <CustomButton 
          title={isAnalyzing ? "Analyzing Symptoms..." : "Analyze Symptoms"} 
          onPress={handleCheckDiagnosis} 
          color="#27c7b8"
          disabled={isAnalyzing}
        />
        <CustomButton 
          title="Clear All" 
          onPress={handleClear} 
          color="#FF6347"
          disabled={isAnalyzing} 
        />
      </View>

      {isAnalyzing && (
        <View style={styles.analyzingContainer}>
          <LoadingBar progress={progress} />
          <Text style={styles.analyzingText}>
            Analyzing symptoms and risk factors...
          </Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {diagnosis.length > 0 && !isAnalyzing && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Diagnostic Analysis Results</Text>
          {diagnosis.map((item, index) => (
            <DiagnosisCard
              key={index}
              diagnosis={item}
              index={index}
              isExpanded={expandedDiagnosis === index}
              onToggle={() => setExpandedDiagnosis(expandedDiagnosis === index ? null : index)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const getConfidenceColor = (confidence) => {
  switch (confidence) {
    case 'High':
      return '#10b981';
    case 'Medium':
      return '#f59e0b';
    case 'Low':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 12,
    marginVertical: 24,
  },
  analyzingContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  analyzingText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#27c7b8',
  },
  results: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  diagnosisCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  rankingBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27c7b8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  confidenceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  guidanceSection: {
    marginBottom: 16,
  },
  guidanceText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
  matchingFactorsSection: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  factorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  factorItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  factorLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  factorValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e293b',
  },
});

export default Checker;