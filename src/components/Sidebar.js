import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const Sidebar = ({ navigation, activeRoute = 'PatientHome' }) => {
  const insets = useSafeAreaInsets();
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const navItems = [
    {
      title: 'QuickCare',
      icon: 'robot-industrial',
      items: [
        { href: 'Emergency', label: 'Emergencies', icon: 'alert-octagon-outline' },
        { href: 'Hospitals', label: 'Find Hospitals', icon: 'hospital-building' },
        { href: 'FindDoctors', label: 'Find Doctors', icon: 'account-heart-outline' },
        { href: 'Pharmacies', label: 'Find Pharmacies', icon: 'medication-outline' },
      ],
    },
    {
      title: 'Explore',
      icon: 'compass-outline',
      items: [
        { href: 'Dictionary', label: 'Medical Dictionary', icon: 'book-open-page-variant-outline' },
        { href: 'Feedback', label: 'Provide Feedback', icon: 'message-draw' },
      ],
    },
  ];

  const handlePress = (href) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate(href);
  };

  const renderNavItem = (item, isChild = false) => {
    const isActive = activeRoute === item.href;
    const isHovered = hoveredItem === item.href;

    return (
      <TouchableOpacity
        key={item.href}
        style={[
          styles.navItem,
          isChild && styles.childNavItem,
          isActive && styles.activeNavItem,
          isHovered && styles.hoveredNavItem,
        ]}
        onPress={() => handlePress(item.href)}
        onPressIn={() => setHoveredItem(item.href)}
        onPressOut={() => setHoveredItem(null)}
      >
        <Animated.View style={[
          styles.iconContainer,
          isActive && styles.activeIconContainer
        ]}>
          <Icon 
            name={item.icon} 
            size={22} 
            color={isActive ? '#FFFFFF' : '#94A3B8'} 
          />
        </Animated.View>
        <Text style={[
          styles.navItemText,
          isActive && styles.activeNavItemText,
        ]}>
          {item.label}
        </Text>
        {isActive && (
          <View style={styles.activeIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>
        <Text style={styles.userName}>Jjingo Farouk</Text>
        <Text style={styles.userRole}>Doctor</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderNavItem({
          href: 'PatientHome',
          label: 'Home',
          icon: 'home-variant',
        })}

        {navItems.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name={section.icon} size={18} color="#64748B" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item) => renderNavItem(item, true))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog-outline" size={22} color="#94A3B8" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004d4d', // Darker teal for better contrast
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)', // Lighter border for better visibility
    width: 280,
    overflow: 'hidden',
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: '#002432 ', // Darker background for better contrast
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#34d8c8', // Brighter teal for better visibility
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e', // Brighter green for better visibility
    borderWidth: 2,
    borderColor: '#162435',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#cbd5e1', // Lighter gray for better contrast
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,    

  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8', // Lighter gray for better contrast
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,   

    borderRadius: 12,
    marginBottom: 4,
    position: 'relative',
  },
  childNavItem: {
    marginLeft: 8,
  },
  activeNavItem: {
    backgroundColor: 'rgba(52, 216, 200, 0.2)', // Brighter active state
  },
  hoveredNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighter hover state
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighter background
  },
  activeIconContainer: {
    backgroundColor: '#34d8c8', // Brighter teal for active state
  },
  navItemText: {
    fontSize: 14,
    color: '#f1f5f9', // Very light gray for better contrast
    fontWeight: '500',
  },
  activeNavItemText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -2 }],
    width: 4,
    height: 16,
    backgroundColor: '#34d8c8', // Brighter teal for active indicator
    borderRadius: 2,
  },
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighter background
  },
  settingsText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default Sidebar;