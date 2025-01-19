import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Vaccination = () => {
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [newVaccination, setNewVaccination] = useState({
    vaccineName: '',
    dateAdministered: new Date(),
    location: '',
  });
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const vaccineOptions = [
    'BCG',
    'OPV',
    'DPT-HepB-Hib',
    'COVID-19',
    'Measles',
    'Hepatitis B',
    'Yellow Fever',
  ];

  const ugandanRegions = [
    'Central Region',
    'Eastern Region',
    'Northern Region',
    'Western Region',
  ];

  const handleAddVaccination = () => {
    if (
      !newVaccination.vaccineName ||
      !newVaccination.location ||
      !newVaccination.dateAdministered
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setVaccinationRecords((prevRecords) => [
      ...prevRecords,
      { ...newVaccination, id: prevRecords.length + 1 },
    ]);
    setAddModalVisible(false);
    setNewVaccination({
      vaccineName: '',
      dateAdministered: new Date(),
      location: '',
    });
    Alert.alert('Success', 'Vaccination record added successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Vaccination Tracker</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Vaccination</Text>
      </TouchableOpacity>

      <ScrollView>
        {vaccinationRecords.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <Text style={styles.recordTitle}>{record.vaccineName}</Text>
            <Text>Date: {new Date(record.dateAdministered).toLocaleDateString()}</Text>
            <Text>Location: {record.location}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Vaccination Record</Text>

            <Text style={styles.label}>Vaccine Name:</Text>
            <Picker
              selectedValue={newVaccination.vaccineName}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setNewVaccination({ ...newVaccination, vaccineName: itemValue })
              }
            >
              <Picker.Item label="Select a Vaccine" value="" />
              {vaccineOptions.map((vaccine) => (
                <Picker.Item key={vaccine} label={vaccine} value={vaccine} />
              ))}
            </Picker>

            <Text style={styles.label}>Date Administered:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateText}>
                {newVaccination.dateAdministered.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={newVaccination.dateAdministered}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setNewVaccination({
                      ...newVaccination,
                      dateAdministered: selectedDate,
                    });
                  }
                }}
              />
            )}

            <Text style={styles.label}>Location:</Text>
            <Picker
              selectedValue={newVaccination.location}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setNewVaccination({ ...newVaccination, location: itemValue })
              }
            >
              <Picker.Item label="Select a Region" value="" />
              {ugandanRegions.map((region) => (
                <Picker.Item key={region} label={region} value={region} />
              ))}
            </Picker>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setAddModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddVaccination}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  recordCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 8
  },
  cancelButtonText: {
    textAlign: 'center',
    color: 'black'
  },
  saveButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginLeft: 8
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Vaccination;
