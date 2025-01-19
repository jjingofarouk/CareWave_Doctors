import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange, currencies }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderCurrencyItem = ({ item: [code, { symbol }] }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => {
        onCurrencyChange(code);
        setModalVisible(false);
      }}
    >
      <View style={styles.currencyItemContent}>
        <Text style={styles.currencyCode}>{code}</Text>
        <Text style={styles.currencySymbol}>{symbol}</Text>
      </View>
      {selectedCurrency === code && (
        <Ionicons name="checkmark" size={24} color="#007AFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectedCurrency}>
          <Text style={styles.label}>Display Currency</Text>
          <View style={styles.selectedValue}>
            <Text style={styles.selectedText}>
              {selectedCurrency} ({currencies[selectedCurrency]?.symbol})
            </Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={Object.entries(currencies)}
              renderItem={renderCurrencyItem}
              keyExtractor={([code]) => code}
              style={styles.currencyList}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectorButton: {
    padding: 16,
  },
  selectedCurrency: {
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  selectedValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 17,
  },
  currencyList: {
    flex: 1,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  currencyItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyCode: {
    fontSize: 17,
    marginRight: 8,
  },
  currencySymbol: {
    fontSize: 17,
    color: '#666',
  },
});

export default CurrencySelector;