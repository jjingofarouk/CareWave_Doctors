// components/revenue/PaymentStatus.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PaymentStatus = ({ payments }) => {
  const renderPaymentItem = ({ item }) => (
    <View style={[styles.paymentItem, { backgroundColor: getStatusColor(item.status) }]}>
      <Text style={styles.paymentService}>{item.service}</Text>
      <Text style={styles.paymentAmount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.paymentStatus}>{item.status}</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return '#e8f5e9';
      case 'pending':
        return '#fff3e0';
      case 'overdue':
        return '#ffebee';
      default:
        return '#fff';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Status</Text>
      <FlatList
        data={payments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentService: {
    flex: 2,
    fontSize: 16,
  },
  paymentAmount: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  paymentStatus: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});

export default PaymentStatus;