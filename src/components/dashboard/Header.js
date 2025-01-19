import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ userName, notificationCount, onNotificationPress, onProfilePress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.title}>Welcome {userName || 'Guest'}</Text>
          <Text style={styles.subtitle}>Your Health Dashboard</Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={onProfilePress} style={styles.profileIcon}>
            <Ionicons name="person-circle-outline" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onNotificationPress} style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#27c7b8',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5, // Adds a slight shadow for a more modern look
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5, // Space between title and subtitle
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    marginRight: 20,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;
