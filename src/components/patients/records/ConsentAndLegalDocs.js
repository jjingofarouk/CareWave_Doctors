
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ConsentAndLegalDocs() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consent & Legal Docs</Text>
      <Text style={styles.content}>Here you can review the consent and legal documents related to your care.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

export default ConsentAndLegalDocs;
