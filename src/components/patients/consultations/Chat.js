import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  KeyboardAvoidingView,
  Animated,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from './styles';

const MOCK_DOCTOR = {
  id: 'dr_smith',
  name: 'Dr. Emily Smith',
  specialty: 'General Practitioner',
  avatar: 'https://example.com/doctor-avatar.jpg',
  status: 'online'
};

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm Dr. Emily Smith. Before we begin, could you briefly describe what brings you in today?",
      sender: 'doctor',
      timestamp: new Date(),
      status: 'read'
    },
    {
      id: '2',
      text: "I've been experiencing persistent headaches for the past week.",
      sender: 'patient',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      status: 'read'
    },
    {
      id: '3',
      text: "I understand. Could you tell me more about the nature of these headaches? For example, where is the pain located and how would you describe its intensity?",
      sender: 'doctor',
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      status: 'sent'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const flatListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() || attachments.length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'doctor',
        timestamp: new Date(),
        status: 'sent',
        attachments: attachments
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');
      setAttachments([]);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7
    });

    if (!result.canceled) {
      const newAttachments = result.assets.map(asset => ({
        type: 'image',
        uri: asset.uri
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      multiple: true
    });

    if (result.type === 'success') {
      const newAttachments = result.assets.map(asset => ({
        type: 'document',
        uri: asset.uri,
        name: asset.name
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const renderMessage = ({ item }) => {
    const isDoctor = item.sender === 'doctor';

    return (
      <Animated.View style={[
        styles.messageContainer,
        isDoctor ? styles.doctorMessage : styles.patientMessage,
        { opacity: fadeAnim }
      ]}>
        {isDoctor && (
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: MOCK_DOCTOR.avatar }}
              style={styles.avatarSmall}
            />
            <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isDoctor ? styles.doctorBubble : styles.patientBubble
        ]}>
          <Text style={[
            styles.messageText,
            isDoctor ? styles.doctorText : styles.patientText
          ]}>
            {item.text}
          </Text>
          
          {item.attachments?.map((attachment, index) => (
            <View key={index} style={styles.attachmentContainer}>
              {attachment.type === 'image' ? (
                <Image
                  source={{ uri: attachment.uri }}
                  style={styles.attachmentImage}
                />
              ) : (
                <View style={styles.documentAttachment}>
                  <Feather name="file" size={24} color="#4A90E2" />
                  <Text style={styles.documentName} numberOfLines={1}>
                    {attachment.name || 'Document'}
                  </Text>
                </View>
              )}
            </View>
          ))}
          
          <View style={styles.messageFooter}>
            <Text style={styles.timestampText}>
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
            {isDoctor && (
              <Text style={styles.statusText}>
                {item.status === 'read' ? '✓✓' : '✓'}
              </Text>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  const ChatHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.headerButton}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.headerContent}>
        <View style={styles.headerProfile}>
          <Image
            source={{ uri: MOCK_DOCTOR.avatar }}
            style={styles.avatarMedium}
          />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{MOCK_DOCTOR.name}</Text>
            <Text style={styles.headerStatus}>
              {MOCK_DOCTOR.specialty} • {MOCK_DOCTOR.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="phone" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Start Video Call')}
            style={styles.headerButton}
          >
            <MaterialIcons name="video-call" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="more-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader />
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />
      
      {attachments.length > 0 && (
        <View style={styles.attachmentPreviewContainer}>
          <FlatList
            data={attachments}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.attachmentPreview}>
                {item.type === 'image' ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.attachmentPreviewImage}
                  />
                ) : (
                  <View style={styles.documentPreview}>
                    <Feather name="file" size={24} color="#4A90E2" />
                    <Text style={styles.documentPreviewName} numberOfLines={1}>
                      {item.name || 'Document'}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setAttachments(attachments.filter((_, i) => i !== index));
                  }}
                  style={styles.removeAttachmentButton}
                >
                  <Feather name="x" size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <View style={styles.inputActions}>
            <TouchableOpacity onPress={pickImage} style={styles.actionButton}>
              <Feather name="image" size={24} color="#4A90E2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickDocument} style={styles.actionButton}>
              <Feather name="paperclip" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            multiline
            maxHeight={100}
          />
          
          <TouchableOpacity
            onPress={sendMessage}
            style={[
              styles.sendButton,
              (!inputMessage.trim() && !attachments.length) && styles.sendButtonDisabled
            ]}
            disabled={!inputMessage.trim() && !attachments.length}
          >
            <Feather
              name="send"
              size={24}
              color={!inputMessage.trim() && !attachments.length ? '#ccc' : '#4A90E2'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
