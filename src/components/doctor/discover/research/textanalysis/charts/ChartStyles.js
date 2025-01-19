import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const emotionColors = {
  joy: '#FFB400',
  sadness: '#0066FF',
  anger: '#FF3B3B',
  fear: '#6B2FEB',
  anxiety: '#7C4DFF',
  pain: '#E31B23',
  relief: '#4ADE80',
  concern: '#F472B6',
  hope: '#38BDF8',
  frustration: '#F43F5E',
  gratitude: '#FB923C',
  confusion: '#A855F7',
  disappointment: '#64748B',
  empowerment: '#06B6D4',
  loneliness: '#B45309',
  love: '#EC4899',
  guilt: '#475569',
  shame: '#1E293B',
  pride: '#F97316',
  curiosity: '#06B6D4',
};

const defaultColor = '#0EA5E9';


export const styles = StyleSheet.create({
    chartsContainer: {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 16,
      marginVertical: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    chartTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#1E293B',
      letterSpacing: -0.5,
    },
    noEmotionsText: {
      fontSize: 16,
      color: '#64748B',
      textAlign: 'center',
      marginTop: 24,
      fontWeight: '500',
    },
    visualizationToggle: {
      flexDirection: 'row',
      backgroundColor: '#F1F5F9',
      borderRadius: 24,
      padding: 3,
    },
    toggleButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    activeToggleButton: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    toggleButtonText: {
      fontSize: 14,
      color: '#64748B',
      fontWeight: '500',
    },
    activeToggleButtonText: {
      color: '#0F172A',
      fontWeight: '600',
    },
    chartWrapper: {
      marginHorizontal: -15,
    },
    chart: {
      marginVertical: 10,
      borderRadius: 16,
      paddingRight: 20,
    },
    legendContainer: {
      marginTop: 24,
      padding: 12,
      backgroundColor: '#F8FAFC',
      borderRadius: 12,
    },
    legendTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1E293B',
      marginBottom: 12,
      letterSpacing: -0.3,
    },
    intensityList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    intensityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      marginBottom: 6,
      backgroundColor: '#FFFFFF',
      padding: 6,
      paddingRight: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    intensityDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 6,
    },
    intensityText: {
      fontSize: 13,
      color: '#475569',
      fontWeight: '500',
    },
    intensityValue: {
      color: '#0F172A',
      fontWeight: '600',
    },
    summariesContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
        width: '100%',
      },
      summariesTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1F2937',
      },
      summariesScroll: {
        maxHeight: 200,
      },
      summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#374151',
      },
      summaryText: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
      },
      noSummaryText: {
        fontSize: 14,
        color: '#6B7280',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 20,
      }
  });