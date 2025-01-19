import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const OperationalSection = ({ operational, setOperational }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      setOperational({ 
        ...operational, 
        appointmentTime: timeString,
        showTimePicker: false 
      });
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="doctor" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Provider Name"
          placeholderTextColor="#9CA3AF"
          value={operational.providerName}
          onChangeText={(text) => setOperational({ ...operational, providerName: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="clock-outline" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Service Duration (minutes)"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={operational.duration}
          onChangeText={(text) => setOperational({ ...operational, duration: text })}
        />
      </View>

      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <MaterialCommunityIcons name="clock" size={20} color="#6B7280" style={styles.icon} />
        <Text style={styles.timeButtonText}>
          {operational.appointmentTime || 'Select Appointment Time'}
        </Text>
      </TouchableOpacity>

      {(showTimePicker || (Platform.OS === 'ios' && operational.showTimePicker)) && (
        <View style={styles.timePickerContainer}>
          <DateTimePicker
            value={operational.appointmentTime ? new Date(`2024-01-01 ${operational.appointmentTime}`) : new Date()}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
            style={styles.timePicker}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#374151',
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  timePickerContainer: {
    backgroundColor: '#002432',
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  timePicker: {
    height: 200,
    backgroundColor: '#002432',
  },
});

export default OperationalSection;