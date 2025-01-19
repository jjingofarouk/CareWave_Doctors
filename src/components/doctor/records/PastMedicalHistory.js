import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { format } from 'date-fns';

const PastMedicalHistory = ({ medicalHistory = {}, onSave }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [conditions, setConditions] = useState({
    cardiovascular: medicalHistory.cardiovascular || [],
    respiratory: medicalHistory.respiratory || [],
    endocrine: medicalHistory.endocrine || [],
    gastrointestinal: medicalHistory.gastrointestinal || [],
    neurological: medicalHistory.neurological || [],
    musculoskeletal: medicalHistory.musculoskeletal || [],
    psychological: medicalHistory.psychological || [],
    other: medicalHistory.other || [],
  });
  // Enhanced state to include new categories
  const [formData, setFormData] = useState({
    conditions: {
      cardiovascular: medicalHistory.cardiovascular || [],
      respiratory: medicalHistory.respiratory || [],
      endocrine: medicalHistory.endocrine || [],
      gastrointestinal: medicalHistory.gastrointestinal || [],
      neurological: medicalHistory.neurological || [],
      musculoskeletal: medicalHistory.musculoskeletal || [],
      psychological: medicalHistory.psychological || [],
      other: medicalHistory.other || [],
    },
    hospitalizations: medicalHistory.hospitalizations || [],
    allergies: {
      food: medicalHistory.foodAllergies || [],
      drug: medicalHistory.drugAllergies || [],
      environmental: medicalHistory.environmentalAllergies || [],
    },
    medications: medicalHistory.medications || []
  });

  // Update other functions to use the consolidated handleInputChange
  const updateHospitalization = (id, field, value) => {
    const updatedHospitalizations = formData.hospitalizations.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    handleInputChange('hospitalizations', null, updatedHospitalizations);
  };

  const removeHospitalization = (id) => {
    const updatedHospitalizations = formData.hospitalizations.filter(item => item.id !== id);
    handleInputChange('hospitalizations', null, updatedHospitalizations);
  };

  const updateAllergy = (type, id, field, value) => {
    const updatedAllergies = formData.allergies[type].map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    handleInputChange('allergies', type, updatedAllergies);
  };

  const removeAllergy = (type, id) => {
    const updatedAllergies = formData.allergies[type].filter(item => item.id !== id);
    handleInputChange('allergies', type, updatedAllergies);
  };

  const updateMedication = (id, field, value) => {
    const updatedMedications = formData.medications.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    handleInputChange('medications', null, updatedMedications);
  };

  const removeMedication = (id) => {
    const updatedMedications = formData.medications.filter(item => item.id !== id);
    handleInputChange('medications', null, updatedMedications);
  };


  // Consolidated handleInputChange function
  const handleInputChange = (section, category, data) => {
    setFormData(prev => {
      if (section === 'conditions') {
        return {
          ...prev,
          conditions: {
            ...prev.conditions,
            [category]: data
          }
        };
      } else if (section === 'hospitalizations') {
        return {
          ...prev,
          hospitalizations: data
        };
      } else if (section === 'allergies') {
        return {
          ...prev,
          allergies: {
            ...prev.allergies,
            [category]: data
          }
        };
      } else if (section === 'medications') {
        return {
          ...prev,
          medications: data
        };
      }
      return prev;
    });
  };
  // Original condition categories remain the same
  const conditionCategories = {
    cardiovascular: [
      { id: 'htn', name: 'Hypertension', details: true, dateRequired: true },
      { id: 'cad', name: 'Coronary Artery Disease', details: true, dateRequired: true },
      { id: 'mi', name: 'Myocardial Infarction', details: true, dateRequired: true },
      { id: 'chf', name: 'Congestive Heart Failure', details: true, dateRequired: true },
      { id: 'arrythmia', name: 'Cardiac Arrhythmia', details: true, dateRequired: true },
    ],
    respiratory: [
      { id: 'asthma', name: 'Asthma', details: true, dateRequired: true },
      { id: 'copd', name: 'COPD', details: true, dateRequired: true },
      { id: 'sleep_apnea', name: 'Sleep Apnea', details: true, dateRequired: true },
      { id: 'tb', name: 'Tuberculosis', details: true, dateRequired: true },
    ],
    endocrine: [
      { id: 'diabetes', name: 'Diabetes Mellitus', details: true, dateRequired: true },
      { id: 'thyroid', name: 'Thyroid Disease', details: true, dateRequired: true },
      { id: 'osteoporosis', name: 'Osteoporosis', details: true, dateRequired: true },
    ],
    gastrointestinal: [
      { id: 'gerd', name: 'GERD', details: true, dateRequired: true },
      { id: 'ibd', name: 'Inflammatory Bowel Disease', details: true, dateRequired: true },
      { id: 'hepatitis', name: 'Hepatitis', details: true, dateRequired: true },
    ],
    neurological: [
      { id: 'stroke', name: 'Stroke/TIA', details: true, dateRequired: true },
      { id: 'seizure', name: 'Seizure Disorder', details: true, dateRequired: true },
      { id: 'migraine', name: 'Migraine', details: true, dateRequired: true },
    ],
    musculoskeletal: [
      { id: 'arthritis', name: 'Arthritis', details: true, dateRequired: true },
      { id: 'gout', name: 'Gout', details: true, dateRequired: true },
      { id: 'fibromyalgia', name: 'Fibromyalgia', details: true, dateRequired: true },
    ],
    psychological: [
      { id: 'depression', name: 'Depression', details: true, dateRequired: true },
      { id: 'anxiety', name: 'Anxiety', details: true, dateRequired: true },
      { id: 'bipolar', name: 'Bipolar Disorder', details: true, dateRequired: true },
    ],
  };
  const handleConditionToggle = (category, condition) => {
    const currentConditions = conditions[category];
    const conditionExists = currentConditions.find(c => c.id === condition.id);
    
    let updatedConditions;
    if (conditionExists) {
      updatedConditions = currentConditions.filter(c => c.id !== condition.id);
    } else {
      updatedConditions = [...currentConditions, {
        id: condition.id,
        name: condition.name,
        diagnosisDate: null,
        details: '',
        status: 'active',
        severity: 'mild',
      }];
    }

    setConditions(prev => ({
      ...prev,
      [category]: updatedConditions
    }));
    handleInputChange('conditions', category, updatedConditions);
  };
  // Add new hospitalization entry
  const addHospitalization = () => {
    const newHospitalization = {
      id: Date.now().toString(),
      date: '',
      reason: '',
      hospital: '',
      duration: '',
      procedures: '',
      outcome: ''
    };
    
    setFormData(prev => ({
      ...prev,
      hospitalizations: [...prev.hospitalizations, newHospitalization]
    }));
  };
  const handleConditionUpdate = (category, conditionId, field, value) => {
    const updatedConditions = conditions[category].map(condition => {
      if (condition.id === conditionId) {
        return {
          ...condition,
          [field]: value
        };
      }
      return condition;
    });

    setConditions(prev => ({
      ...prev,
      [category]: updatedConditions
    }));
    handleInputChange('conditions', category, updatedConditions);
  };

  const ConditionItem = ({ condition, category }) => {
    const isSelected = conditions[category].find(c => c.id === condition.id);
    
    return (
      <View style={styles.conditionItem}>
        <TouchableOpacity 
          style={styles.conditionHeader}
          onPress={() => handleConditionToggle(category, condition)}
        >
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
          <Text style={styles.conditionName}>{condition.name}</Text>
        </TouchableOpacity>
        
        {isSelected && (
          <View style={styles.conditionDetails}>
            <View style={styles.row}>
              <Text style={styles.label}>Diagnosis Date:</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="MM/YYYY"
                value={isSelected.diagnosisDate}
                onChangeText={(value) => handleConditionUpdate(category, condition.id, 'diagnosisDate', value)}
              />
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <TouchableOpacity
                style={styles.statusButton}
                onPress={() => {
                  const nextStatus = isSelected.status === 'active' ? 'resolved' : 'active';
                  handleConditionUpdate(category, condition.id, 'status', nextStatus);
                }}
              >
                <Text style={styles.statusText}>
                  {isSelected.status === 'active' ? '🔴 Active' : '🟢 Resolved'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.label}>Severity:</Text>
              <View style={styles.severityContainer}>
                {['mild', 'moderate', 'severe'].map(severity => (
                  <TouchableOpacity
                    key={severity}
                    style={[
                      styles.severityButton,
                      isSelected.severity === severity && styles.severityButtonSelected
                    ]}
                    onPress={() => handleConditionUpdate(category, condition.id, 'severity', severity)}
                  >
                    <Text style={[
                      styles.severityText,
                      isSelected.severity === severity && styles.severityTextSelected
                    ]}>
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <TextInput
              style={styles.detailsInput}
              placeholder="Add details about condition, treatment, and course"
              multiline
              value={isSelected.details}
              onChangeText={(value) => handleConditionUpdate(category, condition.id, 'details', value)}
            />
          </View>
        )}
      </View>
    );
  };


  // Add new allergy entry
  const addAllergy = (type) => {
    const newAllergy = {
      id: Date.now().toString(),
      allergen: '',
      reaction: '',
      severity: 'mild',
      diagnosed: '',
      notes: ''
    };
    
    setFormData(prev => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [type]: [...prev.allergies[type], newAllergy]
      }
    }));
  };

  // Add new medication entry
  const addMedication = () => {
    const newMedication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      startDate: '',
      purpose: '',
      prescribedBy: '',
      status: 'active'
    };
    
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));
  };

  const HospitalizationItem = ({ item, index }) => (
    <View style={styles.detailsCard}>
      <Text style={styles.cardTitle}>Hospitalization {index + 1}</Text>
      
      <View style={styles.inputRow}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YYYY"
          value={item.date}
          onChangeText={(value) => updateHospitalization(item.id, 'date', value)}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Hospital:</Text>
        <TextInput
          style={styles.input}
          placeholder="Hospital name"
          value={item.hospital}
          onChangeText={(value) => updateHospitalization(item.id, 'hospital', value)}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Duration:</Text>
        <TextInput
          style={styles.input}
          placeholder="Length of stay"
          value={item.duration}
          onChangeText={(value) => updateHospitalization(item.id, 'duration', value)}
        />
      </View>

      <Text style={styles.label}>Reason for Hospitalization:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Describe reason for hospitalization"
        value={item.reason}
        onChangeText={(value) => updateHospitalization(item.id, 'reason', value)}
      />

      <Text style={styles.label}>Procedures Performed:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="List any procedures or surgeries"
        value={item.procedures}
        onChangeText={(value) => updateHospitalization(item.id, 'procedures', value)}
      />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeHospitalization(item.id)}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const AllergyItem = ({ item, type, index }) => (
    <View style={styles.detailsCard}>
      <Text style={styles.cardTitle}>{type.charAt(0).toUpperCase() + type.slice(1)} Allergy {index + 1}</Text>
      
      <View style={styles.inputRow}>
        <Text style={styles.label}>Allergen:</Text>
        <TextInput
          style={styles.input}
          placeholder="Allergen name"
          value={item.allergen}
          onChangeText={(value) => updateAllergy(type, item.id, 'allergen', value)}
        />
      </View>

      <Text style={styles.label}>Reaction:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Describe allergic reaction"
        value={item.reaction}
        onChangeText={(value) => updateAllergy(type, item.id, 'reaction', value)}
      />

      <View style={styles.severityContainer}>
        <Text style={styles.label}>Severity:</Text>
        <View style={styles.severityButtons}>
          {['mild', 'moderate', 'severe'].map(severity => (
            <TouchableOpacity
              key={severity}
              style={[
                styles.severityButton,
                item.severity === severity && styles.severityButtonSelected
              ]}
              onPress={() => updateAllergy(type, item.id, 'severity', severity)}
            >
              <Text style={[
                styles.severityText,
                item.severity === severity && styles.severityTextSelected
              ]}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeAllergy(type, item.id)}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const MedicationItem = ({ item, index }) => (
    <View style={styles.detailsCard}>
      <Text style={styles.cardTitle}>Medication {index + 1}</Text>
      
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Medication name"
          value={item.name}
          onChangeText={(value) => updateMedication(item.id, 'name', value)}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Dosage:</Text>
        <TextInput
          style={styles.input}
          placeholder="Dosage"
          value={item.dosage}
          onChangeText={(value) => updateMedication(item.id, 'dosage', value)}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Frequency:</Text>
        <TextInput
          style={styles.input}
          placeholder="How often taken"
          value={item.frequency}
          onChangeText={(value) => updateMedication(item.id, 'frequency', value)}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Start Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YYYY"
          value={item.startDate}
          onChangeText={(value) => updateMedication(item.id, 'startDate', value)}
        />
      </View>

      <Text style={styles.label}>Purpose:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Reason for taking this medication"
        value={item.purpose}
        onChangeText={(value) => updateMedication(item.id, 'purpose', value)}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.label}>Status:</Text>
        <TouchableOpacity
          style={styles.statusButton}
          onPress={() => {
            const nextStatus = item.status === 'active' ? 'discontinued' : 'active';
            updateMedication(item.id, 'status', nextStatus);
          }}
        >
          <Text style={styles.statusText}>
            {item.status === 'active' ? '🟢 Active' : '🔴 Discontinued'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeMedication(item.id)}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.introSection}>
        <Text style={styles.introText}>
          Document the patient's complete medical history, including past conditions, hospitalizations, allergies, and current medications.
        </Text>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Documentation Guidelines:</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.instructionText}>
              Document chronological onset of conditions with specific dates when available
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.instructionText}>
              Note severity, current status, and treatment course for each condition
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.instructionText}>
              Include all hospitalizations with procedures performed and outcomes
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.instructionText}>
              Record medication details including dosage, frequency, and adherence pattern
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.expandAllButton}
          onPress={() => setExpandedSection(expandedSection ? null : 'all')}
        >
          <Text style={styles.expandAllText}>
            {expandedSection ? 'Collapse All Sections' : 'Expand All Sections'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hospitalizations Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'hospitalizations' ? null : 'hospitalizations')}
        >
          <Text style={styles.sectionTitle}>Hospitalizations</Text>
          <Text style={styles.sectionCount}>{formData.hospitalizations.length} records</Text>
        </TouchableOpacity>
        
        {expandedSection === 'hospitalizations' && (
          <View style={styles.sectionContent}>
            {formData.hospitalizations.map((item, index) => (
              <HospitalizationItem key={item.id} item={item} index={index} />
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addHospitalization}
            >
              <Text style={styles.addButtonText}>+ Add Hospitalization</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Allergies Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'allergies' ? null : 'allergies')}
        >
          <Text style={styles.sectionTitle}>Allergies</Text>
          <Text style={styles.sectionCount}>
            {Object.values(formData.allergies).reduce((acc, curr) => acc + curr.length, 0)} records
          </Text>
        </TouchableOpacity>
        
        {expandedSection === 'allergies' && (
          <View style={styles.sectionContent}>
            {Object.entries(formData.allergies).map(([type, allergies]) => (
              <View key={type}>
                <Text style={styles.subsectionTitle}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Allergies
                </Text>
                {allergies.map((item, index) => (
                  <AllergyItem key={item.id} item={item} type={type} index={index} />
                ))}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addAllergy(type)}
                >
                  <Text style={styles.addButtonText}>+ Add {type} Allergy</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Medications Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'medications' ? null : 'medications')}
        >
          <Text style={styles.sectionTitle}>Medications</Text>
          <Text style={styles.sectionCount}>{formData.medications.length} records</Text>
        </TouchableOpacity>
        
        {expandedSection === 'medications' && (
          <View style={styles.sectionContent}>
            {formData.medications.map((item, index) => (
              <MedicationItem key={item.id} item={item} index={index} />
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addMedication}
            >
              <Text style={styles.addButtonText}>+ Add Medication</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {Object.entries(conditionCategories).map(([category, conditions]) => (
        <View key={category} style={styles.categorySection}>
          <TouchableOpacity
            style={styles.categoryHeader}
            onPress={() => setExpandedSection(expandedSection === category ? null : category)}
          >
            <Text style={styles.categoryTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <Text style={styles.categoryCount}>
              {conditions.filter(c => conditions[category]?.find(cc => cc.id === c.id)).length} conditions
            </Text>
          </TouchableOpacity>
          
          {expandedSection === category && (
            <View style={styles.conditionsList}>
              {conditions.map(condition => (
                <ConditionItem
                  key={condition.id}
                  condition={condition}
                  category={category}
                />
              ))}
            </View>
          )}
        </View>
      ))}      {/* ... (previous conditions section remains unchanged) ... */}

<TouchableOpacity 
        style={styles.submitButton}
        onPress={() => {
          if (onSave) {
            onSave(formData);
          }
        }}
      >
        <Text style={styles.submitButtonText}>Save Medical History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  introSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    width: 16,
  },
  instructionText: {
    fontSize: 16,
    color: '#4a4a4a',
    flex: 1,
    lineHeight: 24,
  },  
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sectionCount: {
    fontSize: 14,
    color: '#666',
  },
  sectionContent: {
    padding: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  detailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#f1f3f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusButton: {
    backgroundColor: '#f1f3f5',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
  },
  severityContainer: {
    marginBottom: 12,
  },
  severityButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  severityButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#f1f3f5',
  },
  severityButtonSelected: {
    backgroundColor: '#007AFF',
  },
  severityText: {
    fontSize: 14,
    color: '#666',
  },
  severityTextSelected: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  categorySection: {
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
  },
  conditionsList: {
    padding: 8,
  },
  conditionItem: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
  },
  conditionName: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  conditionDetails: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  statusButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f1f3f5',
  },
  statusText: {
    fontSize: 14,
  },
  severityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  severityButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#f1f3f5',
  },
  severityButtonSelected: {
    backgroundColor: '#007AFF',
  },
  severityText: {
    fontSize: 14,
    color: '#666',
  },
  severityTextSelected: {
    color: '#fff',
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PastMedicalHistory;