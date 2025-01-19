import React from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LandingPage() {
  const navigation = useNavigation();

  const navigateToRoleSelection = () => {
    navigation.navigate('RoleSelection'); // Navigates to Role.js
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>We Care!</Text>
            <Button 
              title="Get Started" 
              onPress={navigateToRoleSelection} 
              color="#007bff"
            />
          </View>
          {/* Replace the video with an image */}
          <Image 
            style={styles.heroImage} 
            source={require('./images/cover-bg.jpg')} // Add your image path here
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Start Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresHeader}>Why Choose Our Platform?</Text>
        <Text style={styles.featuresDescription}>
          We have comprehensive features designed to make healthcare management seamless and efficient for you.
        </Text>
        {/* Add your feature items here */}
      </View>

      {/* Start Testimonials Section */}
      <View style={styles.testimonialsSection}>
        <Text style={styles.testimonialsHeader}>What Our Users Are Saying</Text>
        {/* Add your testimonials here */}
      </View>

      {/* Start Call-to-Action Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaHeader}>Take Charge of Your Health Today!</Text>
        <Text style={styles.ctaDescription}>
          Join the thousands of users who have transformed their healthcare experience. Sign up now and start enjoying our advanced health management tools.
        </Text>
        <Button 
          title="Sign Up" 
          onPress={navigateToRoleSelection} 
          color="#007bff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  heroContent: {
    alignItems: 'center',
    textAlign: 'center',
  },
  heroText: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  featuresSection: {
    padding: 16,
  },
  featuresHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  featuresDescription: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
  testimonialsSection: {
    padding: 16,
  },
  testimonialsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ctaSection: {
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  ctaHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  ctaDescription: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default LandingPage;
