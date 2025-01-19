import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// Generic form for calculators
const CalculatorForm = ({ onSubmit, initialValues, fields, score, result }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <View style={styles.formContainer}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}:</Text>
          {field.type === "checkbox" ? (
            <TextInput
              style={styles.input}
              value={values[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
              placeholder={field.label}
            />
          ) : (
            <TextInput
              style={styles.input}
              value={values[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
              keyboardType={field.type === "number" ? "numeric" : "default"}
              placeholder={field.label}
            />
          )}
        </View>
      ))}

      <Button title="Calculate" onPress={handleSubmit} />

      {score !== null && (
        <Text style={styles.result}>Score: {score}</Text>
      )}
      {result && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#f9f9f9",
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
});

export default CalculatorForm;
