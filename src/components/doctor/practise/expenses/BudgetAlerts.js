import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BudgetAlerts = ({ onAlertSet }) => {
  const [budget, setBudget] = useState({ category: '', limit: '' });

  const handleSetAlert = () => {
    if (budget.category && budget.limit) {
      onAlertSet(budget);
      setBudget({ category: '', limit: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Budget Alerts</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={budget.category}
        onChangeText={(text) => setBudget({ ...budget, category: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Limit"
        keyboardType="numeric"
        value={budget.limit}
        onChangeText={(text) => setBudget({ ...budget, limit: text })}
      />
      <Button title="Set Alert" onPress={handleSetAlert} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
});

export default BudgetAlerts;
