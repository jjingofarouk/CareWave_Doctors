import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// List of 50 HIV myths and facts
const mythsAndFacts = [
  { myth: "HIV can be spread through casual contact.", fact: "HIV is only transmitted through blood, semen, vaginal fluids, and breast milk." },
  { myth: "You can get HIV from sharing a toilet seat.", fact: "HIV is not transmitted through casual contact like toilet seats." },
  { myth: "People with HIV look sick and unhealthy.", fact: "Many people with HIV appear healthy, especially if they're on treatment." },
  { myth: "You can get HIV from a mosquito bite.", fact: "HIV is not spread by mosquitoes. It requires direct contact with certain fluids." },
  { myth: "HIV can be cured with a special diet or natural remedies.", fact: "There is currently no cure for HIV, but treatment can help manage it." },
  // Add 45 more myths and facts here...
];

const MythDebunking = () => {
  const [mythOfTheDay, setMythOfTheDay] = useState(null);

  useEffect(() => {
    const currentDay = new Date().getDate(); // Get the current day of the month
    const mythIndex = currentDay % mythsAndFacts.length; // Cycle through myths based on the current day
    setMythOfTheDay(mythsAndFacts[mythIndex]);
  }, []);

  if (!mythOfTheDay) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>HIV Myth Debunking</Text>
      <Text style={styles.myth}>Myth: {mythOfTheDay.myth}</Text>
      <Text style={styles.fact}>Fact: {mythOfTheDay.fact}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
    textAlign: 'center',
  },
  myth: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF7043', // Accent color for myth text
    marginBottom: 10,
  },
  fact: {
    fontSize: 18,
    fontWeight: '600',
    color: '#27c7b8', // Greenish color for fact
    marginBottom: 10,
  },
});

export default MythDebunking;
