// components/referral/PrioritySelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    { id: 'routine', label: 'Routine', color: '#34C759' },
    { id: 'urgent', label: 'Urgent', color: '#FF9500' },
    { id: 'emergency', label: 'Emergency', color: '#FF3B30' }
  ];

  return (
    <View style={styles.priorityContainer}>
      <Text style={styles.label}>Priority Level</Text>
      <View style={styles.buttonGroup}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority.id}
            style={[
              styles.priorityButton,
              value === priority.id && styles.selectedButton,
              { borderColor: priority.color }
            ]}
            onPress={() => onChange(priority.id)}
          >
            <Text style={[
              styles.priorityText,
              value === priority.id && { color: priority.color }
            ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};