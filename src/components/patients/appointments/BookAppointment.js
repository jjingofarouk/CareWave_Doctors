import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import CustomSelect from '../../utils/CustomSelect';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const BookAppointment = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: 'Consultation',
    otherReason: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  // New state for enhanced features
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorInfo, setShowDoctorInfo] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);

  // New function to handle emergency toggle
  const toggleEmergency = () => {
    setIsEmergency(!isEmergency);
    if (!isEmergency) {
      Alert.alert(
        'Emergency Booking',
        'Emergency appointments have higher priority. Please only use for urgent medical needs.',
        [{ text: 'Understood' }]
      );
    }
  };

  const reasons = ['Consultation', 'Follow-Up', 'Emergency', 'Health Check-Up', 'Vaccination'];

  useEffect(() => {
    fetchAvailableDoctors();
  }, []);

  const fetchAvailableDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.4:3000/api/doctors/available');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data.doctors);
      } else {
        setMessage('Failed to fetch available doctors.');
      }
    } catch (error) {
      setMessage('An error occurred while fetching available doctors.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { doctorId, date, time, reason, otherReason } = formData;
    if (!doctorId || !date || !time || (!reason && !otherReason)) {
      setMessage('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
    setMessage('Booking appointment...');
    
    try {
      const response = await fetch('http://192.168.1.4:3000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Appointment booked successfully!');
        setFormData({
          doctorId: '',
          date: '',
          time: '',
          reason: 'Consultation',
          otherReason: '',
        });
        setMessage('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to book appointment.');
      }
    } catch (error) {
      setMessage('An error occurred while booking the appointment.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDateConfirm = (selectedDate) => {
    setFormData((prev) => ({ ...prev, date: selectedDate.toISOString().split('T')[0] }));
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    setFormData((prev) => ({ ...prev, time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
    setTimePickerVisibility(false);
  };
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#004C54', '#008B8B']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <Text style={styles.headerSubtitle}>Schedule your visit with our specialists</Text>
        </LinearGradient>

        {message && (
          <View style={styles.messageContainer}>
            <Text style={[styles.message, message.includes('error') && styles.errorMessage]}>
              {message}
            </Text>
          </View>
        )}

        <View style={styles.formContainer}>
          {/* Emergency Toggle */}
          <TouchableOpacity 
            style={[styles.emergencyToggle, isEmergency && styles.emergencyActive]}
            onPress={toggleEmergency}
          >
            <Icon name="ambulance" size={24} color={isEmergency ? '#fff' : '#004C54'} />
            <Text style={[styles.emergencyText, isEmergency && styles.emergencyActiveText]}>
              Emergency Appointment
            </Text>
          </TouchableOpacity>

          {/* Doctor Selection */}
          <View style={styles.inputWrapper}>
            <Icon name="doctor" size={24} color="#004C54" style={styles.inputIcon} />
            <CustomSelect
              selectedValue={formData.doctorId}
              onValueChange={(value) => {
                handleChange('doctorId', value);
                setSelectedDoctor(doctors.find(d => d.id === value));
                setShowDoctorInfo(true);
              }}
              options={doctors.map((doctor) => ({
                label: doctor.name,
                value: doctor.id,
              }))}
              placeholder="Select Doctor"
              style={styles.selectInput}
            />
          </View>

          {/* Doctor Info Card */}
          {showDoctorInfo && selectedDoctor && (
            <View style={styles.doctorCard}>
              <View style={styles.doctorHeader}>
                <Icon name="account-circle" size={40} color="#004C54" />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{selectedDoctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{selectedDoctor.specialty}</Text>
                </View>
              </View>
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorAvailability}>
                  Next Available: Today, 2:00 PM
                </Text>
                <TouchableOpacity style={styles.viewProfileButton}>
                  <Text style={styles.viewProfileText}>View Full Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Date and Time Selection */}
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity 
              style={styles.dateTimePicker}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Icon name="calendar" size={24} color="#004C54" />
              <Text style={styles.dateTimeText}>
                {formData.date || 'Select Date'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dateTimePicker}
              onPress={() => setTimePickerVisibility(true)}
            >
              <Icon name="clock" size={24} color="#004C54" />
              <Text style={styles.dateTimeText}>
                {formData.time || 'Select Time'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Reason Selection with Enhanced UI */}
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonTitle}>Reason for Visit</Text>
            <View style={styles.reasonGrid}>
              {reasons.map((reason) => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonButton,
                    formData.reason === reason && styles.reasonButtonActive
                  ]}
                  onPress={() => handleChange('reason', reason)}
                >
                  <Text style={[
                    styles.reasonButtonText,
                    formData.reason === reason && styles.reasonButtonTextActive
                  ]}>
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Other Reason Input */}
          <TextInput
            placeholder="Additional notes or specific concerns..."
            placeholderTextColor="#666"
            value={formData.otherReason}
            onChangeText={(value) => handleChange('otherReason', value)}
            style={styles.notesInput}
            multiline
            numberOfLines={3}
          />

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="check-circle" size={24} color="#fff" />
                <Text style={styles.submitButtonText}>Confirm Appointment</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('AppointmentHistory')}
          >
            <Icon name="history" size={24} color="#004C54" />
            <Text style={styles.quickActionText}>History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Rebook Appointment')}
          >
            <Icon name="refresh" size={24} color="#004C54" />
            <Text style={styles.quickActionText}>Rebook</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Available')}
          >
            <Icon name="calendar-check" size={24} color="#004C54" />
            <Text style={styles.quickActionText}>Available</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  formContainer: {
    padding: 20,
  },
  messageContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  message: {
    color: '#004C54',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#FF3B30',
  },
  emergencyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#004C54',
  },
  emergencyActive: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  emergencyText: {
    marginLeft: 10,
    color: '#004C54',
    fontWeight: '600',
  },
  emergencyActiveText: {
    color: '#fff',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorInfo: {
    marginLeft: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
  },
  doctorSpecialty: {
    color: '#666',
    fontSize: 14,
  },
  doctorDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  doctorAvailability: {
    color: '#004C54',
    fontSize: 14,
    marginBottom: 5,
  },
  viewProfileButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewProfileText: {
    color: '#004C54',
    fontSize: 14,
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateTimeText: {
    marginLeft: 10,
    color: '#004C54',
    fontSize: 16,
  },
  reasonContainer: {
    marginBottom: 20,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004C54',
    marginBottom: 10,
  },
  reasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  reasonButton: {
    width: (width - 60) / 2,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reasonButtonActive: {
    backgroundColor: '#004C54',
  },
  reasonButtonText: {
    color: '#004C54',
    fontSize: 14,
    fontWeight: '500',
  },
  reasonButtonTextActive: {
    color: '#fff',
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#004C54',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    color: '#004C54',
    marginTop: 5,
    fontSize: 12,
  },
});

export default BookAppointment;