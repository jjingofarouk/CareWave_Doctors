import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';

const MetricCard = ({ title, value, suffix = '', icon }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [displayValue, setDisplayValue] = useState(0);
  
  // Convert string value to number if it's a currency
  const numericValue = typeof value === 'string' ? 
    parseInt(value.replace(/[^0-9]/g, '')) : 
    value;

  useEffect(() => {
    // Start counting animation when value changes
    const duration = 2000; // 2 seconds animation
    const steps = 60; // Update 60 times during animation
    let prevValue = displayValue;
    
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      const progress = animatedValue.__getValue();
      const currentValue = Math.round(prevValue + (numericValue - prevValue) * progress);
      setDisplayValue(currentValue);

      if (progress === 1) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [numericValue]);

  // Get appropriate icon based on metric type
  const getIcon = () => {
    const iconMap = {
      'Patients Treated': 'users',
      'Revenue Generated': 'dollar-sign',
      'Avg. Appointment Time': 'clock',
    };
    
    return iconMap[title] || 'bar-chart-2';
  };

  // Format the display value based on metric type
  const getFormattedValue = () => {
    if (title === 'Revenue Generated') {
      return `Shs. ${displayValue.toLocaleString()}`;
    }
    return `${displayValue}${suffix}`;
  };

  // Calculate percentage change (mock data for demonstration)
  const getPercentageChange = () => {
    const percentageMap = {
      'Patients Treated': 12.5,
      'Revenue Generated': 8.3,
      'Avg. Appointment Time': -5.2,
    };
    return percentageMap[title] || 0;
  };

  const percentageChange = getPercentageChange();
  const isPositive = percentageChange >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Feather name={getIcon()} size={24} color="#004C54" />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.value}>
        {getFormattedValue()}
      </Text>
      
      <View style={styles.footer}>
        <View style={[
          styles.percentageContainer,
          { backgroundColor: isPositive ? '#e6f4f1' : '#fee7e7' }
        ]}>
          <Feather 
            name={isPositive ? 'trending-up' : 'trending-down'} 
            size={14} 
            color={isPositive ? '#27c7b8' : '#ff4d4f'}
            style={styles.trendIcon}
          />
          <Text style={[
            styles.percentageText,
            { color: isPositive ? '#27c7b8' : '#ff4d4f' }
          ]}>
            {Math.abs(percentageChange)}%
          </Text>
        </View>
        <Text style={styles.periodText}>vs last month</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '31%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  trendIcon: {
    marginRight: 4,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  periodText: {
    fontSize: 12,
    color: '#999999',
  },
});

export default MetricCard;