import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import doctors from './Doctors'; // Importing doctors from Doctors.js

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // Search and filter function
  const searchDoctors = (query) => {
    setSearchQuery(query);
    setLoading(true);
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.phone.toLowerCase().includes(query.toLowerCase()) ||
      (doctor.location && doctor.location.toLowerCase().includes(query.toLowerCase())) ||
      (doctor.specialty && doctor.specialty.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredDoctors(filtered);
    setCurrentPage(1);
    setLoading(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity 
          onPress={() => paginate(1)}
          disabled={currentPage === 1}
          style={[styles.paginationButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
        >
          <Text style={styles.paginationText}>First</Text>
        </TouchableOpacity>

        {currentPage > 1 && (
          <TouchableOpacity 
            onPress={() => paginate(currentPage - 1)}
            style={styles.paginationButton}
          >
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.paginationText}>
          {currentPage} of {totalPages}
        </Text>

        {currentPage < totalPages && (
          <TouchableOpacity 
            onPress={() => paginate(currentPage + 1)}
            style={styles.paginationButton}
          >
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          onPress={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          style={[styles.paginationButton, { opacity: currentPage === totalPages ? 0.5 : 1 }]}
        >
          <Text style={styles.paginationText}>Last</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Default image for doctors without a photo
  const defaultImage = 'https://via.placeholder.com/60'; // Placeholder image URL

  // Render individual doctor item
  const renderDoctorItem = ({ item }) => {
    const initials = item.name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <TouchableOpacity style={styles.doctorCard}>
        <View style={styles.doctorCardContent}>
          <View style={styles.doctorHeaderContainer}>
            <View style={styles.doctorAvatar}>
              <Image
                source={{ uri: item.image || defaultImage }} 
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.doctorInfoContainer}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              <View style={styles.contactContainer}>
                <Ionicons name="call" size={16} color="#4a90e2" />
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Rating: {item.rating || 'Not rated'}</Text>
              </View>
            </View>
          </View>

          {item.location && (
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={20} color="#4a90e2" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.bookAppointmentButton}>
            <Text style={styles.bookAppointmentText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.introductionContainer}>
        <Text style={styles.introductionText}>
          Welcome to the Find Doctors page! Here, you can search for doctors by their name, phone number, location, or specialty. 
          Use the search bar to narrow down your options and navigate through pages of results using the pagination buttons below.
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name, phone, location, or specialty"
          value={searchQuery}
          onChangeText={searchDoctors}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#004C54" style={styles.spinner} />
      ) : filteredDoctors.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No doctors found</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={currentDoctors}
            renderItem={renderDoctorItem}
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
    padding: 10,
    backgroundColor: '#F5F7FA',  // Light Gray
  },
  introductionContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  introductionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#D32F2F',  // Red
  },
  listContainer: {
    paddingBottom: 20,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  doctorCardContent: {
    padding: 15,
  },
  doctorHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  doctorInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004C54',  // Deep Teal
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  ratingContainer: {
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#FFD700',  // Gold for ratings
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  bookAppointmentButton: {
    backgroundColor: '#FF7043',  // Coral Orange
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookAppointmentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF7043',  // Consistent button color
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FindDoctors;
