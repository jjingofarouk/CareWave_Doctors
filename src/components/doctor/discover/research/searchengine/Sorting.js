// SortingDropdown.js
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export const SortingDropdown = ({ sortOption, onSortChange }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const options = ['Relevance', 'Date (Newest)', 'Date (Oldest)', 'Citations'];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>Sort by: {sortOption}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionButton}
                onPress={() => {
                  onSortChange(option);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownText: {
    color: '#2C3E50',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
  },
});