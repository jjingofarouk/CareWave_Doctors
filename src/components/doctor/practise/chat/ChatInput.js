import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

const COLORS = {
  primary: '#2B68E6',
  error: '#E53935',
  border: '#E5E5E5',
  inputBackground: '#F5F5F5',
  white: '#FFFFFF',
  placeholder: '#9E9E9E',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const ChatInput = ({ onSend, onAttachmentsSelected }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recording = useRef(null);
  const recordingAnimation = useRef(new Animated.Value(0)).current;

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recording.current = recording;
      setIsRecording(true);
      startRecordingAnimation();
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.current.stopAndUnloadAsync();
      const uri = recording.current.getURI();
      setIsRecording(false);
      stopRecordingAnimation();
      
      if (uri) {
        onAttachmentsSelected([{
          type: 'audio',
          uri,
          duration: recordingDuration
        }]);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const startRecordingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(recordingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(recordingAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  const stopRecordingAnimation = () => {
    recordingAnimation.stopAnimation();
    recordingAnimation.setValue(0);
  };

  const renderActionButton = () => {
    if (message.length > 0) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            onSend(message);
            setMessage('');
          }}
        >
          <View style={styles.sendButton}>
            <Feather name="send" size={20} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.iconButton}
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <Animated.View style={{
          opacity: recordingAnimation,
          transform: [{
            scale: recordingAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.2]
            })
          }]
        }}>
          <Feather
            name={isRecording ? "mic-off" : "mic"}
            size={24}
            color={isRecording ? COLORS.error : COLORS.primary}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.attachmentButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => pickImage()}>
            <Feather name="image" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => pickDocument()}>
            <Feather name="paperclip" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.placeholder}
          multiline
          maxHeight={100}
        />
        
        {renderActionButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  attachmentButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  iconButton: {
    padding: 4,
    marginHorizontal: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
    color: '#000000',
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});