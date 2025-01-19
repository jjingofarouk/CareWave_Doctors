import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Enhanced mock APIs with more realistic responses
const mockAPI = (response, delay = 1000) => 
  new Promise(resolve => setTimeout(() => resolve(response), delay));

const fetchSurgePrediction = () => mockAPI({ prediction: "High", expectedDuration: "Next 4 hours", patientInflux: 30 });
const getAmbulanceETA = () => mockAPI({ eta: 5, trafficConditions: "Heavy", patientCondition: "Critical" });
const verifyDocuments = () => mockAPI({ verified: true, missingDocuments: [], expirationDate: "2025-12-31" });
const fetchPatientHistory = () => mockAPI({
  previousVisits: 3,
  lastVisitDate: "2023-11-15",
  chronicConditions: ["Diabetes", "Hypertension"],
  allergies: ["Penicillin"]
});
const getStaffAvailability = () => mockAPI({
  doctors: { available: 5, total: 8 },
  nurses: { available: 12, total: 15 },
  specialists: { available: 3, total: 4 }
});
const predictResourceNeeds = () => mockAPI({
  beds: { needed: 25, available: 30 },
  ventilators: { needed: 5, available: 8 },
  icu: { needed: 3, available: 4 }
});

const SmartAdmissions = () => {
  const [queue, setQueue] = useState(10);
  const [surgeAlert, setSurgeAlert] = useState({ prediction: "", duration: "", influx: 0 });
  const [ambulanceETA, setAmbulanceETA] = useState({ eta: 0, traffic: "", condition: "" });
  const [fastTrackEnabled, setFastTrackEnabled] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [documentVerified, setDocumentVerified] = useState({ verified: false, missing: [], expiration: "" });
  const [isChatbotActive, setChatbotActive] = useState(false);
  const [patientHistory, setPatientHistory] = useState(null);
  const [staffAvailability, setStaffAvailability] = useState(null);
  const [resourcePrediction, setResourcePrediction] = useState(null);
  const [queueHistory, setQueueHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const admitPatient = useCallback(() => {
    if (queue > 0) {
      setQueue(prevQueue => {
        const newQueue = prevQueue - 1;
        setQueueHistory(prev => [...prev, { time: new Date().toISOString(), queue: newQueue }]);
        return newQueue;
      });
      setLoyaltyPoints(prev => prev + 10);
    }
  }, [queue]);

  const checkSurgePrediction = async () => {
    const data = await fetchSurgePrediction();
    setSurgeAlert(data);
  };

  const syncAmbulanceETA = async () => {
    const data = await getAmbulanceETA();
    setAmbulanceETA(data);
    setFastTrackEnabled(data.patientCondition === "Critical");
  };

  const handleDocumentVerification = async () => {
    const data = await verifyDocuments();
    setDocumentVerified(data);
  };

  const fetchPatientData = async () => {
    const data = await fetchPatientHistory();
    setPatientHistory(data);
  };

  const checkStaffAvailability = async () => {
    const data = await getStaffAvailability();
    setStaffAvailability(data);
  };

  const checkResourceNeeds = async () => {
    const data = await predictResourceNeeds();
    setResourcePrediction(data);
  };

  useEffect(() => {
    const intervals = [
      setInterval(checkSurgePrediction, 300000), 
      setInterval(syncAmbulanceETA, 60000),
      setInterval(checkStaffAvailability, 600000),
      setInterval(checkResourceNeeds, 900000),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  useEffect(() => {
    checkSurgePrediction();
    syncAmbulanceETA();
    checkStaffAvailability();
    checkResourceNeeds();
  }, []);

  const switchLanguage = (lang) => {
    setSelectedLanguage(lang);
  };

  const renderQueueManagement = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Queue Management</Text>
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Icon name="people" size={30} color="#00796b" />
          <Text style={styles.number}>{queue}</Text>
          <Text style={styles.subText}>Patients in Queue</Text>
        </View>
        <TouchableOpacity 
          onPress={admitPatient} 
          disabled={queue === 0}
          style={[styles.button, queue === 0 && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Admit Next Patient</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={{ labels: queueHistory.map(q => q.time), datasets: [{ data: queueHistory.map(q => q.queue) }] }}
        width={300} 
        height={220} 
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </View>
  );

  const renderSurgePrediction = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Surge Prediction</Text>
      <View style={styles.row}>
        <Icon name="warning" size={30} color="#e53935" />
        <View style={styles.flex1}>
          <Text style={styles.surgeText}>{surgeAlert.prediction} Load Predicted</Text>
          <Text style={styles.subText}>Expected for next {surgeAlert.expectedDuration}</Text>
          <Text style={styles.subText}>Estimated influx: {surgeAlert.patientInflux} patients</Text>
        </View>
      </View>
    </View>
  );

  const renderAmbulanceIntegration = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Ambulance Integration</Text>
      <View style={styles.row}>
        <Icon name="local-hospital" size={30} color="#fbc02d" />
        <View style={styles.flex1}>
          <Text style={styles.surgeText}>ETA: {ambulanceETA.eta} minutes</Text>
          <Text style={styles.subText}>Traffic: {ambulanceETA.trafficConditions}</Text>
          <Text style={styles.subText}>Patient: {ambulanceETA.patientCondition}</Text>
        </View>
        {fastTrackEnabled && (
          <View style={styles.alert}>
            <Icon name="error-outline" size={20} color="#d32f2f" />
            <Text style={styles.alertText}>Fast-Track Enabled</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderStaffAvailability = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Staff Availability</Text>
      {staffAvailability && (
        <View style={styles.flex1}>
          <Text>Doctors: {staffAvailability.doctors.available}/{staffAvailability.doctors.total}</Text>
          <Text>Nurses: {staffAvailability.nurses.available}/{staffAvailability.nurses.total}</Text>
          <Text>Specialists: {staffAvailability.specialists.available}/{staffAvailability.specialists.total}</Text>
        </View>
      )}
    </View>
  );

  const renderResourcePrediction = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Resource Prediction</Text>
      {resourcePrediction && (
        <View style={styles.flex1}>
          <Text>Beds: {resourcePrediction.beds.needed}/{resourcePrediction.beds.available}</Text>
          <Text>Ventilators: {resourcePrediction.ventilators.needed}/{resourcePrediction.ventilators.available}</Text>
          <Text>ICU: {resourcePrediction.icu.needed}/{resourcePrediction.icu.available}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Smart Admissions Dashboard</Text>
      {renderQueueManagement()}
      {renderSurgePrediction()}
      {renderAmbulanceIntegration()}
      {renderStaffAvailability()}
      {renderResourcePrediction()}
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  button: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#bdbdbd',
  },
  surgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e53935',
  },
  subText: {
    fontSize: 14,
    color: '#757575',
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbe9e7',
    padding: 5,
    borderRadius: 5,
  },
  alertText: {
    marginLeft: 5,
    color: '#d32f2f',
  },
  chart: {
    marginTop: 15,
  },
});

export default SmartAdmissions;
