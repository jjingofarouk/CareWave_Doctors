
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import uuid from 'react-native-uuid';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f4f4f4',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#002432',
      marginBottom: 16,
    },
    form: {
      marginBottom: 16,
    },
    input: {
      height: 40,
      borderColor: '#A0A0A0',
      borderWidth: 1,
      marginBottom: 8,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
    },
    search: {
      height: 40,
      borderColor: '#A0A0A0',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
    },
    totalRevenue: {
      marginBottom: 16,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#002432',
    },
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
    revenueItem: {
      padding: 8,
      marginBottom: 8,
      backgroundColor: '#fff',
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    revenueText: {
      fontSize: 16,
      color: '#002432',
    },
  });