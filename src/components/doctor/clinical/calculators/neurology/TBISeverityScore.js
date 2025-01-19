import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useMemo } from 'react';

export const TBISeverityScore = () => {
  const [gcs, setGcs] = useState('');
  const [lossOfConsciousness, setLossOfConsciousness] = useState(false);
  const [pta, setPta] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const gcsScore = parseInt(gcs) || 0;
  const ptaHours = parseInt(pta) || 0;

  // Animated severity score calculation
  const severityScore = useMemo(() => (
    (gcsScore >= 13 ? 1 : 0) + 
    (lossOfConsciousness ? 1 : 0) + 
    (ptaHours <= 24 ? 1 : 0)
  ), [gcsScore, lossOfConsciousness, ptaHours]);

  // Enhanced severity interpretation with color coding
  const getSeverityDetails = useCallback(() => {
    if (severityScore === 3) {
      return { text: "Mild TBI", color: '#4CAF50' };
    }
    if (severityScore === 2) {
      return { text: "Moderate TBI", color: '#FFA000' };
    }
    return { text: "Severe TBI", color: '#F44336' };
  }, [severityScore]);

  const handleGcsChange = useCallback((text) => {
    const value = parseInt(text);
    if (!text) setGcs('');
    else if (value >= 0 && value <= 15) setGcs(text);
  }, []);

  const handlePtaChange = useCallback((text) => {
    const value = parseInt(text);
    if (!text) setPta('');
    else if (value >= 0) setPta(text);
  }, []);

  // Custom checkbox component with animation
  const CustomCheckbox = ({ checked, onPress, label }) => (
    <TouchableOpacity 
      style={styles.checkbox} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.checkboxBox,
        checked && styles.checkboxChecked
      ]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  // Progress indicator
  const ProgressBar = ({ score }) => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${(score / 3) * 100}%` }]} />
    </View>
  );

  const severityDetails = getSeverityDetails();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.header}>TBI Severity Assessment</Text>

          {/* Enhanced GCS Input */}
          <View style={styles.card}>
            <Text style={styles.label}>Glasgow Coma Scale (GCS)</Text>
            <Text style={styles.sublabel}>Score range: 3-15</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={2}
              value={gcs}
              placeholder="Enter GCS"
              onChangeText={handleGcsChange}
              placeholderTextColor="#999"
            />
          </View>

          {/* Enhanced Checkbox */}
          <View style={styles.card}>
            <CustomCheckbox
              checked={lossOfConsciousness}
              onPress={() => setLossOfConsciousness(!lossOfConsciousness)}
              label="Loss of Consciousness"
            />
          </View>

          {/* Enhanced PTA Input */}
          <View style={styles.card}>
            <Text style={styles.label}>Post-Traumatic Amnesia (PTA)</Text>
            <Text style={styles.sublabel}>Duration in hours</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={3}
              value={pta}
              placeholder="Enter hours"
              onChangeText={handlePtaChange}
              placeholderTextColor="#999"
            />
          </View>

          {/* Results Card */}
          <View style={[styles.card, styles.resultsCard]}>
            <Text style={styles.resultLabel}>Severity Score</Text>
            <Text style={[styles.result, { color: severityDetails.color }]}>
              {severityScore} / 3
            </Text>
            <ProgressBar score={severityScore} />
            <Text style={[styles.interpretation, { color: severityDetails.color }]}>
              {severityDetails.text}
            </Text>
          </View>

          {/* Information Cards */}
          <View style={styles.infoGrid}>
            <View style={[styles.card, styles.infoCard]}>
              <Text style={styles.infoHeader}>GCS Guide</Text>
              <Text style={styles.infoText}>
                • 13-15: Mild{'\n'}
                • 9-12: Moderate{'\n'}
                • 3-8: Severe
              </Text>
            </View>

            <View style={[styles.card, styles.infoCard]}>
              <Text style={styles.infoHeader}>PTA Guide</Text>
              <Text style={styles.infoText}>
                • {'<'}24h: Mild{'\n'}
                • 1-7d: Moderate{'\n'}
                • {'>'}7d: Severe
              </Text>
            </View>
          </View>

          <View style={[styles.card, styles.disclaimerCard]}>
            <Text style={styles.disclaimerText}>
              This tool provides initial guidance only. Clinical judgment and comprehensive assessment are essential.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A237E',
    textAlign: 'center',
    marginVertical: 24,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 4,
  },
  sublabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    color: '#1A237E',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#1A237E',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#1A237E',
  },
  resultsCard: {
    alignItems: 'center',
    padding: 24,
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  result: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  interpretation: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1A237E',
    borderRadius: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  infoHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  disclaimerCard: {
    backgroundColor: '#F8F9FA',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#666',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TBISeverityScore;