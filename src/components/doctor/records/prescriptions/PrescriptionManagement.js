import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { drugOptions } from '../../clinical/drugOptions';


const FREQUENCIES = [
  { label: 'Once daily', value: 'QD' },
  { label: 'Twice daily', value: 'BID' },
  { label: 'Three times daily', value: 'TID' },
  { label: 'Four times daily', value: 'QID' },
  { label: 'Every other day', value: 'QOD' },
  { label: 'As needed', value: 'PRN' },
];

const ROUTES = [
  { label: 'Oral', value: 'PO' },
  { label: 'Subcutaneous', value: 'SC' },
  { label: 'Intramuscular', value: 'IM' },
  { label: 'Intravenous', value: 'IV' },
  { label: 'Topical', value: 'TOP' },
];

const MedicationAutocomplete = ({ value, onChange, error }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredDrugs, setFilteredDrugs] = useState([]);

  useEffect(() => {
    if (value) {
      const filtered = drugOptions.filter(drug =>
        drug.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDrugs(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  return (
    <View style={styles.autocompleteContainer}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder="Medication Name"
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChange}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredDrugs}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  onChange(item);
                  setShowSuggestions(false);
                }}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          />
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const PrescriptionManagement = ({ patientId, doctorId, navigation }) => {
  const [formData, setFormData] = useState({
    medicationName: '',
    dosage: '',
    frequency: '',
    route: '',
    duration: '',
    quantity: '',
    instructions: '',
    pharmacy: {
      name: '',
      address: '',
      phone: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    fetchRecentPrescriptions();
    fetchNearbyPharmacies();
  }, []);

  const fetchRecentPrescriptions = async () => {
    try {
      const response = await fetch(`/api/prescriptions/recent/${patientId}`);
      const data = await response.json();
      setRecentPrescriptions(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch recent prescriptions');
    }
  };

  const fetchNearbyPharmacies = async () => {
    try {
      const response = await fetch('/api/pharmacies/nearby');
      const data = await response.json();
      // Handle pharmacy data
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch nearby pharmacies');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.medicationName) newErrors.medicationName = 'Medication name is required';
    if (!formData.dosage) newErrors.dosage = 'Dosage is required';
    if (!formData.frequency) newErrors.frequency = 'Frequency is required';
    if (!formData.route) newErrors.route = 'Route is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!formData.instructions) newErrors.instructions = 'Instructions are required';
    if (!formData.pharmacy.name) newErrors['pharmacy.name'] = 'Pharmacy name is required';
    if (!formData.pharmacy.address) newErrors['pharmacy.address'] = 'Pharmacy address is required';
    if (!formData.pharmacy.phone) newErrors['pharmacy.phone'] = 'Pharmacy phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const prescriptionData = {
        ...formData,
        patientId,
        doctorId,
        pharmacyId: selectedPharmacy?.id,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescriptionData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Prescription sent successfully');
        navigation.goBack();
      } else {
        throw new Error('Failed to send prescription');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    // Clear error when field is modified
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Medication Details</Text>
              
              <MedicationAutocomplete
                value={formData.medicationName}
                onChange={(value) => handleChange('medicationName', value)}
                error={errors.medicationName}
              />

              <TextInput
                style={[styles.input, errors.dosage && styles.inputError]}
                placeholder="Dosage"
                placeholderTextColor="#666"
                value={formData.dosage}
                onChangeText={(value) => handleChange('dosage', value)}
              />
              {errors.dosage && <Text style={styles.errorText}>{errors.dosage}</Text>}

              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Frequency</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {FREQUENCIES.map((freq) => (
                    <TouchableOpacity
                      key={freq.value}
                      style={[
                        styles.frequencyButton,
                        formData.frequency === freq.value && styles.selectedFrequency,
                      ]}
                      onPress={() => handleChange('frequency', freq.value)}
                    >
                      <Text 
                        style={[
                          styles.frequencyText,
                          formData.frequency === freq.value && styles.selectedText
                        ]}
                      >
                        {freq.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Route</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ROUTES.map((route) => (
                    <TouchableOpacity
                      key={route.value}
                      style={[
                        styles.routeButton,
                        formData.route === route.value && styles.selectedRoute,
                      ]}
                      onPress={() => handleChange('route', route.value)}
                    >
                      <Text 
                        style={[
                          styles.routeText,
                          formData.route === route.value && styles.selectedText
                        ]}
                      >
                        {route.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <TextInput
                style={[styles.input, errors.duration && styles.inputError]}
                placeholder="Duration (days)"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.duration}
                onChangeText={(value) => handleChange('duration', value)}
              />
              {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}

              <TextInput
                style={[styles.input, errors.quantity && styles.inputError]}
                placeholder="Quantity"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={formData.quantity}
                onChangeText={(value) => handleChange('quantity', value)}
              />
              {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}

              <TextInput
                style={[styles.input, styles.textArea, errors.instructions && styles.inputError]}
                placeholder="Special Instructions"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
                value={formData.instructions}
                onChangeText={(value) => handleChange('instructions', value)}
              />
              {errors.instructions && <Text style={styles.errorText}>{errors.instructions}</Text>}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pharmacy Information</Text>
              <TextInput
                style={[styles.input, errors['pharmacy.name'] && styles.inputError]}
                placeholder="Pharmacy Name"
                placeholderTextColor="#666"
                value={formData.pharmacy.name}
                onChangeText={(value) => handleChange('pharmacy.name', value)}
              />
              {errors['pharmacy.name'] && <Text style={styles.errorText}>{errors['pharmacy.name']}</Text>}

              <TextInput
                style={[styles.input, errors['pharmacy.address'] && styles.inputError]}
                placeholder="Pharmacy Address"
                placeholderTextColor="#666"
                value={formData.pharmacy.address}
                onChangeText={(value) => handleChange('pharmacy.address', value)}
              />
              {errors['pharmacy.address'] && <Text style={styles.errorText}>{errors['pharmacy.address']}</Text>}

              <TextInput
                style={[styles.input, errors['pharmacy.phone'] && styles.inputError]}
                placeholder="Pharmacy Phone"
                placeholderTextColor="#666"
                value={formData.pharmacy.phone}
                onChangeText={(value) => handleChange('pharmacy.phone', value)}
              />
              {errors['pharmacy.phone'] && <Text style={styles.errorText}>{errors['pharmacy.phone']}</Text>}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Send Prescription</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  autocompleteContainer: {
    position: 'relative',
    zIndex: 1,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  frequencyButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedFrequency: {
    backgroundColor: '#007AFF',
  },
  frequencyText: {
    color: '#333',
  },
  routeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedRoute: {
    backgroundColor: '#007AFF',
  },
  routeText: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrescriptionManagement;