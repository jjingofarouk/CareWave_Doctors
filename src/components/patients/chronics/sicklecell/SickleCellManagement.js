// SickleCellManagement.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PainManagement from './PainManagement';
import MedicationManagement from './MedicationManagement';
import SymptomLogging from './SymptomLogging';
import HydrationTracking from './HydrationTracking';
import EmergencyProtocols from './EmergencyProtocols';
import InfectionPrevention from './InfectionPrevention';

const SickleCellManagement = () => {
  const [painLevel, setPainLevel] = useState(''); // Stores selected pain level

  return (
    <ScrollView style={styles.container}>
      {/* Each component is modular and responsible for a specific management aspect */}
      <PainManagement onPainLevelChange={setPainLevel} />
      <MedicationManagement />
      <SymptomLogging />
      <HydrationTracking />
      <EmergencyProtocols />
      <InfectionPrevention />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA', // Consistent background color
  },
});

export default SickleCellManagement;
