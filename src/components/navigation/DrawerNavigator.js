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
import Sidebar from '../Sidebar';
import BottomTabNavigator from './BottomTabNavigator';

// Import all screens
import VitalSigns from '../doctor/VitalSigns';
import CancelAppointment from '../patients/appointments/CancelAppointment';
import ProfileSettings from '../auth/ProfileSettings';
import Vaccination from '../patients/records/Vaccination';
import ChronicsContent from '../patients/chronics/ChronicsContent';
import Forum from '../forum/Forum';
import CaregiverResources from '../patients/CaregiverResources';
import Feedback from '../doctor/support/Feedback';
import MedicalDictionary from '../patients/MedicalDictionary';
import Emergencies from '../directory/Emergencies';
import FindHospitals from '../directory/FindHospitals';
import Pharmacies from '../directory/Pharmacies';
import ViewMedicalHistory from '../patients/consultations/ViewMedicalHistory';
import FindDoctors from '../directory/FindDoctors';

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
const CustomHeader = ({ navigation, route, options }) => {
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

const DrawerNavigator = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName="PatientHome"
        drawerContent={(props) => <Sidebar {...props} role="patient" />}
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
          drawerStyle: {
            backgroundColor: '#004d4d',
            width: 280,
            borderRightWidth: 0,
            overflow: 'hidden'
          },
          headerStyle: {
            backgroundColor: TANGERINE,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          swipeEnabled: true,
          drawerActiveBackgroundColor: TANGERINE,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          sceneContainerStyle: {
            backgroundColor: '#004d4d'
          },
        }}
      >
        <Drawer.Screen 
          name="PatientHome" 
          component={BottomTabNavigator}
          options={{ 
            headerTitle: 'CareWave',
            drawerIcon: ({color}) => (
              <Ionicons name="home" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Vitals" 
          component={VitalSigns}
          options={{ 
            headerTitle: 'Vital Signs',
            drawerIcon: ({color}) => (
              <Ionicons name="pulse" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Medical History" 
          component={ViewMedicalHistory}
          options={{ 
            headerTitle: 'Medical History',
            drawerIcon: ({color}) => (
              <Ionicons name="document-text" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Vaccination" 
          component={Vaccination}
          options={{ 
            headerTitle: 'Vaccination Records',
            drawerIcon: ({color}) => (
              <Ionicons name="medical" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Chronics" 
          component={ChronicsContent}
          options={{ 
            headerTitle: 'Chronic Conditions',
            drawerIcon: ({color}) => (
              <Ionicons name="fitness" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Forum" 
          component={Forum}
          options={{ 
            headerTitle: 'Health Forum',
            drawerIcon: ({color}) => (
              <Ionicons name="people" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Caregivers" 
          component={CaregiverResources}
          options={{ 
            headerTitle: 'Caregiver Resources',
            drawerIcon: ({color}) => (
              <Ionicons name="heart" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Emergency" 
          component={Emergencies}
          options={{ 
            headerTitle: 'Emergency Services',
            drawerIcon: ({color}) => (
              <Ionicons name="warning" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Dictionary" 
          component={MedicalDictionary}
          options={{ 
            headerTitle: 'Medical Dictionary',
            drawerIcon: ({color}) => (
              <Ionicons name="book" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Hospitals" 
          component={FindHospitals}
          options={{ 
            headerTitle: 'Find Hospitals',
            drawerIcon: ({color}) => (
              <Ionicons name="business" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Pharmacies" 
          component={Pharmacies}
          options={{ 
            headerTitle: 'Find Pharmacies',
            drawerIcon: ({color}) => (
              <Ionicons name="medkit" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Find Doctors" 
          component={FindDoctors}
          options={{ 
            headerTitle: 'Find Doctors',
            drawerIcon: ({color}) => (
              <Ionicons name="person" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Profile Settings" 
          component={ProfileSettings}
          options={{ 
            headerTitle: 'Profile Settings',
            drawerIcon: ({color}) => (
              <Ionicons name="settings" size={22} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="Feedback" 
          component={Feedback}
          options={{ 
            headerTitle: 'Send Feedback',
            drawerIcon: ({color}) => (
              <Ionicons name="chatbox" size={22} color={color} />
            )
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TANGERINE,
  },
  headerContainer: {
    backgroundColor: TANGERINE,
    borderBottomWidth: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  safeArea: {
    backgroundColor: TANGERINE,
    paddingTop: STATUSBAR_HEIGHT,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: TANGERINE,
    paddingHorizontal: 8,
  },
  menuButton: {
    padding: 8,
    marginRight: 4,
    borderRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
    borderRadius: 20,
  },
  profileButton: {
    padding: 4,
    marginLeft: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  notificationBadge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  searchModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBackButton: {
    padding: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  searchResults: {
    padding: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultIcon: {
    marginRight: 12,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchResultDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  searchResultType: {
    fontSize: 12,
    color: TANGERINE,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
  notificationsModal: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalBackButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  markReadButton: {
    padding: 8,
  },
  markReadText: {
    color: TANGERINE,
    fontSize: 14,
  },
  notificationsList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: TANGERINE,
    marginLeft: 8,
    alignSelf: 'center',
  },
  emptyNotifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyNotificationsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});

export default DrawerNavigator;