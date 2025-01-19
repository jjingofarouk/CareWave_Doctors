import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Wellness Component
const Wellness = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <Text style={styles.title}>Your Wellness Journey</Text>
        <Text style={styles.subtitle}>Take control of your health and well-being with these tips.</Text>

        {/* Exercise Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise</Text>
          <Text style={styles.sectionDescription}>
            Regular physical activity is key to staying healthy. Try to engage in at least 30 minutes of moderate exercise every day.
          </Text>
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name="dumbbell" style={styles.icon} />
            <Text style={styles.cardText}>Exercise Tips</Text>
          </TouchableOpacity>
        </View>

        {/* Nutrition Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition</Text>
          <Text style={styles.sectionDescription}>
            Eating a balanced diet helps maintain energy levels and prevents diseases. Focus on whole foods like fruits, vegetables, and whole grains.
          </Text>
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name="food" style={styles.icon} />
            <Text style={styles.cardText}>Nutrition Tips</Text>
          </TouchableOpacity>
        </View>

        {/* Stress Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stress Management</Text>
          <Text style={styles.sectionDescription}>
            Managing stress is essential for mental well-being. Consider practices like meditation, yoga, or mindfulness.
          </Text>
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name="smiley-sad" style={styles.icon} />
            <Text style={styles.cardText}>Stress Relief Techniques</Text>
          </TouchableOpacity>
        </View>

        {/* Sleep Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep</Text>
          <Text style={styles.sectionDescription}>
            Ensure you get 7-8 hours of quality sleep each night to support your physical and mental health.
          </Text>
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name="bed" style={styles.icon} />
            <Text style={styles.cardText}>Sleep Tips</Text>
          </TouchableOpacity>
        </View>

        {/* Preventive Care Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preventive Care</Text>
          <Text style={styles.sectionDescription}>
            Stay proactive with regular health screenings and check-ups to catch potential health issues early.
          </Text>
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name="stethoscope" style={styles.icon} />
            <Text style={styles.cardText}>Preventive Screenings</Text>
          </TouchableOpacity>
        </View>

        {/* Wellness Articles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Articles</Text>
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name="file-document" style={styles.icon} />
            <Text style={styles.cardText}>Read Wellness Articles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for the Wellness component
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA', // Light Gray background
    padding: 10,
  },
  container: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333', // Dark Gray
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54', // Deep Teal
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF', 
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    fontSize: 30,
    color: '#009688', // Medium Teal
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    color: '#333333', // Dark Gray
    fontWeight: '600',
  },
  iconSmall: {
    fontSize: 18,
    color: '#009688', // Medium Teal
  },
});

export default Wellness;
