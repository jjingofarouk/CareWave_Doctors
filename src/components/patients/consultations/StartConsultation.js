import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ConsultationOption = ({ to, IconComponent = Icon, iconName, text, badge }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate(to)} 
      style={styles.gridItem}
    >
      <LinearGradient
        colors={['#ffffff', '#f1f1f1']}
        style={styles.gridItemGradient}
      >
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['#1A8A74', '#4CC9A2']} // Green gradient for a calming effect
            style={styles.iconGradient}
          >
            <IconComponent name={iconName} style={styles.icon} />
          </LinearGradient>
        </View>
        <Text style={styles.text}>{text}</Text>
        {badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>{badge}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const MoreOption = ({ to, IconComponent = Icon, iconName, text }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate(to)} 
      style={styles.moreOption}
    >
      <View style={styles.moreOptionIcon}>
        <LinearGradient
          colors={['#1A8A74', '#4CC9A2']} // Green gradient for consistency
          style={styles.moreIconGradient}
        >
          <IconComponent name={iconName} style={styles.iconSmall} />
        </LinearGradient>
      </View>
      <Text style={styles.moreOptionText}>{text}</Text>
      <Icon name="chevron-right" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const ManageConsultations = () => {
  const consultationOptions = [
    { to: "Chat with Doctor", IconComponent: Icon, iconName: "video", text: "Start  Consultation" },
    { to: "Manage Appointments", IconComponent: Icon, iconName: "calendar-check", text: "Manage Appointments" },
  ];

  const moreOptions = [
    { to: "Your Consultation Notes", IconComponent: Icon, iconName: "note-text", text: "Review Consultation Notes" },
    { to: "Doctor Profile", IconComponent: Icon, iconName: "file-document", text: "Update Your Profile" },
    { to: "Consultation History", IconComponent: Icon, iconName: "pill", text: "Consultation History" },
  ];

  return (
    <ImageBackground
      source={require('../../images/bg2.jpg')}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
        style={styles.overlay}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Manage Consultations</Text>
              <Text style={styles.subtitle}>
                View your scheduled consultations, respond to patient requests, and access practice tools.
              </Text>
            </View>

            <View style={styles.gridContainer}>
              {consultationOptions.map((option, index) => (
                <ConsultationOption key={index} {...option} />
              ))}
            </View>

            <View style={styles.moreOptionsCard}>
              <Text style={styles.cardTitle}>Practice Management Tools</Text>
              {moreOptions.map((option, index) => (
                <MoreOption key={index} {...option} />
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  gridItem: {
    width: width * 0.44,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  gridItemGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconGradient: {
    padding: 16,
    borderRadius: 50,
  },
  icon: {
    fontSize: 24,
    color: '#ffffff',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF4757',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  moreOptionsCard: {
    marginTop: 36,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  moreOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  moreOptionIcon: {
    marginRight: 16,
  },
  moreIconGradient: {
    padding: 10,
    borderRadius: 12,
  },
  iconSmall: {
    fontSize: 20,
    color: '#ffffff',
  },
  moreOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.3,
  },
  chevron: {
    fontSize: 20,
    color: '#4CC9A2', // Light green for chevron to match the premium style
  },
});

export default ManageConsultations;
