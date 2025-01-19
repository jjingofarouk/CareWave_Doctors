import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';

// Main Select Component
export const Select = ({ children, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;

    return React.cloneElement(child, {
      selectedValue,
      onValueChange: handleValueChange,
    });
  });
};

// Select Trigger Component
export const SelectTrigger = ({ selectedValue, placeholder, onPress }) => {
  return (
    <TouchableOpacity style={styles.trigger} onPress={onPress}>
      <Text style={styles.triggerText}>
        {selectedValue || placeholder || 'Select an option'}
      </Text>
    </TouchableOpacity>
  );
};

// Select Content Component
export const SelectContent = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Select Item Component
export const SelectItem = ({ value, label, onPress, selected }) => (
  <TouchableOpacity
    style={[
      styles.item,
      selected ? styles.selectedItem : null,
    ]}
    onPress={() => onPress(value)}
  >
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);

// Select Value Component
export const SelectValue = ({ selectedValue, placeholder }) => {
  return (
    <Text style={styles.valueText}>
      {selectedValue || placeholder || 'Select an option'}
    </Text>
  );
};

const styles = StyleSheet.create({
  trigger: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  triggerText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  valueText: {
    fontSize: 16,
    color: '#555',
  },
});
