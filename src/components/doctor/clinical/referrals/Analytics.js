// components/referral/Analytics.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressCircle
} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState('month'); // week, month, year
  const [metrics, setMetrics] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
    averageResponseTime: 0,
    specialtyBreakdown: [],
    monthlyTrends: {},
    satisfactionRate: 0,
    topSpecialists: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeFrame]);

  const fetchAnalyticsData = async () => {
    // Implement API call to fetch analytics data
    // This is mock data
    setMetrics({
      totalReferrals: 156,
      pendingReferrals: 23,
      completedReferrals: 133,
      averageResponseTime: 2.4,
      specialtyBreakdown: [
        { specialty: 'Cardiology', count: 45, color: '#FF6384' },
        { specialty: 'Neurology', count: 30, color: '#36A2EB' },
        { specialty: 'Orthopedics', count: 25, color: '#FFCE56' },
        { specialty: 'Pediatrics', count: 20, color: '#4BC0C0' },
        { specialty: 'Dermatology', count: 15, color: '#9966FF' }
      ],
      monthlyTrends: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [30, 45, 28, 80, 99, 43]
          }
        ]
      },
      satisfactionRate: 87,
      topSpecialists: [
        { name: 'Dr. Sarah Johnson', referrals: 45, rating: 4.8 },
        { name: 'Dr. Michael Chen', referrals: 38, rating: 4.7 },
        { name: 'Dr. Emily Brown', referrals: 32, rating: 4.9 }
      ]
    });
  };

  const TimeFrameSelector = () => (
    <View style={styles.timeFrameContainer}>
      {['week', 'month', 'year'].map((frame) => (
        <TouchableOpacity
          key={frame}
          style={[
            styles.timeFrameButton,
            timeFrame === frame && styles.timeFrameButtonActive
          ]}
          onPress={() => setTimeFrame(frame)}
        >
          <Text style={[
            styles.timeFrameText,
            timeFrame === frame && styles.timeFrameTextActive
          ]}>
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const MetricCard = ({ title, value, icon, trend }) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Icon name={icon} size={24} color="#007AFF" />
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      {trend && (
        <View style={styles.trendContainer}>
          <Icon 
            name={trend > 0 ? 'trending-up' : 'trending-down'} 
            size={16} 
            color={trend > 0 ? '#34C759' : '#FF3B30'} 
          />
          <Text style={[
            styles.trendText,
            { color: trend > 0 ? '#34C759' : '#FF3B30' }
          ]}>
            {Math.abs(trend)}% from last {timeFrame}
          </Text>
        </View>
      )}
    </View>
  );

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ScrollView style={styles.container}>
      <TimeFrameSelector />

      <View style={styles.metricsGrid}>
        <MetricCard
          title="Total Referrals"
          value={metrics.totalReferrals}
          icon="assignment"
          trend={12}
        />
        <MetricCard
          title="Pending"
          value={metrics.pendingReferrals}
          icon="pending"
          trend={-5}
        />
        <MetricCard
          title="Completed"
          value={metrics.completedReferrals}
          icon="check-circle"
          trend={8}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${metrics.averageResponseTime} days`}
          icon="timer"
          trend={-15}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Monthly Trends</Text>
        <LineChart
          data={metrics.monthlyTrends}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Specialty Breakdown</Text>
        <PieChart
          data={metrics.specialtyBreakdown.map(item => ({
            name: item.specialty,
            count: item.count,
            color: item.color,
            legendFontColor: '#7F7F7F',
            legendFontSize: 12
          }))}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      <View style={styles.satisfactionSection}>
        <Text style={styles.sectionTitle}>Patient Satisfaction</Text>
        <ProgressCircle
          style={styles.satisfactionChart}
          progress={metrics.satisfactionRate / 100}
          color="#34C759"
          backgroundColor="#f0f0f0"
        />
        <Text style={styles.satisfactionRate}>
          {metrics.satisfactionRate}%
        </Text>
      </View>

      <View style={styles.topSpecialistsSection}>
        <Text style={styles.sectionTitle}>Top Performing Specialists</Text>
        {metrics.topSpecialists.map((specialist, index) => (
          <View key={index} style={styles.specialistCard}>
            <Text style={styles.specialistName}>{specialist.name}</Text>
            <View style={styles.specialistStats}>
              <Text style={styles.specialistReferrals}>
                {specialist.referrals} referrals
              </Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{specialist.rating}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  timeFrameContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4
  },
  timeFrameButton: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 6
  },
  timeFrameButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  timeFrameText: {
    color: '#666'
  },
  timeFrameTextActive: {
    color: '#007AFF',
    fontWeight: '600'
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  metricTitle: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  trendText: {
    marginLeft: 4,
    fontSize: 12
  },
  chartSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  satisfactionSection: {
    alignItems: 'center',
    marginBottom: 24
  },
  satisfactionChart: {
    marginVertical: 16
  },
  satisfactionRate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759'
  },
  topSpecialistsSection: {
    marginBottom: 24
  },
  specialistCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  specialistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  specialistStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  specialistReferrals: {
    color: '#666'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600'
  }
});

export default Analytics;