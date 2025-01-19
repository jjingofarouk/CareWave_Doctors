// Main TextAnalysis component
// TextAnalysis.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileUpload } from './FileUpload';
import { TextEditor } from './TextEditor';
import { QuickStats } from './QuickStats';
import { MedicalTerms } from './MedicalTerms';
import { TopicDistribution } from './TopicDistribution';
import { AnalysisCharts } from './charts/AnalysisCharts';
import { Notes } from './Notes';
import { ProjectList } from './ProjectList';
import { ExportOptions } from './ExportOptions';
import { performCompleteAnalysis } from './analysis/Analysis';
import { styles } from './TextAnalysisStyles';

const TextAnalysis = () => {
  // State management
  const [textData, setTextData] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [notes, setNotes] = useState('');
  const [transcripts, setTranscripts] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [medicalTerms, setMedicalTerms] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [exportFormat, setExportFormat] = useState('json');
  const [visualization, setVisualization] = useState('bar');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Auto-save timer
  const autoSaveTimer = useRef(null);

  useEffect(() => {
    loadInitialData();
    startAnimations();
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadInitialData = async () => {
    try {
      const savedProjects = await AsyncStorage.getItem('textAnalysisProjects');
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      
      const savedCategories = await AsyncStorage.getItem('analysisCategories');
      if (savedCategories) setCategories(JSON.parse(savedCategories));
    } catch (error) {
      Alert.alert('Error', 'Failed to load saved data');
    }
  };

  const handleAnalyzeText = async () => {
    if (!textData) {
      Alert.alert('Error', 'Please enter or upload text to analyze');
      return;
    }

    setLoading(true);
    try {
      const results = await performCompleteAnalysis(textData);
      setAnalysisResults(results);
      setMedicalTerms(results.medicalTermsFound);
      if (autoSaveEnabled) scheduleAutoSave();
    } catch (error) {
      Alert.alert('Analysis Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const scheduleAutoSave = () => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      await saveProject();
      setLastSaved(new Date().toISOString());
    }, 30000);
  };

  const handleSaveProject = async () => {
    try {
      const project = {
        id: currentProject?.id || Date.now(),
        name: currentProject?.name || `Project ${projects.length + 1}`,
        textData,
        codes,
        analysisResults,
        notes,
        transcripts,
        categories,
        medicalTerms,
        lastModified: new Date().toISOString()
      };

      const updatedProjects = currentProject
        ? projects.map(p => p.id === currentProject.id ? project : p)
        : [...projects, project];

      await AsyncStorage.setItem('textAnalysisProjects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      setCurrentProject(project);
      setLastSaved(new Date().toISOString());

      Alert.alert('Success', 'Project saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save project');
    }
  };

  const handleExport = async () => {
    try {
      const exportData = {
        project: currentProject,
        analysisResults,
        notes,
        medicalTerms,
        exportDate: new Date().toISOString()
      };

      let exportContent;
      switch (exportFormat) {
        case 'json':
          exportContent = JSON.stringify(exportData, null, 2);
          break;
        case 'csv':
          exportContent = convertToCSV(exportData);
          break;
        default:
          exportContent = JSON.stringify(exportData);
      }

      Alert.alert('Export Success', `Data exported in ${exportFormat.toUpperCase()} format`);
    } catch (error) {
      Alert.alert('Export Error', error.message);
    }
  };

  const convertToCSV = (data) => {
    // Implementation of CSV conversion would go here
    return 'CSV conversion would be implemented here';
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        
        <FileUpload onFileSelect={setTextData} />
        
        <TextEditor
          textData={textData}
          onTextChange={(text) => {
            setTextData(text);
            if (autoSaveEnabled) scheduleAutoSave();
          }}
          onAnalyze={handleAnalyzeText}
          loading={loading}
        />

        {analysisResults && (
          <>
            <QuickStats 
              analysisResults={analysisResults}
              medicalTerms={medicalTerms}
            />
            
            <MedicalTerms terms={medicalTerms} />
            
            <TopicDistribution 
              topicAnalysis={analysisResults.topicAnalysis}
            />
            
            <AnalysisCharts
              analysisResults={analysisResults}
              visualization={visualization}
              onVisualizationChange={setVisualization}
            />
          </>
        )}

        <Notes
          notes={notes}
          onNotesChange={setNotes}
        />

        <ProjectList
          projects={projects}
          currentProject={currentProject}
          onProjectSelect={setCurrentProject}
          onSave={handleSaveProject}
          lastSaved={lastSaved}
        />

        <ExportOptions
          exportFormat={exportFormat}
          onFormatChange={setExportFormat}
          onExport={handleExport}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TextAnalysis;