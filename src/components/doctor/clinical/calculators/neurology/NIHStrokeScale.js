import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const NIHStrokeScale = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scores, setScores] = useState({
    levelOfConsciousness: 0,
    bestGaze: 0,
    visualField: 0,
    motorArmRight: 0,
    motorArmLeft: 0,
    motorLegRight: 0,
    motorLegLeft: 0,
    limbAtaxia: 0,
    sensory: 0,
    language: 0,
    dysarthria: 0,
    extinction: 0
  });

  const sections = [
    {
      title: "Consciousness",
      items: [
        {
          name: "Level of Consciousness",
          key: "levelOfConsciousness",
          maxScore: 3,
          descriptions: [
            "Alert",
            "Sleepy but arouses",
            "Can't stay awake",
            "No purposeful response"
          ]
        },
        {
          name: "Best Gaze",
          key: "bestGaze",
          maxScore: 2,
          descriptions: [
            "Normal side-to-side",
            "Partial gaze",
            "No gaze movement"
          ]
        }
      ]
    },
    {
      title: "Visual & Motor",
      items: [
        {
          name: "Visual Field",
          key: "visualField",
          maxScore: 3,
          descriptions: [
            "Normal fields",
            "Partial hemianopia",
            "Complete hemianopia",
            "Bilateral hemianopia"
          ]
        }
      ]
    },
    {
      title: "Motor Arms",
      items: [
        {
          name: "Right Arm",
          key: "motorArmRight",
          maxScore: 4,
          descriptions: [
            "No drift",
            "Drift",
            "Can't resist gravity",
            "No antigravity",
            "No movement"
          ]
        },
        {
          name: "Left Arm",
          key: "motorArmLeft",
          maxScore: 4,
          descriptions: [
            "No drift",
            "Drift",
            "Can't resist gravity",
            "No antigravity",
            "No movement"
          ]
        }
      ]
    },
    {
      title: "Motor Legs",
      items: [
        {
          name: "Right Leg",
          key: "motorLegRight",
          maxScore: 4,
          descriptions: [
            "No drift",
            "Drift",
            "Can't resist gravity",
            "No antigravity",
            "No movement"
          ]
        },
        {
          name: "Left Leg",
          key: "motorLegLeft",
          maxScore: 4,
          descriptions: [
            "No drift",
            "Drift",
            "Can't resist gravity",
            "No antigravity",
            "No movement"
          ]
        }
      ]
    },
    {
      title: "Other Tests",
      items: [
        {
          name: "Limb Ataxia",
          key: "limbAtaxia",
          maxScore: 2,
          descriptions: [
            "Absent",
            "Present in one limb",
            "Present in two limbs"
          ]
        },
        {
          name: "Sensory",
          key: "sensory",
          maxScore: 2,
          descriptions: [
            "Normal",
            "Mild loss",
            "Severe loss"
          ]
        }
      ]
    },
    {
      title: "Speech & Cognition",
      items: [
        {
          name: "Language",
          key: "language",
          maxScore: 3,
          descriptions: [
            "Normal",
            "Mild aphasia",
            "Severe aphasia",
            "Mute/global aphasia"
          ]
        },
        {
          name: "Dysarthria",
          key: "dysarthria",
          maxScore: 2,
          descriptions: [
            "Normal",
            "Mild",
            "Severe"
          ]
        },
        {
          name: "Extinction",
          key: "extinction",
          maxScore: 2,
          descriptions: [
            "No neglect",
            "Partial neglect",
            "Complete neglect"
          ]
        }
      ]
    }
  ];


  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleScore = (key, value) => {
    setScores(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const navigateSection = (direction) => {
    const newSection = currentSection + direction;
    if (newSection >= 0 && newSection < sections.length) {
      setCurrentSection(newSection);
    }
  };

  const getSeverityColor = (score) => {
    if (score <= 4) return '#4CAF50';
    if (score <= 15) return '#FF9800';
    return '#F44336';
  };

  const renderScoreButton = (score, value, description, isSelected) => (
    <Pressable
      key={value}
      style={[styles.scoreButton, isSelected && styles.scoreButtonSelected]}
      onPress={() => handleScore(score, value)}
    >
      <View style={styles.scoreValueContainer}>
        <Text style={[styles.scoreValue, isSelected && styles.scoreValueSelected]}>
          {value}
        </Text>
      </View>
      <Text style={[styles.scoreDescription, isSelected && styles.scoreDescriptionSelected]}>
        {description}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NIH Stroke Scale</Text>
        <View style={[styles.totalScoreBadge, { backgroundColor: getSeverityColor(totalScore) }]}>
          <Text style={styles.totalScoreText}>Score: {totalScore}</Text>
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Pressable 
          style={[styles.navButton, currentSection === 0 && styles.navButtonDisabled]}
          onPress={() => navigateSection(-1)}
          disabled={currentSection === 0}
        >
          <ChevronLeft color={currentSection === 0 ? '#ccc' : '#000'} size={24} />
        </Pressable>
        <Text style={styles.sectionTitle}>{sections[currentSection].title}</Text>
        <Pressable 
          style={[styles.navButton, currentSection === sections.length - 1 && styles.navButtonDisabled]}
          onPress={() => navigateSection(1)}
          disabled={currentSection === sections.length - 1}
        >
          <ChevronRight color={currentSection === sections.length - 1 ? '#ccc' : '#000'} size={24} />
        </Pressable>
      </View>

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {sections.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentSection && styles.progressDotActive,
              { backgroundColor: index === currentSection ? getSeverityColor(totalScore) : '#E0E0E0' }
            ]}
          />
        ))}
      </View>

      {/* Content Area */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {sections[currentSection].items.map((item) => (
          <View key={item.key} style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{item.name}</Text>
            <View style={styles.scoreButtonsContainer}>
              {[...Array(item.maxScore + 1)].map((_, index) => 
                renderScoreButton(
                  item.key,
                  index,
                  item.descriptions[index],
                  scores[item.key] === index
                )
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <AlertCircle size={20} color="#666" />
        <Text style={styles.footerText}>
          Use navigation arrows to move between sections.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalScoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  totalScoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  navButton: {
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  progressDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  scoreButtonsContainer: {
    gap: 8,
  },
  scoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  scoreButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  scoreValueContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  scoreValueSelected: {
    color: '#2196F3',
  },
  scoreDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  scoreDescriptionSelected: {
    color: '#1A1A1A',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default NIHStrokeScale;