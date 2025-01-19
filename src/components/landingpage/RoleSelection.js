import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RoleSelection() {
  const [role, setRole] = useState(null);
  const navigation = useNavigation();

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    navigation.navigate('Home', { role: selectedRole }); // Navigate to the Home screen with the selected role
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <Button 
        title="Patient" 
        onPress={() => selectRole('Patient')}
        color="#007bff"
      />
      <Button 
        title="Healthcare Provider" 
        onPress={() => selectRole('Healthcare Provider')}
        color="#007bff"
      />
      <Button 
        title="Administrator" 
        onPress={() => selectRole('Administrator')}
        color="#007bff"
      />

      {role && (
        <Text style={styles.selectedRole}>Selected Role: {role}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectedRole: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelection;
