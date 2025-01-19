// Input.js
import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={[
          styles.input,
          error && styles.error,
          props.multiline && styles.multiline,
          props.style,
        ]}
        placeholderTextColor="#9CA3AF" // gray-400
        {...props}
      />
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB', // gray-200
    borderRadius: 6,
    fontSize: 14,
    color: '#111827', // gray-900
  },
  error: {
    borderColor: '#EF4444', // red-500
  },
  multiline: {
    height: 'auto',
    minHeight: 44,
    paddingTop: 8,
    paddingBottom: 8,
    textAlignVertical: 'top',
  },
});