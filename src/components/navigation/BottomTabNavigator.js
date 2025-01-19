import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import DoctorHome from '../dashboard/DoctorHome';
import StartConsultation from '../patients/consultations/StartConsultation';
import ClinicalTools from '../doctor/clinical/ClinicalTools'; // assuming a clinical tools screen
import MyPractise from '../doctor/practise/MyPractise'; // assuming a My Practice screen
import Records from '../doctor/records/Records';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#009688',
        tabBarInactiveTintColor: '#002432',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: false,
      }}
    >
      {/* Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={DoctorHome}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-outline" color="#002432" size={28} />
          ),
        }}
      />
      
      {/* Consultations */}
      <Tab.Screen
        name="Consultations"
        component={StartConsultation}
        options={{
          tabBarLabel: 'Consult',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="stethoscope" color="#002432" size={28} />
          ),
        }}
      />
      
      {/* Clinical Tools */}
      <Tab.Screen
        name="Clinical Tools"
        component={ClinicalTools}
        options={{
          tabBarLabel: 'Tools',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="medical-bag" color="#002432" size={28} />
          ),
        }}
      />
      
      {/* My Practice */}
      <Tab.Screen
        name="My Practice"
        component={MyPractise}
        options={{
          headerShown: false, 
          tabBarLabel: 'My Practice',

          tabBarIcon: () => (
            <MaterialCommunityIcons name="briefcase" color="#002432" size={28} />
          ),
        }}
      />
      
      {/* Records */}
      <Tab.Screen
        name="Records"
        component={Records}
        options={{
          tabBarLabel: 'Records',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="clipboard-text" color="#002432" size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
