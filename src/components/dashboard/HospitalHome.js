import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HospitalHome = () => {
  const [medicalTip, setMedicalTip] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const healthTips = [
      "Encourage healthy workplace habits",
      "Promote mental health awareness",
    ];
    setMedicalTip(healthTips[Math.floor(Math.random() * healthTips.length)]);
  }, []);

  useEffect(() => {
    setNotifications(["New policy update", "Reminder: Staff training"]);
    setUpcomingAppointments([
      { id: 1, date: '2024-09-17', time: '1:00 PM', department: 'HR' },
    ]);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Medical Tip */}
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{medicalTip}</Text>
      </View>

      {/* Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <Text style={styles.cardItem}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Appointments</Text>
        <FlatList
          data={upcomingAppointments}
          renderItem={({ item }) => (
            <Text style={styles.cardItem}>
              {item.department} - {item.date} at {item.time}
            </Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Action Tiles */}
      <View style={styles.tileContainer}>
        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Manage Staff</Text>
          <Text style={styles.tileDescription}>
            View and manage staff appointments and availability.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Staff')}
          >
            <Text style={styles.buttonText}>Manage Staff</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileTitle}>Hospital Overview</Text>
          <Text style={styles.tileDescription}>
            View statistics and analytics for the hospital.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Overview')}
          >
            <Text style={styles.buttonText}>View Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  alertContainer: {
    backgroundColor: '#FFEB3B',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  alertText: {
    color: '#004C54',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 8,
  },
  cardItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tile: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 8,
  },
  tileDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HospitalHome;
