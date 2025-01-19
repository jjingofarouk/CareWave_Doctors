import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const MetricsOverview = ({ data }) => {
  // Calculate chart dimensions
  const CONTAINER_PADDING = 15;
  const MINIMUM_BAR_WIDTH = 50; // Minimum width per bar
  const calculatedWidth = Math.max(
    data.labels.length * MINIMUM_BAR_WIDTH,
    width - (2 * CONTAINER_PADDING)
  );

  // Modified data structure to use shorter labels
  const modifiedData = {
    ...data,
    labels: data.labels.map(label => {
      const labelMap = {
        'Successful Appointments': 'Successful',
        'Canceled Appointments': 'Canceled',
        'Referrals Sent': 'Refs Sent',
        'Referrals Received': 'Refs Rcvd',
        'Reviews Received': 'Reviews',
        'Cases Uploaded': 'Cases',
        'Prescriptions Written': 'Prescriptions'
      };
      return labelMap[label] || label;
    })
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Key Metrics Overview</Text>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.chartWrapper}>
          <BarChart
            data={modifiedData}
            width={calculatedWidth}
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#f5f7fa',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 76, 84, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 76, 84, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 0.7,
              propsForLabels: {
                fontSize: 11,
                rotation: -45,
              },
              propsForVerticalLabels: {
                fontSize: 10,
              },
            }}
            showValuesOnTopOfBars={true}
            showBarTops={false}
            fromZero={true}
            verticalLabelRotation={-45}
            xLabelsOffset={-10}
            horizontalLabelRotation={-45}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingRight: 20,
              paddingBottom: 20,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  chartWrapper: {
    overflow: 'hidden',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default MetricsOverview;