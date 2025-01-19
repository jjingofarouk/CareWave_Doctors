import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import CustomSelect from '../../utils/CustomSelect';
import { LineChart } from 'react-native-chart-kit';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import { Share } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

// GraphQL Queries & Mutations remain the same as they are backend definitions
const GET_LAB_RESULTS = gql`
  query GetLabResults($userId: ID!) {
    labResults(userId: $userId) {
      id
      labName
      result
      date
      fileUrl
      status
      notes
      referenceRange
      units
      labLocation
      orderedBy
      performedBy
    }
  }
`;

const UPLOAD_LAB_RESULT = gql`
  mutation UploadLabResult($userId: ID!, $labName: String!, $result: String!, $date: String!, $file: Upload!, $notes: String, $referenceRange: String, $units: String, $labLocation: String, $orderedBy: String, $performedBy: String) {
    uploadLabResult(userId: $userId, labName: $labName, result: $result, date: $date, file: $file, notes: $notes, referenceRange: $referenceRange, units: $units, labLocation: $labLocation, orderedBy: $orderedBy, performedBy: $performedBy) {
      id
      labName
      result
      date
      fileUrl
      status
      notes
      referenceRange
      units
      labLocation
      orderedBy
      performedBy
    }
  }
`;

const UPDATE_LAB_RESULT = gql`
  mutation UpdateLabResult($labResultId: ID!, $labName: String!, $result: String!, $date: String!, $notes: String, $referenceRange: String, $units: String, $labLocation: String, $orderedBy: String, $performedBy: String) {
    updateLabResult(labResultId: $labResultId, labName: $labName, result: $result, date: $date, notes: $notes, referenceRange: $referenceRange, units: $units, labLocation: $labLocation, orderedBy: $orderedBy, performedBy: $performedBy) {
      id
      labName
      result
      date
      fileUrl
      status
      notes
      referenceRange
      units
      labLocation
      orderedBy
      performedBy
    }
  }
`;

const DELETE_LAB_RESULT = gql`
  mutation DeleteLabResult($labResultId: ID!) {
    deleteLabResult(labResultId: $labResultId) {
      id
    }
  }
`;

const SHARE_LAB_RESULT = gql`
  mutation ShareLabResult($labResultId: ID!, $recipientEmail: String!) {
    shareLabResult(labResultId: $labResultId, recipientEmail: $recipientEmail) {
      success
      message
    }
  }
`;

const GET_LAB_RESULT_HISTORY = gql`
  query GetLabResultHistory($userId: ID!, $labName: String!) {
    labResultHistory(userId: $userId, labName: $labName) {
      id
      result
      date
    }
  }
`;

const Labs = () => {
  const userId = "user-123"; // Replace with actual userId from authentication context
  const { data = { labResults: [] }, loading, error, refetch } = useQuery(GET_LAB_RESULTS, { variables: { userId } });
  const [uploadLabResult] = useMutation(UPLOAD_LAB_RESULT);
  const [updateLabResult] = useMutation(UPDATE_LAB_RESULT);
  const [deleteLabResult] = useMutation(DELETE_LAB_RESULT);
  const [shareLabResult] = useMutation(SHARE_LAB_RESULT);
  const { data: historyData, refetch: refetchHistory } = useQuery(GET_LAB_RESULT_HISTORY, { 
    variables: { userId, labName: '' }, 
    skip: true 
  });

  // State Management
  const [newLabResult, setNewLabResult] = useState({
    labName: '',
    result: '',
    date: new Date(),
    file: null,
    notes: '',
    referenceRange: '',
    units: '',
    labLocation: '',
    orderedBy: '',
    performedBy: ''
  });
  
  const [editLabResult, setEditLabResult] = useState(null);
  const [selectedLabResult, setSelectedLabResult] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    labName: '',
    dateFrom: new Date(),
    dateTo: new Date()
  });
  const [sortCriteria, setSortCriteria] = useState({
    field: 'date',
    direction: 'desc'
  });

  



  const labOptions = [
    {
      name: 'Complete Blood Count (CBC)',
      components: [
        { name: 'White Blood Cell (WBC)', range: '4.5-11.0 x10^9/L' },
        { name: 'Red Blood Cell (RBC)', range: '4.5-5.9 x10^12/L' },
        { name: 'Hemoglobin', range: '13.5-17.5 g/dL' },
        { name: 'Hematocrit', range: '41-53%' },
        { name: 'Platelets', range: '150-450 x10^9/L' }
      ]
    },
    {
      name: 'Metabolic Panel',
      components: [
        { name: 'Glucose', range: '70-99 mg/dL' },
        { name: 'Calcium', range: '8.6-10.3 mg/dL' },
        { name: 'Sodium', range: '135-145 mmol/L' },
        { name: 'Potassium', range: '3.5-5.0 mmol/L' },
        { name: 'CO2', range: '23-29 mmol/L' },
        { name: 'Chloride', range: '98-107 mmol/L' },
        { name: 'BUN', range: '7-20 mg/dL' },
        { name: 'Creatinine', range: '0.6-1.2 mg/dL' },
        { name: 'Albumin', range: '3.4-5.4 g/dL' },
        { name: 'Total Bilirubin', range: '0.1-1.2 mg/dL' },
        { name: 'ALP', range: '20-140 U/L' },
        { name: 'ALT', range: '7-56 U/L' },
        { name: 'AST', range: '10-40 U/L' }
      ]
    },
    {
      name: 'Lipid Panel',
      components: [
        { name: 'Total Cholesterol', range: '<200 mg/dL' },
        { name: 'LDL Cholesterol', range: '<100 mg/dL' },
        { name: 'HDL Cholesterol', range: '>60 mg/dL' },
        { name: 'Triglycerides', range: '<150 mg/dL' }
      ]
    },
    {
      name: 'Thyroid Function Tests',
      components: [
        { name: 'TSH', range: '0.4-4.0 mIU/L' },
        { name: 'Free T4', range: '0.8-1.8 ng/dL' },
        { name: 'Free T3', range: '2.3-4.2 pg/mL' }
      ]
    }
  ];

  const [selectedLabTest, setSelectedLabTest] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');

  // Create component options based on selected lab test
  const getComponentOptions = () => {
    const selectedTest = labOptions.find(test => test.name === selectedLabTest?.name);
    if (!selectedTest) return [];
    return selectedTest.components.map(component => ({
      label: component.name,
      value: component.name
    }));
  };

  // Convert labOptions to format expected by CustomSelect
  const labTestOptions = labOptions.map(lab => ({
    label: lab.name,
    value: lab.name
  }));


  // File Picker Handler
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (result.type === 'success') {
        setNewLabResult({ ...newLabResult, file: result });
      }
    } catch (err) {
      Alert.alert('Error', 'Error picking the file');
    }
  };

  // Date Picker Handler
  const onDismissDate = () => {
    setShowDatePicker(false);
  };

  const onConfirmDate = (params) => {
    setShowDatePicker(false);
    if (params.date) {
      setFilterCriteria(prev => ({
        ...prev,
        dateFrom: params.date
      }));
    }
  };

  // Updated handlers
  const handleLabTestChange = (option) => {
    const selectedTest = labOptions.find(test => test.name === option.value);
    setSelectedLabTest(selectedTest);
    setSelectedComponent(null);
    setNewLabResult({
      ...newLabResult,
      labName: selectedTest.name,
      referenceRange: '',
      result: '',
      units: ''
    });
  };

  const handleComponentChange = (option) => {
    const test = labOptions.find(test => test.name === selectedLabTest.name);
    const component = test.components.find(comp => comp.name === option.value);
    setSelectedComponent(component);
    setNewLabResult({
      ...newLabResult,
      labName: `${selectedLabTest.name} - ${component.name}`,
      referenceRange: component.range,
      result: '',
      units: component.range.split(' ').pop()
    });
  };



  // Upload Handler
  const handleLabResultSubmit = async () => {
    try {
      await uploadLabResult({ variables: { userId, ...newLabResult } });
      setNewLabResult({
        labName: '',
        result: '',
        date: new Date(),
        file: null,
        notes: '',
        referenceRange: '',
        units: '',
        labLocation: '',
        orderedBy: '',
        performedBy: ''
      });
      refetch();
      Alert.alert('Success', 'Lab result uploaded successfully');
      setShowUploadModal(false);
    } catch (error) {
      Alert.alert('Error', 'Error uploading lab result');
    }
  };

  // Update Handler
  const handleLabResultUpdate = async (labResultId) => {
    try {
      await updateLabResult({ variables: { labResultId, ...editLabResult } });
      setEditLabResult(null);
      refetch();
      Alert.alert('Success', 'Lab result updated successfully');
      setShowEditModal(false);
    } catch (error) {
      Alert.alert('Error', 'Error updating lab result');
    }
  };

  // Delete Handler
  const handleLabResultDelete = async (labResultId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this lab result?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteLabResult({ variables: { labResultId } });
              refetch();
              Alert.alert('Success', 'Lab result deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Error deleting lab result');
            }
          }
        }
      ]
    );
  };

  // Share Handler
  const handleShareLabResult = async () => {
    try {
      await shareLabResult({ 
        variables: { 
          labResultId: selectedLabResult.id, 
          recipientEmail: shareEmail 
        } 
      });
      setShowShareModal(false);
      setShareEmail('');
      Alert.alert('Success', 'Lab result shared successfully');
    } catch (error) {
      Alert.alert('Error', 'Error sharing lab result');
    }
  };

  // Convert sort options to format expected by CustomSelect
  const sortOptions = [
    { label: 'Date (Newest First)', value: 'date-desc' },
    { label: 'Date (Oldest First)', value: 'date-asc' },
    { label: 'Lab Name (A-Z)', value: 'labName-asc' },
    { label: 'Lab Name (Z-A)', value: 'labName-desc' }
  ];
  // Filtered and Sorted Results
  const filteredAndSortedLabResults = data.labResults
    .filter(lab => {
      const matchesName = !filterCriteria.labName || 
        lab.labName.toLowerCase().includes(filterCriteria.labName.toLowerCase());
      const matchesDateFrom = !filterCriteria.dateFrom || 
        new Date(lab.date) >= filterCriteria.dateFrom;
      const matchesDateTo = !filterCriteria.dateTo || 
        new Date(lab.date) <= filterCriteria.dateTo;
      return matchesName && matchesDateFrom && matchesDateTo;
    })
    .sort((a, b) => {
      const comparison = a[sortCriteria.field] < b[sortCriteria.field] ? -1 : 1;
      return sortCriteria.direction === 'asc' ? comparison : -comparison;
    });

  // Chart Configuration
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  // Render Chart
  const renderChart = () => {
    if (!historyData || !historyData.labResultHistory) return null;

    const data = {
      labels: historyData.labResultHistory.map(item => 
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      datasets: [{
        data: historyData.labResultHistory.map(item => parseFloat(item.result)),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2
      }]
    };

    return (
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    );
  };

  // Main Render
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Lab Results Management</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowUploadModal(true)}
            >
              <Ionicons name="add" size={24} color="#ffffff" />
              <Text style={styles.addButtonText}>New Lab Result</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Filter Results</Text>
            <TextInput
              style={styles.input}
              placeholder="Search by lab name"        placeholderTextColor="#7f8c8d"

              value={filterCriteria.labName}
              onChangeText={(text) => setFilterCriteria({ ...filterCriteria, labName: text })}
            />
            <View style={styles.dateFilters}>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => {
                  setShowDatePicker(true);
                }}
              >
                <Text>From: {filterCriteria.dateFrom.toLocaleDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => {
                  setShowDatePicker(true);
                }}
              >
                <Text>To: {filterCriteria.dateTo.toLocaleDateString()}</Text>
              </TouchableOpacity>
            </View>
          </View>

      {/* Sort Section with updated CustomSelect */}
      <View style={styles.sortSection}>
        <Text style={styles.sectionTitle}>Sort By</Text>
        <CustomSelect
          options={sortOptions}
          value={sortOptions.find(option => 
            option.value === `${sortCriteria.field}-${sortCriteria.direction}`
          )}
          onSelect={(option) => {
            const [field, direction] = option.value.split('-');
            setSortCriteria({ field, direction });
          }}
          placeholder="Select sorting option"
        />
      </View>

          {/* Lab Results List */}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>Error loading lab results</Text>
          ) : (
            <View style={styles.resultsList}>
              {filteredAndSortedLabResults.map((lab) => (
                <TouchableOpacity
                  key={lab.id}
                  style={styles.resultCard}
                  onPress={() => {
                    setSelectedLabResult(lab);
                    setShowViewModal(true);
                  }}
                >
                  <View style={styles.resultHeader}>
                    <Text style={styles.labName}>{lab.labName}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: lab.status === 'Normal' ? '#4CAF50' : '#FF9800' }
                    ]}>
                      <Text style={styles.statusText}>{lab.status}</Text>
                    </View>
                  </View>
                  <View style={styles.resultDetails}>
                    <Text style={styles.resultValue}>
                      {lab.result} {lab.units}
                    </Text>
                    <Text style={styles.resultDate}>
                      {new Date(lab.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        setEditLabResult(lab);
                        setShowEditModal(true);
                      }}
                    >
                      <Ionicons name="edit" size={20} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleLabResultDelete(lab.id)}
                    >
                      <Ionicons name="delete" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        setSelectedLabResult(lab);
                        setShowShareModal(true);
                      }}
                    >
                      <Ionicons name="share" size={20} color="#007AFF" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

 {/* Upload Modal */}
<Modal
  visible={showUploadModal}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Upload New Lab Result</Text>
      
      <CustomSelect
        options={labOptions.map(lab => ({
          label: lab.name,
          value: lab.name
        }))}
        value={selectedLabTest ? {
          label: selectedLabTest.name,
          value: selectedLabTest.name
        } : null}
        onSelect={handleLabTestChange}
        placeholder="Select Lab Test"
        label="Lab Test"
      />

      {selectedLabTest && (
        <CustomSelect
          options={selectedLabTest.components.map(component => ({
            label: component.name,
            value: component.name
          }))}
          value={selectedComponent ? {
            label: selectedComponent.name,
            value: selectedComponent.name
          } : null}
          onSelect={handleComponentChange}
          placeholder="Select Component"
          label="Component"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Result"
        placeholderTextColor="#7f8c8d"
        value={newLabResult.result}
        onChangeText={(text) => setNewLabResult({ ...newLabResult, result: text })}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Lab Location"
        placeholderTextColor="#7f8c8d"
        value={newLabResult.labLocation}
        onChangeText={(text) => setNewLabResult({ ...newLabResult, labLocation: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Ordered By"
        placeholderTextColor="#7f8c8d"
        value={newLabResult.orderedBy}
        onChangeText={(text) => setNewLabResult({ ...newLabResult, orderedBy: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Performed By"
        placeholderTextColor="#7f8c8d"
        value={newLabResult.performedBy}
        onChangeText={(text) => setNewLabResult({ ...newLabResult, performedBy: text })}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Notes"
        placeholderTextColor="#7f8c8d"
        value={newLabResult.notes}
        onChangeText={(text) => setNewLabResult({ ...newLabResult, notes: text })}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={styles.fileButton}
        onPress={handleFilePick}
      >
        <Ionicons name="attach-file" size={20} color="#007AFF" />
        <Text style={styles.fileButtonText}>
          {newLabResult.file ? 'File Selected' : 'Attach File'}
        </Text>
      </TouchableOpacity>

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setShowUploadModal(false)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.submitButton]}
          onPress={handleLabResultSubmit}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

          {/* View Modal */}
          <Modal
            visible={showViewModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedLabResult?.labName}</Text>
                <View style={styles.resultDetailSection}>
                  <Text style={styles.detailLabel}>Result:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLabResult?.result} {selectedLabResult?.units}
                  </Text>
                  <Text style={styles.detailLabel}>Reference Range:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLabResult?.referenceRange}
                  </Text>
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLabResult?.date && new Date(selectedLabResult.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.detailLabel}>Lab Location:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLabResult?.labLocation}
                  </Text>
                  <Text style={styles.detailLabel}>Notes:</Text>
                  <Text style={styles.detailValue}>
                    {selectedLabResult?.notes}
                  </Text>
                </View>
                {renderChart()}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowViewModal(false)}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                  {selectedLabResult?.fileUrl && (
                    <TouchableOpacity
                      style={[styles.modalButton, styles.downloadButton]}
                      onPress={() => {
                        // Implement file download logic
                      }}
                    >
                      <Text style={styles.buttonText}>Download Report</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </Modal>

          {/* Share Modal */}
          <Modal
            visible={showShareModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Share Lab Result</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Recipient Email"        placeholderTextColor="#7f8c8d"

                  value={shareEmail}
                  onChangeText={setShareEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowShareModal(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.submitButton]}
                    onPress={handleShareLabResult}
                  >
                    <Text style={styles.buttonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Date Picker Modal */}
          {showDatePicker && (
            <DateTimePicker  
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  // Update the appropriate date field based on context
                }
              }}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000'
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: 4
  },
  filterSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000'
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  dateFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateInput: {
    flex: 0.48,
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8
  },
  sortSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16
  },
  picker: {
    backgroundColor: '#F2F2F7',
    marginBottom: 12
  },
  resultsList: {
    padding: 16
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  labName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500'
  },
  resultDetails: {
    marginBottom: 8
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF'
  },
  resultDate: {
    color: '#8E8E93',
    marginTop: 4
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  actionButton: {
    padding: 8,
    marginLeft: 8
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    maxHeight: '90%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    textAlign: 'center'
  },
  textArea: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    height: 100,
    textAlignVertical: 'top'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  modalButton: {
    flex: 0.48,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#007AFF'
  },
  cancelButton: {
    backgroundColor: '#FF3B30'
  },
  downloadButton: {
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500'
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  fileButtonText: {
    marginLeft: 8,
    color: '#007AFF'
  },
  resultDetailSection: {
    marginBottom: 16
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4
  },
  detailValue: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 12
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8
  },
  loader: {
    marginTop: 20
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 20
  }
});

export default Labs;