// components/DoctorHome/AnalyticsSummary.js
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../utils/useTheme';

const AnalyticsSummary = ({ data, onPressDetail }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Overview</Text>
        <TouchableOpacity onPress={() => onPressDetail('all')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {data?.metrics.map((metric, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onPressDetail(metric.type)}
          >
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <LineChart
              data={metric.chartData}
              width={120}
              height={60}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => theme.colors.primary,
                strokeWidth: 2,
              }}
              bezier
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              style={styles.chart}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  // ... additional styles
};

export default AnalyticsSummary;