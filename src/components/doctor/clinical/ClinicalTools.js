import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import local images
import calculatorImage from './assets/calculators.jpg';
import aiDiagnosisImage from './assets/AI.jpg';
import drugInteractionImage from './assets/drug.jpg';
import radiologyImage from './assets/rads.jpg';
import referralsImage from './assets/referrals.jpg';
import researchToolsImage from './assets/research.jpg';

const ToolOption = ({ to, text, backgroundImage }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(to);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.gridItem}>
      <ImageBackground source={backgroundImage} style={styles.cardBackground}>
        <Text style={styles.cardText}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ClinicalTools = () => {
  const [showNotification, setShowNotification] = useState(false);

  const clinicalTools = [
    { to: "Clinical Calculators", text: "Clinical Calculators", backgroundImage: calculatorImage },
    { to: "AI Diagnosis", text: "AI-Assisted Diagnosis", backgroundImage: aiDiagnosisImage },
    { to: "Drug Interactions", text: "Drug Interaction Checker", backgroundImage: drugInteractionImage },
    { to: "Radiology", text: "Radiology Cases", backgroundImage: radiologyImage },
    { to: "Referrals", text: "Referrals Hub", backgroundImage: referralsImage },
    { to: "Research Tools", text: "Research Tools", backgroundImage: researchToolsImage },
  ];

  const handleNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Clinical Tools</Text>
        <Text style={styles.subtitle}>Access advanced tools to support clinical decisions:</Text>

        <View style={styles.gridContainer}>
          {clinicalTools.map((tool, index) => (
            <ToolOption key={index} {...tool} />
          ))}
        </View>




      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    padding: 15
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003B5C',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#4f4f4f',
    textAlign: 'center',
    marginBottom: 20
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    height: 150,
    marginBottom: 15,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    borderRadius: 15,
    padding: 15,
  },
  cardText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  helpCard: {
    marginTop: 40,
    backgroundColor: '#FFEBE8',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003B5C'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  primaryButton: {
    backgroundColor: '#2EC4B6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4E8F87',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  notification: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  notificationText: {
    fontSize: 14,
    color: '#4f4f4f',
    flex: 1
  },
  closeButton: {
    padding: 5
  },
  closeIcon: {
    fontSize: 20,
    color: '#777',
  }
});

export default ClinicalTools;
