import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ExpenseTracking = ({ onExpenseAdd }) => {
  const [expense, setExpense] = useState({ category: '', amount: '', date: '' });

  const handleAddExpense = () => {
    if (expense.category && expense.amount && expense.date) {
      onExpenseAdd(expense);
      setExpense({ category: '', amount: '', date: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracking</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={expense.category}
        onChangeText={(text) => setExpense({ ...expense, category: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={expense.amount}
        onChangeText={(text) => setExpense({ ...expense, amount: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={expense.date}
        onChangeText={(text) => setExpense({ ...expense, date: text })}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
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

export default ExpenseTracking;
