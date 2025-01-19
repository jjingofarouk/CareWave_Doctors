import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomSelect from '../../../utils/CustomSelect';

export const PaymentSection = ({ payment, setPayment }) => {
  const paymentMethods = [
    { label: 'Cash', value: 'cash' },
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
  ];

  const paymentStatuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Received', value: 'received' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.selectContainer}>
        <CustomSelect
          options={paymentMethods}
          placeholder="Select Payment Method"
          onSelect={(option) => setPayment({ ...payment, method: option.value })}
          value={paymentMethods.find(method => method.value === payment.method)}
          label="Payment Method"
        />
      </View>

      <View style={styles.selectContainer}>
        <CustomSelect
          options={paymentStatuses}
          placeholder="Select Payment Status"
          onSelect={(option) => setPayment({ ...payment, status: option.value })}
          value={paymentStatuses.find(status => status.value === payment.status)}
          label="Payment Status"
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
  },
  selectContainer: {
    marginBottom: 12,
  },
});

export default PaymentSection;