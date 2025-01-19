import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { 
  Mic, 
  MicOff, 
  PhoneOff, 
  Volume2, 
  VolumeX 
} from 'lucide-react-native';
import { MOCK_DOCTORS } from './mockData';

const AudioCall = ({ route, navigation }) => {
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, ongoing, ended
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  
  const doctorId = route.params?.doctorId;
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);

  useEffect(() => {
    requestPermissions();
    startCall();
    
    // Start timer when call connects
    let intervalId;
    if (callStatus === 'ongoing') {
      intervalId = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      clearInterval(intervalId);
      endCall();
    };
  }, [callStatus]);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message: "App needs access to your microphone for calls.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const { status } = await Audio.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Failed to get microphone permission');
    }
  };

  const startCall = async () => {
    if (!hasPermission) {
      Alert.alert('Error', 'Microphone permission is required for calls');
      return;
    }

    try {
      // Mock API call to initiate call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCallStatus('ongoing');
    } catch (err) {
      console.error('Failed to start call:', err);
      Alert.alert('Error', 'Failed to start call. Please try again.');
      navigation.goBack();
    }
  };

  const endCall = async () => {
    try {
      setCallStatus('ended');
      // Mock API call to end call
      await new Promise(resolve => setTimeout(resolve, 500));
      navigation.goBack();
    } catch (err) {
      console.error('Failed to end call:', err);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    // Add actual mute logic here
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(prev => !prev);
    // Add actual speaker toggle logic here
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <Image
            source={{ uri: doctor?.avatar || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <Text style={styles.doctorName}>{doctor?.name || 'Doctor'}</Text>
          <Text style={styles.callStatus}>
            {callStatus === 'connecting' ? 'Connecting...' : 
             callStatus === 'ongoing' ? formatDuration(callDuration) : 
             'Call ended'}
          </Text>
        </View>

        {/* Call Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, isMuted && styles.activeButton]}
            onPress={toggleMute}
          >
            {isMuted ? 
              <MicOff size={24} color="#fff" /> : 
              <Mic size={24} color="#fff" />
            }
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, styles.endCallButton]}
            onPress={endCall}
          >
            <PhoneOff size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, isSpeakerOn && styles.activeButton]}
            onPress={toggleSpeaker}
          >
            {isSpeakerOn ? 
              <Volume2 size={24} color="#fff" /> : 
              <VolumeX size={24} color="#fff" />
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  doctorInfo: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  callStatus: {
    fontSize: 16,
    color: '#aaa',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  endCallButton: {
    backgroundColor: '#FF4444',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default AudioCall;