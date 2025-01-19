import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

const CustomSlider = ({ value = 0, onValueChange, label }) => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.sliderContainer}>
        <View style={styles.track} />
        <View style={styles.numbersContainer}>
          {values.map((num) => (
            <Pressable
              key={num}
              onPress={() => onValueChange(num)}
              style={styles.numberWrapper}
            >
              <View
                style={[
                  styles.dot,
                  num <= value && styles.dotFilled,
                  num === value && styles.dotSelected
                ]}
              />
              <Text style={[
                styles.number,
                num === value && styles.selectedNumber
              ]}>
                {num}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.endLabel}>No pain</Text>
        <Text style={[styles.currentValue, { color: '#007AFF' }]}>{value}</Text>
        <Text style={styles.endLabel}>Worst possible</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 12,
  },
  sliderContainer: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#E0E0E0',
    top: 19,
  },
  numbersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberWrapper: {
    alignItems: 'center',
    width: 30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 4,
  },
  dotFilled: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dotSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
  },
  number: {
    fontSize: 12,
    color: '#666',
  },
  selectedNumber: {
    color: '#007AFF',
    fontWeight: '600',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  endLabel: {
    fontSize: 12,
    color: '#666',
  },
  currentValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomSlider;