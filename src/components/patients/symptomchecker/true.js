import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput, ScrollView } from 'react-native';
import SymptomInput from './SymptomInput'; // Custom component for symptom input
import calculateDiagnosis from './SymptomCalculations'; // Diagnosis calculation logic
import CustomButton from './CustomButton'; // Custom button component
import { guidance } from './guidance'; // Guidance content for diagnoses
import { styles } from './Styles'; // Shared styles
import Collapsible from 'react-native-collapsible'; // Collapsible component
import RiskTravelSelector from './RiskTravelSelector'; // Import the new component
import { riskFactorWeights } from './RiskFactorWeights';
import { travelRiskFactors } from './TravelRiskFactors';
import { TouchableOpacity } from 'react-native';

// Helper function to capitalize each word
const capitalizeWords = (str) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const Checker = () => {
  // State variables
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [duration, setDuration] = useState('short');
  const [severity, setSeverity] = useState('mild');
  const [age, setAge] = useState('adult');
  const [gender, setGender] = useState('male');
  const [drugHistory, setDrugHistory] = useState('');
  const [travelRegion, setTravelRegion] = useState('');
  const [selectedRiskFactors, setSelectedRiskFactors] = useState([]);

  // Dropdown visibility states
  const [openDuration, setOpenDuration] = useState(false);
  const [openSeverity, setOpenSeverity] = useState(false);
  const [openAge, setOpenAge] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openRiskFactors, setOpenRiskFactors] = useState(false);
  const [openTravelRegion, setOpenTravelRegion] = useState(false);

  // Collapsible state for guidance sections
  const [collapsed, setCollapsed] = useState({});

  // Add selected symptom
  const handleSelectSymptoms = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      Alert.alert('Duplicate Symptom', `You have already selected "${symptom}".`);
      return;
    }
    setSelectedSymptoms([...selectedSymptoms, symptom]);
  };

  // Add selected risk factor
  const handleSelectRiskFactors = (value) => {
    setSelectedRiskFactors(value || []);
  };

  // Calculate diagnosis
  const handleCheckDiagnosis = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('No Symptoms Selected', 'Please select at least one symptom.');
      return;
    }

    // Patient data object
    const patientData = {
      age,
      gender,
      severity,
      duration,
    };

    // Call diagnosis function with selected symptoms and patient data
    const result = calculateDiagnosis(
      selectedSymptoms,
      patientData, // Pass patientData object
      drugHistory,
      travelRegion,
      selectedRiskFactors
    );

    if (result === 'No relevant diagnosis found based on the selected symptoms.') {
      Alert.alert('No Diagnosis Found', 'We could not calculate a diagnosis based on the selected symptoms.');
      return;
    }

    setDiagnosis(result.slice(0, 5)); // Show top 5 diagnoses
  };

  // Clear all fields
  const handleClearSymptoms = () => {
    setSelectedSymptoms([]);
    setDiagnosis([]);
    setDrugHistory('');
    setTravelRegion('');
    setSelectedRiskFactors([]);
  };

  // Toggle collapsible content
  const toggleCollapsible = (disease) => {
    setCollapsed((prev) => ({
      ...prev,
      [disease]: !prev[disease],
    }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>Symptom Checker</Text>

      <SymptomInput onSelectSymptoms={handleSelectSymptoms} />

      <Text style={styles.selectedSymptomsTitle}>Selected Symptoms:</Text>
      <FlatList
        data={selectedSymptoms}
        renderItem={({ item }) => <Text style={styles.selectedSymptom}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No symptoms selected yet.</Text>}
      />

      {/* Use the new RiskTravelSelector component */}
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

      {/* Buttons */}
      <CustomButton title="Check Diagnosis" onPress={handleCheckDiagnosis} color="#27c7b8" />
      <CustomButton title="Clear Symptoms" onPress={handleClearSymptoms} color="#FF6347" />

      {/* Diagnosis Results */}
      {diagnosis.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Most Probable Diagnoses:</Text>
          {diagnosis.map((item, index) => {
            const guidanceContent = guidance[item.diagnosis] ? guidance[item.diagnosis].content : null;

            return (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.diagnosis}>
                  {index + 1}. {item.diagnosis}
                </Text>
                {guidanceContent ? (
                  <>
                    <TouchableOpacity onPress={() => toggleCollapsible(item.diagnosis)}>
                      <Text style={styles.boldText}>Details</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed={!collapsed[item.diagnosis]}>
                      <Text style={styles.guidanceText}>{guidanceContent}</Text>
                    </Collapsible>
                  </>
                ) : (
                  <Text>No guidance available for this condition.</Text>
                )}
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default Checker;
