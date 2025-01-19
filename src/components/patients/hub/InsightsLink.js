import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import dayjs from 'dayjs';

// Screen Dimensions for Chart
const screenWidth = Dimensions.get('window').width;

// Sample Data Generation
const generateRandomData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    date: dayjs().subtract(days - 1 - i, 'day').format('YYYY-MM-DD'),
    score: Math.floor(Math.random() * 30) + 70,
    sleep: Math.floor(Math.random() * 4) + 5,
    steps: Math.floor(Math.random() * 5000) + 5000,
    calories: Math.floor(Math.random() * 500) + 1500,
    heartRate: Math.floor(Math.random() * 20) + 60,
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const InsightsLink = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('score');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    setTimeout(() => {
      setData(generateRandomData(days));
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const averageMetric = useMemo(() => {
    if (data.length === 0) return 0;
    return (data.reduce((sum, day) => sum + day[selectedMetric], 0) / data.length).toFixed(2);
  }, [data, selectedMetric]);

  const renderLineChart = () => (
    <LineChart
      data={{
        labels: data.map((item) => item.date),
        datasets: [{ data: data.map((item) => item[selectedMetric]) }],
      }}
      width={screenWidth - 40}
      height={250}
      yAxisLabel=""
      chartConfig={{
        backgroundColor: '#004C54',
        backgroundGradientFrom: '#009688',
        backgroundGradientTo: '#27c7b8',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      style={styles.chart}
    />
  );

  const renderBarChart = () => (
    <BarChart
      data={{
        labels: data.map((item) => item.date),
        datasets: [{ data: data.map((item) => item[selectedMetric]) }],
      }}
      width={screenWidth - 40}
      height={250}
      yAxisLabel=""
      chartConfig={{
        backgroundColor: '#004C54',
        backgroundGradientFrom: '#009688',
        backgroundGradientTo: '#27c7b8',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      style={styles.chart}
    />
  );

  const renderPieChart = () => (
    <PieChart
      data={[
        { name: 'Protein', population: 30, color: COLORS[0], legendFontColor: '#333', legendFontSize: 15 },
        { name: 'Carbs', population: 50, color: COLORS[1], legendFontColor: '#333', legendFontSize: 15 },
        { name: 'Fats', population: 20, color: COLORS[2], legendFontColor: '#333', legendFontSize: 15 },
      ]}
      width={screenWidth - 40}
      height={250}
      chartConfig={{
        backgroundColor: '#004C54',
        backgroundGradientFrom: '#009688',
        backgroundGradientTo: '#27c7b8',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Advanced Health Insights</Text>
        <TouchableOpacity onPress={fetchData} style={styles.button}>
          <Text style={styles.buttonText}>{loading ? 'Refreshing...' : 'Refresh'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        {loading ? <ActivityIndicator size="large" color="#009688" /> : renderLineChart()}
      </View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>View Detailed Report</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detailed Report</Text>
            <Text>Average {selectedMetric}: {averageMetric}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004C54',
  },
  button: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 20,
  },
  chart: {
    borderRadius: 8,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default InsightsLink;
