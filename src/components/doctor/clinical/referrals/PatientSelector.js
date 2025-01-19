// components/referral/PatientSelector.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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