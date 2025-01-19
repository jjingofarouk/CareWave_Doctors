// components/Referrals.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DoctorDirectory from './referral/DoctorDirectory';
import ReferralForm from './referral/ReferralForm';
import ReferralTracking from './referral/ReferralTracking';
import Communication from './referral/Communication';
import Analytics from './referral/Analytics';
import PatientConsent from './referral/PatientConsent';
import { fetchReferrals, fetchDoctors } from '../store/referralSlice';

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