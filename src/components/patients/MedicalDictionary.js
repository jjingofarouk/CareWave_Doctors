import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const MedicalDictionary = () => {
  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Check network status on component mount
  useEffect(() => {
    checkConnectivity();
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    return () => unsubscribe();
  }, []);

  const checkConnectivity = async () => {
    const netInfo = await NetInfo.fetch();
    setIsOnline(netInfo.isConnected);
  };

  const handleConnectivityChange = (state) => {
    setIsOnline(state.isConnected);
  };

  // Save definition to local storage
  const saveDefinitionLocally = async (term, definitionData) => {
    try {
      const key = `medical_term_${term.toLowerCase()}`;
      await AsyncStorage.setItem(key, JSON.stringify({
        timestamp: new Date().getTime(),
        data: definitionData
      }));
    } catch (error) {
      console.error('Error saving definition:', error);
    }
  };

  // Get definition from local storage
  const getLocalDefinition = async (term) => {
    try {
      const key = `medical_term_${term.toLowerCase()}`;
      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving definition:', error);
      return null;
    }
  };

  // Clear old cached definitions (older than 30 days)
  const clearOldCache = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const medicalTermKeys = keys.filter(key => key.startsWith('medical_term_'));
      const thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);

      for (const key of medicalTermKeys) {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const { timestamp } = JSON.parse(stored);
          if (timestamp < thirtyDaysAgo) {
            await AsyncStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  const fetchTerm = async () => {
    if (!term) {
      Alert.alert("Error", "Please enter a medical term");
      return;
    }

    setLoading(true);

    try {
      // First check local storage
      const localData = await getLocalDefinition(term);
      
      if (localData) {
        setDefinitions(localData.data);
        setLoading(false);
        return;
      }

      // If not found locally and online, fetch from API
      if (isOnline) {
        const apiKey = '93185942-c015-4c67-b5c3-bfe498597dd0';
        const url = `https://www.dictionaryapi.com/api/v3/references/medical/json/${term}?key=${apiKey}`;
        const response = await axios.get(url);
        
        if (response.data && Array.isArray(response.data)) {
          if (typeof response.data[0] === 'string') {
            Alert.alert(
              "Term not found",
              `Did you mean: ${response.data.slice(0, 5).join(', ')}?`
            );
            setDefinitions(null);
          } else {
            setDefinitions(response.data);
            // Save to local storage for offline access
            await saveDefinitionLocally(term, response.data);
          }
        } else {
          Alert.alert("Error", "No results found");
          setDefinitions(null);
        }
      } else {
        Alert.alert(
          "Offline Mode",
          "Please connect to the internet to search for new terms."
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch definition. Please try again later.");
      setDefinitions(null);
    } finally {
      setLoading(false);
    }
  };

  // Clear cache when it gets too old
  useEffect(() => {
    clearOldCache();
  }, []);

  const renderDefinitionText = (dt) => {
    if (!dt) return null;
    
    let text = '';
    dt.forEach(item => {
      if (typeof item === 'string') {
        text += item;
      } else if (item[0] === 'text') {
        text += item[1];
      }
    });
    return text.replace(/{\/?[a-z]+}/g, '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical Dictionary</Text>
      
      {!isOnline && (
        <Text style={styles.offlineNotice}>
          Offline Mode - Only previously searched terms are available
        </Text>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={term}
          onChangeText={setTerm}
          placeholder="Enter a medical term"
          placeholderTextColor="#999"
          onSubmitEditing={fetchTerm}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={fetchTerm}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.resultsContainer}>
        {definitions?.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text style={styles.wordText}>
              {entry.meta?.id?.replace(/\d+/g, '')}
            </Text>

            {entry.hwi?.prs?.[0]?.mw && (
              <Text style={styles.pronunciationText}>
                /{entry.hwi.prs[0].mw}/
              </Text>
            )}

            {entry.fl && (
              <Text style={styles.partOfSpeech}>
                {entry.fl}
              </Text>
            )}

            {entry.def?.map((def, defIndex) => (
              <View key={defIndex} style={styles.definitionBlock}>
                {def.sseq?.map((senseSeq, senseIndex) => (
                  <View key={senseIndex}>
                    {senseSeq.map((sense, subIndex) => {
                      const definition = sense[1]?.dt && renderDefinitionText(sense[1].dt);
                      return definition ? (
                        <View key={subIndex} style={styles.definitionItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.definitionText}>
                            {definition}
                          </Text>
                        </View>
                      ) : null;
                    })}
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4299E1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
  },
  entryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  pronunciationText: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 4,
  },
  partOfSpeech: {
    fontSize: 14,
    color: '#4A5568',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  definitionBlock: {
    marginTop: 8,
  },
  definitionItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bulletPoint: {
    marginRight: 8,
    color: '#4299E1',
  },
  definitionText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
  },
  offlineNotice: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default MedicalDictionary;