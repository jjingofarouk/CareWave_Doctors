import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Premium color palette
const COLORS = {
  primary: '#2563EB',          // Royal blue
  primaryLight: '#DBEAFE',     // Light blue
  secondary: '#4B5563',        // Gray
  success: '#059669',          // Green
  border: '#E5E7EB',          // Light gray
  text: '#1F2937',            // Dark gray
  textSecondary: '#6B7280',   // Medium gray
  background: '#F9FAFB',      // Off white
  white: '#FFFFFF',           // White
  shadow: '#000000',          // Black for shadows
  danger: '#DC2626',          // Red
};

const CustomSelect = ({ options, placeholder, onSelect, label, multiple = false }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = useCallback((item) => {
    if (multiple) {
      setSelectedValues(prev => {
        const isSelected = prev.some(i => i.value === item.value);
        if (isSelected) {
          return prev.filter(i => i.value !== item.value);
        }
        return [...prev, item];
      });
    } else {
      setSelectedValues([item]);
      animateModal(false);
      if (onSelect) {
        onSelect(item);
      }
    }
  }, [multiple, onSelect]);

  const animateModal = useCallback((show) => {
    Animated.timing(modalAnimation, {
      toValue: show ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start(() => {
      if (!show) setShowModal(false);
    });
  }, []);

  const renderItem = useCallback(({ item }) => {
    const isSelected = selectedValues.some(i => i.value === item.value);
    
    return (
      <TouchableOpacity
        style={[
          styles.option,
          isSelected && styles.optionSelected,
        ]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.optionText,
          isSelected && styles.optionTextSelected,
        ]}>
          {item.label}
        </Text>
        {isSelected && (
          <MaterialIcons name="check" size={20} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    );
  }, [selectedValues, handleSelect]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => {
          setShowModal(true);
          animateModal(true);
        }}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.selectButtonText,
          (!selectedValues.length && styles.placeholderText)
        ]}>
          {selectedValues.length
            ? selectedValues.map(v => v.label).join(', ')
            : placeholder}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={COLORS.secondary}
        />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        statusBarTranslucent
        onRequestClose={() => animateModal(false)}
      >
        <BlurView intensity={90} style={StyleSheet.absoluteFill}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                opacity: modalAnimation,
                transform: [{
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                }],
              },
            ]}
          >
            <SafeAreaView style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label}</Text>
                <TouchableOpacity
                  onPress={() => animateModal(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialIcons name="close" size={24} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </SafeAreaView>
          </Animated.View>
        </BlurView>
      </Modal>
    </View>
  );
};

const RiskTravelSelector = ({
  selectedRiskFactors,
  handleSelectRiskFactors,
  travelRegion,
  setTravelRegion,
  riskFactorWeights,
  travelRiskFactors,
}) => {
  // Helper function moved to the top of the component
  const capitalizeWords = (str) =>
    str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const riskFactorItems = Object.keys(riskFactorWeights || {}).map((risk) => ({
    label: capitalizeWords(risk),
    value: risk,
  }));
  
  const travelRegionItems = Object.keys(travelRiskFactors || {}).map((region) => ({
    label: region,
    value: region,
  }));

  return (
    <View style={styles.selectorContainer}>
      <CustomSelect
        options={riskFactorItems}
        placeholder="Select health factors..."
        onSelect={handleSelectRiskFactors}
        label="Health Risk Factors"
        multiple={true}
      />
      
      <View style={styles.spacing} />
      
      <CustomSelect
        options={travelRegionItems}
        placeholder="Select travel region..."
        onSelect={setTravelRegion}
        label="Travel Region"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  selectorContainer: {
    padding: 16,
  },
  spacing: {
    height: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectButtonText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.textSecondary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height * 0.7,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  listContainer: {
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: COLORS.primaryLight,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
});

export default RiskTravelSelector;