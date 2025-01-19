import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Switch,
  KeyboardAvoidingView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  RESCHEDULED: 'rescheduled', // New status
  NO_SHOW: 'no_show' // New status
};

const APPOINTMENT_TYPES = {
  REGULAR: 'regular',
  EMERGENCY: 'emergency',
  FOLLOW_UP: 'follow_up',
  CONSULTATION: 'consultation',
  PROCEDURE: 'procedure'
};

const STATUS_COLORS = {
  pending: '#FFA500',
  confirmed: '#4CAF50',
  cancelled: '#F44336',
  completed: '#9E9E9E',
  rescheduled: '#2196F3',
  no_show: '#9C27B0'
};

const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

const Appointments = () => {
  // Existing states
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Start the refreshing animation

    // Simulate a data fetch or some async operation
    setTimeout(() => {
      setRefreshing(false); // End the refreshing animation
    }, 2000); // Delay of 2 seconds
  }, []);

  const [viewMode, setViewMode] = useState('day');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statistics, setStatistics] = useState({
    todayCount: 0,
    pendingCount: 0,
    weeklyCount: 0,
    cancelledCount: 0
  });

  // New states
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    status: null,
    type: null,
    priority: null
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [workingHours, setWorkingHours] = useState({
    start: '09:00',
    end: '17:00',
    breakStart: '13:00',
    breakEnd: '14:00'
  });
  const [notifications, setNotifications] = useState([]);
  const [showConflictAlert, setShowConflictAlert] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    reason: '',
    type: APPOINTMENT_TYPES.REGULAR,
    priority: PRIORITY_LEVELS.MEDIUM,
    duration: 30,
    notes: '',
    date: '',
    time: ''
  });

  // Refs for optimization
  const appointmentsRef = useRef(appointments);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    appointmentsRef.current = appointments;
  }, [appointments]);

  // New function to handle time slot conflicts
  const checkTimeSlotConflict = useCallback((date, time, duration) => {
    const appointmentsOnDate = appointmentsRef.current.filter(
      app => app.date === date
    );
    
    const newAppStart = new Date(`${date}T${time}`);
    const newAppEnd = new Date(newAppStart.getTime() + duration * 60000);

    return appointmentsOnDate.some(app => {
      const existingStart = new Date(`${app.date}T${app.time}`);
      const existingEnd = new Date(existingStart.getTime() + app.duration * 60000);

      return (
        (newAppStart >= existingStart && newAppStart < existingEnd) ||
        (newAppEnd > existingStart && newAppEnd <= existingEnd)
      );
    });
  }, []);

  const getMarkedDates = () => {
    return {
      "2024-12-23": { selected: true, marked: true, selectedColor: '#27C7B8' }, // Example of a selected and marked date
      "2024-12-24": { marked: true, dotColor: '#F78837' }, // Example of a date with a dot
      "2024-12-25": { marked: true, dotColor: '#4CAF50', activeOpacity: 0.5 }, // Another example
    };
  };
  
  const renderAppointmentCard = (appointment) => (
    <View key={appointment.id} style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{appointment.patientName}</Text>
      <Text style={styles.cardDetails}>Date: {appointment.date}</Text>
      <Text style={styles.cardDetails}>Time: {appointment.time}</Text>
      <Text style={styles.cardDetails}>Doctor: {appointment.doctorName}</Text>
  
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => handleAppointmentPress(appointment)}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
  
  // Enhanced fetch appointments with search and filters
  const fetchAppointments = async (searchParams = {}) => {
    setLoading(true);
    try {
      // Simulate API call with search and filters
      const data = [
        {
          id: 1,
          date: '2024-12-25',
          time: '10:00',
          duration: 30,
          type: APPOINTMENT_TYPES.REGULAR,
          reason: 'Consultation',
          patient: 'John Doe',
          status: APPOINTMENT_STATUS.PENDING,
          patientDetails: {
            age: 45,
            lastVisit: '2024-11-15',
            medicalHistory: ['Hypertension', 'Diabetes'],
            insuranceProvider: 'BlueCross',
            contactNumber: '+1234567890',
            email: 'john.doe@email.com',
            emergencyContact: {
              name: 'Jane Doe',
              relation: 'Spouse',
              phone: '+1987654321'
            },
            allergies: ['Penicillin'],
            medications: ['Metformin', 'Lisinopril']
          },
          notes: '',
          priority: PRIORITY_LEVELS.MEDIUM,
          reminderSent: false,
          paymentStatus: 'pending',
          attachments: []
        },
        // Add more mock appointments here
      ];

      // Apply search and filters
      let filteredData = data;
      if (searchParams.query) {
        filteredData = filteredData.filter(app =>
          app.patient.toLowerCase().includes(searchParams.query.toLowerCase()) ||
          app.reason.toLowerCase().includes(searchParams.query.toLowerCase())
        );
      }

      if (searchParams.filters) {
        const { status, type, priority } = searchParams.filters;
        if (status) {
          filteredData = filteredData.filter(app => app.status === status);
        }
        if (type) {
          filteredData = filteredData.filter(app => app.type === type);
        }
        if (priority) {
          filteredData = filteredData.filter(app => app.priority === priority);
        }
      }

      setAppointments(filteredData);
      updateStatistics(filteredData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      Alert.alert('Error', 'Failed to fetch appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // New function to handle appointment creation
  const handleCreateAppointment = async () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const hasConflict = checkTimeSlotConflict(
      newAppointment.date,
      newAppointment.time,
      newAppointment.duration
    );

    if (hasConflict) {
      setShowConflictAlert(true);
      return;
    }

    try {
      // Simulate API call
      const newApp = {
        id: Date.now(),
        ...newAppointment,
        status: APPOINTMENT_STATUS.PENDING,
        createdAt: new Date().toISOString()
      };

      setAppointments(prev => [...prev, newApp]);
      setShowNewAppointmentModal(false);
      setNewAppointment({
        patientName: '',
        reason: '',
        type: APPOINTMENT_TYPES.REGULAR,
        priority: PRIORITY_LEVELS.MEDIUM,
        duration: 30,
        notes: '',
        date: '',
        time: ''
      });

      // Schedule reminder
      scheduleReminder(newApp);
    } catch (error) {
      console.error('Error creating appointment:', error);
      Alert.alert('Error', 'Failed to create appointment. Please try again.');
    }
  };

  // New function to handle reminders
  const scheduleReminder = (appointment) => {
    // Simulate scheduling a reminder
    const reminder = {
      id: Date.now(),
      appointmentId: appointment.id,
      type: 'appointment',
      message: `Reminder: Appointment with ${appointment.patientName} at ${appointment.time}`,
      scheduledFor: new Date(`${appointment.date}T${appointment.time}`).getTime() - 30 * 60000 // 30 minutes before
    };

    setNotifications(prev => [...prev, reminder]);
  };

  // New Modal Components
  const NewAppointmentModal = () => (
    <Modal
      visible={showNewAppointmentModal}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New Appointment</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Patient Name"
            value={newAppointment.patientName}
            onChangeText={(text) => setNewAppointment(prev => ({...prev, patientName: text}))}
          />

          <TextInput
            style={styles.input}
            placeholder="Reason for Visit"
            value={newAppointment.reason}
            onChangeText={(text) => setNewAppointment(prev => ({...prev, reason: text}))}
          />

          <View style={styles.rowContainer}>
            <Text>Appointment Type:</Text>
            <FlatList
              horizontal
              data={Object.values(APPOINTMENT_TYPES)}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newAppointment.type === item && styles.selectedTypeButton
                  ]}
                  onPress={() => setNewAppointment(prev => ({...prev, type: item}))}
                >
                  <Text style={styles.typeButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>

          <View style={styles.rowContainer}>
            <Text>Priority:</Text>
            <FlatList
              horizontal
              data={Object.values(PRIORITY_LEVELS)}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.priorityButton,
                    newAppointment.priority === item && styles.selectedPriorityButton
                  ]}
                  onPress={() => setNewAppointment(prev => ({...prev, priority: item}))}
                >
                  <Text style={styles.priorityButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Duration (minutes)"
            keyboardType="numeric"
            value={String(newAppointment.duration)}
            onChangeText={(text) => setNewAppointment(prev => ({...prev, duration: parseInt(text) || 30}))}
          />

          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Notes"
            multiline
            value={newAppointment.notes}
            onChangeText={(text) => setNewAppointment(prev => ({...prev, notes: text}))}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowNewAppointmentModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleCreateAppointment}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  const PatientDetailsModal = () => (
    <Modal
      visible={showPatientDetailsModal && selectedAppointment !== null}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Patient Details</Text>
  
          {selectedAppointment?.patientDetails && (
            <ScrollView>
              <View style={styles.detailsSection}>
                <Text style={styles.detailsLabel}>Name:</Text>
                <Text style={styles.detailsText}>{selectedAppointment.patient}</Text>
  
                <Text style={styles.detailsLabel}>Age:</Text>
                <Text style={styles.detailsText}>
                  {selectedAppointment.patientDetails.age}
                </Text>
  
                <Text style={styles.detailsLabel}>Contact:</Text>
                <Text style={styles.detailsText}>
                  {selectedAppointment.patientDetails.contactNumber}
                </Text>
                <Text style={styles.detailsText}>
                  {selectedAppointment.patientDetails.email}
                </Text>
  
                <Text style={styles.detailsLabel}>Medical History:</Text>
                {selectedAppointment.patientDetails.medicalHistory.map((condition, index) => (
                  <Text key={index} style={styles.detailsText}>
                    • {condition}
                  </Text>
                ))}
  
                <Text style={styles.detailsLabel}>Allergies:</Text>
                {selectedAppointment.patientDetails.allergies.map((allergy, index) => (
                  <Text key={index} style={styles.detailsText}>
                    • {allergy}
                  </Text>
                ))}
  
                <Text style={styles.detailsLabel}>Current Medications:</Text>
                {selectedAppointment.patientDetails.medications.map((medication, index) => (
                  <Text key={index} style={styles.detailsText}>
                    • {medication}
                  </Text>
                ))}
  
                <Text style={styles.detailsLabel}>Insurance:</Text>
                <Text style={styles.detailsText}>
                  {selectedAppointment.patientDetails.insuranceProvider}
                </Text>
  
                <Text style={styles.detailsLabel}>Emergency Contact:</Text>
                <Text style={styles.detailsText}>
                  {selectedAppointment.patientDetails.emergencyContact.name} (
                  {selectedAppointment.patientDetails.emergencyContact.relation})
                </Text>
                <Text style={styles.detailsText}>
                  {selectedAppointment.patientDetails.emergencyContact.phone}
                </Text>
              </View>
            </ScrollView>
          )}
  
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={() => setShowPatientDetailsModal(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  const renderStatisticsBar = () => {
    return (
      <View style={styles.statisticsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Appointments</Text>
          <Text style={styles.statValue}>15</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statValue}>5</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statValue}>10</Text>
        </View>
      </View>
    );
  };
  

  const FilterModal = () => (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Appointments</Text>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Status</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.values(APPOINTMENT_STATUS).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.filterChip,
                    filterOptions.status === status && styles.filterChipSelected,
                    { backgroundColor: filterOptions.status === status ? STATUS_COLORS[status] : '#fff' }
                  ]}
                  onPress={() => setFilterOptions(prev => ({
                    ...prev,
                    status: prev.status === status ? null : status
                  }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filterOptions.status === status && styles.filterChipTextSelected
                  ]}>{status}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.values(APPOINTMENT_TYPES).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterChip,
                    filterOptions.type === type && styles.filterChipSelected
                  ]}
                  onPress={() => setFilterOptions(prev => ({
                    ...prev,
                    type: prev.type === type ? null : type
                  }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filterOptions.type === type && styles.filterChipTextSelected
                  ]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Priority</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Object.values(PRIORITY_LEVELS).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.filterChip,
                    filterOptions.priority === priority && styles.filterChipSelected
                  ]}
                  onPress={() => setFilterOptions(prev => ({
                    ...prev,
                    priority: prev.priority === priority ? null : priority
                  }))}
                >
                  <Text style={[
                    styles.filterChipText,
                    filterOptions.priority === priority && styles.filterChipTextSelected
                  ]}>{priority}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => setFilterOptions({
                status: null,
                type: null,
                priority: null
              })}
            >
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={() => {
                fetchAppointments({ filters: filterOptions });
                setShowFilterModal(false);
              }}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Enhanced main return with new features
  return (
    <>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Appointments</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => setViewMode(viewMode === 'day' ? 'week' : 'day')}>
              <Ionicons name={viewMode === 'day' ? 'calendar-outline' : 'calendar'} size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilterModal(true)}>
              <Ionicons name="filter" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowNewAppointmentModal(true)}>
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients or appointments..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
              }
              searchTimeoutRef.current = setTimeout(() => {
                fetchAppointments({ query: text, filters: filterOptions });
              }, 500);
            }}
          />
        </View>

        {renderStatisticsBar()}

        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={getMarkedDates()}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            monthFormat={'MMMM yyyy'}
            theme={{
              todayTextColor: '#004C54',
              selectedDayBackgroundColor: '#004C54',
              dotColor: '#004C54'
            }}
            style={styles.calendar}
          />
        </View>

        <View style={styles.appointmentsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#004C54" />
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              {appointments
                .filter(app => app.date === selectedDate)
                .map(renderAppointmentCard)}
            </>
          )}
        </View>

        <View style={styles.quickActionsBar}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setShowNewAppointmentModal(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#004C54" />
            <Text style={styles.quickActionText}>New Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="time-outline" size={24} color="#004C54" />
            <Text style={styles.quickActionText}>Block Time</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="stats-chart-outline" size={24} color="#004C54" />
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NewAppointmentModal />
      <PatientDetailsModal />
      <FilterModal />
    </>
  );
};

// Additional styles for new components
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#004C54',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  filterButton: {
    padding: 8,
  },

  // Statistics styles
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },

  // Calendar styles
  calendarContainer: {
    marginTop: 20,
    padding: 15,
  },
  calendar: {
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Section header styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
  },
  seeAllText: {
    color: '#004C54',
    fontSize: 14,
  },

  // Appointment card styles
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C54',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  patientInfo: {
    marginBottom: 10,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  appointmentReason: {
    fontSize: 14,
    color: '#666',
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  actionButton: {
    padding: 5,
  },

  // Quick actions bar styles
  quickActionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#004C54',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },

  // Form input styles
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  rowContainer: {
    marginBottom: 15,
  },

  // Button styles
  typeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedTypeButton: {
    backgroundColor: '#004C54',
  },
  typeButtonText: {
    color: '#333',
  },
  priorityButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedPriorityButton: {
    backgroundColor: '#004C54',
  },
  priorityButtonText: {
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  createButton: {
    backgroundColor: '#4CAF50',
  },
  closeButton: {
    backgroundColor: '#004C54',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Details section styles
  detailsSection: {
    marginBottom: 20,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C54',
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginTop: 5,
  },

  // Search styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  statisticsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  // Filter styles
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 10,
  },
  filterChip: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipSelected: {
    backgroundColor: '#004C54',
    borderColor: '#004C54',
  },
  filterChipText: {
    color: '#333',
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#666',
  },
  applyButton: {
    backgroundColor: '#004C54',
  },

  // Appointment container styles
  appointmentsContainer: {
    flex: 1,
    padding: 10,
  },

  // ... existing styles ...
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  rowContainer: {
    marginBottom: 15,
  },
  typeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedTypeButton: {
    backgroundColor: '#004C54',
  },
  typeButtonText: {
    color: '#333',
  },
  priorityButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedPriorityButton: {
    backgroundColor: '#004C54',
  },
  priorityButtonText: {
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  createButton: {
    backgroundColor: '#4CAF50',
  },
  closeButton: {
    backgroundColor: '#004C54',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C54',
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 10,
  },
  filterChip: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipSelected: {
    backgroundColor: '#004C54',
    borderColor: '#004C54',
  },
  filterChipText: {
    color: '#333',
  },
  filterChipTextSelected: {
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#666',
  },
  applyButton: {
    backgroundColor: '#004C54',
  }
});

export default Appointments;