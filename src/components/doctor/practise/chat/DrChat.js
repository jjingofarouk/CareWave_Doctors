import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  Alert, 
  ActivityIndicator,
  Text 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { useMessageWebSocket } from './useMessageWebSocket';
import { useTypingIndicator } from './useTypingIndicator';
import { MOCK_DOCTORS } from './mockData';

const DrChat = ({ route, navigation }) => {
  // Check for doctorId existence early
  if (!route?.params?.doctorId) {
    return (
      <ScrollView>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Doctor ID is required</Text>
          <Text 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            Go Back
          </Text>
        </View>
      </ScrollView>
    );
  }

  const doctorId = route.params.doctorId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const flatListRef = useRef(null);
  
  const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);

  // Return early if doctor not found
  if (!doctor) {
    return (
      <ScrollView>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Doctor not found</Text>
          <Text 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            Go Back
          </Text>
        </View>
      </ScrollView>
    );
  }

  const handleWebSocketError = (error) => {
    console.warn('WebSocket error:', error);
    setError('Connection error. Please try again.');
  };

  const {
    isConnected,
    sendMessage,
    markMessageAsRead,
    reconnectWebSocket
  } = useMessageWebSocket(doctorId, handleWebSocketError);

  const {
    isTyping,
    startTyping,
    stopTyping
  } = useTypingIndicator(doctorId);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    if (loadingMore || !hasMoreMessages) return;

    try {
      setLoadingMore(true);
      const pageSize = 20;
      const lastMessageId = messages[messages.length - 1]?.id;
      
      // Mock API call - replace with actual API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({ 
          success: true, 
          messages: [] 
        }), 1000)
      );
      
      if (!response.success) {
        throw new Error('Failed to load messages');
      }
      
      const newMessages = response.messages;
      setHasMoreMessages(newMessages.length === pageSize);
      
      setMessages(prev => [...prev, ...newMessages]);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoadingMore(false);
      setLoading(false);
    }
  };

  const handleSend = async (text, attachments = []) => {
    if (!text.trim() && attachments.length === 0) return;
    
    if (!isConnected) {
      Alert.alert('Error', 'No connection to chat server. Please try again.');
      return;
    }

    try {
      const newMessage = {
        id: Date.now().toString(),
        text,
        attachments,
        sender: 'patient',
        timestamp: new Date(),
        status: 'sending'
      };

      setMessages(prev => [newMessage, ...prev]);
      
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

      await sendMessage(newMessage);
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMessage.id
            ? { ...msg, status: 'failed' }
            : msg
        )
      );
    }
  };

  const handleAttachmentPress = (attachment) => {
    if (!attachment?.uri) {
      Alert.alert('Error', 'Invalid attachment');
      return;
    }

    switch (attachment.type) {
      case 'image':
        navigation.navigate('ImageViewer', { uri: attachment.uri });
        break;
      case 'video':
        navigation.navigate('VideoPlayer', { uri: attachment.uri });
        break;
      case 'document':
        navigation.navigate('DocumentViewer', { uri: attachment.uri });
        break;
      default:
        Alert.alert('Error', 'Unsupported attachment type');
    }
  };

  if (loading) {
    return (
      <ScrollView>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <ChatHeader
        doctor={doctor}
        navigation={navigation}
        onVideoCall={() => navigation.navigate('Start Video Call', { doctorId })}
        onAudioCall={() => navigation.navigate('Audio Call', { doctorId })}
        onMorePress={() => navigation.navigate('ChatSettings', { doctorId })}
        isConnected={isConnected}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text 
            style={styles.retryText}
            onPress={() => {
              setError(null);
              reconnectWebSocket();
            }}
          >
            Retry
          </Text>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            isDoctor={item.sender === 'doctor'}
            onAttachmentPress={handleAttachmentPress}
            onRetry={() => handleSend(item.text, item.attachments)}
          />
        )}
        keyExtractor={item => item.id}
        onEndReached={loadMessages}
        onEndReachedThreshold={0.5}
        inverted
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 100,
        }}
      />

      {isTyping && <TypingIndicator />}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ChatInput
          onSend={handleSend}
          onTypingStart={startTyping}
          onTypingEnd={stopTyping}
          disabled={!isConnected}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#fee',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  retryText: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  backButton: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    padding: 10,
  }
};

export default DrChat;