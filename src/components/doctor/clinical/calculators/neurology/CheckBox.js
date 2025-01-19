import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CheckBox = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
      <View
        style={[
          styles.checkbox,
          checked && { backgroundColor: '#27c7b8' }, // Change background color when checked
        ]}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#004C54',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default CheckBox;
