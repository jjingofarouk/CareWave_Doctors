// components/AnalysisResults/QuickStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const QuickStats = ({ analysisResults, medicalTerms }) => (
  <View style={styles.statsGrid}>
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>Word Count</Text>
      <Text style={styles.statValue}>{analysisResults.wordCount}</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>Readability</Text>
      <Text style={styles.statValue}>
        {analysisResults.readabilityScore.toFixed(1)}
      </Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>Medical Terms</Text>
      <Text style={styles.statValue}>{medicalTerms.length}</Text>
    </View>
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>Sentiment</Text>
      <Text style={styles.statValue}>
        {analysisResults.sentimentData.score.toFixed(1)}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#002432', // Ocean Obsidian for background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statCard: {
    backgroundColor: '#27C7B8', // Teal Tide for the cards
    padding: 15,
    borderRadius: 8,
    width: '45%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DFE4E5', // Coral Cloud for label text
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // White for stat values
    textAlign: 'center',
  },
});
