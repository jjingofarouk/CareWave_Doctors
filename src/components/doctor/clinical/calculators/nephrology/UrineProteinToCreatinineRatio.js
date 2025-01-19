import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const UrineProteinToCreatinineRatio = () => {
  const [protein, setProtein] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [ratio, setRatio] = useState(null);
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const calculateRatio = () => {
    setError('');
    
    if (!protein || !creatinine) {
      setError('Please enter both values');
      return;
    }

    const proteinValue = parseFloat(protein);
    const creatinineValue = parseFloat(creatinine);

    if (isNaN(proteinValue) || isNaN(creatinineValue)) {
      setError('Please enter valid numbers');
      return;
    }

    if (creatinineValue === 0) {
      setError('Creatinine value cannot be zero');
      return;
    }

    const ratioValue = proteinValue / creatinineValue;
    setRatio(ratioValue.toFixed(2));
    fadeIn();
  };

  const interpretResult = (ratio) => {
    if (!ratio) return null;
    const numericRatio = parseFloat(ratio);
    
    if (numericRatio < 0.2) {
      return { text: 'Normal range', color: '#4CAF50' };
    } else if (numericRatio >= 0.2 && numericRatio < 0.5) {
      return { text: 'Mild proteinuria', color: '#FFC107' };
    } else if (numericRatio >= 0.5 && numericRatio < 3.0) {
      return { text: 'Moderate proteinuria', color: '#FF9800' };
    } else {
      return { text: 'Severe proteinuria', color: '#F44336' };
    }
  };

  const CustomInput = ({ label, value, onChangeText, placeholder, hint }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#ffffff', '#f7fafc']}
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>UPCR Calculator</Text>
          <Text style={styles.subtitle}>Professional Edition</Text>
          <Text style={styles.description}>
            Precise Proteinuria Quantification Tool
          </Text>
        </View>

        <View style={styles.card}>
          <CustomInput
            label="Urine Protein (mg/dL)"
            value={protein}
            onChangeText={setProtein}
            placeholder="Enter protein value"
            hint="Reference: < 150 mg/dL"
          />

          <CustomInput
            label="Urine Creatinine (mg/dL)"
            value={creatinine}
            onChangeText={setCreatinine}
            placeholder="Enter creatinine value"
            hint="Reference: 20-370 mg/dL"
          />

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateRatio}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2D3748', '#1A202C']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Calculate UPCR</Text>
            </LinearGradient>
          </TouchableOpacity>

          {ratio && (
            <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
              <Text style={styles.resultTitle}>Analysis Result</Text>
              <View style={styles.resultCard}>
                <Text style={styles.ratioValue}>UPCR: {ratio}</Text>
                <View style={[styles.interpretationBadge, { backgroundColor: interpretResult(ratio).color }]}>
                  <Text style={styles.interpretationText}>
                    {interpretResult(ratio).text}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          <View style={styles.referenceContainer}>
            <Text style={styles.referenceTitle}>Clinical Ranges</Text>
            <View style={styles.rangeGrid}>
              {[
                { range: '< 0.2', condition: 'Normal', color: '#4CAF50' },
                { range: '0.2 - 0.5', condition: 'Mild', color: '#FFC107' },
                { range: '0.5 - 3.0', condition: 'Moderate', color: '#FF9800' },
                { range: '> 3.0', condition: 'Severe', color: '#F44336' }
              ].map((item, index) => (
                <View key={index} style={styles.rangeCard}>
                  <View style={[styles.rangeDot, { backgroundColor: item.color }]} />
                  <Text style={styles.rangeText}>{item.range}</Text>
                  <Text style={styles.rangeCondition}>{item.condition}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Clinical Notes</Text>
            <View style={styles.noteCard}>
              {[
                'Correlates with 24h protein excretion',
                'Serial measurements track progression',
                'Consider albumin testing if > 3.0',
                'May vary with exercise/hydration'
              ].map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <View style={styles.noteBullet} />
                  <Text style={styles.noteText}>{note}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gradientContainer: {
    padding: 20,
    minHeight: '100%',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#718096',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  inputWrapper: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  hint: {
    marginTop: 4,
    fontSize: 12,
    color: '#718096',
  },
  errorContainer: {
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 14,
  },
  calculateButton: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
  },
  ratioValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
  },
  interpretationBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interpretationText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  referenceContainer: {
    marginTop: 24,
  },
  referenceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  rangeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rangeCard: {
    width: '48%',
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  rangeCondition: {
    fontSize: 14,
    color: '#718096',
  },
  notesContainer: {
    marginTop: 24,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  noteCard: {
    backgroundColor: '#F7FAFC',
    padding: 16,
    borderRadius: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A5568',
    marginRight: 12,
  },
  noteText: {
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
});

export default UrineProteinToCreatinineRatio;