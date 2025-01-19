import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { 
    height: 45, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#fff' 
  },
});

export default CustomButton;
