import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const IncomeTracking = ({ onIncomeAdd }) => {
  const [income, setIncome] = useState({ amount: '', source: '', date: '' });

  const handleAddIncome = () => {
    if (income.amount && income.source && income.date) {
      onIncomeAdd(income);
      setIncome({ amount: '', source: '', date: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income Tracking</Text>
      <TextInput
        style={styles.input}
        placeholder="Source"
        value={income.source}
        onChangeText={(text) => setIncome({ ...income, source: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={income.amount}
        onChangeText={(text) => setIncome({ ...income, amount: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={income.date}
        onChangeText={(text) => setIncome({ ...income, date: text })}
      />
      <Button title="Add Income" onPress={handleAddIncome} />
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

export default IncomeTracking;
