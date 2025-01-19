import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import CustomSelect from '../../utils/CustomSelect';

const FamilyHistory = () => {
  const [formData, setFormData] = useState({
    demographicInfo: {
      ethnicity: [],
      ancestry: [],
      consanguinity: null,
      adoptionStatus: null,
    },
    hereditaryConditions: [],
    conditionsDetails: {},
    affectedRelatives: {},
    familyStructure: {
      numberOfSiblings: '',
      birthOrder: '',
      multiplePregnancies: false,
    },
    pregnancyHistory: {
      miscarriages: false,
      stillbirths: false,
      infantDeaths: false,
      birthDefects: false,
      details: ''
    },
    deathHistory: {
      suddenDeaths: false,
      earlyDeaths: false,
      details: ''
    },
    geneticTesting: {
      previousTesting: false,
      testResults: '',
      familyMembersTested: []
    },
    environmentalFactors: {
      livingConditions: '',
      occupationalHazards: '',
      geographicHistory: ''
    },
    additionalNotes: '',
    lastUpdated: new Date()
  });

  const ethnicityOptions = [
    { label: 'African', value: 'african' },
    { label: 'Asian', value: 'asian' },
    { label: 'European', value: 'european' },
    { label: 'Hispanic/Latino', value: 'hispanic' },
    { label: 'Middle Eastern', value: 'middle_eastern' },
    { label: 'Native American', value: 'native_american' },
    { label: 'Pacific Islander', value: 'pacific_islander' },
    { label: 'Other', value: 'other' }
  ];

  const hereditaryConditionsList = [
    // Cardiovascular
    { label: 'Heart Disease (Before age 50)', value: 'early_heart_disease', category: 'cardiovascular' },
    { label: 'High Blood Pressure', value: 'hypertension', category: 'cardiovascular' },
    { label: 'High Cholesterol', value: 'hypercholesterolemia', category: 'cardiovascular' },
    { label: 'Stroke', value: 'stroke', category: 'cardiovascular' },
    { label: 'Sudden Cardiac Death', value: 'sudden_cardiac_death', category: 'cardiovascular' },

    // Cancer
    { label: 'Breast Cancer', value: 'breast_cancer', category: 'cancer' },
    { label: 'Ovarian Cancer', value: 'ovarian_cancer', category: 'cancer' },
    { label: 'Colon Cancer', value: 'colon_cancer', category: 'cancer' },
    { label: 'Prostate Cancer', value: 'prostate_cancer', category: 'cancer' },
    { label: 'Pancreatic Cancer', value: 'pancreatic_cancer', category: 'cancer' },
    { label: 'Melanoma', value: 'melanoma', category: 'cancer' },
    { label: 'Other Cancer', value: 'other_cancer', category: 'cancer' },

    // Endocrine
    { label: 'Diabetes Type 1', value: 'diabetes_type1', category: 'endocrine' },
    { label: 'Diabetes Type 2', value: 'diabetes_type2', category: 'endocrine' },
    { label: 'Thyroid Disease', value: 'thyroid_disease', category: 'endocrine' },

    // Neurological
    { label: 'Alzheimer\'s Disease', value: 'alzheimers', category: 'neurological' },
    { label: 'Parkinson\'s Disease', value: 'parkinsons', category: 'neurological' },
    { label: 'Multiple Sclerosis', value: 'ms', category: 'neurological' },
    { label: 'Epilepsy', value: 'epilepsy', category: 'neurological' },
    { label: 'Migraines', value: 'migraines', category: 'neurological' },

    // Psychiatric
    { label: 'Depression', value: 'depression', category: 'psychiatric' },
    { label: 'Bipolar Disorder', value: 'bipolar', category: 'psychiatric' },
    { label: 'Schizophrenia', value: 'schizophrenia', category: 'psychiatric' },
    { label: 'Anxiety Disorders', value: 'anxiety', category: 'psychiatric' },
    { label: 'Suicide', value: 'suicide', category: 'psychiatric' },

    // Genetic/Hereditary
    { label: 'Sickle Cell Disease', value: 'sickle_cell', category: 'genetic' },
    { label: 'Cystic Fibrosis', value: 'cystic_fibrosis', category: 'genetic' },
    { label: 'Hemophilia', value: 'hemophilia', category: 'genetic' },
    { label: 'Down Syndrome', value: 'down_syndrome', category: 'genetic' },
    { label: 'Thalassemia', value: 'thalassemia', category: 'genetic' },

    // Autoimmune
    { label: 'Lupus', value: 'lupus', category: 'autoimmune' },
    { label: 'Rheumatoid Arthritis', value: 'rheumatoid_arthritis', category: 'autoimmune' },
    { label: 'Multiple Sclerosis', value: 'multiple_sclerosis', category: 'autoimmune' },
    { label: 'Type 1 Diabetes', value: 'type1_diabetes', category: 'autoimmune' },
    { label: 'Celiac Disease', value: 'celiac', category: 'autoimmune' },

    // Other Systems
    { label: 'Asthma', value: 'asthma', category: 'respiratory' },
    { label: 'COPD', value: 'copd', category: 'respiratory' },
    { label: 'Kidney Disease', value: 'kidney_disease', category: 'renal' },
    { label: 'Liver Disease', value: 'liver_disease', category: 'gastrointestinal' },
    { label: 'Other', value: 'other', category: 'other' }
  ];

  const relationsList = [
    // First Degree Relatives
    { label: 'Mother', value: 'mother', degree: 1 },
    { label: 'Father', value: 'father', degree: 1 },
    { label: 'Sister', value: 'sister', degree: 1 },
    { label: 'Brother', value: 'brother', degree: 1 },
    { label: 'Daughter', value: 'daughter', degree: 1 },
    { label: 'Son', value: 'son', degree: 1 },

    // Second Degree Relatives
    { label: 'Maternal Grandmother', value: 'maternal_grandmother', degree: 2 },
    { label: 'Maternal Grandfather', value: 'maternal_grandfather', degree: 2 },
    { label: 'Paternal Grandmother', value: 'paternal_grandmother', degree: 2 },
    { label: 'Paternal Grandfather', value: 'paternal_grandfather', degree: 2 },
    { label: 'Maternal Aunt', value: 'maternal_aunt', degree: 2 },
    { label: 'Maternal Uncle', value: 'maternal_uncle', degree: 2 },
    { label: 'Paternal Aunt', value: 'paternal_aunt', degree: 2 },
    { label: 'Paternal Uncle', value: 'paternal_uncle', degree: 2 },
    { label: 'Half Sister', value: 'half_sister', degree: 2 },
    { label: 'Half Brother', value: 'half_brother', degree: 2 },
    { label: 'Niece', value: 'niece', degree: 2 },
    { label: 'Nephew', value: 'nephew', degree: 2 },

    // Third Degree Relatives
    { label: 'First Cousin', value: 'first_cousin', degree: 3 },
    { label: 'Great Grandmother', value: 'great_grandmother', degree: 3 },
    { label: 'Great Grandfather', value: 'great_grandfather', degree: 3 }
  ];

  const handleFormUpdate = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleRelativeDetailUpdate = useCallback((relative, field, value) => {
    setFormData(prev => ({
      ...prev,
      affectedRelatives: {
        ...prev.affectedRelatives,
        [relative]: {
          ...prev.affectedRelatives[relative],
          [field]: value
        }
      }
    }));
  }, []);

  const handleSave = useCallback(() => {
    // Validate required fields
    if (!formData.demographicInfo.ethnicity.length) {
      Alert.alert('Required Field', 'Please select at least one ethnicity');
      return;
    }

    // Update last modified timestamp
    const updatedFormData = {
      ...formData,
      lastUpdated: new Date()
    };

    // TODO: Implement API call to save data
    console.log('Saving form data:', updatedFormData);
    Alert.alert('Success', 'Family history saved successfully');
  }, [formData]);

  const DemographicSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Demographics</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ethnicity (select all that apply)</Text>
        <CustomSelect
          options={ethnicityOptions}
          selectedValue={formData.demographicInfo.ethnicity}
          onSelect={(value) => handleFormUpdate('demographicInfo', 'ethnicity', value)}
          multiple={true}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Adoption Status</Text>
        <CustomSelect
          options={[
            { label: 'Not Adopted', value: 'not_adopted' },
            { label: 'Adopted', value: 'adopted' },
            { label: 'Unknown', value: 'unknown' }
          ]}
          selectedValue={formData.demographicInfo.adoptionStatus}
          onSelect={(value) => handleFormUpdate('demographicInfo', 'adoptionStatus', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Consanguinity</Text>
        <CustomSelect
          options={[
            { label: 'No Known Relation', value: 'none' },
            { label: 'First Cousins', value: 'first_cousins' },
            { label: 'Second Cousins', value: 'second_cousins' },
            { label: 'Other Relation', value: 'other' },
            { label: 'Unknown', value: 'unknown' }
          ]}
          selectedValue={formData.demographicInfo.consanguinity}
          onSelect={(value) => handleFormUpdate('demographicInfo', 'consanguinity', value)}
        />
      </View>
    </View>
  );

  const PregnancyHistorySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Pregnancy History</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleFormUpdate('pregnancyHistory', 'miscarriages', !formData.pregnancyHistory.miscarriages)}
        >
          <Text style={styles.checkboxLabel}>History of Miscarriages</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleFormUpdate('pregnancyHistory', 'stillbirths', !formData.pregnancyHistory.stillbirths)}
        >
          <Text style={styles.checkboxLabel}>History of Stillbirths</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleFormUpdate('pregnancyHistory', 'infantDeaths', !formData.pregnancyHistory.infantDeaths)}
        >
          <Text style={styles.checkboxLabel}>Infant Deaths</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleFormUpdate('pregnancyHistory', 'birthDefects', !formData.pregnancyHistory.birthDefects)}
        >
          <Text style={styles.checkboxLabel}>Birth Defects</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Additional Details</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.pregnancyHistory.details}
          onChangeText={(text) => handleFormUpdate('pregnancyHistory', 'details', text)}
        />
      </View>
    </View>
  );

  const GeneticTestingSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Genetic Testing History</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleFormUpdate('geneticTesting', 'previousTesting', !formData.geneticTesting.previousTesting)}
        >
          <Text style={styles.checkboxLabel}>Previous Genetic Testing</Text>
        </TouchableOpacity>
      </View>

      {formData.geneticTesting.previousTesting && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Test Results</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={formData.geneticTesting.testResults}
              onChangeText={(text) => handleFormUpdate('geneticTesting', 'testResults', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Family Members Tested</Text>
            <CustomSelect
              options={relationsList}
              selectedValue={formData.geneticTesting.familyMembersTested}
              onSelect={(value) => handleFormUpdate('geneticTesting', 'familyMembersTested', value)}
              multiple={true}
            />
          </View>
        </>
      )}
    </View>
  );

  const EnvironmentalFactorsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>Environmental Factors</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Living Conditions</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.environmentalFactors.livingConditions}
          onChangeText={(text) => handleFormUpdate('environmentalFactors', 'livingConditions', text)}
          placeholder="Describe living conditions that may affect health..."        placeholderTextColor="#7f8c8d"

        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Occupational Hazards</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.environmentalFactors.occupationalHazards}
          onChangeText={(text) => handleFormUpdate('environmentalFactors', 'occupationalHazards', text)}
          placeholder="List any occupational exposures or hazards..."        placeholderTextColor="#7f8c8d"

        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Geographic History</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.environmentalFactors.geographicHistory}
          onChangeText={(text) => handleFormUpdate('environmentalFactors', 'geographicHistory', text)}
          placeholder="Detail geographic locations that may impact health..."        placeholderTextColor="#7f8c8d"

        />
      </View>
    </View>
  );

  const RelativeDetailForm = ({ relative }) => (
    <View style={styles.detailSection}>
      <Text style={styles.relativeHeader}>{relative}</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Vital Status</Text>
        <CustomSelect
          options={[
            { label: 'Living', value: 'living' },
            { label: 'Deceased', value: 'deceased' },
            { label: 'Unknown', value: 'unknown' }
          ]}
          selectedValue={formData.affectedRelatives[relative]?.vitalStatus}
          onSelect={(value) => handleRelativeDetailUpdate(relative, 'vitalStatus', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {formData.affectedRelatives[relative]?.vitalStatus === 'deceased' 
            ? 'Age at Death' 
            : 'Current Age'}
        </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          value={formData.affectedRelatives[relative]?.age}
          onChangeText={(text) => handleRelativeDetailUpdate(relative, 'age', text)}
          placeholder="Enter age..."        placeholderTextColor="#7f8c8d"

        />
      </View>

      {formData.affectedRelatives[relative]?.vitalStatus === 'deceased' && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Cause of Death</Text>
          <TextInput
            style={styles.textInput}
            value={formData.affectedRelatives[relative]?.causeOfDeath}
            onChangeText={(text) => handleRelativeDetailUpdate(relative, 'causeOfDeath', text)}
            placeholder="Enter cause of death..."        placeholderTextColor="#7f8c8d"

          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Health Conditions</Text>
        <CustomSelect
          options={hereditaryConditionsList}
          selectedValue={formData.affectedRelatives[relative]?.conditions || []}
          onSelect={(value) => handleRelativeDetailUpdate(relative, 'conditions', value)}
          multiple={true}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Comprehensive Family History</Text>

        <DemographicSection />

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Family Structure</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Number of Siblings</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={formData.familyStructure.numberOfSiblings}
              onChangeText={(text) => handleFormUpdate('familyStructure', 'numberOfSiblings', text)}
              placeholder="Enter number of siblings..."        placeholderTextColor="#7f8c8d"

            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Birth Order</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={formData.familyStructure.birthOrder}
              onChangeText={(text) => handleFormUpdate('familyStructure', 'birthOrder', text)}
              placeholder="Enter birth order (e.g., 1 for firstborn)..."        placeholderTextColor="#7f8c8d"

            />
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleFormUpdate('familyStructure', 'multiplePregnancies', !formData.familyStructure.multiplePregnancies)}
            >
              <Text style={styles.checkboxLabel}>Multiple Pregnancies (Twins, Triplets, etc.)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Health Conditions</Text>
          <CustomSelect
            options={hereditaryConditionsList}
            selectedValue={formData.hereditaryConditions}
            onSelect={(value) => setFormData(prev => ({ ...prev, hereditaryConditions: value }))}
            multiple={true}
          />
        </View>

        <PregnancyHistorySection />
        <GeneticTestingSection />
        <EnvironmentalFactorsSection />

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Additional Notes</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={6}
            value={formData.additionalNotes}
            onChangeText={(text) => setFormData(prev => ({ ...prev, additionalNotes: text }))}
            placeholder="Enter any additional relevant information..."        placeholderTextColor="#7f8c8d"

          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Family History</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#212529',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#495057',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  detailSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
  },
  relativeHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#212529',
  },
});

export default FamilyHistory;