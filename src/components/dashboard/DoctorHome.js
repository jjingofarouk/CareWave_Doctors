// components/DoctorHome/index.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import DashboardHeader from './DashboardHeader';
import QuickActions from './QuickActions';
import AnalyticsSummary from './AnalyticsSummary';
import AppointmentCalendar from './AppointmentCalendar';
import PatientActivity from './PatientActivity';
import HealthTipsCarousel from './HealthTipsCarousel';
import PatientStats from './PatientStats';
import NotificationsPanel from './NotificationsPanel';
import LoadingScreen from './LoadingScreen';
import { useTheme } from '../utils/useTheme';
import { useNotifications } from '../utils/useNotifications';
import { fetchDoctorDashboardData } from '../utils/api';

const DoctorHome = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  
  const { theme } = useTheme();
  const { notifications } = useNotifications();

  useEffect(() => {
    loadDashboardData();
    trackScreenView();
  }, []);

  const trackScreenView = async () => {
    await analytics().logScreenView({
      screen_name: 'DoctorDashboard',
      screen_class: 'DoctorHome',
    });
  };

  const loadDashboardData = async () => {
    try {
      const data = await fetchDoctorDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar 
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DashboardHeader 
          doctorName={dashboardData?.doctorName}
          onlineStatus={dashboardData?.onlineStatus}
          avatarUrl={dashboardData?.avatarUrl}
          notificationCount={notifications.length}
          onNotificationPress={() => navigation.navigate('Notifications')}
        />
        
        <QuickActions 
          onVideoCall={() => navigation.navigate('VideoConsultation')}
          onChat={() => navigation.navigate('ChatConsultations')}
          onPrescribe={() => navigation.navigate('Prescriptions')}
          onReports={() => navigation.navigate('Reports')}
        />

        <AnalyticsSummary 
          data={dashboardData?.analytics}
          onPressDetail={(metric) => navigation.navigate('Analytics', { metric })}
        />

        <AppointmentCalendar 
          appointments={dashboardData?.appointments}
          onAppointmentPress={(appointment) => 
            navigation.navigate('AppointmentDetail', { appointment })
          }
        />

        <PatientActivity 
          activities={dashboardData?.recentActivities}
          onActivityPress={(activity) => 
            navigation.navigate('PatientDetail', { patientId: activity.patientId })
          }
        />

        <HealthTipsCarousel 
          tips={dashboardData?.healthTips}
          onTipPress={(tip) => navigation.navigate('HealthTipDetail', { tip })}
        />

        <PatientStats 
          statistics={dashboardData?.patientStats}
          onStatPress={(statistic) => 
            navigation.navigate('PatientStatistics', { statistic })
          }
        />

        <NotificationsPanel 
          notifications={notifications.slice(0, 3)}
          onViewAll={() => navigation.navigate('Notifications')}
          onNotificationPress={(notification) => 
            navigation.navigate('NotificationDetail', { notification })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorHome;