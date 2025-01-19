import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; // For network status

// Sample Specialist data
const specialists = [
  { id: 1, name: 'Dr. Amon Kalema', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Joan Mukasa', specialty: 'Tropical Medicine' },
  { id: 3, name: 'Dr. Joseph Ssekandi', specialty: 'Infectious Diseases' },
  { id: 4, name: 'Dr. Sarah Nabiryo', specialty: 'Pediatrics' },
  { id: 5, name: 'Dr. Patrick Okello', specialty: 'Dermatology' },
];

const Network = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const startConversation = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: conversations.length + 1,
        message,
        timestamp: new Date().toLocaleTimeString(),
        isDoctor: false, // Assuming the user is the patient
      };
      setConversations([...conversations, newMessage]);
      setMessage('');
    }
  };

  const handleDoctorReply = () => {
    if (selectedSpecialist) {
      const newMessage = {
        id: conversations.length + 1,
        message: 'Hello, how can I assist you today?',
        timestamp: new Date().toLocaleTimeString(),
        isDoctor: true, // Reply from doctor
      };
      setConversations([...conversations, newMessage]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Specialist Network</Text>
      </View>

      {isOffline && (
        <View style={styles.offlineNotice}>
          <Text style={styles.offlineText}>You are currently offline. Some features may not be available.</Text>
        </View>
      )}

      <View style={styles.networkGrid}>
        <View style={styles.specialistsList}>
          <Text style={styles.subHeader}>Specialists</Text>
          <FlatList
            data={specialists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.specialistItem,
                  selectedSpecialist && selectedSpecialist.id === item.id && styles.selectedSpecialist,
                ]}
                onPress={() => startConversation(item)}
              >
                <Text style={styles.specialistName}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.chatArea}>
          {selectedSpecialist ? (
            <>
              <Text style={styles.chatHeader}>Chat with {selectedSpecialist.name}</Text>
              <FlatList
                data={conversations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={[styles.messageContainer, item.isDoctor ? styles.doctorMessage : styles.patientMessage]}>
                    <Text style={styles.message}>{item.message}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                  </View>
                )}
                inverted // Invert to show the latest message at the bottom
              />
              <View style={styles.messageInputArea}>
                <TextInput
                  style={styles.messageInput}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type a message..."
                  onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={styles.selectSpecialistText}>Select a specialist to start a conversation.</Text>
          )}
        </View>
      </View>

      {/* Simulate a doctor reply after 2 seconds */}
      {selectedSpecialist && !conversations.some(conv => conv.isDoctor) && (
        <TouchableOpacity onPress={handleDoctorReply} style={styles.doctorReplyButton}>
          <Text style={styles.replyButtonText}>Doctor Reply</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    backgroundColor: '#008080',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  offlineNotice: {
    backgroundColor: '#FF6347',
    padding: 10,
    alignItems: 'center',
  },
  offlineText: {
    color: '#fff',
    fontSize: 16,
  },
  networkGrid: {
    flexDirection: 'row',
    padding: 15,
  },
  specialistsList: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#008080',
  },
  specialistItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedSpecialist: {
    backgroundColor: '#e0f7f7',
  },
  specialistName: {
    fontSize: 18,
    fontWeight: '600',
  },
  specialty: {
    fontSize: 14,
    color: '#888',
  },
  chatArea: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#008080',
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  patientMessage: {
    backgroundColor: '#d9f7d9',
    alignSelf: 'flex-start',
  },
  doctorMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-end',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
  },
  messageInputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  messageInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingLeft: 15,
  },
  sendButton: {
    backgroundColor: '#008080',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectSpecialistText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  doctorReplyButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Network;
