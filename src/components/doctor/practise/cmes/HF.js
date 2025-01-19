import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Award, Clock, Heart } from 'lucide-react-native';

const HeartFailureCME = ({ navigation }) => {
  const course = {
    id: 4,
    title: 'Heart Failure: From Diagnosis to Treatment',
    category: 'Cardiology',
    credits: 3,
    duration: '2.5 hours',
    lastUpdated: '2024-03-10',
    difficulty: 'Advanced',
    component: 'HeartFailure',
    highlights: [
      'Early detection of heart failure',
      'Modern treatment protocols',
      'Advanced therapies and devices',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Course Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.category}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Award style={styles.icon} />
            <Text style={styles.statText}>{course.credits} Credits</Text>
          </View>
          <View style={styles.statItem}>
            <Clock style={styles.icon} />
            <Text style={styles.statText}>{course.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Heart style={styles.icon} />
            <Text style={styles.statText}>{course.difficulty}</Text>
          </View>
        </View>
      </View>

      {/* Course Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Highlights</Text>
        <View style={styles.highlightsContainer}>
          {course.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Learning Objectives */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Objectives</Text>
        <Text style={styles.objectiveText}>
          This course is designed to provide advanced insights into the diagnosis
          and treatment of heart failure, equipping medical professionals with:
        </Text>
        <Text style={styles.objectiveItem}>- Comprehensive knowledge of early detection techniques.</Text>
        <Text style={styles.objectiveItem}>- Familiarity with modern treatment protocols.</Text>
        <Text style={styles.objectiveItem}>- An understanding of advanced therapies and devices.</Text>
      </View>

      {/* Modules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Modules</Text>
        <TouchableOpacity
          style={styles.moduleButton}
          onPress={() => navigation.navigate('Module1')}
        >
          <Text style={styles.moduleButtonText}>Module 1: Early Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moduleButton}
          onPress={() => navigation.navigate('Module2')}
        >
          <Text style={styles.moduleButtonText}>Module 2: Treatment Protocols</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moduleButton}
          onPress={() => navigation.navigate('Module3')}
        >
          <Text style={styles.moduleButtonText}>
            Module 3: Advanced Therapies and Devices
          </Text>
        </TouchableOpacity>
      </View>

      {/* Start Course Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate(course.component)}
        >
          <Text style={styles.startButtonText}>Start Course</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 16,
  },
  header: {
    backgroundColor: '#27c7b8',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#eaf7f8',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    marginRight: 8,
  },
  statText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002432',
    marginBottom: 8,
  },
  highlightsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
  },
  highlightItem: {
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#555',
  },
  objectiveText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  objectiveItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  moduleButton: {
    backgroundColor: '#002432',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  moduleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#f78837',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HeartFailureCME;
