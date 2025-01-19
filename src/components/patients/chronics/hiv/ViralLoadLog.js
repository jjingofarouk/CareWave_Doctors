import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit'; // Charting library for graph

// Available test methods
const testMethods = [
  "RT-PCR",
  "RNA Quantification",
  "Viral Culture",
  "Antigen Test"
];

const ViralLoadLog = ({ onLogViralLoad }) => {
  const [viralLoad, setViralLoad] = useState('');
  const [testDate, setTestDate] = useState(new Date());  // Initialize with current date
  const [testMethod, setTestMethod] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLogViralLoad = () => {
    if (viralLoad && testDate && testMethod) {
      const data = {
        viralLoad,
        testDate,
        testMethod,
        doctorNotes,
      };
      onLogViralLoad(data);
      setViralLoad('');
      setTestDate(new Date());  // Reset to current date after logging
      setTestMethod('');
      setDoctorNotes('');
    } else {
      alert('Please fill all fields');
    }
  };

  // Generate viral load explanation
  const getViralLoadExplanation = (viralLoadValue) => {
    if (viralLoadValue < 200) {
      return "Viral load is undetectable, indicating effective treatment.";
    } else if (viralLoadValue >= 200 && viralLoadValue < 1000) {
      return "Low viral load, treatment is likely effective.";
    } else {
      return "High viral load, treatment may need adjustment.";
    }
  };

  // Example data for viral load graph (replace with real data)
  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [150, 500, 1200, 400, 100],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Log Viral Load</Text>

      {/* Test Date */}
      <Text style={styles.label}>Test Date</Text>
      <DateTimePicker
        style={styles.datePicker}
        value={testDate}  // Pass the Date object here
        mode="date"
        onChange={(event, selectedDate) => setTestDate(selectedDate || testDate)}  // Update date or retain current date
      />

      {/* Viral Load Result */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter Viral Load Result"
        keyboardType="numeric"
        value={viralLoad}
        onChangeText={setViralLoad}
      />

      {/* Test Method */}
      <Text style={styles.label}>Test Method</Text>
      <TouchableOpacity style={styles.selectButton} onPress={() => setShowModal(true)}>
        <Text style={styles.selectButtonText}>
          {testMethod || 'Select Test Method'}
        </Text>
      </TouchableOpacity>

      {/* Doctor's Notes */}
      <TextInput
        style={[styles.textInput, styles.notesInput]}
        placeholder="Enter Doctor's Notes"
        multiline
        numberOfLines={4}
        value={doctorNotes}
        onChangeText={setDoctorNotes}
      />

      {/* Viral Load Explanation */}
      <Text style={styles.explanation}>
        {viralLoad ? getViralLoadExplanation(Number(viralLoad)) : ''}
      </Text>

      {/* Log Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogViralLoad}>
        <Text style={styles.buttonText}>Log Viral Load</Text>
      </TouchableOpacity>

      {/* Viral Load Graph */}
      <LineChart
        data={graphData}
        width={350}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" VL"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 255, 134, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#FF7043',
          },
        }}
        style={styles.graph}
      />

      {/* Modal for test method selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalHeader}>Select Test Method</Text>
            <FlatList
              data={testMethods}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setTestMethod(item);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectButtonText: {
    color: '#333',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  explanation: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  graph: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ViralLoadLog;
