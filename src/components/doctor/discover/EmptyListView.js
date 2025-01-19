// EmptyListView.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './CaseStyles';

export const EmptyListView = ({ resetSearch }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No cases found</Text>
    <TouchableOpacity 
      onPress={resetSearch}
      style={styles.resetButton}
    >
      <Text style={styles.resetButtonText}>Reset Search</Text>
    </TouchableOpacity>
  </View>
);
