// RevenueForecasting.js
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, Text, View, StyleSheet } from 'react-native';


const screenWidth = Dimensions.get('window').width;

const RevenueForecasting = ({ monthlyRevenue }) => {
  const [forecastedRevenue, setForecastedRevenue] = React.useState([]);

  React.useEffect(() => {
    forecastRevenue(monthlyRevenue);
  }, [monthlyRevenue]);

  const forecastRevenue = (data) => {
    const months = Object.keys(data);
    const revenues = Object.values(data);
    const forecast = [];

    if (months.length > 1) {
      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, n = months.length;

      months.forEach((month, index) => {
        const x = index + 1; // Assign numerical value to months (1, 2, 3, ...)
        const y = revenues[index];
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
      });

      const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const b = (sumY - m * sumX) / n;

      // Forecast future revenue (next 3 months)
      const forecastMonths = 3;
      for (let i = 1; i <= forecastMonths; i++) {
        const futureMonthRevenue = m * (n + i) + b;
        forecast.push(futureMonthRevenue.toFixed(2));
      }
    }

    setForecastedRevenue(forecast);
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Forecasted Revenue (Next 3 Months)</Text>
      <LineChart
        data={{
          labels: ['Next Month', 'Next 2 Months', 'Next 3 Months'],
          datasets: [{ data: forecastedRevenue.map(item => parseFloat(item)) }],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#002432',
          backgroundGradientFrom: '#002432',
          backgroundGradientTo: '#f78837',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#27c7b8',
  },
  chart: {
    borderRadius: 16,
  },
});

export default RevenueForecasting;
