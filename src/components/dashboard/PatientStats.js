// components/DoctorHome/PatientStats.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useTheme } from '../utils/useTheme';

const PatientStats = ({ statistics, onStatPress }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patient Statistics</Text>
        <TouchableOpacity onPress={() => onStatPress('all')}>
          <Text style={styles.viewAll}>Detailed Analysis</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: statistics.labels,
            datasets: [{ data: statistics.data }]
          }}
          width={320}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: theme.colors.primary,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => theme.colors.primary,
            style: {
              borderRadius: 16,
            }
          }}
          style={styles.chart}
        />
      </View>

      <View style={styles.statsGrid}>
        {statistics.metrics.map((metric) => (
          <TouchableOpacity
            key={metric.id}
            style={styles.statCard}
            onPress={() => onStatPress(metric.type)}
          >
            <Text style={styles.statValue}>{metric.value}</Text>
            <Text style={styles.statLabel}>{metric.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  // ... additional styles
};

export default PatientStats;