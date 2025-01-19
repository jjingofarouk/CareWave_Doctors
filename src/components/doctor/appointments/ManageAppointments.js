import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // You can choose different icon sets, like MaterialIcons, FontAwesome, etc.

import Button from '../../ui/button';
import ApproveAppointment from './PendingAppointment';
import RebookAppointment from './RescheduleAppointment';
import CancelAppointment from './CancelAppointment';
import ManageAvailability from './ManageAvailability';

const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState('approve'); 

  const tabs = [
    { id: 'approve', label: 'Approve Appointments', icon: 'book', component: ApproveAppointment },
    { id: 'rebook', label: 'Rebook Appointments', icon: 'calendar', component: RebookAppointment },
    { id: 'cancel', label: 'Cancel Appointments', icon: 'x-circle', component: CancelAppointment },
    { id: 'availability', label: 'Manage Availability', icon: 'user-check', component: ManageAvailability },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Appointments</Text>

      <View style={styles.card}>
        <View style={styles.tabsList}>
          {tabs.map(({ id, label, icon }) => (
            <TouchableOpacity 
              key={id} 
              style={[styles.tab, activeTab === id && styles.activeTab]} 
              onPress={() => setActiveTab(id)}
            >
              <Icon name={icon} size={24} color={activeTab === id ? '#fff' : '#002432'} />
              <Text style={[styles.tabLabel, activeTab === id && styles.activeTabLabel]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {tabs.map(({ id, component: Component }) => 
            activeTab === id ? <Component key={id} /> : null
          )}
        </View>
      </View>

      <View style={styles.backButtonContainer}>
        <Button variant="outline" onPress={() => window.history.back()}>
          Back
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002432',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#dfe4e5',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#dfe4e5',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  tabsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  activeTab: {
    backgroundColor: '#f78837',
    borderRadius: 8,
  },
  tabLabel: {
    color: '#002432',
    marginLeft: 8,
  },
  activeTabLabel: {
    color: '#fff',
  },
  tabContent: {
    padding: 16,
  },
  backButtonContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
});

export default ManageAppointments;
