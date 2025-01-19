import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Modal, TextInput, Alert, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

function MedicalDocuments() {
  const [documents, setDocuments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');

  const handleAddDocument = async () => {
    try {
      // Use Expo DocumentPicker to allow users to select any file
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (result.type === 'cancel') {
        console.log('User canceled document picking.');
        return;
      }

      const { name, uri, mimeType } = result;

      setDocuments([
        ...documents,
        {
          id: (documents.length + 1).toString(),
          title: newDocumentTitle || name || 'Untitled Document',
          path: uri,
          type: mimeType || 'Unknown type',
        },
      ]);

      setNewDocumentTitle('');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error while picking document:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.documentItem} onPress={() => handleDocumentOpen(item)}>
      <Text style={styles.documentTitle}>{item.title}</Text>
      <Text style={styles.documentCategory}>{item.type}</Text>
    </TouchableOpacity>
  );

  const handleDocumentOpen = async (document) => {
    try {
      const supported = await Linking.canOpenURL(document.path);
      if (supported) {
        await Linking.openURL(document.path);
      } else {
        Alert.alert('Error', 'Unable to open this file type.');
      }
    } catch (error) {
      console.error('Error opening document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical Documents</Text>
      <Text style={styles.content}>
        You can view and manage all your uploaded medical files here.
      </Text>

      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.documentList}
      />

      <Button title="Add New Document" onPress={() => setIsModalVisible(true)} />

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Document</Text>
            <TextInput
              style={styles.input}
              placeholder="Document Title"
              value={newDocumentTitle}
              onChangeText={setNewDocumentTitle}
            />
            <Button title="Add Document" onPress={handleAddDocument} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  documentList: {
    marginTop: 20,
  },
  documentItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  documentCategory: {
    fontSize: 14,
    color: '#009688',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
  },
});

export default MedicalDocuments;
