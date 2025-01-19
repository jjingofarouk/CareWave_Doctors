import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// Import individual calculator components
import BMICalculator from './BMICalculator'; 
import CaloricNeedsCalculator from './CaloricNeedsCalculator';
import WaistCircumferenceCalculator from './WaistCircumferenceCalculator';
import IdealBodyWeightCalculator from './IdealBodyWeightCalculator';
import BMRCalculator from './BMRCalculator';
import HarrisBenedictCalculator from './HarrisBenedictCalculator';
import MifflinStJeorCalculator from './MifflinStJeorCalculator';
import BodyFatPercentageCalculator from './BodyFatPercentageCalculator';

const GeneralCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('BMI');

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'BMI':
        return <BMICalculator />;
      case 'Caloric Needs':
        return <CaloricNeedsCalculator />;
      case 'Waist Circumference':
        return <WaistCircumferenceCalculator />;

      case 'Ideal Body Weight':
        return <IdealBodyWeightCalculator />;
      case 'BMR':
        return <BMRCalculator />;
      case 'Harris-Benedict':
        return <HarrisBenedictCalculator />;
      case 'Mifflin-St Jeor':
        return <MifflinStJeorCalculator />;
  
      case 'Body Fat Percentage':
        return <BodyFatPercentageCalculator />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Calculators</Text>
      <View style={styles.tabsContainer}>
        {[
          'BMI',
          'Caloric Needs',
          'Waist Circumference',
          'Waist-to-Height Ratio',
          'Ideal Body Weight',
          'BMR',
          'Harris-Benedict',
          'Mifflin-St Jeor',
          'Body Fat Percentage'
        ].map(calculator => (
          <TouchableOpacity
            key={calculator}
            style={[styles.tab, activeCalculator === calculator && styles.activeTab]}
            onPress={() => setActiveCalculator(calculator)}
          >
            <Text style={styles.tabText}>{calculator}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.calculatorContent}>
        {renderCalculator()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#dfe4e5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '45%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#27c7b8',
  },
  tabText: {
    fontSize: 14,
    color: '#002432',
    fontWeight: '600',
  },
  calculatorContent: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
});

export default GeneralCalculators;
