import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Dimensions } from 'react-native';
import { debounce } from 'lodash';

const API_KEY = '93185942-c015-4c67-b5c3-bfe498597dd0';
const BASE_URL = 'https://www.dictionaryapi.com/api/v3/references/medical/json/';

export const MedicalTerms = ({ terms = [], termFrequencies = {} }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [definition, setDefinition] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [termHistory, setTermHistory] = useState([]);
  
  // Memoize sorted terms to prevent unnecessary re-renders
  const sortedTerms = useMemo(() => {
    return [...terms].sort((a, b) => 
      (termFrequencies[b] || 0) - (termFrequencies[a] || 0)
    );
  }, [terms, termFrequencies]);

  // Memoize color calculation function
  const getTermColor = useCallback((term) => {
    const frequency = termFrequencies[term] || 0;
    const maxFreq = Math.max(...Object.values(termFrequencies), 1);
    const intensity = Math.max(0.3, frequency / maxFreq);
    return `rgba(39, 199, 184, ${intensity})`;
  }, [termFrequencies]);

  // Memoize fetch function
  const fetchDefinition = useCallback(
    debounce(async (term) => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${BASE_URL}${term}?key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].shortdef) {
          setDefinition(data[0].shortdef[0]);
          setTermHistory(prev => {
            if (prev.includes(term)) return prev;
            const newHistory = [...prev, term];
            return newHistory.slice(-4);
          });
        } else {
          setDefinition('No medical definition found.');
        }
      } catch (error) {
        setError('Error fetching definition. Please try again.');
        setDefinition('');
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleTermPress = useCallback((term) => {
    setSelectedTerm(term);
    setModalVisible(true);
    fetchDefinition(term);
  }, [fetchDefinition]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setError(null);
    setDefinition('');
  }, []);

  // Only render history section if there are items
  const renderHistory = useMemo(() => {
    if (termHistory.length === 0) return null;

    return (
      <View style={styles.historySection}>
        <Text style={styles.historyHeader}>Recently Viewed</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.historyScroll}
        >
          {termHistory.map((term, index) => (
            <TouchableOpacity 
              key={`history-${index}`}
              style={styles.historyChip}
              onPress={() => handleTermPress(term)}
            >
              <Text style={styles.historyText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }, [termHistory, handleTermPress]);

  return (
    <View style={styles.container}>
      <Text style={styles.analysisHeader}>Key Medical Terms</Text>
      
      {renderHistory}

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.termsScroll}
      >
        {sortedTerms.map((term, index) => (
          <TouchableOpacity 
            key={`term-${index}`}
            style={[
              styles.termChip,
              { backgroundColor: getTermColor(term) }
            ]}
            onPress={() => handleTermPress(term)}
          >
            <Text style={styles.termText}>{term}</Text>
            {termFrequencies[term] > 0 && (
              <Text style={styles.frequencyBadge}>
                {termFrequencies[term]}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTerm}>{selectedTerm}</Text>
            
            {loading ? (
              <ActivityIndicator size="large" color="#27C7B8" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <ScrollView style={styles.definitionScroll}>
                <Text style={styles.modalDefinition}>{definition}</Text>
              </ScrollView>
            )}
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  analysisHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#27C7B8',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  historySection: {
    marginBottom: 15,
  },
  historyHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  historyScroll: {
    paddingHorizontal: 10,
  },
  historyChip: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
  },
  historyText: {
    color: '#666',
    fontSize: 12,
  },
  termsScroll: {
    paddingHorizontal: 10,
  },
  termChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  termText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  frequencyBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 10,
    color: '#27C7B8',
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxHeight: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTerm: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27C7B8',
    marginBottom: 15,
  },
  definitionScroll: {
    maxHeight: Dimensions.get('window').height * 0.4,
    width: '100%',
  },
  modalDefinition: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 24,
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#27C7B8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});