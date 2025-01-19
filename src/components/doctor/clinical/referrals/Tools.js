// components/referral/Button.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  TextInput,
  FlatList,
  Switch,
  Modal,
} from 'react-native';
import {

  Alert
} from 'react-native';
import DocumentPicker from 'expo-document-picker';

export const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  style = {}
}) => {
  const buttonStyles = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
    danger: styles.dangerButton
  };

  const textStyles = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
    danger: styles.dangerText
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyles[variant],
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#007AFF' : '#fff'} />
      ) : (
        <Text style={[styles.text, textStyles[variant]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// components/referral/PatientSelector.js


export const PatientSelector = ({ onSelect, initialPatient = null }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(initialPatient);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    onSelect(patient);
    setModalVisible(false);
  };

  const PatientItem = ({ patient }) => (
    <TouchableOpacity 
      style={styles.patientItem}
      onPress={() => handlePatientSelect(patient)}
    >
      <Icon name="person" size={24} color="#666" />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>
          {patient.firstName} {patient.lastName}
        </Text>
        <Text style={styles.patientDetails}>
          DOB: {patient.dateOfBirth} | ID: {patient.id}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity 
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedPatient ? (
          <Text style={styles.selectedPatientText}>
            {selectedPatient.firstName} {selectedPatient.lastName}
          </Text>
        ) : (
          <Text style={styles.placeholderText}>Select Patient</Text>
        )}
        <Icon name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Patient</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search patients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={[]} // Add your patients data here
              renderItem={({ item }) => <PatientItem patient={item} />}
              keyExtractor={(item) => item.id}
            />
            <Button 
              title="Cancel" 
              variant="outline"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// components/referral/FileUploader.js


export const FileUploader = ({ onUpload, maxFiles = 5 }) => {
  const [files, setFiles] = useState([]);

  const handleFilePick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx
        ],
        allowMultiSelection: true,
      });

      if (files.length + results.length > maxFiles) {
        Alert.alert('Maximum files limit exceeded');
        return;
      }

      const newFiles = [...files, ...results];
      setFiles(newFiles);
      onUpload(newFiles);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to upload file');
      }
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.uploadButton}
        onPress={handleFilePick}
      >
        <Icon name="cloud-upload" size={24} color="#007AFF" />
        <Text style={styles.uploadText}>Upload Files</Text>
      </TouchableOpacity>

      <FlatList
        data={files}
        renderItem={({ item, index }) => (
          <View style={styles.fileItem}>
            <Icon 
              name={item.type.includes('image') ? 'image' : 'insert-drive-file'}
              size={24}
              color="#666"
            />
            <Text style={styles.fileName}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFile(index)}>
              <Icon name="close" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// components/referral/PrioritySelector.js

export const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    { id: 'routine', label: 'Routine', color: '#34C759' },
    { id: 'urgent', label: 'Urgent', color: '#FF9500' },
    { id: 'emergency', label: 'Emergency', color: '#FF3B30' }
  ];

  return (
    <View style={styles.priorityContainer}>
      <Text style={styles.label}>Priority Level</Text>
      <View style={styles.buttonGroup}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority.id}
            style={[
              styles.priorityButton,
              value === priority.id && styles.selectedButton,
              { borderColor: priority.color }
            ]}
            onPress={() => onChange(priority.id)}
          >
            <Text style={[
              styles.priorityText,
              value === priority.id && { color: priority.color }
            ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// components/referral/ConsentForm.js


export const ConsentForm = ({ onConsent }) => {
  const [consented, setConsented] = useState(false);

  const handleConsentChange = (value) => {
    setConsented(value);
    onConsent(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Consent</Text>
      <ScrollView style={styles.consentText}>
        <Text>
          I hereby consent to the sharing of my medical information with the 
          referred healthcare provider. This includes but is not limited to:
          {'\n\n'}
          • Medical history and examination results
          {'\n'}
          • Laboratory test results and imaging reports
          {'\n'}
          • Treatment plans and medications
          {'\n'}
          • Any other relevant medical information
          {'\n\n'}
          I understand that:
          {'\n\n'}
          1. This information will be used for medical consultation and treatment
          2. I can revoke this consent at any time
          3. My information will be kept confidential according to HIPAA regulations
        </Text>
      </ScrollView>
      
      <View style={styles.consentSwitch}>
        <Text style={styles.switchLabel}>
          I have read and agree to the above terms
        </Text>
        <Switch
          value={consented}
          onValueChange={handleConsentChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Button Styles
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
  primaryButton: {
    backgroundColor: '#007AFF'
  },
  secondaryButton: {
    backgroundColor: '#5856D6'
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF'
  },
  dangerButton: {
    backgroundColor: '#FF3B30'
  },
  disabledButton: {
    opacity: 0.5
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  },
  primaryText: {
    color: '#fff'
  },
  secondaryText: {
    color: '#fff'
  },
  outlineText: {
    color: '#007AFF'
  },
  dangerText: {
    color: '#fff'
  },

  // PatientSelector Styles
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  patientInfo: {
    marginLeft: 12
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600'
  },
  patientDetails: {
    color: '#666'
  },

  // FileUploader Styles
  container: {
    marginVertical: 16
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8
  },
  uploadText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600'
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  fileName: {
    flex: 1,
    marginLeft: 8
  },

  // PrioritySelector Styles
  priorityContainer: {
    marginVertical: 16
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center'
  },
  selectedButton: {
    backgroundColor: '#fff'
  },
  priorityText: {
    fontWeight: '600'
  },

  // ConsentForm Styles
  container: {
    marginVertical: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  consentText: {
    maxHeight: 200,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8
  },
  consentSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  switchLabel: {
    flex: 1,
    marginRight: 16
  }
});