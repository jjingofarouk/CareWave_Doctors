// VitalInputs.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

export const renderVitalInputs = ({ 
  vitals, 
  setVitals, 
  additionalInfo, 
  setAdditionalInfo, 
  checkVitalRanges,
  handleSaveVitals,
  isLoading,
  styles 
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.sectionTitle}>Basic Vital Signs</Text>
    
    <View style={styles.inputRow}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Temperature (°C)</Text>
        <TextInput
          style={[styles.input, checkVitalRanges('temperature', vitals.temperature) !== 'normal' && styles.alertInput]}
          value={vitals.temperature}
          onChangeText={val => setVitals(prev => ({ ...prev, temperature: val }))}
          keyboardType="numeric"
          placeholder="36.5-37.5"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Heart Rate (bpm)</Text>
        <TextInput
          style={[styles.input, checkVitalRanges('heartRate', vitals.heartRate) !== 'normal' && styles.alertInput]}
          value={vitals.heartRate}
          onChangeText={val => setVitals(prev => ({ ...prev, heartRate: val }))}
          keyboardType="numeric"
          placeholder="60-100"
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>

    <View style={styles.inputRow}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Blood Pressure (mmHg)</Text>
        <View style={styles.bpContainer}>
          <TextInput
            style={[styles.bpInput, checkVitalRanges('systolicBP', vitals.systolicBP) !== 'normal' && styles.alertInput]}
            value={vitals.systolicBP}
            onChangeText={val => setVitals(prev => ({ ...prev, systolicBP: val }))}
            keyboardType="numeric"
            placeholder="SYS"
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.bpSeparator}>/</Text>
          <TextInput
            style={[styles.bpInput, checkVitalRanges('diastolicBP', vitals.diastolicBP) !== 'normal' && styles.alertInput]}
            value={vitals.diastolicBP}
            onChangeText={val => setVitals(prev => ({ ...prev, diastolicBP: val }))}
            keyboardType="numeric"
            placeholder="DIA"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>SpO2 (%)</Text>
        <TextInput
          style={[styles.input, checkVitalRanges('spO2', vitals.spO2) !== 'normal' && styles.alertInput]}
          value={vitals.spO2}
          onChangeText={val => setVitals(prev => ({ ...prev, spO2: val }))}
          keyboardType="numeric"
          placeholder="95-100"
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>

    <View style={styles.inputRow}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Respiratory Rate</Text>
        <TextInput
          style={[styles.input, checkVitalRanges('respiratoryRate', vitals.respiratoryRate) !== 'normal' && styles.alertInput]}
          value={vitals.respiratoryRate}
          onChangeText={val => setVitals(prev => ({ ...prev, respiratoryRate: val }))}
          keyboardType="numeric"
          placeholder="12-20"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Blood Glucose (mg/dL)</Text>
        <TextInput
          style={[styles.input, checkVitalRanges('bloodGlucose', vitals.bloodGlucose) !== 'normal' && styles.alertInput]}
          value={vitals.bloodGlucose}
          onChangeText={val => setVitals(prev => ({ ...prev, bloodGlucose: val }))}
          keyboardType="numeric"
          placeholder="70-140"
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>

    {vitals.bmi && (
      <View style={styles.bmiContainer}>
        <Text style={styles.bmiLabel}>BMI:</Text>
        <Text style={styles.bmiValue}>{vitals.bmi}</Text>
      </View>
    )}

    <View style={styles.notesContainer}>
      <Text style={styles.label}>Clinical Notes</Text>
      <TextInput
        style={styles.notesInput}
        value={additionalInfo.notes}
        onChangeText={val => setAdditionalInfo(prev => ({ ...prev, notes: val }))}
        multiline
        numberOfLines={4}
        placeholder="Add any relevant notes or observations"
        placeholderTextColor="#9CA3AF"
      />
    </View>

    <TouchableOpacity 
      style={styles.saveButton} 
      onPress={handleSaveVitals}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.saveButtonText}>Save Vital Signs</Text>
      )}
    </TouchableOpacity>
  </View>
);