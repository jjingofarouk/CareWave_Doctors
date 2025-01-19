import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RevenueHeader = ({ 
  totalRevenue, 
  pendingPayments, 
  currencySymbol,
  formatAmount
}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.header}>Revenue Management</Text>
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Total Revenue</Text>
        <Text style={styles.statValue}>
          {formatAmount(totalRevenue)}
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Pending</Text>
        <Text style={styles.statValue}>
          {formatAmount(pendingPayments)}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default RevenueHeader;