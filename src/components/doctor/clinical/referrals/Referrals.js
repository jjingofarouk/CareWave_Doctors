// componentss.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DoctorDirectory from './DoctorDirectory';
import ReferralForm from './ReferralForm';
import ReferralTracking from './ReferralTracking';
import Communication from './Communication';
import Analytics from './Analytics';
import PatientConsent from './PatientConsent';
import { fetchReferrals, fetchDoctors } from './ReferralSlice';

const Referrals = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('directory');
  const { currentReferral, selectedDoctor, selectedPatient } = useSelector(
    (state) => state.referrals
  );

  useEffect(() => {
    // Initial data loading
    dispatch(fetchReferrals());
    dispatch(fetchDoctors());
  }, [dispatch]);

  const renderSection = () => {
    switch (activeSection) {
      case 'directory':
        return (
          <DoctorDirectory
            onDoctorSelect={(doctor) => {
              setActiveSection('form');
            }}
          />
        );
      
      case 'form':
        return (
          <ReferralForm
            onSubmit={() => {
              setActiveSection('tracking');
            }}
          />
        );
      
      case 'tracking':
        return (
          <ReferralTracking
            onCommunicate={() => {
              setActiveSection('communication');
            }}
          />
        );
      
      case 'communication':
        return (
          <Communication
            onComplete={() => {
              setActiveSection('tracking');
            }}
          />
        );
      
      case 'analytics':
        return <Analytics />;
      
      default:
        return <DoctorDirectory />;
    }
  };

  return (
    <View style={styles.container}>
      {renderSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default Referrals;