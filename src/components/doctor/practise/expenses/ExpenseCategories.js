import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ExpenseCategories = ({ onCategoryAdd }) => {
  const [category, setCategory] = useState('');

  const handleAddCategory = () => {
    if (category) {
      onCategoryAdd(category);
      setCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Categories</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Category Name"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Category" onPress={handleAddCategory} />
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

export default ExpenseCategories;
