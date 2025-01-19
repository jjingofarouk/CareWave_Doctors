import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdvancedFinancialReporting = ({ revenue, expenses }) => {
  const totalRevenue = revenue.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advanced Financial Reporting</Text>
      <Text>Total Revenue: ${totalRevenue.toFixed(2)}</Text>
      <Text>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      <Text>Net Profit: ${netProfit.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default AdvancedFinancialReporting;
