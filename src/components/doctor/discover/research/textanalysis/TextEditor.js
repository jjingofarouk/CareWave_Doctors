import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import from our new modular structure
import { analyzeSentiment } from './analysis/SentimentAnalyzer';
import { analyzeTextComplexity } from './analysis/ComplexityAnalyzer';
import { countSyllables } from './analysis/ComplexityAnalyzer';

export const TextEditor = ({
  textData = '',
  onTextChange,
  onAnalyze,
  loading
}) => {
  const [realTimeAnalysis, setRealTimeAnalysis] = useState({
    sentiment: {
      score: 0,
      distribution: { positive: 0, negative: 0, neutral: 0 }
    },
    complexity: 0,
    wordCount: 0,
    syllableCount: 0
  });

  useEffect(() => {
    const analyzeText = () => {
      if (!textData?.trim()) {
        setRealTimeAnalysis({
          sentiment: {
            score: 0,
            distribution: { positive: 0, negative: 0, neutral: 0 }
          },
          complexity: 0,
          wordCount: 0,
          syllableCount: 0
        });
        return;
      }

      const sentimentResults = analyzeSentiment(textData);
      const { readabilityScore = 0 } = analyzeTextComplexity(textData);
      
      const tokens = textData.split(/\s+/).filter(token => token.length > 0);
      const syllablesCount = tokens.reduce((acc, word) => acc + countSyllables(word), 0);

      setRealTimeAnalysis({
        sentiment: {
          score: sentimentResults.score,
          distribution: sentimentResults.distribution
        },
        complexity: readabilityScore,
        wordCount: tokens.length,
        syllableCount: syllablesCount
      });
    };

    analyzeText();
  }, [textData]);

  const getSentimentColor = (score) => {
    if (score > 25) return '#4CAF50';    // Green for positive
    if (score < -25) return '#f44336';   // Red for negative
    return '#FFA726';                    // Orange for neutral
  };

  const getSentimentLabel = (score) => {
    if (score > 25) return 'Positive';
    if (score < -25) return 'Negative';
    return 'Neutral';
  };

  return (
    <View style={styles.section}>
      <View style={styles.realTimeStats}>
        <Text style={styles.statText}>
          Words: {realTimeAnalysis.wordCount}
        </Text>
        <Text style={[
          styles.statText,
          { color: getSentimentColor(realTimeAnalysis.sentiment.score) }
        ]}>
          Sentiment: {getSentimentLabel(realTimeAnalysis.sentiment.score)}
        </Text>
        <Text style={styles.statText}>
          Complexity: {Math.round(realTimeAnalysis.complexity)}
        </Text>
        <Text style={styles.statText}>
          Syllables: {realTimeAnalysis.syllableCount}
        </Text>
      </View>

      <View style={styles.sentimentDistribution}>
        <Text style={styles.distributionText}>
          Positive: {realTimeAnalysis.sentiment.distribution.positive.toFixed(1)}%
        </Text>
        <Text style={styles.distributionText}>
          Negative: {realTimeAnalysis.sentiment.distribution.negative.toFixed(1)}%
        </Text>
        <Text style={styles.distributionText}>
          Neutral: {realTimeAnalysis.sentiment.distribution.neutral.toFixed(1)}%
        </Text>
      </View>

      <TextInput
        style={styles.textArea}
        multiline
        value={textData}
        onChangeText={onTextChange}
        placeholder="Enter or paste medical text for analysis..."
        placeholderTextColor="#666"
      />

      <TouchableOpacity
        style={styles.analyzeButton}
        onPress={onAnalyze}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View style={styles.buttonContent}>
            <Icon name="stethoscope" size={20} color="#fff" />
            <Text style={styles.buttonText}>Analyze Clinical Text</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: '#002432',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  realTimeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#003545',
    borderRadius: 8,
    marginBottom: 10,
  },
  sentimentDistribution: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#004555',
    borderRadius: 8,
    marginBottom: 10,
  },
  distributionText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
    opacity: 0.9,
  },
  statText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
  },
  textArea: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    padding: 15,
    borderRadius: 8,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 15,
    fontFamily: 'Helvetica Neue',
  },
  analyzeButton: {
    backgroundColor: '#27C7B8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
  },
});