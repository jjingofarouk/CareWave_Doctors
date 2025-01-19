import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const RanchoLosAmigos = ({ patientName = "", onSave }) => {
  const [level, setLevel] = useState("1");
  const [history, setHistory] = useState([]);
  const [showTrends, setShowTrends] = useState(false);
  
  const levelColors = {
    '1': '#FF6B6B',  // Red for critical levels
    '2': '#FF9F69',
    '3': '#FFD93D',
    '4': '#95DAC1',
    '5': '#7FB5FF',
    '6': '#6ECCAF',
    '7': '#4CACBC',
    '8': '#3D8361',
    '9': '#219F94',
    '10': '#006E7F', // Dark teal for highest functioning
  };


  const getDescription = (level) => {
    switch (level) {
      case '1':
        return {
          title: "Level I: No Response/Total Assistance",
          response: "No response to external stimuli.",
          clinicalFeatures: [
            "No response to external stimuli.",
            "Requires total assistance.",
          ]
        };
      case '2':
        return {
          title: "Level II: Generalized Response/Total Assistance",
          response: "Responds inconsistently and non-purposefully to external stimuli.",
          clinicalFeatures: [
            "Responds inconsistently and non-purposefully to external stimuli.",
            "Responses are often the same regardless of the stimulus applied.",
            "Requires total assistance."
          ]
        };
      case '3':
        return {
          title: "Level III: Localized Response/Total Assistance",
          response: "Responds inconsistently and specifically to external stimuli.",
          clinicalFeatures: [
            "Responds inconsistently and specifically to external stimuli.",
            "Responses are directly related to the stimulus.",
            "Tends to be more responsive to familiar people (friends and family).",
            "Requires total assistance."
          ]
        };
      case '4':
        return {
          title: "Level IV: Confused and Agitated/Max Assistance",
          response: "In a hyperactive state with bizarre and non-purposeful behavior.",
          clinicalFeatures: [
            "In a hyperactive state with bizarre and non-purposeful behavior.",
            "Demonstrates agitated behavior that originates more from internal confusion than external stimuli.",
            "Requires maximum assistance."
          ]
        };
      case '5':
        return {
          title: "Level V: Confused, Inappropriate/Non-agitated/Max Assistance",
          response: "Shows increased consistency in following simple commands, but responses are non-purposeful.",
          clinicalFeatures: [
            "Can follow simple commands with increased consistency.",
            "Responses are non-purposeful and random for more complex commands.",
            "Behavior and verbalization are often inappropriate.",
            "Memory is severely impaired and learning new information is difficult.",
            "Requires maximum assistance."
          ]
        };
      case '6':
        return {
          title: "Level VI: Confused, Appropriate/Mod Assistance",
          response: "Able to follow simple commands consistently and retain learning for familiar tasks.",
          clinicalFeatures: [
            "Able to follow simple commands consistently.",
            "Can retain learning for familiar tasks (e.g., brushing teeth).",
            "Demonstrates increased awareness of self and environment, but unaware of specific impairments.",
            "Requires moderate assistance."
          ]
        };
      case '7':
        return {
          title: "Level VII: Automatic, Appropriate/Min Assistance for ADLs",
          response: "Oriented in familiar settings and can perform daily routines automatically.",
          clinicalFeatures: [
            "Oriented in familiar settings.",
            "Can perform daily routines automatically with minimal confusion.",
            "Requires at least minimal supervision for learning and safety purposes."
          ]
        };
      case '8':
        return {
          title: "Level VIII: Purposeful, Appropriate/Standby Assistance",
          response: "Consistently oriented to person, place, and time and can carry out familiar tasks.",
          clinicalFeatures: [
            "Consistently oriented to person, place, and time.",
            "Can carry out familiar tasks in a non-distracting environment.",
            "Aware of specific impairments and requires standby assistance for compensatory skills.",
            "Able to use memory aids like schedules.",
            "Demonstrates improvement in memory and emotional regulation."
          ]
        };
      case '9':
        return {
          title: "Level IX: Purposeful, Appropriate/Standby Assistance on Request",
          response: "Can independently shift between tasks and use compensatory strategies.",
          clinicalFeatures: [
            "Able to shift between tasks and complete them independently.",
            "Aware of impairments and uses compensatory strategies.",
            "Able to anticipate obstacles and understand the consequences of actions.",
            "Requires some assistance for problem-solving and social interactions."
          ]
        };
      case '10':
        return {
          title: "Level X: Purposeful, Appropriate/Modified Independent",
          response: "Can multitask in various environments with compensatory strategies.",
          clinicalFeatures: [
            "Able to multitask with extra time and/or assistive devices.",
            "Creates methods for memory retention and anticipates obstacles.",
            "May demonstrate intermittent periods of depression or frustration under stress.",
            "Interacts appropriately with others in social situations."
          ]
        };
      default:
        return {};
    }
  };

  const addToHistory = useCallback(() => {
    const timestamp = new Date().toISOString();
    const currentAssessment = {
      level,
      timestamp,
      description: getDescription(level),
    };
    setHistory(prev => [...prev, currentAssessment]);
    
    if (onSave) {
      onSave(currentAssessment);
    }
  }, [level, onSave]);

  const renderLevelButton = (value, description) => (
    <TouchableOpacity
      key={value}
      style={[
        styles.levelButton,
        { backgroundColor: levelColors[value] },
        level === value && styles.selectedLevel
      ]}
      onPress={() => setLevel(value)}
    >
      <Text style={[
        styles.levelButtonText,
        level === value && styles.selectedLevelText
      ]}>
        Level {value}
      </Text>
      <Text style={styles.levelPreview} numberOfLines={1}>
        {description.title.split(":")[1]}
      </Text>
    </TouchableOpacity>
  );

  const description = getDescription(level);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rancho Los Amigos Scale</Text>
          {patientName && (
            <Text style={styles.patientName}>Patient: {patientName}</Text>
          )}
        </View>

        <Card style={styles.mainCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelSelector}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(value =>
              renderLevelButton(value.toString(), getDescription(value.toString()))
            )}
          </ScrollView>
        </Card>

        <Card style={styles.descriptionCard}>
          <Card.Content>
            <Text style={styles.currentLevel}>
              Current Assessment: Level {level}
            </Text>
            <Text style={styles.timestamp}>
              {new Date().toLocaleString()}
            </Text>
            <Text style={styles.title}>{description.title}</Text>
            <Text style={styles.response}>{description.response}</Text>
            <Text style={styles.featuresHeader}>Clinical Features:</Text>
            {description.clinicalFeatures.map((feature, index) => (
              <View key={index} style={styles.featureContainer}>
                <Icon name="checkbox-marked-circle" size={20} color="#4CAF50" />
                <Text style={styles.feature}>{feature}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={addToHistory}
          >
            <Icon name="content-save" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Save Assessment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.trendsButton]}
            onPress={() => setShowTrends(!showTrends)}
          >
            <Icon name="chart-line" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Show Trends</Text>
          </TouchableOpacity>
        </View>

        {showTrends && history.length > 0 && (
          <Card style={styles.historyCard}>
            <Card.Title title="Assessment History" />
            <Card.Content>
              {history.map((entry, index) => (
                <View key={index} style={styles.historyEntry}>
                  <Text style={styles.historyLevel}>Level {entry.level}</Text>
                  <Text style={styles.historyTimestamp}>
                    {new Date(entry.timestamp).toLocaleString()}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  patientName: {
    fontSize: 18,
    color: '#34495E',
    textAlign: 'center',
    marginTop: 8,
  },
  mainCard: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  levelSelector: {
    padding: 16,
  },
  levelButton: {
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  selectedLevel: {
    transform: [{ scale: 1.05 }],
    borderWidth: 2,
    borderColor: '#2C3E50',
  },
  levelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  levelPreview: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.9,
  },
  descriptionCard: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  currentLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 12,
  },
  response: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 16,
  },
  featuresHeader: {
    fontSize: 17,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 12,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 8,
  },
  feature: {
    fontSize: 15,
    color: '#2C3E50',
    marginLeft: 12,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  trendsButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  historyCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  historyEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  historyLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  historyTimestamp: {
    fontSize: 14,
    color: '#7F8C8D',
  },
});