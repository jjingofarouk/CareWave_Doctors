import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MetricCard from './MetricCard';
import PerformanceChart from './PerformanceChart';
import MetricsOverview from './MetricsOverview';

const Analytics = () => {
  const [metrics, setMetrics] = useState({
    patientsTreated: 1247,  // Sample data
    revenueGenerated: 2845000,  // Sample data
    avgAppointmentTime: 45,  // Sample data
    successfulAppointments: 0,
    canceledAppointments: 0,
    referralsSent: 0,
    referralsReceived: 0,
    reviewsReceived: 0,
    prescriptionsWritten: 0,
    messageRequests: 0,
  });

  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(39, 199, 184, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [],
        color: (opacity = 1) => `rgba(247, 136, 55, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  });

  const [metricsOverviewData, setMetricsOverviewData] = useState({
    labels: [
      'Successful Appointments',
      'Canceled Appointments',
      'Referrals Sent',
      'Referrals Received',
      'Reviews Received',
      'Cases Uploaded',
      'Prescriptions Written',
    ],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(39, 199, 184, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample data - replace with actual API call
      setMetrics({
        ...metrics,
        patientsTreated: 1247,
        revenueGenerated: 2845000,
        avgAppointmentTime: 45,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.metricsContainer}>
        <MetricCard 
          title="Patients Treated"
          value={metrics.patientsTreated}
          icon="users"
        />
        <MetricCard 
          title="Revenue Generated"
          value={metrics.revenueGenerated}
          icon="dollar-sign"
        />
        <MetricCard 
          title="Avg. Appointment Time"
          value={metrics.avgAppointmentTime}
          suffix=" minutes"
          icon="clock"
        />
      </View>

      <PerformanceChart data={performanceData} />
      <MetricsOverview data={metricsOverviewData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    textAlign: 'center',
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});

export default Analytics;