import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import ASCVDCalculator from './ASCVD';
import FraminghamRiskCalculator from './Framingham';
import CHA2DS2VASc from './CHA2DS2VASc';
import HASBLED from './HASBLED';
import GRACECalculator from './GRACE';
import TIMICalculator from './TIMI';

const CardiovascularCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState('ASCVD');
  const [searchQuery, setSearchQuery] = useState('');

  const calculators = [
    'ASCVD',
    'Framingham',
    'CHA2DS2VASc',
    'HAS-BLED',
    'GRACE',
    'TIMI'
  ];

  const filteredCalculators = calculators.filter(calculator =>
    calculator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case 'ASCVD':
        return <ASCVDCalculator />;
      case 'Framingham':
        return <FraminghamRiskCalculator />;
      case 'CHA2DS2VASc':
        return <CHA2DS2VASc />;
      case 'HAS-BLED':
        return <HASBLED />;
      case 'GRACE':
        return <GRACECalculator />;
      case 'TIMI':
        return <TIMICalculator />;
      default:
        return <Text style={styles.infoText}>Select a calculator to get started</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search calculators..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#6B7280"
        />
      </View>

      {/* Calculator Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {filteredCalculators.map((calculator) => (
          <TouchableOpacity
            key={calculator}
            style={[
              styles.tab,
              selectedCalculator === calculator && styles.activeTab,
            ]}
            onPress={() => setSelectedCalculator(calculator)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCalculator === calculator && styles.activeTabText,
              ]}
            >
              {calculator}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Calculator Body */}
      <ScrollView style={styles.bodyContainer}>{renderCalculator()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5',
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    maxHeight: 60,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    maxHeight: 50,
  },
  activeTab: {
    backgroundColor: '#27C7B8',
    borderWidth: 0,
    shadowColor: '#27C7B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter-Light',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CardiovascularCalculators;