import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import CustomSelect from '../../utils/CustomSelect';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
// Replace with your backend IP address and port
const BACKEND_IP = 'http://<your-ip>:5000';

const ReBookAppointment = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [formData, setFormData] = useState({
    new_date: new Date(),
    new_time: new Date(),
    new_reason: '',
    new_appointment_type: '',
    new_communication_method: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_IP}/appointments/${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        Alert.alert('Error', 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      Alert.alert('Error', 'Unable to fetch appointments. Check your network.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !selectedAppointment ||
      !formData.new_date ||
      !formData.new_time ||
      !formData.new_reason ||
      !formData.new_appointment_type ||
      !formData.new_communication_method
    ) {
      Alert.alert('Validation Error', 'Please fill all the fields to proceed.');
      return;
    }
    setShowModal(true);
  };

  const confirmRebook = async () => {
    setLoading(true);
    setShowModal(false);
    try {
      const response = await fetch(`${BACKEND_IP}/appointments/rebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId: selectedAppointment,
          newDate: formData.new_date.toISOString().split('T')[0],
          newTime: formData.new_time.toISOString().split('T')[1].substring(0, 8),
          newReason: formData.new_reason,
          newType: formData.new_appointment_type,
          newMethod: formData.new_communication_method,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message);
        fetchAppointments(); // Refresh appointments list
        resetForm();
      } else {
        Alert.alert('Error', result.message || 'Failed to rebook appointment.');
      }
    } catch (error) {
      console.error('Error rebooking appointment:', error);
      Alert.alert('Error', 'Unable to rebook the appointment.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedAppointment('');
    setFormData({
      new_date: new Date(),
      new_time: new Date(),
      new_reason: '',
      new_appointment_type: '',
      new_communication_method: '',
    });
  };

  const appointmentOptions = appointments.map((appointment) => ({
    label: `ID: ${appointment.id}, Date: ${new Date(
      appointment.date
    ).toLocaleDateString()}, Time: ${appointment.time}`,
    value: appointment.id,
  }));

  const reasonOptions = [
    { label: 'Schedule Conflict', value: 'Schedule Conflict' },
    { label: 'Personal Reasons', value: 'Personal Reasons' },
    { label: 'Doctor Availability', value: 'Doctor Availability' },
    { label: 'Other', value: 'Other' },
  ];

  const appointmentTypeOptions = [
    { label: 'In-Person', value: 'In-Person' },
    { label: 'Telehealth', value: 'Telehealth' },
  ];

  const communicationMethodOptions = [
    { label: 'Chat', value: 'Chat' },
    { label: 'Video', value: 'Video' },
    { label: 'Phone Call', value: 'Phone Call' },
  ];

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('new_date', selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      handleChange('new_time', selectedTime);
    }
  };

  const renderAppointmentCard = (appointment) => (
    <TouchableOpacity 
      style={[
        styles.appointmentCard,
        selectedAppointment === appointment.id && styles.selectedCard
      ]}
      onPress={() => setSelectedAppointment(appointment.id)}
    >
      <View style={styles.appointmentHeader}>
        <Icon 
          name={appointment.type === 'Telehealth' ? 'video' : 'hospital-building'} 
          size={24} 
          color="#004C54" 
        />
        <Text style={styles.appointmentId}>#{appointment.id}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentDate}>
          {new Date(appointment.date).toLocaleDateString()}
        </Text>
        <Text style={styles.appointmentTime}>{appointment.time}</Text>
      </View>
      <View style={styles.appointmentFooter}>
        <Text style={styles.appointmentType}>{appointment.type}</Text>
        {selectedAppointment === appointment.id && (
          <Icon name="check-circle" size={20} color="#4CAF50" />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStepIndicator = () => {
    const steps = ['Select', 'Details', 'Confirm'];
    const currentStep = !selectedAppointment ? 0 : 
                       (!formData.new_date || !formData.new_time) ? 1 : 2;
                       return (
                        <View style={styles.stepIndicator}>
                          {steps.map((step, index) => (
                            <React.Fragment key={step}>
                              <View style={styles.stepItem}>
                                <View style={[
                                  styles.stepCircle,
                                  index <= currentStep && styles.activeStep
                                ]}>
                                  <Text style={[
                                    styles.stepNumber,
                                    index <= currentStep && styles.activeStepText
                                  ]}>{index + 1}</Text>
                                </View>
                                <Text style={styles.stepLabel}>{step}</Text>
                              </View>
                              {index < steps.length - 1 && (
                                <View style={[
                                  styles.stepLine,
                                  index < currentStep && styles.activeStepLine
                                ]} />
                              )}
                            </React.Fragment>
                          ))}
                        </View>
                      );
                    };
                  
                    return (
                      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                        <LinearGradient
                          colors={['#004C54', '#008B8B']}
                          style={styles.header}
                        >
                          <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                          >
                            <Icon name="arrow-left" size={24} color="#fff" />
                          </TouchableOpacity>
                          <Text style={styles.headerTitle}>Reschedule Appointment</Text>
                          <Text style={styles.headerSubtitle}>Update your appointment details</Text>
                        </LinearGradient>
                  
                        {renderStepIndicator()}
                  
                        {loading ? (
                          <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#004C54" />
                            <Text style={styles.loadingText}>Loading appointments...</Text>
                          </View>
                        ) : (
                          <>
                            <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Select Appointment</Text>
                              <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                style={styles.appointmentsList}
                              >
                                {appointments.map(appointment => renderAppointmentCard(appointment))}
                              </ScrollView>
                            </View>
                  
                            {selectedAppointment && (
                              <View style={styles.formSection}>
                                <Text style={styles.sectionTitle}>New Details</Text>
                                
                                <View style={styles.dateTimeContainer}>
                                  <TouchableOpacity
                                    style={styles.dateTimePicker}
                                    onPress={() => setShowDatePicker(true)}
                                  >
                                    <Icon name="calendar" size={24} color="#004C54" />
                                    <Text style={styles.dateTimeText}>
                                      {formData.new_date.toLocaleDateString()}
                                    </Text>
                                  </TouchableOpacity>
                  
                                  <TouchableOpacity
                                    style={styles.dateTimePicker}
                                    onPress={() => setShowTimePicker(true)}
                                  >
                                    <Icon name="clock-outline" size={24} color="#004C54" />
                                    <Text style={styles.dateTimeText}>
                                      {formData.new_time.toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit'
                                      })}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                  
                                <View style={styles.optionsGrid}>
                                  {appointmentTypeOptions.map(option => (
                                    <TouchableOpacity
                                      key={option.value}
                                      style={[
                                        styles.optionCard,
                                        formData.new_appointment_type === option.value && 
                                        styles.selectedOption
                                      ]}
                                      onPress={() => handleChange('new_appointment_type', option.value)}
                                    >
                                      <Icon 
                                        name={option.value === 'Telehealth' ? 'video' : 'hospital'} 
                                        size={24}
                                        color={formData.new_appointment_type === option.value ? 
                                          '#fff' : '#004C54'}
                                      />
                                      <Text style={[
                                        styles.optionText,
                                        formData.new_appointment_type === option.value &&
                                        styles.selectedOptionText
                                      ]}>{option.label}</Text>
                                    </TouchableOpacity>
                                  ))}
                                </View>
                  
                                <View style={styles.reasonSection}>
                                  <Text style={styles.inputLabel}>Reason for Rescheduling</Text>
                                  <CustomSelect
                                    selectedValue={formData.new_reason}
                                    onValueChange={(value) => handleChange('new_reason', value)}
                                    options={reasonOptions}
                                    containerStyle={styles.selectContainer}
                                  />
                                </View>
                  
                                {formData.new_appointment_type === 'Telehealth' && (
                                  <View style={styles.communicationSection}>
                                    <Text style={styles.inputLabel}>Communication Preference</Text>
                                    <View style={styles.communicationOptions}>
                                      {communicationMethodOptions.map(method => (
                                        <TouchableOpacity
                                          key={method.value}
                                          style={[
                                            styles.communicationOption,
                                            formData.new_communication_method === method.value &&
                                            styles.selectedCommunication
                                          ]}
                                          onPress={() => handleChange('new_communication_method', method.value)}
                                        >
                                          <Icon 
                                            name={
                                              method.value === 'Chat' ? 'chat' :
                                              method.value === 'Video' ? 'video' : 'phone'
                                            }
                                            size={20}
                                            color={formData.new_communication_method === method.value ?
                                              '#fff' : '#004C54'}
                                          />
                                          <Text style={[
                                            styles.communicationText,
                                            formData.new_communication_method === method.value &&
                                            styles.selectedCommunicationText
                                          ]}>{method.label}</Text>
                                        </TouchableOpacity>
                                      ))}
                                    </View>
                                  </View>
                                )}
                  
                                <TouchableOpacity
                                  style={styles.submitButton}
                                  onPress={handleSubmit}
                                  disabled={loading}
                                >
                                  <Icon name="calendar-check" size={24} color="#fff" />
                                  <Text style={styles.submitButtonText}>
                                    Confirm Rescheduling
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          </>
                        )}
                  
                        <Modal
                          visible={showModal}
                          transparent
                          animationType="slide"
                        >
                          <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                              <View style={styles.modalHeader}>
                                <Icon name="calendar-check" size={40} color="#004C54" />
                                <Text style={styles.modalTitle}>Confirm New Appointment</Text>
                              </View>
                  
                              <View style={styles.modalDetails}>
                                <View style={styles.modalDetailItem}>
                                  <Icon name="calendar" size={20} color="#666" />
                                  <Text style={styles.modalDetailText}>
                                    {formData.new_date.toLocaleDateString()}
                                  </Text>
                                </View>
                  
                                <View style={styles.modalDetailItem}>
                                  <Icon name="clock-outline" size={20} color="#666" />
                                  <Text style={styles.modalDetailText}>
                                    {formData.new_time.toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </Text>
                                </View>
                  
                                <View style={styles.modalDetailItem}>
                                  <Icon name="information" size={20} color="#666" />
                                  <Text style={styles.modalDetailText}>
                                    {formData.new_reason}
                                  </Text>
                                </View>
                  
                                <View style={styles.modalDetailItem}>
                                  <Icon 
                                    name={formData.new_appointment_type === 'Telehealth' ? 
                                      'video' : 'hospital-building'} 
                                    size={20} 
                                    color="#666" 
                                  />
                                  <Text style={styles.modalDetailText}>
                                    {formData.new_appointment_type}
                                  </Text>
                                </View>
                              </View>
                  
                              <View style={styles.modalActions}>
                                <TouchableOpacity
                                  style={[styles.modalButton, styles.cancelButton]}
                                  onPress={() => setShowModal(false)}
                                >
                                  <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={[styles.modalButton, styles.confirmButton]}
                                  onPress={confirmRebook}
                                >
                                  <Text style={styles.confirmButtonText}>Confirm</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </ScrollView>
                    );
                  };
                  
                  const styles = StyleSheet.create({
                    container: {
                      flex: 1,
                      backgroundColor: '#F5F7FA',
                    },
                    header: {
                      padding: 20,
                      paddingTop: Platform.OS === 'ios' ? 60 : 40,
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                    },
                    backButton: {
                      position: 'absolute',
                      top: Platform.OS === 'ios' ? 60 : 40,
                      left: 20,
                      zIndex: 1,
                    },
                    headerTitle: {
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: '#fff',
                      marginBottom: 8,
                    },
                    headerSubtitle: {
                      fontSize: 16,
                      color: '#fff',
                      opacity: 0.8,
                    },
                    stepIndicator: {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                      backgroundColor: '#fff',
                      marginBottom: 20,
                    },
                    stepItem: {
                      alignItems: 'center',
                    },
                    stepCircle: {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: '#E0E0E0',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    },
                    activeStep: {
                      backgroundColor: '#004C54',
                    },
                    stepNumber: {
                      color: '#666',
                      fontWeight: 'bold',
                    },
                    activeStepText: {
                      color: '#fff',
                    },
                    stepLabel: {
                      fontSize: 12,
                      color: '#666',
                    },
                    stepLine: {
                      width: 40,
                      height: 2,
                      backgroundColor: '#E0E0E0',
                      marginHorizontal: 10,
                    },
                    activeStepLine: {
                      backgroundColor: '#004C54',
                    },
                    section: {
                      padding: 20,
                    },
                    sectionTitle: {
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#004C54',
                      marginBottom: 15,
                    },
                    appointmentsList: {
                      flexGrow: 0,
                    },
                    appointmentCard: {
                      width: width * 0.7,
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      padding: 15,
                      marginRight: 15,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    },
                    selectedCard: {
                      borderColor: '#004C54',
                      borderWidth: 2,
                    },
                    appointmentHeader: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 10,
                    },
                    appointmentId: {
                      fontSize: 16,
                      color: '#666',
                    },
                    appointmentDetails: {
                      marginBottom: 10,
                    },
                    appointmentDate: {
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#004C54',
                    },
                    appointmentTime: {
                      fontSize: 16,
                      color: '#666',
                    },
                    appointmentFooter: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                    appointmentType: {
                      fontSize: 14,
                      color: '#004C54',
                      fontWeight: '500',
                    },
                    formSection: {
                      padding: 20,
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      margin: 20,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    },
                    dateTimeContainer: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    },
                    dateTimePicker: {
                      flex: 0.48,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#F5F7FA',
                      padding: 15,
                      borderRadius: 10,
                    },dateTimeText: {
                      marginLeft: 10,
                      fontSize: 16,
                      color: '#004C54',
                    },
                    optionsGrid: {
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginBottom: 20,
                      marginHorizontal: -5,
                    },
                    optionCard: {
                      width: (width - 80) / 2,
                      margin: 5,
                      padding: 15,
                      backgroundColor: '#F5F7FA',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    },
                    selectedOption: {
                      backgroundColor: '#004C54',
                    },
                    optionText: {
                      marginLeft: 10,
                      color: '#004C54',
                      fontSize: 16,
                      fontWeight: '500',
                    },
                    selectedOptionText: {
                      color: '#fff',
                    },
                    reasonSection: {
                      marginBottom: 20,
                    },
                    inputLabel: {
                      fontSize: 16,
                      color: '#004C54',
                      marginBottom: 10,
                      fontWeight: '500',
                    },
                    selectContainer: {
                      backgroundColor: '#F5F7FA',
                      borderRadius: 10,
                      paddingHorizontal: 15,
                    },
                    communicationSection: {
                      marginBottom: 20,
                    },
                    communicationOptions: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    communicationOption: {
                      flex: 0.3,
                      padding: 10,
                      backgroundColor: '#F5F7FA',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    selectedCommunication: {
                      backgroundColor: '#004C54',
                    },
                    communicationText: {
                      marginTop: 5,
                      fontSize: 12,
                      color: '#004C54',
                      textAlign: 'center',
                    },
                    selectedCommunicationText: {
                      color: '#fff',
                    },
                    submitButton: {
                      backgroundColor: '#004C54',
                      borderRadius: 10,
                      padding: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                    },
                    submitButtonText: {
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '600',
                      marginLeft: 10,
                    },
                    modalOverlay: {
                      flex: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    modalContent: {
                      backgroundColor: '#fff',
                      borderRadius: 20,
                      padding: 20,
                      width: width - 40,
                      maxHeight: '80%',
                    },
                    modalHeader: {
                      alignItems: 'center',
                      marginBottom: 20,
                    },
                    modalTitle: {
                      fontSize: 24,
                      fontWeight: '600',
                      color: '#004C54',
                      marginTop: 10,
                    },
                    modalDetails: {
                      marginBottom: 20,
                    },
                    modalDetailItem: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      backgroundColor: '#F5F7FA',
                      borderRadius: 10,
                      marginBottom: 10,
                    },
                    modalDetailText: {
                      marginLeft: 10,
                      fontSize: 16,
                      color: '#333',
                    },
                    modalActions: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                    modalButton: {
                      flex: 0.48,
                      padding: 15,
                      borderRadius: 10,
                      alignItems: 'center',
                    },
                    cancelButton: {
                      backgroundColor: '#F5F7FA',
                    },
                    confirmButton: {
                      backgroundColor: '#004C54',
                    },
                    cancelButtonText: {
                      color: '#004C54',
                      fontSize: 16,
                      fontWeight: '600',
                    },
                    confirmButtonText: {
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: '600',
                    },
                    loadingContainer: {
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                    },
                    loadingText: {
                      marginTop: 10,
                      color: '#004C54',
                      fontSize: 16,
                    },
                });
                
                export default ReBookAppointment;