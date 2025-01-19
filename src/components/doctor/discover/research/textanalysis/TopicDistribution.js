import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const TopicDistribution = ({ topicAnalysis }) => {
  // Convert topicAnalysis object to array and sort by percentage
  const sortedTopics = Object.entries(topicAnalysis || {})
    .map(([topic, data]) => ({
      topic,
      ...data
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <View>
      <Text style={styles.analysisHeader}>Topic Distribution</Text>
      <ScrollView style={styles.topicsContainer}>
        {sortedTopics.map(({ topic, percentage, count, matches }, index) => (
          <View key={topic} style={styles.topicItem}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicName}>{topic}</Text>
              <Text style={styles.matchCount}>({count} matches)</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(percentage, 100)}%` }
                ]}
              />
            </View>
            <View style={styles.topicFooter}>
              <Text style={styles.topicPercentage}>
                {percentage.toFixed(1)}%
              </Text>
              <Text style={styles.matchesPreview} numberOfLines={1}>
                {matches.join(', ')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  analysisHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#27C7B8',
    marginBottom: 15,
  },
  topicsContainer: {
    paddingHorizontal: 15,
    maxHeight: 400, // Add scrolling for many topics
  },
  topicItem: {
    backgroundColor: '#002432',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  matchCount: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#DFE4E5',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27C7B8',
    borderRadius: 5,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicPercentage: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  matchesPreview: {
    fontSize: 12,
    color: '#A0A0A0',
    flex: 1,
    marginLeft: 10,
    textAlign: 'right',
  },
});