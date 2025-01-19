import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export const Textarea = forwardRef(({ className, error, ...props }, ref) => {
  console.log('Textarea props:', props); // Debugging line
  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        multiline
        style={[
          styles.textarea,
          error && styles.error,
          props.style,
        ]}
        placeholderTextColor="#9CA3AF" // gray-400
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
});

Textarea.displayName = 'Textarea';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textarea: {
    width: '100%',
    minHeight: 80,
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
});
