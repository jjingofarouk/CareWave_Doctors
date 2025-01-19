import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hospitals from './hospitals.json';

const FindHospitals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const colors = {
    primary: '#004C54', // Deep Teal
    accent: '#FF7043', // Coral Orange
    text: '#333333', // Dark Gray
    background: '#F5F7FA', // Light Gray
    secondary: '#009688', // Medium Teal
  };

  const searchHospitals = (query) => {
    setSearchQuery(query);
    const filtered = hospitals.filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(query.toLowerCase()) ||
        hospital.address.toLowerCase().includes(query.toLowerCase()) ||
        hospital.phone.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHospitals(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredHospitals.length / itemsPerPage);

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.paginationStatus}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          onPress={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={[
            styles.paginationButton,
            currentPage === totalPages && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const openModal = (hospital) => {
    setSelectedHospital(hospital);
    setModalVisible(true);
  };

  const renderHospitalItem = ({ item }) => (
    <TouchableOpacity style={styles.hospitalCard}>
      <View style={styles.hospitalCardContent}>
        {item.photo ? (
          <Image
            source={{ uri: item.photo }}
            style={styles.hospitalImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="medical" size={40} color={colors.primary} />
          </View>
        )}
        <View style={styles.hospitalDetails}>
          <Text style={styles.hospitalName}>{item.name}</Text>
          <View style={styles.contactContainer}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.addressText} numberOfLines={2}>
              {item.address}
            </Text>
          </View>
          <View style={styles.contactContainer}>
            <Ionicons name="call" size={20} color={colors.primary} />
            <Text style={styles.phoneText}>{item.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => openModal(item)}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find Hospitals Near You</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search hospitals by name, address, or phone"
          value={searchQuery}
          onChangeText={searchHospitals}
        />
      </View>

      {filteredHospitals.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No hospitals found</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={currentHospitals}
            renderItem={renderHospitalItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
          {renderPagination()}
        </>
      )}

      {/* Modal for hospital details */}
      {selectedHospital && (
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedHospital.name}</Text>
              <ScrollView>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Address: </Text>
                  {selectedHospital.address}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Phone: </Text>
                  {selectedHospital.phone}
                </Text>
                {selectedHospital.description && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>Description: </Text>
                    {selectedHospital.description}
                  </Text>
                )}
              </ScrollView>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#004C54', marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 50, fontSize: 16, color: '#333' },
  listContainer: { paddingHorizontal: 5 },
  hospitalCard: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 15, elevation: 3 },
  hospitalCardContent: { flexDirection: 'row', padding: 15 },
  hospitalImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  placeholderImage: { width: 80, height: 80, borderRadius: 10, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  hospitalDetails: { flex: 1 },
  hospitalName: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  contactContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  addressText: { marginLeft: 10, color: '#666', flexShrink: 1 },
  phoneText: { marginLeft: 10, color: '#666' },
  viewDetailsButton: { backgroundColor: '#FF7043', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  viewDetailsText: { color: '#fff', fontWeight: '600' },
  paginationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  paginationButton: { backgroundColor: '#009688', padding: 10, borderRadius: 5 },
  paginationText: { color: '#fff', fontWeight: '600' },
  disabledButton: { backgroundColor: '#ccc' },
  paginationStatus: { color: '#333', fontWeight: '600' },
  noResultsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noResultsText: { fontSize: 18, color: '#666' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#004C54', marginBottom: 10 },
  modalText: { fontSize: 16, color: '#333', marginVertical: 5 },
  modalLabel: { fontWeight: '700', color: '#009688' },
  closeButton: { backgroundColor: '#FF7043', borderRadius: 8, padding: 10, marginTop: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontWeight: '600' },
});

export default FindHospitals;
