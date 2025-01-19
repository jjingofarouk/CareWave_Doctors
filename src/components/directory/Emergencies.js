import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Linking,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { contacts } from './EmergencyContacts'; // Importing contacts from EmergencyContacts.js

const Emergencies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const searchEmergencyContacts = (query) => {
    setSearchQuery(query);
    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.address.toLowerCase().includes(query.toLowerCase()) ||
      contact.contact.some(num => num.includes(query))
    );
    setFilteredContacts(filtered);
    setCurrentPage(1);
  };

  const makeCall = (phoneNumber) => {
    let phoneNumberToCall = Platform.OS === 'android' ? `tel:${phoneNumber}` : `telprompt:${phoneNumber}`;
    Linking.openURL(phoneNumberToCall);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredContacts.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <View style={styles.paginationContainer}>
        {pageNumbers.map(number => (
          <TouchableOpacity 
            key={number} 
            onPress={() => paginate(number)}
            style={[
              styles.paginationButton, 
              currentPage === number && styles.activePaginationButton
            ]}
          >
            <Text style={styles.paginationText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderEmergencyContactItem = ({ item }) => (
    <View style={styles.emergencyCard}>
      <Text style={styles.emergencyName}>{item.name}</Text>
      <View style={styles.contactInfoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#009688" />
          <Text style={styles.infoText}>{item.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#009688" />
          <View style={styles.phoneNumbersContainer}>
            {item.contact.map((phone, index) => (
              <TouchableOpacity key={index} onPress={() => makeCall(phone)} style={styles.phoneButton}>
                <Text style={styles.phoneButtonText}>{phone}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {item.email && (
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#009688" />
            <Text style={styles.infoText}>{item.email}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Heading and Instructions */}
      <Text style={styles.heading}>Emergency Services</Text>
      <Text style={styles.description}>
        Find and contact emergency services near you. Use the search bar to filter by name, location, or phone number. 
        Tap on a phone number to make a call directly.
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, address, or phone"
          value={searchQuery}
          onChangeText={searchEmergencyContacts}
        />
      </View>

      {/* Emergency Contacts List */}
      {filteredContacts.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No emergency services found</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={currentContacts}
            renderItem={renderEmergencyContactItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
          {renderPagination()}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  emergencyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  emergencyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
  },
  contactInfoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  phoneNumbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  phoneButton: {
    backgroundColor: '#009688',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginTop: 5,
  },
  phoneButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activePaginationButton: {
    backgroundColor: '#009688',
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: '#999',
    fontSize: 18,
  },
});

export default Emergencies;
