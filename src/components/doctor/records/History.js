import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const MedicalHistory = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [expandedSection, setExpandedSection] = useState(null);
  const [presentIllnessData, setPresentIllnessData] = useState({
    site: {
      location: '',
      precise: '',
      surface: '',
      depth: '',
    },
    onset: {
      whenStarted: '',
      howStarted: '',
      wasItSudden: false,
      context: '',
    },
    character: {
      type: '',
      description: '',
      quality: [],
    },
    radiation: {
      doesItSpread: false,
      whereToSpread: '',
      pattern: '',
      direction: '',
    },
    associatedSymptoms: {
      symptoms: [],
      customSymptom: '',
    },
    timing: {
      frequency: '',
      pattern: '',
      duration: '',
      timeOfDay: '',
      periodicity: '',
    },
    exacerbatingRelieving: {
      worsens: [],
      improves: [],
      customFactors: '',
    },
    severity: {
      current: 5,
      worst: 5,
      best: 5,
      impactOnDaily: '',
    }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.sectionCompleted) {
        const { sectionIndex, hpiData } = route.params;
        setCompletedSteps(prev => new Set([...prev, sectionIndex]));
        
        if (sectionIndex === 2 && hpiData) {
          setPresentIllnessData(hpiData);
        }
        
        navigation.setParams({ 
          sectionCompleted: undefined, 
          sectionIndex: undefined,
          hpiData: undefined 
        });
      }
    });

    return unsubscribe;
  }, [navigation, route]);

  const sections = [
    {
      id: 1,
      label: 'Demographics',
      icon: 'account',
      screen: 'PersonalInfo',
      description: 'Patient identification and contacts',
      items: ['Basic Info', 'Contact Details', 'Emergency Contacts']
    },
    {
      id: 2,
      label: 'Chief Complaint',
      icon: 'message-alert',
      screen: 'ChiefComplaint',
      description: 'Primary reason for visit',
      items: ['Main Symptoms', 'Onset', 'Severity']
    },
    {
      id: 3,
      label: 'Present Illness',
      icon: 'clock-time-eight',
      screen: 'HistoryOfPresentIllness',
      description: 'SOCRATES assessment framework',
      items: [
        'Site & Character of Pain/Symptoms',
        'Onset & Timing Details',
        'Radiation & Associated Symptoms',
        'Aggravating/Relieving Factors',
        'Timing & Severity Assessment',
        'Exacerbating & Relieving Factors'
      ]
    },
    {
      id: 4,
      label: 'Past Medical',
      icon: 'medical-bag',
      screen: 'PastMedicalHistory',
      description: 'Previous medical conditions',
      items: ['Conditions', 'Surgeries', 'Medications']
    },
    {
      id: 5,
      label: 'Family History',
      icon: 'account-group',
      screen: 'FamilyHistory',
      description: 'Hereditary conditions',
      items: ['Parents', 'Siblings', 'Other Relatives']
    },
    {
      id: 6,
      label: 'Social History',
      icon: 'account-details',
      screen: 'SocialHistory',
      description: 'Lifestyle and social factors',
      items: ['Habits', 'Occupation', 'Living Situation']
    },
    {
      id: 7,
      label: 'Systems Review',
      icon: 'clipboard-list',
      screen: 'ReviewOfSystems',
      description: 'Systematic body review',
      items: ['Major Systems', 'Recent Changes', 'Chronic Issues']
    },
    {
      id: 8,
      label: 'Examination',
      icon: 'stethoscope',
      screen: 'ExaminationFindings',
      description: 'Physical examination findings',
      items: ['Vitals', 'General Exam', 'Specific Findings']
    },
  ];

  const validateHPISection = (data) => {
    const requiredFields = {
      site: ['location'],
      onset: ['whenStarted'],
      severity: ['current']
    };

    for (const [section, fields] of Object.entries(requiredFields)) {
      for (const field of fields) {
        if (!data[section][field]) {
          return false;
        }
      }
    }
    return true;
  };

  const navigateToSection = (index, screen) => {
    setCurrentStep(index);
    setExpandedSection(index);
    
    const navigationParams = {
      sectionIndex: index,
      onComplete: () => {
        setCompletedSteps(prev => new Set([...prev, index]));
      }
    };

    if (screen === 'HistoryOfPresentIllness') {
      navigationParams.existingData = presentIllnessData;
      navigationParams.onDataChange = (formData) => {
        setPresentIllnessData(formData);
      };
      navigationParams.onComplete = (formData) => {
        if (validateHPISection(formData)) {
          setCompletedSteps(prev => new Set([...prev, index]));
          setPresentIllnessData(formData);
        } else {
          Alert.alert(
            'Incomplete Information',
            'Please complete all required fields in the SOCRATES assessment. Required fields include site location, onset timing, and current severity.',
            [{ text: 'OK', onPress: () => {} }]
          );
        }
      };
    }
    
    navigation.navigate(screen, navigationParams);
  };

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const renderProgressBar = () => {
    const progress = ((completedSteps.size) / sections.length) * 100;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>
    );
  };

  const renderSectionProgress = (section, index) => {
    if (section.screen === 'HistoryOfPresentIllness') {
      const totalFields = Object.keys(presentIllnessData).length;
      const completedFields = Object.entries(presentIllnessData).filter(([_, value]) => 
        Object.values(value).some(v => v !== '' && v !== false)
      ).length;
      return `${completedFields}/${totalFields} sections`;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#002432" />
      
      {renderProgressBar()}

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionCard,
                currentStep === index && styles.activeSectionCard,
                completedSteps.has(index) && styles.completedSectionCard,
                section.screen === 'HistoryOfPresentIllness' && 
                presentIllnessData && styles.inProgressSectionCard
              ]}
              onPress={() => navigateToSection(index, section.screen)}
              onLongPress={() => toggleSection(index)}
            >
              <View style={styles.sectionHeader}>
                <View style={[
                  styles.iconContainer,
                  currentStep === index && styles.activeIconContainer,
                  completedSteps.has(index) && styles.completedIconContainer,
                ]}>
                  <Icon 
                    name={section.icon} 
                    size={24} 
                    color={currentStep === index ? '#002432' : completedSteps.has(index) ? '#27C7B8' : '#002432'} 
                  />
                </View>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>{section.label}</Text>
                  <Text style={styles.sectionDescription}>{section.description}</Text>
                  {expandedSection === index && (
                    <View style={styles.itemsContainer}>
                      {section.items.map((item, i) => (
                        <View key={i} style={styles.itemRow}>
                          <Icon 
                            name={
                              section.screen === 'HistoryOfPresentIllness' && 
                              presentIllnessData && 
                              Object.values(presentIllnessData)[Math.floor(i/2)]?.completed
                                ? "check-circle"
                                : completedSteps.has(index)
                                ? "check-circle"
                                : "check-circle-outline"
                            } 
                            size={18} 
                            color="#27C7B8" 
                          />
                          <Text style={styles.itemText}>{item}</Text>
                        </View>
                      ))}
                      {renderSectionProgress(section, index)}
                    </View>
                  )}
                </View>
                <TouchableOpacity 
                  onPress={() => toggleSection(index)}
                  style={styles.expandButton}
                >
                  <Icon 
                    name={expandedSection === index ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                    color="#002432" 
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          <Icon name="arrow-left" size={20} color="#002432" />
          <Text style={styles.backButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={() => {
            if (currentStep < sections.length - 1) {
              setCompletedSteps(new Set([...completedSteps, currentStep]));
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === sections.length - 1 ? 'Complete' : 'Next'}
          </Text>
          <Icon 
            name={currentStep === sections.length - 1 ? 'check' : 'arrow-right'} 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002432',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27C7B8',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27C7B8',
    borderRadius: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSectionCard: {
    borderColor: '#27C7B8',
    borderWidth: 2,
  },
  completedSectionCard: {
    borderColor: '#27C7B8',
    borderWidth: 1,
  },
  inProgressSectionCard: {
    borderColor: '#FFA500',
    borderWidth: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activeIconContainer: {
    backgroundColor: '#27C7B8',
  },
  completedIconContainer: {
    backgroundColor: '#E8F8F7',
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002432',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  itemsContainer: {
    marginTop: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#444444',
    marginLeft: 8,
  },
  expandButton: {
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: width * 0.35,
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#F0F0F0',
  },
  nextButton: {
    backgroundColor: '#27C7B8',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#002432',
    fontWeight: '600',
  },
  nextButtonText: {
    marginRight: 8,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  }
});

export default MedicalHistory;