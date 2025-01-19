// InfectionPrevention.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const InfectionPrevention = () => {
  const handlePrevention = () => {
    // Alert for sharing infection prevention tips
    alert('Infection prevention tips have been shared. Stay safe!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Infection Prevention Tips</Text>
      <Text style={styles.info}>
        Infections can cause serious complications, especially for individuals with sickle cell disease. Follow these steps to reduce your risk of infection:
      </Text>

      {/* Prevention Tips */}
      <Text style={styles.info}>
        1. Wash your hands regularly with soap and water, especially before eating and after using the bathroom.
      </Text>
      <Text style={styles.info}>
        2. Always keep cuts, scrapes, and wounds clean and covered to prevent infections.
      </Text>
      <Text style={styles.info}>
        3. Stay up-to-date with your vaccinations. Speak to your doctor to make sure you're not missing any important vaccines.
      </Text>
      <Text style={styles.info}>
        4. Avoid close contact with people who are sick, particularly during flu season or when there are outbreaks.
      </Text>

      {/* Button for Reviewing Tips */}
      <Button title="Review Infection Prevention Tips" onPress={handlePrevention} color="#FF7043" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Light gray background for consistency
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54', // Deep Teal for the header
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333333', // Dark Gray text for readability
    lineHeight: 24,
  },
});

export default InfectionPrevention;
