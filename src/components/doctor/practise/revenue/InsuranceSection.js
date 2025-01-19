import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const InsuranceSection = ({ insurance, setInsurance, show }) => {
  if (!show) return null;

  return (
    <View style={styles.section}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="shield-check" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Insurance Provider"
          placeholderTextColor="#9CA3AF"
          value={insurance.provider}
          onChangeText={(text) => setInsurance({ ...insurance, provider: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="file-document-outline" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Claim Number"
          placeholderTextColor="#9CA3AF"
          value={insurance.claimNumber}
          onChangeText={(text) => setInsurance({ ...insurance, claimNumber: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="currency-usd" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Copay Amount"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={insurance.copayAmount}
          onChangeText={(text) => setInsurance({ ...insurance, copayAmount: text })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#374151',
  },
});

export default InsuranceSection;