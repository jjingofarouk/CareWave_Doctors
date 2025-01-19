import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  Lock,
  Image as ImageIcon,
  Trash2,
  Block,
  Flag,
  ChevronRight,
} from 'lucide-react-native';
import { MOCK_DOCTORS } from './mockData';

const ChatSettings = ({ route, navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [muteChat, setMuteChat] = useState(false);
  const [mediaVisibility, setMediaVisibility] = useState(true);
  
  const doctorId = route.params?.doctorId;
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);

  const handleClearChat = () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // Add clear chat logic here
            Alert.alert('Success', 'Chat cleared successfully');
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handleBlockDoctor = () => {
    Alert.alert(
      'Block Doctor',
      'Are you sure you want to block this doctor?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            // Add block logic here
            Alert.alert('Success', 'Doctor blocked successfully');
            navigation.navigate('Doctors');
          },
        },
      ],
    );
  };

  const handleReport = () => {
    Alert.alert(
      'Report Doctor',
      'Please select a reason for reporting:',
      [
        {
          text: 'Inappropriate Behavior',
          onPress: () => reportDoctor('inappropriate'),
        },
        {
          text: 'Unprofessional Conduct',
          onPress: () => reportDoctor('unprofessional'),
        },
        {
          text: 'Other',
          onPress: () => reportDoctor('other'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const reportDoctor = (reason) => {
    // Add report logic here
    Alert.alert(
      'Report Submitted',
      'Thank you for your report. We will review it shortly.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Doctor Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: doctor?.avatar || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <Text style={styles.doctorName}>{doctor?.name || 'Doctor'}</Text>
          <Text style={styles.specialty}>{doctor?.specialty || 'Specialist'}</Text>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.setting}>
            <View style={styles.settingLeft}>
              <Bell size={24} color="#333" />
              <Text style={styles.settingText}>Chat Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              ios_backgroundColor="#ccc"
            />
          </View>
          <View style={styles.setting}>
            <View style={styles.settingLeft}>
              <Bell size={24} color="#333" />
              <Text style={styles.settingText}>Mute Chat</Text>
            </View>
            <Switch
              value={muteChat}
              onValueChange={setMuteChat}
              ios_backgroundColor="#ccc"
            />
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <TouchableOpacity style={styles.setting}>
            <View style={styles.settingLeft}>
              <Lock size={24} color="#333" />
              <Text style={styles.settingText}>Encryption</Text>
            </View>
            <ChevronRight size={24} color="#666" />
          </TouchableOpacity>
          <View style={styles.setting}>
            <View style={styles.settingLeft}>
              <ImageIcon size={24} color="#333" />
              <Text style={styles.settingText}>Media Visibility</Text>
            </View>
            <Switch
              value={mediaVisibility}
              onValueChange={setMediaVisibility}
              ios_backgroundColor="#ccc"
            />
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <TouchableOpacity 
            style={[styles.setting, styles.dangerSetting]}
            onPress={handleClearChat}
          >
            <View style={styles.settingLeft}>
              <Trash2 size={24} color="#FF4444" />
              <Text style={[styles.settingText, styles.dangerText]}>
                Clear Chat
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.setting, styles.dangerSetting]}
            onPress={handleBlockDoctor}
          >
            <View style={styles.settingLeft}>
              <Block size={24} color="#FF4444" />
              <Text style={[styles.settingText, styles.dangerText]}>
                Block Doctor
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.setting, styles.dangerSetting]}
            onPress={handleReport}
          >
            <View style={styles.settingLeft}>
              <Flag size={24} color="#FF4444" />
              <Text style={[styles.settingText, styles.dangerText]}>
                Report Doctor
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All messages are end-to-end encrypted
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  dangerSetting: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  dangerText: {
    color: '#FF4444',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  lastSetting: {
    borderBottomWidth: 0,
  },
});

export default ChatSettings;