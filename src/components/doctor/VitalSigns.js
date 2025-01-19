import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
  Modal,
  Platform
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { styles } from './VitalStyles';
import { renderVitalInputs } from './VitalInputs';

const VitalSigns = ({ patientId, navigation }) => {
  // State Management
  const [vitals, setVitals] = useState({
    temperature: '',
    heartRate: '',
    spO2: '',
    systolicBP: '',
    diastolicBP: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    bmi: '',
    bloodGlucose: '',
    painLevel: '',
  });
  
  const [additionalInfo, setAdditionalInfo] = useState({
    measurementContext: '',
    position: 'sitting',
    notes: '',
    timestamp: new Date(),
  });

  const [vitalHistory, setVitalHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [showTrendModal, setShowTrendModal] = useState(false);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  const [alerts, setAlerts] = useState([]);

  // Pass all required props to renderVitalInputs
  const renderVitalForm = () => renderVitalInputs({
    vitals,
    setVitals,
    additionalInfo,
    setAdditionalInfo,
    checkVitalRanges,
    handleSaveVitals,
    isLoading,
    styles
  });

  // Vital Signs Reference Ranges
  const vitalRanges = {
    temperature: { min: 36.5, max: 37.5, unit: '°C' },
    heartRate: { min: 60, max: 100, unit: 'bpm' },
    spO2: { min: 95, max: 100, unit: '%' },
    systolicBP: { min: 90, max: 140, unit: 'mmHg' },
    diastolicBP: { min: 60, max: 90, unit: 'mmHg' },
    respiratoryRate: { min: 12, max: 20, unit: 'breaths/min' },
    bloodGlucose: { min: 70, max: 140, unit: 'mg/dL' },
  };

  // Fetch vital history on component mount
  useEffect(() => {
    fetchVitalHistory();
  }, [patientId]);

  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    if (vitals.weight && vitals.height) {
      const heightInMeters = vitals.height / 100;
      const bmi = (vitals.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setVitals(prev => ({ ...prev, bmi }));
    }
  }, [vitals.weight, vitals.height]);

  // Fetch vital signs history
  const fetchVitalHistory = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`/api/vitals/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVitalHistory(response.data);
      analyzeVitalTrends(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch vital signs history');
    } finally {
      setIsLoading(false);
    }
  };

  // Check vital signs against normal ranges
  const checkVitalRanges = (vitalType, value) => {
    const range = vitalRanges[vitalType];
    if (!range) return 'normal';

    const numValue = parseFloat(value);
    if (numValue < range.min) return 'low';
    if (numValue > range.max) return 'high';
    return 'normal';
  };

  // Save vital signs
  const handleSaveVitals = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      
      // Validate vital signs
      const validationErrors = validateVitals();
      if (validationErrors.length > 0) {
        Alert.alert('Validation Error', validationErrors.join('\n'));
        return;
      }

      // Prepare vital signs data
      const vitalData = {
        ...vitals,
        ...additionalInfo,
        patientId,
        timestamp: additionalInfo.timestamp.toISOString(),
      };

      // Save to server
      await axios.post('/api/vitals', vitalData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state
      setVitalHistory(prev => [...prev, vitalData]);
      
      // Check for abnormal values and create alerts
      Object.entries(vitals).forEach(([key, value]) => {
        const status = checkVitalRanges(key, value);
        if (status !== 'normal') {
          createAlert(key, value, status);
        }
      });

      Alert.alert('Success', 'Vital signs saved successfully');
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to save vital signs');
    } finally {
      setIsLoading(false);
    }
  };

  // Create alert for abnormal values
  const createAlert = (vitalType, value, status) => {
    const alert = {
      id: Date.now(),
      type: vitalType,
      value,
      status,
      timestamp: new Date(),
      message: `${vitalType.toUpperCase()} is ${status} - ${value} ${vitalRanges[vitalType]?.unit || ''}`
    };
    setAlerts(prev => [...prev, alert]);
  };

  // Validate vital signs
  const validateVitals = () => {
    const errors = [];
    
    if (!vitals.temperature) errors.push('Temperature is required');
    if (!vitals.heartRate) errors.push('Heart rate is required');
    if (!vitals.spO2) errors.push('SpO2 is required');
    if (!vitals.systolicBP || !vitals.diastolicBP) errors.push('Blood pressure is required');
    if (!vitals.respiratoryRate) errors.push('Respiratory rate is required');

    return errors;
  };

  // Reset form
  const resetForm = () => {
    setVitals({
      temperature: '',
      heartRate: '',
      spO2: '',
      systolicBP: '',
      diastolicBP: '',
      respiratoryRate: '',
      weight: '',
      height: '',
      bmi: '',
      bloodGlucose: '',
      painLevel: '',
    });
    setAdditionalInfo({
      measurementContext: '',
      position: 'sitting',
      notes: '',
      timestamp: new Date(),
    });
  };

  // Render trend chart
  const renderTrendChart = () => {
    const data = vitalHistory.map(v => ({
      value: parseFloat(v[selectedMetric]),
      timestamp: new Date(v.timestamp)
    }));

    return (
      <LineChart
        data={{
          labels: data.map(d => d.timestamp.toLocaleDateString()),
          datasets: [{ data: data.map(d => d.value) }]
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 76, 84, ${opacity})`,
          style: { borderRadius: 16 }
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    );
  };



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vital Signs</Text>
        <TouchableOpacity 
          style={styles.trendButton}
          onPress={() => setShowTrendModal(true)}
        >
          <Ionicons name="stats-chart" size={24} color="#004C54" />
          <Text style={styles.trendButtonText}>View Trends</Text>
        </TouchableOpacity>
      </View>

      {renderVitalForm()}

      <Modal
        visible={showTrendModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTrendModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vital Signs Trends</Text>
              <TouchableOpacity 
                onPress={() => setShowTrendModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#004C54" />
              </TouchableOpacity>
            </View>
            {renderTrendChart()}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};



export default VitalSigns;