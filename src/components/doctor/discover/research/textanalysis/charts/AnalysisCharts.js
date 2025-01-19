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

const getIntensityColor = (baseColor, intensity) => {
  const alpha = Math.max(0.4, intensity / 100);
  return `${baseColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
};

const validateEmotionsData = (emotions) => {
  if (!emotions || typeof emotions !== 'object') {
    return false;
  }
  return Object.values(emotions).some(value => 
    value && 
    typeof value.percentage === 'number' && 
    !isNaN(value.percentage) && 
    value.percentage > 0 &&
    typeof value.intensity === 'string'
  );
};

export const AnalysisCharts = ({
  analysisResults,
  visualization = 'bar',
  onVisualizationChange,
  maxEmotions = 10,
  showIntensity = true,
  showDistribution = true,
  showDetailedAnalysis = true,
}) => {
  const processedData = useMemo(() => {
    if (!analysisResults?.emotionAnalysis?.emotions || 
        !validateEmotionsData(analysisResults.emotionAnalysis.emotions)) {
      return null;
    }

    const emotions = analysisResults.emotionAnalysis.emotions;
    
    const emotionsArray = Object.entries(emotions)
      .filter(([, value]) => value && value.percentage > 0)
      .map(([emotion, value]) => ({
        emotion,
        percentage: value.percentage,
        intensity: value.intensity,
        count: value.count,
        matches: value.matches
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, maxEmotions);

    return {
      labels: emotionsArray.map(item => item.emotion),
      data: emotionsArray.map(item => item.percentage),
      intensities: emotionsArray.map(item => item.intensity),
      counts: emotionsArray.map(item => item.count),
      matches: emotionsArray.map(item => item.matches),
      colors: emotionsArray.map(item => 
        showIntensity 
          ? getIntensityColor(emotionColors[item.emotion] || defaultColor, item.percentage)
          : emotionColors[item.emotion] || defaultColor
      )
    };
  }, [analysisResults, maxEmotions, showIntensity]);

  const complexityData = useMemo(() => {
    return analysisResults?.emotionAnalysis?.emotionalComplexity || {
      score: 0,
      activeEmotions: 0,
      totalEmotions: 0,
      complexity: 'low'
    };
  }, [analysisResults]);

  const detailedAnalysis = useMemo(() => {
    return analysisResults?.emotionAnalysis?.emotionalAnalysis || null;
  }, [analysisResults]);

  if (!processedData) {
    return (
      <View style={styles.chartsContainer}>
        <Text style={styles.chartTitle}>Enhanced Emotional Analysis</Text>
        <Text style={styles.noEmotionsText}>No emotion data available.</Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${Math.max(0.6, opacity)})`,
    strokeWidth: 3,
    barPercentage: 0.8,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForLabels: {
      fontSize: 11,
      fontWeight: '600',
    },
    fillShadowGradientFrom: '#000000',
    fillShadowGradientTo: '#000000',
    fillShadowGradientOpacity: 0.1,
  };

  const chartData = {
    labels: processedData.labels,
    datasets: [
      {
        data: processedData.data,
        colors: processedData.colors.map(color => () => color),
      },
    ],
  };

  const pieChartData = processedData.labels.map((label, index) => ({
    name: label,
    population: processedData.data[index],
    color: processedData.colors[index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.chartsContainer}>
        <View style={styles.header}>
          <Text style={styles.chartTitle}>Enhanced Emotional Analysis</Text>
          <View style={styles.visualizationToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                visualization === 'bar' && styles.activeToggleButton,
              ]}
              onPress={() => onVisualizationChange('bar')}
            >
              <Text style={[
                styles.toggleButtonText,
                visualization === 'bar' && styles.activeToggleButtonText,
              ]}>
                Bar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                visualization === 'line' && styles.activeToggleButton,
              ]}
              onPress={() => onVisualizationChange('line')}
            >
              <Text style={[
                styles.toggleButtonText,
                visualization === 'line' && styles.activeToggleButtonText,
              ]}>
                Line
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                visualization === 'pie' && styles.activeToggleButton,
              ]}
              onPress={() => onVisualizationChange('pie')}
            >
              <Text style={[
                styles.toggleButtonText,
                visualization === 'pie' && styles.activeToggleButtonText,
              ]}>
                Pie
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartWrapper}>
            {visualization === 'bar' && (
              <BarChart
                data={chartData}
                width={Math.max(screenWidth - 40, processedData.labels.length * 65)}
                height={320}
                chartConfig={chartConfig}
                verticalLabelRotation={45}
                showValuesOnTopOfBars={true}
                fromZero={true}
                style={styles.chart}
              />
            )}
            {visualization === 'line' && (
              <LineChart
                data={chartData}
                width={Math.max(screenWidth - 40, processedData.labels.length * 65)}
                height={320}
                chartConfig={chartConfig}
                verticalLabelRotation={45}
                bezier={true}
                fromZero={true}
                style={styles.chart}
              />
            )}
            {visualization === 'pie' && (
              <PieChart
                data={pieChartData}
                width={screenWidth - 40}
                height={320}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 0]}
                style={styles.chart}
              />
            )}
          </View>
        </ScrollView>

        <View style={styles.complexitySection}>
          <Text style={styles.sectionTitle}>Emotional Complexity Analysis</Text>
          <View style={styles.complexityStats}>
            <View style={styles.complexityStatItem}>
              <Text style={styles.statLabel}>Complexity Score</Text>
              <Text style={styles.statValue}>{complexityData.score.toFixed(1)}%</Text>
            </View>
            <View style={styles.complexityStatItem}>
              <Text style={styles.statLabel}>Active Emotions</Text>
              <Text style={styles.statValue}>{complexityData.activeEmotions} / {complexityData.totalEmotions}</Text>
            </View>
            <View style={styles.complexityStatItem}>
              <Text style={styles.statLabel}>Complexity Level</Text>
              <Text style={[
                styles.statValue,
                styles[`complexity${complexityData.complexity.charAt(0).toUpperCase() + complexityData.complexity.slice(1)}`]
              ]}>
                {complexityData.complexity.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>


        {showDetailedAnalysis && detailedAnalysis && (
          <View style={styles.detailedAnalysisSection}>
            <Text style={styles.sectionTitle}>Detailed Analysis</Text>
            {detailedAnalysis.pattern && (
              <View style={styles.patternCard}>
                <Text style={styles.patternTitle}>
                  Pattern Identified: {detailedAnalysis.pattern.replace(/_/g, ' ')}
                </Text>
              </View>
            )}
            <View style={styles.analysisDetails}>
              <AnalysisItem title="Summary" content={detailedAnalysis.analysis.summary} />
              <AnalysisItem title="Emotional State" content={detailedAnalysis.analysis.emotional_state} />
              <AnalysisItem title="Treatment Attitude" content={detailedAnalysis.analysis.treatment_attitude} />
              <AnalysisItem title="Coping Mechanisms" content={detailedAnalysis.analysis.coping_mechanisms} />
              <AnalysisItem title="Social Support" content={detailedAnalysis.analysis.social_support} />
              <AnalysisItem title="Health Beliefs" content={detailedAnalysis.analysis.health_beliefs} />
              <AnalysisItem title="Motivation" content={detailedAnalysis.analysis.motivation} />
              <AnalysisItem title="Perceived Barriers" content={detailedAnalysis.analysis.perceived_barriers} />
              <AnalysisItem title="General Wellbeing" content={detailedAnalysis.analysis.general_wellbeing} />
              <AnalysisItem 
                title="Cultural & Socioeconomic Influences" 
                content={detailedAnalysis.analysis.cultural_soc_econ_influences} 
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const AnalysisItem = ({ title, content }) => (
  <View style={styles.analysisItem}>
    <Text style={styles.analysisItemTitle}>{title}</Text>
    <Text style={styles.analysisItemContent}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  chartsContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  visualizationToggle: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 10,
  },
  activeToggleButton: {
    backgroundColor: '#0ea5e9',
  },
  toggleButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  activeToggleButtonText: {
    color: '#ffffff',
  },
  chartWrapper: {
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  complexitySection: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1e293b',
  },
  complexityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  complexityStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  complexityLow: {
    color: '#dc2626',
  },
  complexityModerate: {
    color: '#eab308',
  },
  complexityHigh: {
    color: '#16a34a',
  },
  intensitySection: {
    marginVertical: 20,
  },
  intensityList: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 15,
  },
  intensityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  intensityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  intensityItemContent: {
    flex: 1,
  },
  emotionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  intensityStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intensityValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748b',
  },
  intensityCount: {
    fontSize: 12,
    color: '#94a3b8',
  },
  detailedAnalysisSection: {
    marginVertical: 20,
  },
  patternCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  patternTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369a1',
  },
  analysisDetails: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 15,
  },
  analysisItem: {
    marginBottom: 15,
  },
  analysisItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 5,
  },
  analysisItemContent: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  noEmotionsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AnalysisCharts;