// Label.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Label = ({ children, className, ...props }) => {
  return (
    <Text style={[styles.label, props.style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827', // gray-900
    marginBottom: 8,
  },
});