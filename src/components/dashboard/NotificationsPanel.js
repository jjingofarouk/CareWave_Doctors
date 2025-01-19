// components/DoctorHome/NotificationsPanel.js
import React from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { Bell, Clock } from 'lucide-react-native';
import { useTheme } from '../utils/useTheme';

const NotificationsPanel = ({ 
  notifications, 
  onViewAll, 
  onNotificationPress 
}) => {
  const { theme } = useTheme();

  const NotificationItem = ({ notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification
      ]}
      onPress={() => onNotificationPress(notification)}
    >
      <View style={[
        styles.iconContainer,
        { backgroundColor: notification.type === 'urgent' ? '#FFE0E0' : '#E3F2FD' }
      ]}>
        <Bell
          size={20}
          color={notification.type === 'urgent' ? '#D32F2F' : '#1976D2'}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationText} numberOfLines={2}>
          {notification.message}
        </Text>
        <View style={styles.timeContainer}>
          <Clock size={12} color="#666" />
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Notifications</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
      />
    </View>
  );
};

const styles = {
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  // ... additional styles
};

export default NotificationsPanel;
