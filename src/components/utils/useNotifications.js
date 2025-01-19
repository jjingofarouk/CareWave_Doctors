// hooks/useNotifications.js
import { useState, useEffect, useCallback } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState(false);

  // Request notification permissions
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled = 
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        setPermission(enabled);
        return enabled;
      } else {
        setPermission(true);
        return true;
      }
    } catch (err) {
      setError('Failed to request notification permissions');
      setPermission(false);
      return false;
    }
  };

  // Load stored notifications from AsyncStorage
  const loadStoredNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem('notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (err) {
      setError('Failed to load stored notifications');
    } finally {
      setLoading(false);
    }
  };

  // Save notifications to AsyncStorage
  const saveNotifications = async (updatedNotifications) => {
    try {
      await AsyncStorage.setItem(
        'notifications',
        JSON.stringify(updatedNotifications)
      );
    } catch (err) {
      setError('Failed to save notifications');
    }
  };

  // Add a new notification
  const addNotification = useCallback(async (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      saveNotifications(updated);
      return updated;
    });
  }, []);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    setNotifications(prev => {
      const updated = prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );
      saveNotifications(updated);
      return updated;
    });
  }, []);

  // Remove a notification
  const removeNotification = useCallback(async (notificationId) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== notificationId);
      saveNotifications(updated);
      return updated;
    });
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(async () => {
    setNotifications([]);
    await AsyncStorage.removeItem('notifications');
  }, []);

  // Handle incoming notifications
  const handleNotification = useCallback((remoteMessage) => {
    const notification = {
      id: remoteMessage.messageId,
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      data: remoteMessage.data,
      type: remoteMessage.data?.type || 'default',
      timestamp: new Date().toISOString(),
      read: false,
    };
    addNotification(notification);
  }, [addNotification]);

  useEffect(() => {
    const initialize = async () => {
      await requestPermissions();
      await loadStoredNotifications();

      // Handle notifications when app is in background
      messaging().onNotificationOpenedApp(handleNotification);

      // Handle notifications when app is in foreground
      const unsubscribe = messaging().onMessage(handleNotification);

      // Check if app was launched from a notification
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            handleNotification(remoteMessage);
          }
        });

      return () => {
        unsubscribe();
      };
    };

    initialize();
  }, [handleNotification]);

  return {
    notifications,
    loading,
    error,
    permission,
    addNotification,
    markAsRead,
    removeNotification,
    clearAllNotifications,
    requestPermissions,
  };
};
