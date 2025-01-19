// RevenueCharts.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ContributionGraph
} from 'react-native-chart-kit';

const { width: screenWidth } = Dimensions.get('window');
const chartWidth = screenWidth - 32;

const chartConfigs = {
  line: {
    backgroundColor: '#1a73e8',
    backgroundGradientFrom: '#1a73e8',
    backgroundGradientTo: '#4285f4',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#fafafa'
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600'
    }
  },
  bar: {
    backgroundColor: '#34a853',
    backgroundGradientFrom: '#34a853',
    backgroundGradientTo: '#4caf50',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600'
    }
  },
  pie: {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600'
    }
  }
};

const RevenueCharts = ({ data }) => {
  const [activeTab, setActiveTab] = useState('monthly');
  
  // Transform data for different chart types
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2
    }]
  };

  const serviceData = {
    labels: ['Service A', 'Service B', 'Service C', 'Service D'],
    datasets: [{
      data: [30, 45, 28, 80]
    }]
  };

  const pieData = [
    {
      name: 'Service A',
      population: 30,
      color: '#1a73e8',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Service B',
      population: 45,
      color: '#34a853',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Service C',
      population: 28,
      color: '#fbbc05',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Service D',
      population: 80,
      color: '#ea4335',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }
  ];

  const renderTab = (tabName, label) => (
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === tabName && styles.activeTab
      ]}
      onPress={() => setActiveTab(tabName)}
    >
      <Text style={[
        styles.tabText,
        activeTab === tabName && styles.activeTabText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tabs}>
          {renderTab('monthly', 'Monthly Trend')}
          {renderTab('services', 'Services')}
          {renderTab('distribution', 'Distribution')}
        </View>

        {activeTab === 'monthly' && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Monthly Revenue Trend</Text>
            <LineChart
              data={monthlyData}
              width={chartWidth}
              height={220}
              chartConfig={chartConfigs.line}
              bezier
              style={styles.chart}
              withInnerLines={false}
              withOuterLines={true}
              withVerticalLines={false}
              withHorizontalLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={true}
            />
          </View>
        )}

        {activeTab === 'services' && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Revenue by Service</Text>
            <BarChart
              data={serviceData}
              width={chartWidth}
              height={220}
              chartConfig={chartConfigs.bar}
              style={styles.chart}
              showValuesOnTopOfBars
              fromZero
              withInnerLines={false}
            />
          </View>
        )}

        {activeTab === 'distribution' && (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Revenue Distribution</Text>
            <PieChart
              data={pieData}
              width={chartWidth}
              height={220}
              chartConfig={chartConfigs.pie}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chart}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContent: {
    paddingBottom: 24
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: '#f5f5f5'
  },
  activeTab: {
    backgroundColor: '#1a73e8'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666'
  },
  activeTabText: {
    color: '#ffffff'
  },
  chartContainer: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333'
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  }
});

export default RevenueCharts;