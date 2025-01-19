import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Calculate the chart width accounting for padding
const CONTAINER_PADDING = 20;
const CHART_MARGIN = 16;
const chartWidth = width - (2 * CONTAINER_PADDING) - CHART_MARGIN;

const PerformanceChart = ({ data }) => (
  <SafeAreaView>
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Performance Trends</Text>
      
      <View style={styles.chartSection}>
        <Text style={styles.subTitle}>Patients & Revenue Trends</Text>
        <LineChart
          data={data}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 76, 84, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4', // Reduced dot size for better fit
              strokeWidth: '2',
              stroke: '#ffffff'
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: '#e3e3e3',
              strokeWidth: 1
            },
            propsForLabels: {
              fontSize: 10, // Reduced font size
              fontWeight: '600'
            }
          }}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={true}
          segments={5}
          getDotColor={(dataPoint, dataPointIndex) => {
            return dataPointIndex % 2 === 0 ? '#27c7b8' : '#f78837';
          }}
          renderDotContent={({ x, y, index }) => (
            <View
              key={index}
              style={[
                styles.dotLabel,
                {
                  left: x - 15, // Adjusted positioning
                  top: y - 20,
                },
              ]}
            />
          )}
        />
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#27c7b8' }]} />
          <Text style={styles.legendText}>Patients Treated</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#f78837' }]} />
          <Text style={styles.legendText}>Revenue</Text>
        </View>
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: CONTAINER_PADDING,
    marginHorizontal: 8, // Added horizontal margin
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
  chartSection: {
    marginVertical: 10,
    overflow: 'hidden', // Added to prevent content from protruding
  },
  chartTitle: {
    fontSize: 20, // Reduced font size
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 14, // Reduced font size
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  dotLabel: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 3, // Reduced padding
    borderRadius: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendDot: {
    width: 8, // Reduced size
    height: 8, // Reduced size
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12, // Reduced font size
    color: '#666666',
    fontWeight: '500',
  },
});

export default PerformanceChart;