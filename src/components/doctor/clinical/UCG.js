import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UCG = ({ guidelines = [] }) => {
  const [filteredGuidelines, setFilteredGuidelines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!Array.isArray(guidelines)) {
        setError('Invalid guidelines data');
        setIsLoading(false);
        return;
      }
      setFilteredGuidelines(guidelines);
      setError(null);
    } catch (err) {
      setError('Error loading guidelines');
    } finally {
      setIsLoading(false);
    }
  }, [guidelines]);

  const totalPages = Math.ceil((filteredGuidelines?.length || 0) / resultsPerPage);
  
  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      if (!query) {
        setFilteredGuidelines(guidelines);
        setIsLoading(false);
        return;
      }

      const searchWords = query.toLowerCase().split(' ');
      const results = guidelines.filter(guideline => {
        const searchText = `${guideline?.content || ''} ${guideline?.formatted_content || ''}`.toLowerCase();
        return searchWords.every(word => searchText.includes(word));
      });

      setFilteredGuidelines(results);
      setCurrentPage(1);
    } catch (err) {
      setError('Error performing search');
    } finally {
      setIsLoading(false);
    }
  };

  const formatContent = (content) => {
    if (!content) return '';
    return content.replace(/[\u0089]/g, '')
                 .split('\n')
                 .filter(line => line.trim())
                 .join('\n');
  };

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError(null);
              setIsLoading(true);
              setFilteredGuidelines(guidelines || []);
              setIsLoading(false);
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading guidelines...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const ResultCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedGuideline(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.pageNumber}>Page {item?.page_number || 'N/A'}</Text>
      </View>
      <Text style={styles.contentPreview} numberOfLines={3}>
        {formatContent(item?.content)}
      </Text>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => setSelectedGuideline(item)}
        >
          <Text style={styles.viewMoreButtonText}>View Full Content</Text>
          <Ionicons name="chevron-forward" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Uganda Clinical Guidelines 2023</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search guidelines..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity
          style={styles.resultsPerPageButton}
          onPress={() => {
            const options = [10, 20, 50];
            const currentIndex = options.indexOf(resultsPerPage);
            const nextIndex = (currentIndex + 1) % options.length;
            setResultsPerPage(options[nextIndex]);
          }}
        >
          <Text style={styles.resultsPerPageText}>{resultsPerPage}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredGuidelines.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)}
        renderItem={({ item }) => <ResultCard item={item} />}
        keyExtractor={(item, index) => `${item?.page_number || index}-${index}`}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.noResults}>No guidelines found</Text>
        }
        ListFooterComponent={
          filteredGuidelines.length > 0 && (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                onPress={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <Ionicons name="chevron-back" size={24} color={currentPage === 1 ? "#ccc" : "#007AFF"} />
                <Text style={[styles.paginationText, currentPage === 1 && styles.disabledText]}>Previous</Text>
              </TouchableOpacity>
              <Text style={styles.pageIndicator}>
                Page {currentPage} of {totalPages}
              </Text>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <Text style={[styles.paginationText, currentPage === totalPages && styles.disabledText]}>Next</Text>
                <Ionicons name="chevron-forward" size={24} color={currentPage === totalPages ? "#ccc" : "#007AFF"} />
              </TouchableOpacity>
            </View>
          )
        }
      />

      <Modal
        visible={!!selectedGuideline}
        animationType="slide"
        onRequestClose={() => setSelectedGuideline(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedGuideline(null)}
            >
              <Ionicons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Page {selectedGuideline?.page_number}</Text>
            <View style={styles.modalHeaderSpacer} />
          </View>
          <FlatList
            data={[selectedGuideline]}
            renderItem={({ item }) => (
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  {formatContent(item?.content)}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  resultsPerPageButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  resultsPerPageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pageNumber: {
    fontSize: 14,
    color: '#666',
  },
  contentPreview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreButtonText: {
    color: '#007AFF',
    marginRight: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  paginationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  paginationText: {
    color: '#007AFF',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#ccc',
  },
  pageIndicator: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalHeaderSpacer: {
    width: 32,
  },
  modalContent: {
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});

export default UCG;