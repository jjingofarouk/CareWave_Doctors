// components/DoctorHome/DashboardHeader.js
import React from 'react';
import { View, TouchableOpacity, Image, Text, Badge } from 'react-native';
import { Avatar } from '../utils/Avatar';
import { Bell, Settings } from 'lucide-react-native';
import { useTheme } from '../utils/useTheme';

const DashboardHeader = ({ 
  doctorName, 
  onlineStatus, 
  avatarUrl, 
  notificationCount,
  onNotificationPress,
  onSettingsPress 
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Avatar 
          size="large" 
          source={{ uri: avatarUrl }}
          onlineStatus={onlineStatus}
        />
        <View style={styles.titleSection}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.doctorName}>{doctorName}</Text>
        </View>
      </View>
      
      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onNotificationPress}
        >
          <Bell color={theme.colors.primary} size={24} />
          {notificationCount > 0 && (
            <Badge count={notificationCount} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onSettingsPress}
        >
          <Settings color={theme.colors.primary} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  // ... additional styles
};

export default DashboardHeader;