import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CustomSelect = ({ 
  options = [], 
  placeholder = 'Select an option', 
  onSelect = () => {}, 
  label = '', 
  value = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const getDisplayText = (option) => {
    if (!option) return placeholder;
    return typeof option === 'object' ? option.label : option;
  };

  const styles = StyleSheet.create({
    inputGroup: {
      marginBottom: 24,
      zIndex: 999,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#475569',
      marginBottom: 8,
    },
    selectButton: {
      height: 56,
      backgroundColor: '#F8FAFC',
      borderRadius: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    selectText: {
      fontSize: 16,
      color: '#1E293B',
      flex: 1,
    },
    placeholderText: {
      fontSize: 16,
      color: '#94A3B8',
    },
    optionsContainer: {
      marginTop: 8,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      maxHeight: 200,
      overflow: 'hidden',
    },
    optionsScrollView: {
      width: '100%',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E2E8F0',
    },
    selectedOption: {
      backgroundColor: '#F1F5F9',
    },
    optionText: {
      fontSize: 16,
      color: '#1E293B',
    },
    selectedOptionText: {
      color: '#3B82F6',
      fontWeight: '500',
    },
    iconContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    lastOption: {
      borderBottomWidth: 0,
    },
  });

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectText, !selectedOption && styles.placeholderText]} numberOfLines={1}>
          {getDisplayText(selectedOption)}
        </Text>
        <View style={styles.iconContainer}>
          <MaterialIcons 
            name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={24} 
            color="#94A3B8" 
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsContainer}>
          <ScrollView 
            style={styles.optionsScrollView}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {options.map((option, index) => {
              const optionValue = typeof option === 'object' ? option.value : option;
              const optionLabel = typeof option === 'object' ? option.label : option;
              const isSelected = selectedOption === option;
              const isLast = index === options.length - 1;

              return (
                <TouchableOpacity
                  key={optionValue}
                  style={[
                    styles.option,
                    isSelected && styles.selectedOption,
                    isLast && styles.lastOption
                  ]}
                  onPress={() => handleSelect(option)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.optionText, 
                    isSelected && styles.selectedOptionText
                  ]}>
                    {optionLabel}
                  </Text>
                  {isSelected && (
                    <MaterialIcons name="check" size={20} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomSelect;