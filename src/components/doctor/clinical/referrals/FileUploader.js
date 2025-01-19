// components/referral/FileUploader.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export const FileUploader = ({ onUpload, maxFiles = 5 }) => {
  const [files, setFiles] = useState([]);

  const handleFilePick = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx
        ],
        allowMultiSelection: true,
      });

      if (files.length + results.length > maxFiles) {
        Alert.alert('Maximum files limit exceeded');
        return;
      }

      const newFiles = [...files, ...results];
      setFiles(newFiles);
      onUpload(newFiles);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Failed to upload file');
      }
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.uploadButton}
        onPress={handleFilePick}
      >
        <Icon name="cloud-upload" size={24} color="#007AFF" />
        <Text style={styles.uploadText}>Upload Files</Text>
      </TouchableOpacity>

      <FlatList
        data={files}
        renderItem={({ item, index }) => (
          <View style={styles.fileItem}>
            <Icon 
              name={item.type.includes('image') ? 'image' : 'insert-drive-file'}
              size={24}
              color="#666"
            />
            <Text style={styles.fileName}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFile(index)}>
              <Icon name="close" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
