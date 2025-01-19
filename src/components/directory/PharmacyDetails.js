import React from 'react';
import { View, Text, Button, Image, Linking, StyleSheet } from 'react-native';

const PharmacyDetails = ({ pharmacy, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const handleOpenWebsite = () => {
    Linking.openURL(pharmacy.link).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Button title="Close" onPress={handleClose} style={styles.closeButton} />
      
      <Text style={styles.name}>{pharmacy.name}</Text>
      
      {pharmacy.image_url && (
        <Image source={{ uri: pharmacy.image_url }} style={styles.image} />
      )}
      
      <Text style={styles.info}><Text style={styles.bold}>Address:</Text> {pharmacy.address}</Text>
      <Text style={styles.info}><Text style={styles.bold}>Description:</Text> {pharmacy.description}</Text>
      <Text style={styles.info}><Text style={styles.bold}>Phone:</Text> {pharmacy.phone || 'Not available'}</Text>
      <Text style={styles.info}><Text style={styles.bold}>Email:</Text> {'Not available'}</Text>
      <Text style={styles.info}><Text style={styles.bold}>Website:</Text> {'Not available'}</Text>
      <Text style={styles.info}><Text style={styles.bold}>Rating:</Text> {'Not available'}</Text>
      <Text style={styles.info}><Text style={styles.bold}>Reviews:</Text> {'Not available'}</Text>
      
      <Button title="View on Website" onPress={handleOpenWebsite} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  bold: {
    fontWeight: '600',
    color: '#004C54',
  },
});

export default PharmacyDetails;
