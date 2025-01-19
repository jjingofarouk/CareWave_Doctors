// components/referral/DoctorDirectory.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Filter Component
const Filter = ({ filters, onFilterChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'];
  const languages = ['English', 'Spanish', 'French', 'Mandarin', 'Arabic'];
  const genders = ['Male', 'Female', 'Other'];

  const applyFilters = () => {
    onFilterChange(tempFilters);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="filter-list" size={24} color="#007AFF" />
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Doctors</Text>
            
            <ScrollView>
              {/* Specialization Filter */}
              <Text style={styles.filterLabel}>Specialization</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {specializations.map((spec) => (
                  <TouchableOpacity
                    key={spec}
                    style={[
                      styles.filterChip,
                      tempFilters.specialization === spec && styles.filterChipSelected
                    ]}
                    onPress={() => setTempFilters({
                      ...tempFilters,
                      specialization: tempFilters.specialization === spec ? '' : spec
                    })}
                  >
                    <Text style={tempFilters.specialization === spec ? 
                      styles.filterChipTextSelected : styles.filterChipText}
                    >
                      {spec}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Location Filter */}
              <Text style={styles.filterLabel}>Location</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Enter location"
                value={tempFilters.location}
                onChangeText={(text) => setTempFilters({...tempFilters, location: text})}
              />

              {/* Language Filter */}
              <Text style={styles.filterLabel}>Languages</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    style={[
                      styles.filterChip,
                      tempFilters.language === lang && styles.filterChipSelected
                    ]}
                    onPress={() => setTempFilters({
                      ...tempFilters,
                      language: tempFilters.language === lang ? '' : lang
                    })}
                  >
                    <Text style={tempFilters.language === lang ?
                      styles.filterChipTextSelected : styles.filterChipText}
                    >
                      {lang}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Gender Filter */}
              <Text style={styles.filterLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {genders.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.genderButton,
                      tempFilters.gender === gender && styles.genderButtonSelected
                    ]}
                    onPress={() => setTempFilters({
                      ...tempFilters,
                      gender: tempFilters.gender === gender ? '' : gender
                    })}
                  >
                    <Text style={tempFilters.gender === gender ?
                      styles.genderButtonTextSelected : styles.genderButtonText}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Insurance Filter */}
              <Text style={styles.filterLabel}>Insurance</Text>
              <TextInput
                style={styles.filterInput}
                placeholder="Enter insurance provider"
                value={tempFilters.insurance}
                onChangeText={(text) => setTempFilters({...tempFilters, insurance: text})}
              />
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// DoctorCard Component
const DoctorCard = ({ doctor, onPress }) => {
  return (
    <TouchableOpacity style={styles.doctorCard} onPress={onPress}>
      <View style={styles.doctorImageContainer}>
        <Icon name="account-circle" size={60} color="#666" />
      </View>
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>
          Dr. {doctor.firstName} {doctor.lastName}
        </Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialization}</Text>
        <View style={styles.doctorDetailsRow}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.doctorDetails}>{doctor.location}</Text>
        </View>
        <View style={styles.doctorDetailsRow}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.doctorDetails}>{doctor.rating} ({doctor.reviewCount} reviews)</Text>
        </View>
      </View>
      <View style={styles.availabilityContainer}>
        <Text style={styles.nextAvailable}>Next Available</Text>
        <Text style={styles.availabilityTime}>{doctor.nextAvailable}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Main DoctorDirectory Component
const DoctorDirectory = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    gender: '',
    language: '',
    insurance: ''
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to results
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search specialists..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <FlatList
        data={[]} // Add your doctors data here
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => navigation.navigate('ReferralForm', { doctor: item })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5'
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16
  },
  filterButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8
  },
  filterChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  filterChipText: {
    color: '#666'
  },
  filterChipTextSelected: {
    color: '#fff'
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  genderButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  genderButtonText: {
    color: '#666'
  },
  genderButtonTextSelected: {
    color: '#fff'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center'
  },
  applyButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center'
  },
  cancelButtonText: {
    color: '#666'
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  doctorCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  doctorImageContainer: {
    marginRight: 16
  },
  doctorInfo: {
    flex: 1
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8
  },
  doctorDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  doctorDetails: {
    marginLeft: 4,
    color: '#666'
  },
  availabilityContainer: {
    alignItems: 'flex-end'
  },
  nextAvailable: {
    fontSize: 12,
    color: '#666'
  },
  availabilityTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759'
  }
});

export default DoctorDirectory;