import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
  View, 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Fuse from 'fuse.js';
import moment from 'moment';

import { styles } from './DrawerNavigator';

const Drawer = createDrawerNavigator();


const TANGERINE = '#004d4d';
const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Notification type definitions for better organization
const NOTIFICATION_TYPES = {
  APPOINTMENT: 'appointment',
  MESSAGE: 'message',
  REMINDER: 'reminder',
  ALERT: 'alert'
};

// Sample notifications data structure
const DEFAULT_NOTIFICATIONS = [
  {
    id: '1',
    type: NOTIFICATION_TYPES.APPOINTMENT,
    title: 'Upcoming Appointment',
    message: 'Dr. Smith tomorrow at 10:00 AM',
    timestamp: new Date(),
    read: false,
    data: {
      appointmentId: 'apt123',
      doctorId: 'dr456'
    }
  },
  {
    id: '2',
    type: NOTIFICATION_TYPES.MESSAGE,
    title: 'New Message',
    message: 'Lab results are ready',
    timestamp: new Date(),
    read: false,
    data: {
      messageId: 'msg789'
    }
  },
  {
    id: '3',
    type: NOTIFICATION_TYPES.REMINDER,
    title: 'Medication Reminder',
    message: 'Time to take your evening medication',
    timestamp: new Date(),
    read: true,
    data: {
      medicationId: 'med101'
    }
  }
];

// Notification Item Component
const NotificationItem = ({ notification, onPress }) => {
  const backgroundColor = notification.read ? '#ffffff' : '#f0f9ff';
  
  const getNotificationIcon = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.APPOINTMENT:
        return 'calendar';
      case NOTIFICATION_TYPES.MESSAGE:
        return 'mail';
      case NOTIFICATION_TYPES.REMINDER:
        return 'alarm';
      case NOTIFICATION_TYPES.ALERT:
        return 'warning';
      default:
        return 'notifications';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.notificationItem, { backgroundColor }]}
      onPress={() => onPress(notification)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons 
          name={getNotificationIcon()} 
          size={24} 
          color={TANGERINE} 
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>
          {moment(notification.timestamp).fromNow()}
        </Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

// Global Search Results Item Component
const SearchResultItem = ({ item, onPress }) => {
  const getIconName = () => {
    switch (item.type) {
      case 'appointment':
        return 'calendar';
      case 'doctor':
        return 'person';
      case 'hospital':
        return 'business';
      case 'medication':
        return 'medical';
      case 'record':
        return 'document-text';
      default:
        return 'search';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.searchResultItem}
      onPress={() => onPress(item)}
    >
      <View style={styles.searchResultIcon}>
        <Ionicons name={getIconName()} size={24} color={TANGERINE} />
      </View>
      <View style={styles.searchResultContent}>
        <Text style={styles.searchResultTitle}>{item.title}</Text>
        <Text style={styles.searchResultDescription}>{item.description}</Text>
        <Text style={styles.searchResultType}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Global Search Component
const GlobalSearch = ({ visible, onClose, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;

  // Sample search data - in a real app, this would come from your backend
  const searchableContent = [
    {
      id: '1',
      title: 'Dr. John Smith',
      description: 'Cardiologist - Available next week',
      type: 'doctor'
    },
    {
      id: '2',
      title: 'Central Hospital',
      description: '123 Healthcare Ave',
      type: 'hospital'
    },
    {
      id: '3',
      title: 'Blood Pressure Record',
      description: 'Last reading: 120/80',
      type: 'record'
    }
  ];

  const fuse = new Fuse(searchableContent, {
    keys: ['title', 'description', 'type'],
    includeScore: true,
    threshold: 0.4
  });

  useEffect(() => {
    if (visible) {
      Animated.spring(searchAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 30,
        friction: 7
      }).start();
    }
  }, [visible]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      if (query.trim() === '') {
        setSearchResults([]);
      } else {
        const results = fuse.search(query);
        setSearchResults(results.map(result => result.item));
      }
      setIsLoading(false);
    }, 300);
  };

  const handleResultPress = (item) => {
    // Navigate to appropriate screen based on result type
    switch (item.type) {
      case 'doctor':
        navigation.navigate('FindDoctors', { doctorId: item.id });
        break;
      case 'hospital':
        navigation.navigate('Hospitals', { hospitalId: item.id });
        break;
      case 'record':
        navigation.navigate('ViewMedicalHistory', { recordId: item.id });
        break;
      default:
        console.log('Unknown result type:', item.type);
    }
    onClose();
  };

  const translateY = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH, 0]
  });

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          styles.searchModal,
          { transform: [{ translateY }] }
        ]}
      >
        <SafeAreaView style={styles.searchContainer}>
          <View style={styles.searchHeader}>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.searchBackButton}
            >
              <Ionicons name="arrow-back" size={24} color={TANGERINE} />
            </TouchableOpacity>
            <View style={styles.searchInputContainer}>
              <Ionicons 
                name="search" 
                size={20} 
                color="#666" 
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search everything..."
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity 
                  onPress={() => handleSearch('')}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={TANGERINE} />
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SearchResultItem 
                  item={item}
                  onPress={handleResultPress}
                />
              )}
              contentContainerStyle={styles.searchResults}
              ListEmptyComponent={
                searchQuery.length > 0 ? (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>
                      No results found for "{searchQuery}"
                    </Text>
                  </View>
                ) : null
              }
            />
          )}
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
};

// Custom Header Component
export const CustomHeader = ({ navigation, route, options }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationPress = (notification) => {
    // Mark notification as read
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);

    // Navigate based on notification type
    switch (notification.type) {
      case NOTIFICATION_TYPES.APPOINTMENT:
        navigation.navigate('Manage Appointments', notification.data);
        break;
      case NOTIFICATION_TYPES.MESSAGE:
        navigation.navigate('Lab Tests & Results', notification.data);
        break;
      case NOTIFICATION_TYPES.REMINDER:
        navigation.navigate('Medications', notification.data);
        break;
      default:
        console.log('Unknown notification type:', notification.type);
    }
    setNotificationsVisible(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <StatusBar
          backgroundColor={TANGERINE}
          barStyle="light-content"
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={navigation.toggleDrawer}
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>
              {options.headerTitle || route.name}
            </Text>

            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setSearchVisible(true)}
              >
                <Ionicons name="search" size={22} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setNotificationsVisible(true)}
              >
                <View>
                  <Ionicons name="notifications-outline" size={22} color="white" />
                  {unreadCount > 0 && (
                    <View style={styles.notificationBadge}>
                      <Text style={styles.notificationCount}>
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => navigation.navigate('Doctor Profile')}
              >
                <Image
                  source={{ uri: 'https://via.placeholder.com/40' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <GlobalSearch 
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        navigation={navigation}
      />

      <Modal
        visible={notificationsVisible}
        animationType="slide"
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <SafeAreaView style={styles.notificationsModal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setNotificationsVisible(false)}
              style={styles.modalBackButton}
            >
              <Ionicons name="arrow-back" size={24} color={TANGERINE} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Notifications</Text>
            {unreadCount > 0 && (
              <TouchableOpacity 
                onPress={markAllAsRead}
                style={styles.markReadButton}
              >
                <Text style={styles.markReadText}>Mark all as read</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NotificationItem
                notification={item}
                onPress={handleNotificationPress}
              />
            )}
            contentContainerStyle={styles.notificationsList}
            ListEmptyComponent={
              <View style={styles.emptyNotifications}>
                <Ionicons 
                  name="notifications-off-outline" 
                  size={48} 
                  color="#666"
                />
                <Text style={styles.emptyNotificationsText}>
                  No notifications yet
                </Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};