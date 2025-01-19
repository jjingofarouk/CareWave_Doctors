import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Notifications = () => {
  // Sample notifications array, replace it with your data source
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'You have a new appointment scheduled for tomorrow at 3:00 PM.', date: '2024-12-09' },
    { id: '2', message: 'Your lab results are now available for review.', date: '2024-12-08' },
    { id: '3', message: 'Reminder: Take your medication at 9:00 AM.', date: '2024-12-07' },
    { id: '4', message: 'New referral received for your consultation.', date: '2024-12-06' },
  ]);

  useEffect(() => {
    // Fetch notifications from an API or database here
    // Example:
    // fetchNotifications();
  }, []);

  // Render each notification item
  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationCard}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      
      {/* List of notifications */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54', // Deep Teal
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
  },
  notificationDate: {
    fontSize: 14,
    color: '#777',
  },
});

export default Notifications;
