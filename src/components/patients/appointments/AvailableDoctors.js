import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Simulated API call to fetch available doctors
const fetchAvailableDoctors = async () => {
  // Sample doctor data
  return [
    {
      id: '1',
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      availability: 'Available Today',
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      id: '2',
      name: 'Dr. Jane Smith',
      specialty: 'Pediatrician',
      availability: 'Available Tomorrow',
      image: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
    {
      id: '3',
      name: 'Dr. Alan White',
      specialty: 'Dermatologist',
      availability: 'Available Today',
      image: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ];
};

const AvailableDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await fetchAvailableDoctors();
      setDoctors(data);
    };

    loadDoctors();
  }, []);

  const renderDoctorItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.specialty}</Text>
        <Text style={styles.availability}>{item.availability}</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookAppointment', { doctorId: item.id })}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginVertical: 5,
  },
  availability: {
    color: '#009688', // Medium Teal
    fontWeight: '500',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#FF7043', // Coral Orange
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default AvailableDoctors;
