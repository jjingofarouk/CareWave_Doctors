import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const HospitalDetails = ({ hospital, onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>{hospital.name}</Text>
          {hospital.photo && (
            <Image
              source={{ uri: hospital.photo }}
              style={styles.hospitalPhoto}
            />
          )}
          <Text style={styles.detailsText}><Text style={styles.bold}>Address:</Text> {hospital.address}</Text>
          <Text style={styles.detailsText}><Text style={styles.bold}>Description:</Text> {hospital.description || 'No description available'}</Text>
          <Text style={styles.detailsText}><Text style={styles.bold}>Phone:</Text> {hospital.phone || 'Not available'}</Text>
          <Text style={styles.detailsText}><Text style={styles.bold}>Title:</Text> {hospital.title || 'Not available'}</Text>
          <Text style={styles.detailsText}><Text style={styles.bold}>Specialties:</Text> {hospital.specialties || 'Not available'}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`https://www.ughealthdirectory.com${hospital.profile_url}`)} style={styles.link}>
            <Text style={styles.linkText}>View on Website</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    maxWidth: '90%',
    width: 500,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    fontSize: 30,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#004C54',
    marginBottom: 15,
    fontWeight: '700',
  },
  hospitalPhoto: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#009688',
    fontWeight: '600',
  },
});

export default HospitalDetails;
