import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Collaboration = () => {
  const inviteCollaborator = () => {
    console.log("Inviting a collaborator...");
    // Implement collaboration features
    Alert.alert("Collaborator Invited", "The collaborator has been invited to join.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Collaboration Tools</Text>
      <Text style={styles.description}>Invite team members to collaborate on qualitative analysis.</Text>
      <TouchableOpacity onPress={inviteCollaborator} style={styles.button}>
        <Text style={styles.buttonText}>Invite Collaborator</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4B4B4B',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Collaboration;
