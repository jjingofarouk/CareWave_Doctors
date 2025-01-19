import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'expo-document-picker';

const CodingSystem = () => {
  const [codes, setCodes] = useState([]);
  const [currentCode, setCurrentCode] = useState('');
  const [dataEntries, setDataEntries] = useState([]);
  const [sentimentAnalysisResults, setSentimentAnalysisResults] = useState([]);
  const [themeDetectionResults, setThemeDetectionResults] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle adding a new code
  const handleAddCode = () => {
    if (currentCode.trim() === '') return;
    setCodes([...codes, currentCode.trim()]);
    setCurrentCode('');
  };

  // Analyze sentiment of current entry
  const analyzeSentiment = () => {
    console.log("Analyzing sentiment...");
    const mockSentimentResult = Math.random() < 0.5 ? 'Positive' : 'Negative';
    setSentimentAnalysisResults([...sentimentAnalysisResults, mockSentimentResult]);
  };

  // Detect themes in qualitative data
  const detectThemes = () => {
    console.log("Detecting themes...");
    const mockThemes = ['Theme A', 'Theme B', 'Theme C'];
    setThemeDetectionResults(mockThemes);
  };

  // Handle qualitative data entry submission
  const handleEntrySubmit = () => {
    if (currentEntry.trim() === '') return;
    setDataEntries([...dataEntries, currentEntry.trim()]);
    setCurrentEntry('');
  };

  // Simulate data analysis
  const handleAnalyzeData = () => {
    setIsAnalyzing(true);
    analyzeSentiment();
    detectThemes();
    setTimeout(() => setIsAnalyzing(false), 2000); // Simulate processing delay
  };

  // Handle file selection for audio/video upload
  const handleFileSelect = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio, DocumentPicker.types.video],
      });
      console.log('File selected:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error(err);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Qualitative Data Analysis Suite</Text>
        <Text style={styles.subtitle}>Advanced tools for analyzing qualitative research data.</Text>
      </View>

      <View style={styles.dataEntry}>
        <TextInput
          value={currentEntry}
          onChangeText={setCurrentEntry}
          placeholder="Enter qualitative data..."
          style={styles.textInput}
          multiline
        />
        <Button title="Submit Data" onPress={handleEntrySubmit} />
      </View>

      <View style={styles.codingInput}>
        <TextInput
          value={currentCode}
          onChangeText={setCurrentCode}
          placeholder="Enter code..."
          style={styles.textInput}
        />
        <Button title="Add Code" onPress={handleAddCode} />
      </View>

      <View style={styles.codingList}>
        <Text style={styles.sectionTitle}>Current Codes</Text>
        {codes.map((code, index) => (
          <Text key={index} style={styles.codeItem}>{code}</Text>
        ))}
      </View>

      <View style={styles.analysisTools}>
        <TouchableOpacity onPress={handleAnalyzeData} style={styles.button}>
          <Text style={styles.buttonText}>{isAnalyzing ? 'Analyzing...' : 'Analyze Data'}</Text>
          <Icon name="refresh" size={20} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.results}>
        <Text style={styles.sectionTitle}>Sentiment Analysis Results</Text>
        {sentimentAnalysisResults.map((result, index) => (
          <Text key={index} style={styles.resultItem}>{result}</Text>
        ))}
      </View>

      <View style={styles.results}>
        <Text style={styles.sectionTitle}>Detected Themes</Text>
        {themeDetectionResults.map((theme, index) => (
          <Text key={index} style={styles.resultItem}>{theme}</Text>
        ))}
      </View>

      <View style={styles.mediaUpload}>
        <Text style={styles.sectionTitle}>Upload Audio/Video Files</Text>
        <Button title="Select File" onPress={handleFileSelect} />
      </View>

      <View style={styles.visualization}>
        <Text style={styles.sectionTitle}>Data Visualization</Text>
        <Text>Visualize your coded data here.</Text>
      </View>

      <View style={styles.exportOptions}>
        <Text style={styles.sectionTitle}>Export Data</Text>
        <Button title="Export to CSV" onPress={() => console.log('Exporting to CSV')} />
        <Button title="Export to Excel" onPress={() => console.log('Exporting to Excel')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  dataEntry: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
    height: 100,
  },
  codingInput: {
    marginBottom: 16,
  },
  codingList: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeItem: {
    fontSize: 14,
    color: '#555',
  },
  analysisTools: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#27c7b8',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  icon: {
    marginLeft: 8,
  },
  results: {
    marginBottom: 16,
  },
  resultItem: {
    fontSize: 14,
    color: '#555',
  },
  mediaUpload: {
    marginBottom: 16,
  },
  visualization: {
    marginBottom: 16,
  },
  exportOptions: {
    marginBottom: 16,
  },
});

export default CodingSystem;
