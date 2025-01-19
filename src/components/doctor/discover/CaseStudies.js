import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { casesData } from './cases'; // Import the casesData from the external file

const CaseStudies = () => {
  const [cases, setCases] = useState(casesData); // Use imported casesData
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 5; // Define the number of cases per page
  const [selectedCase, setSelectedCase] = useState(null);

  const filteredCases = cases.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Case Studies</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search cases..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Cases List */}
      <FlatList
        data={currentCases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.caseCard}
            onPress={() => setSelectedCase(item)}
          >
            <Text style={styles.caseDescription}>{item.description}</Text>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.caseImage} />
            ) : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noCasesText}>No cases found matching your search.</Text>
        }
      />

      {/* Pagination Controls */}
      {filteredCases.length > casesPerPage && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={prevPage}
            disabled={currentPage === 1}
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledButton,
            ]}
          >
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            onPress={nextPage}
            disabled={currentPage === totalPages}
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.disabledButton,
            ]}
          >
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for Selected Case */}
      <Modal visible={!!selectedCase} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCase && (
              <>
                <Text style={styles.modalTitle}>Case Details</Text>
                <ScrollView>
                  <Text style={styles.modalDescription}>
                    {selectedCase.description}
                  </Text>
                  {selectedCase.image_url ? (
                    <Image
                      source={{ uri: selectedCase.image_url }}
                      style={styles.modalImage}
                    />
                  ) : null}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedCase(null)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  caseCard: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  caseDescription: { fontSize: 16, marginBottom: 8 },
  caseImage: { height: 200, borderRadius: 8, marginTop: 8 },
  noCasesText: { textAlign: 'center', color: '#888', marginTop: 20 },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  paginationButton: { padding: 10, backgroundColor: '#27c7b8', borderRadius: 8 },
  disabledButton: { backgroundColor: '#ccc' },
  paginationText: { color: '#fff', fontSize: 16 },
  paginationInfo: { fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 8, padding: 16, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  modalDescription: { fontSize: 16, marginBottom: 8 },
  modalImage: { height: 200, borderRadius: 8, marginBottom: 16 },
  closeButton: { alignSelf: 'flex-end', padding: 8, backgroundColor: '#27c7b8', borderRadius: 8 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});

export default CaseStudies;
