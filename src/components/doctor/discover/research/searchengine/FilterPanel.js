// FilterPanel.js
import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const FilterPanel = ({ activeFilters, onFilterChange }) => {
  const filters = ['All', 'Clinical Trials', 'Reviews', 'Case Studies', 'Guidelines'];

  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilters.includes(filter) && styles.activeFilter,
            ]}
            onPress={() => onFilterChange(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilters.includes(filter) && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ECF0F1',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#3498DB',
  },
  filterText: {
    color: '#7F8C8D',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
});