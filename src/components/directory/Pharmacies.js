import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Linking, 
  TextInput 
} from 'react-native';
import { MapPin, Phone } from 'lucide-react-native';
import pharmaciesData from './pharmacies.json';

const PharmacyCard = ({ pharmacy }) => {
  const handlePhonePress = () => {
    const phoneNumber = pharmacy.phone.replace('Call:', '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWebsitePress = () => {
    Linking.openURL(pharmacy.link);
  };

  return (
    <View style={styles.pharmacyCard}>
      <Image 
        source={{ uri: pharmacy.image_url }}
        style={styles.pharmacyImage}
        defaultSource={require('./cover-bg.jpg')}
      />
      <View style={styles.pharmacyDetails}>
        <Text style={styles.pharmacyName} numberOfLines={2}>
          {pharmacy.name}
        </Text>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#666" />
          <Text style={styles.addressText} numberOfLines={2}>
            {pharmacy.address}
          </Text>
        </View>
        {pharmacy.description !== "N/A" && (
          <Text style={styles.descriptionText} numberOfLines={3}>
            {pharmacy.description}
          </Text>
        )}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.phoneButton} 
            onPress={handlePhonePress}
          >
            <Phone size={16} color="white" />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.websiteButton} 
            onPress={handleWebsitePress}
          >
            <Text style={styles.buttonText}>Website</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = pharmaciesData.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search pharmacies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPharmacies}
        renderItem={({ item }) => <PharmacyCard pharmacy={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContainer: {
    paddingBottom: 20,
  },
  pharmacyCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pharmacyImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  pharmacyDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressText: {
    marginLeft: 5,
    color: '#666',
  },
  descriptionText: {
    color: '#333',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  websiteButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Pharmacies;