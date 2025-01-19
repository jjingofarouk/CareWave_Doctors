import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Modal, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { 
  Chip, 
  Button, 
  Portal, 
  Dialog, 
  Provider as PaperProvider 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Rads = () => {
  const [radResults, setRadResults] = useState([]);
  const [newResult, setNewResult] = useState({
    imagingType: '',
    description: '',
    date: new Date(),
    file: null,
    aiAnalysisRequested: false
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const imagingOptions = [
    'X-ray', 'MRI', 'CT Scan', 'Ultrasound', 
    'Mammogram', 'PET Scan', 'Echocardiogram'
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setNewResult(prev => ({ ...prev, file: result }));
    } catch (err) {
      console.error('Document pick error', err);
    }
  };

  const uploadResult = () => {
    const newId = (radResults.length + 1).toString();
    const resultToAdd = {
      id: newId,
      ...newResult,
      thumbnailUrl: newResult.file ? newResult.file.uri : null,
      date: newResult.date.toISOString().split('T')[0]
    };
    
    setRadResults(prev => [resultToAdd, ...prev]);
    setModalVisible(false);
    setNewResult({
      imagingType: '',
      description: '',
      date: new Date(),
      file: null,
      aiAnalysisRequested: false
    });
  };

  const renderRadResult = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultCard}
      onPress={() => setSelectedResult(item)}
    >
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>{item.imagingType}</Text>
        <Text>{item.date}</Text>
      </View>
      {item.thumbnailUrl && (
        <Image 
          source={{ uri: item.thumbnailUrl }} 
          style={styles.thumbnail} 
        />
      )}
      <Text>{item.description}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity>
          <Icon name="edit" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Medical Imaging Manager</Text>
        
        <Button 
          mode="contained" 
          onPress={() => setModalVisible(true)}
        >
          Upload New Result
        </Button>

        <FlatList
          data={radResults}
          renderItem={renderRadResult}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No imaging results found</Text>
          }
        />

        <Portal>
          <Dialog 
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <Dialog.Title>Upload Imaging Result</Dialog.Title>
            <Dialog.Content>
              <Chip 
                icon="upload" 
                onPress={pickDocument}
              >
                {newResult.file ? 'File Selected' : 'Choose File'}
              </Chip>
              
              <TextInput
                placeholder="Imaging Type"
                value={newResult.imagingType}
                onChangeText={(text) => setNewResult(prev => ({ ...prev, imagingType: text }))}
                style={styles.input}
              />
              
              <TextInput
                placeholder="Description"
                value={newResult.description}
                onChangeText={(text) => setNewResult(prev => ({ ...prev, description: text }))}
                style={styles.input}
                multiline
              />
              
              <DateTimePicker
                value={newResult.date}
                mode="date"
                onChange={(event, selectedDate) => {
                  setNewResult(prev => ({ ...prev, date: selectedDate }));
                }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setModalVisible(false)}>Cancel</Button>
              <Button onPress={uploadResult}>Upload</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {selectedResult && (
          <Modal
            visible={!!selectedResult}
            onRequestClose={() => setSelectedResult(null)}
            animationType="slide"
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedResult.imagingType}</Text>
              {selectedResult.thumbnailUrl && (
                <Image 
                  source={{ uri: selectedResult.thumbnailUrl }} 
                  style={styles.fullImage} 
                />
              )}
              <Text>{selectedResult.description}</Text>
              <Button onPress={() => setSelectedResult(null)}>Close</Button>
            </View>
          </Modal>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888'
  },
  modalView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20
  },
  fullImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20
  }
});

export default Rads;