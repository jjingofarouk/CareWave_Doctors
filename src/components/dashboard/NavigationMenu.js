import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavigationMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}><Text>Appointments</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>Patient List</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>Patient History</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>Health Records</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>Messages</Text></TouchableOpacity>
      <TouchableOpacity style={styles.item}><Text>Tasks</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#f78837',
    borderRadius: 5,
  },
});

export default NavigationMenu;
