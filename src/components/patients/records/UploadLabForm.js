import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView,
  KeyboardAvoidingView, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomSelect from '../../utils/CustomSelect';

// Comprehensive lab test options grouped by category
const labOptions = {
  hematology: [
    { label: 'Complete Blood Count (CBC)', value: 'CBC', referenceRange: '4.5-11.0', units: 'x10^3/uL' },
    { label: 'Hemoglobin', value: 'HGB', referenceRange: '13.5-17.5', units: 'g/dL' },
    { label: 'Platelet Count', value: 'PLT', referenceRange: '150-450', units: 'x10^3/uL' },
    { label: 'White Blood Cell Count', value: 'WBC', referenceRange: '4.5-11.0', units: 'x10^3/uL' },
  ],
  chemistry: [
    { label: 'Fasting Blood Sugar (FBS)', value: 'FBS', referenceRange: '70-100', units: 'mg/dL' },
    { label: 'HbA1c', value: 'HBA1C', referenceRange: '4.0-5.6', units: '%' },
    { label: 'Creatinine', value: 'CREA', referenceRange: '0.7-1.3', units: 'mg/dL' },
    { label: 'Blood Urea Nitrogen (BUN)', value: 'BUN', referenceRange: '7-20', units: 'mg/dL' },
  ],
  lipids: [
    { label: 'Total Cholesterol', value: 'CHOL', referenceRange: '<200', units: 'mg/dL' },
    { label: 'Triglycerides', value: 'TRIG', referenceRange: '<150', units: 'mg/dL' },
    { label: 'HDL Cholesterol', value: 'HDL', referenceRange: '>40', units: 'mg/dL' },
    { label: 'LDL Cholesterol', value: 'LDL', referenceRange: '<100', units: 'mg/dL' },
  ],
  thyroid: [
    { label: 'Thyroid Stimulating Hormone (TSH)', value: 'TSH', referenceRange: '0.4-4.0', units: 'mIU/L' },
    { label: 'Free T4', value: 'FT4', referenceRange: '0.8-1.8', units: 'ng/dL' },
    { label: 'Free T3', value: 'FT3', referenceRange: '2.3-4.2', units: 'pg/mL' },
  ],
};

// Lab locations with "Other" option
const labLocations = [
  { label: 'Main Hospital Lab', value: 'MAIN_LAB' },
  { label: 'Emergency Department Lab', value: 'ED_LAB' },
  { label: 'Outpatient Clinic Lab', value: 'OUTPATIENT_LAB' },
  { label: 'Reference Laboratory', value: 'REF_LAB' },
  { label: 'Other', value: 'OTHER' },
];

const UploadLabForm = ({ onSubmit, onCancel }) => {
  const [labDetails, setLabDetails] = useState({
    category: '',
    labName: '',
    result: '',
    date: new Date(),
    referenceRange: '',
    units: '',
    labLocation: '',
    customLocation: '',
    orderedBy: '',
    performedBy: '',
    notes: '',
    criticalValue: false,
    specimenType: '',
    collectionTime: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [resultWarning, setResultWarning] = useState('');

  // Handle lab category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setLabDetails((prev) => ({
      ...prev,
      category,
      labName: '',
      referenceRange: '',
      units: '',
    }));
  };

  // Handle lab test selection
  const handleLabSelection = (selectedValue) => {
    const selectedLab = labOptions[selectedCategory].find(
      (lab) => lab.value === selectedValue
    );
    setLabDetails((prev) => ({
      ...prev,
      labName: selectedLab.label,
      referenceRange: selectedLab.referenceRange,
      units: selectedLab.units,
    }));
  };

  // Validate result against reference range
  const validateResult = (result) => {
    if (!result || !labDetails.referenceRange) return;

    const numericResult = parseFloat(result);
    if (isNaN(numericResult)) return;

    if (labDetails.referenceRange.includes('-')) {
      const [min, max] = labDetails.referenceRange.split('-').map(Number);
      if (numericResult < min || numericResult > max) {
        setResultWarning(`Warning: Result outside reference range (${labDetails.referenceRange} ${labDetails.units})`);
        setLabDetails(prev => ({ ...prev, criticalValue: true }));
      } else {
        setResultWarning('');
        setLabDetails(prev => ({ ...prev, criticalValue: false }));
      }
    } else if (labDetails.referenceRange.includes('<')) {
      const max = parseFloat(labDetails.referenceRange.replace('<', ''));
      if (numericResult >= max) {
        setResultWarning(`Warning: Result above reference value (<${max} ${labDetails.units})`);
        setLabDetails(prev => ({ ...prev, criticalValue: true }));
      } else {
        setResultWarning('');
        setLabDetails(prev => ({ ...prev, criticalValue: false }));
      }
    } else if (labDetails.referenceRange.includes('>')) {
      const min = parseFloat(labDetails.referenceRange.replace('>', ''));
      if (numericResult <= min) {
        setResultWarning(`Warning: Result below reference value (>${min} ${labDetails.units})`);
        setLabDetails(prev => ({ ...prev, criticalValue: true }));
      } else {
        setResultWarning('');
        setLabDetails(prev => ({ ...prev, criticalValue: false }));
      }
    }
  };

  const handleChange = (field, value) => {
    setLabDetails((prev) => ({ ...prev, [field]: value }));
    if (field === 'result') {
      validateResult(value);
    }
  };

  const handleSubmit = () => {
    if (!labDetails.labName || !labDetails.result || !labDetails.labLocation) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (labDetails.labLocation === 'OTHER' && !labDetails.customLocation) {
      Alert.alert('Error', 'Please specify the custom lab location');
      return;
    }

    const submitData = {
      ...labDetails,
      labLocation: labDetails.labLocation === 'OTHER' 
        ? labDetails.customLocation 
        : labDetails.labLocation,
    };

    onSubmit(submitData);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || labDetails.date;
    setShowDatePicker(false);
    setLabDetails((prev) => ({ ...prev, date: currentDate }));
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || labDetails.collectionTime;
    setShowTimePicker(false);
    setLabDetails((prev) => ({ ...prev, collectionTime: currentTime }));
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Add Lab Result</Text>

        {/* Lab Category Selection */}
        <CustomSelect
          options={Object.keys(labOptions).map(key => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value: key
          }))}
          placeholder="Select Category"
          selectedValue={selectedCategory}
          onValueChange={handleCategoryChange}
          style={styles.select}
        />

        {/* Lab Test Selection */}
        {selectedCategory && (
          <CustomSelect
            options={labOptions[selectedCategory]}
            placeholder="Select Lab Test"
            selectedValue={labDetails.labName}
            onValueChange={handleLabSelection}
            style={styles.select}
          />
        )}

        {/* Result Input with Reference Range */}
        {labDetails.referenceRange && (
          <View style={styles.resultContainer}>
            <TextInput
              placeholder={`Enter Result (Reference: ${labDetails.referenceRange} ${labDetails.units})`}
              placeholderTextColor="#666666"
              style={[styles.input, resultWarning ? styles.warningInput : null]}
              value={labDetails.result}
              onChangeText={(text) => handleChange('result', text)}
              keyboardType="numeric"
            />
            {resultWarning ? (
              <Text style={styles.warningText}>{resultWarning}</Text>
            ) : null}
          </View>
        )}

        {/* Specimen Type */}
        <CustomSelect
          options={[
            { label: 'Blood', value: 'BLOOD' },
            { label: 'Urine', value: 'URINE' },
            { label: 'CSF', value: 'CSF' },
            { label: 'Other', value: 'OTHER' },
          ]}
          placeholder="Select Specimen Type"
          selectedValue={labDetails.specimenType}
          onValueChange={(value) => handleChange('specimenType', value)}
          style={styles.select}
        />

        {/* Date and Time Pickers */}
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)} 
            style={styles.dateTimePicker}
          >
            <Text style={styles.dateTimeText}>
              Date: {labDetails.date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowTimePicker(true)} 
            style={styles.dateTimePicker}
          >
            <Text style={styles.dateTimeText}>
              Time: {labDetails.collectionTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={labDetails.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={labDetails.collectionTime}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Lab Location Selection */}
        <CustomSelect
          options={labLocations}
          placeholder="Select Lab Location"
          selectedValue={labDetails.labLocation}
          onValueChange={(value) => handleChange('labLocation', value)}
          style={styles.select}
        />

        {labDetails.labLocation === 'OTHER' && (
          <TextInput
            placeholder="Enter Custom Location"
            placeholderTextColor="#666666"
            style={styles.input}
            value={labDetails.customLocation}
            onChangeText={(text) => handleChange('customLocation', text)}
          />
        )}

        {/* Additional Details */}
        <TextInput
          placeholder="Ordered By"
          placeholderTextColor="#666666"
          style={styles.input}
          value={labDetails.orderedBy}
          onChangeText={(text) => handleChange('orderedBy', text)}
        />
        
        <TextInput
          placeholder="Performed By"
          placeholderTextColor="#666666"
          style={styles.input}
          value={labDetails.performedBy}
          onChangeText={(text) => handleChange('performedBy', text)}
        />

        <TextInput
          placeholder="Notes"
          placeholderTextColor="#666666"
          style={[styles.input, styles.textArea]}
          value={labDetails.notes}
          onChangeText={(text) => handleChange('notes', text)}
          multiline
        />

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, labDetails.criticalValue && styles.warningButton]} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              {labDetails.criticalValue ? 'Submit Critical Value' : 'Submit'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#004C54',
  },
  select: {
    marginBottom: 16,
  },
  resultContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000000',
  },
  warningInput: {
    borderColor: '#FFA500',
    backgroundColor: '#FFF3E0',
  },
  warningText: {
    color: '#FFA500',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateTimePicker: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dateTimeText: {
    color: '#555',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#004C54',
  },
  select: {
    marginBottom: 16,
  },
  resultContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000000',
  },
  warningInput: {
    borderColor: '#FFA500',
    backgroundColor: '#FFF3E0',
  },
  warningText: {
    color: '#FFA500',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateTimePicker: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dateTimeText: {
    color: '#555',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningButton: {
    backgroundColor: '#FFA500',
  },
  cancelButton: {
    backgroundColor: '#FF5252',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// PropTypes for component documentation
UploadLabForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// Default props
UploadLabForm.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
};

export default UploadLabForm;