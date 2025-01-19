import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Animated,
} from 'react-native';

const MoCA = () => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [responses, setResponses] = useState({
    educationAdjustment: 0,
    visuospatial: '',
    naming: '',
    memory: '',
    attention: '',
    language: '',
    abstraction: '',
    delayedRecall: '',
    orientation: '',
  });

  const handleChange = useCallback((field, value, max) => {
    const numericValue = parseInt(value, 10);
    if (value === '' || (!isNaN(numericValue) && numericValue >= 0 && numericValue <= max)) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      setResponses((prev) => ({ ...prev, [field]: value }));
    }
  }, [fadeAnim]);

  const handleEducationAdjustment = useCallback((hasLessEducation) => {
    setResponses((prev) => ({
      ...prev,
      educationAdjustment: hasLessEducation ? 1 : 0,
    }));
  }, []);

  const totalScore = Object.keys(responses).reduce((sum, key) => {
    if (key === 'educationAdjustment') return sum + responses[key];
    return sum + (parseInt(responses[key], 10) || 0);
  }, 0);

  const getSeverityColor = (score) => {
    if (score >= 26) return '#4CAF50';
    if (score >= 18) return '#FFA000';
    return '#F44336';
  };

  const InputField = ({ label, info, value, max, onChangeText }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardInfo}>{info}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={String(max).length}
          placeholder={`0-${max}`}
          value={value?.toString()}
          onChangeText={(text) => onChangeText(text, max)}
          placeholderTextColor="#A0AEC0"
        />
        <Text style={styles.maxScore}>Max: {max}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Montreal Cognitive Assessment</Text>
          <Text style={styles.subHeader}>MoCA</Text>
          <View style={styles.divider} />
          <Text style={styles.headerInfo}>
            A comprehensive screening tool for mild cognitive impairment
          </Text>
        </View>

        <View style={styles.mainSection}>
          <View style={[styles.card, styles.educationCard]}>
            <Text style={styles.cardLabel}>Education Level Assessment</Text>
            <Text style={styles.cardInfo}>Years of formal education</Text>
            <View style={styles.adjustmentButtons}>
              <TouchableOpacity
                style={[
                  styles.adjustmentButton,
                  responses.educationAdjustment === 1 && styles.selectedAdjustment,
                ]}
                onPress={() => handleEducationAdjustment(true)}
              >
                <Text style={[
                  styles.buttonText,
                  responses.educationAdjustment === 1 && styles.selectedButtonText
                ]}>≤ 12 Years (+1)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.adjustmentButton,
                  responses.educationAdjustment === 0 && styles.selectedAdjustment,
                ]}
                onPress={() => handleEducationAdjustment(false)}
              >
                <Text style={[
                  styles.buttonText,
                  responses.educationAdjustment === 0 && styles.selectedButtonText
                ]}>{'>'}12 Years (0)</Text>
              </TouchableOpacity>
            </View>
          </View>

          {[
            {
              label: 'Visuospatial/Executive',
              info: 'Tests visual and executive functioning. Involves copying a cube, drawing a clock (including the contour, numbers, and hands set to 10 past 11). One point is given for each correct element.',
              field: 'visuospatial',
              max: 5,
            },
            {
              label: 'Naming',
              info: 'Tests ability to name objects. Show the patient pictures of a Lion, Rhinoceros, and Camel. One point is given for each correct naming.',
              field: 'naming',
              max: 3,
            },
            {
              label: 'Memory',
              info: 'Tests delayed recall. Read the words "Face, Velvet, Church, Daisy, Red" aloud, and ask the patient to repeat them immediately (not scored). After 5 minutes, ask the patient to recall the words without prompts.',
              field: 'memory',
              max: 5,
            },
            {
              label: 'Attention',
              info: 'Tests attention. Includes forward digit span, backward digit span, letter tapping, and serial subtraction of 7s starting from 100.',
              field: 'attention',
              max: 6,
            },
            {
              label: 'Language',
              info: 'Tests sentence repetition and fluency. Ask the patient to repeat complex sentences exactly as stated and list words starting with "F" in one minute.',
              field: 'language',
              max: 3,
            },
            {
              label: 'Abstraction',
              info: 'Tests abstract reasoning. Ask the patient to explain similarities between pairs of items (e.g., "Train & Bicycle", "Watch & Ruler").',
              field: 'abstraction',
              max: 2,
            },
            {
              label: 'Delayed Recall',
              info: 'Tests ability to recall previously mentioned words without cues after a 5-minute delay.',
              field: 'delayedRecall',
              max: 5,
            },
            {
              label: 'Orientation',
              info: 'Tests orientation to time and place. Questions about date, month, year, day, place, and city.',
              field: 'orientation',
              max: 6,
            },
          ].map(({ label, info, field, max }) => (
            <InputField
              key={field}
              label={label}
              info={info}
              value={responses[field]}
              max={max}
              onChangeText={(value) => handleChange(field, value, max)}
            />
          ))}

          <View style={[styles.card, styles.scoreCard]}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreTitle}>Total Score</Text>
              <Text style={[styles.scoreValue, { color: getSeverityColor(totalScore) }]}>
                {totalScore} / 30
              </Text>
            </View>
            <View style={styles.scoreMeter}>
              <View style={[styles.scoreMeterFill, { 
                width: `${(totalScore / 30) * 100}%`,
                backgroundColor: getSeverityColor(totalScore)
              }]} />
            </View>
            <View style={styles.interpretationGrid}>
              <View style={[styles.interpretationItem, { borderColor: '#4CAF50' }]}>
                <Text style={styles.interpretationScore}>26-30</Text>
                <Text style={styles.interpretationLabel}>Normal</Text>
              </View>
              <View style={[styles.interpretationItem, { borderColor: '#FFA000' }]}>
                <Text style={styles.interpretationScore}>18-25</Text>
                <Text style={styles.interpretationLabel}>Mild Impairment</Text>
              </View>
              <View style={[styles.interpretationItem, { borderColor: '#F44336' }]}>
                <Text style={styles.interpretationScore}>{'<18'}</Text>
                <Text style={styles.interpretationLabel}>Significant</Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, styles.disclaimerCard]}>
            <Text style={styles.disclaimerTitle}>Important Note</Text>
            <Text style={styles.disclaimerText}>
              This assessment is a screening tool and should not replace comprehensive clinical evaluation. Results should be interpreted in conjunction with other clinical findings and patient history.
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
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  subHeader: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    marginTop: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
    width: '40%',
    alignSelf: 'center',
  },
  headerInfo: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  mainSection: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  educationCard: {
    backgroundColor: '#F7FAFC',
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#F7FAFC',
    textAlign: 'center',
  },
  maxScore: {
    marginLeft: 12,
    fontSize: 14,
    color: '#718096',
  },
  adjustmentButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  adjustmentButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedAdjustment: {
    backgroundColor: '#4299E1',
    borderColor: '#4299E1',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  scoreMeter: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 24,
  },
  scoreMeterFill: {
    height: '100%',
    borderRadius: 4,
  },
  interpretationGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  interpretationItem: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  interpretationScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  interpretationLabel: {
    fontSize: 12,
    color: '#718096',
  },
  disclaimerCard: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C53030',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
});

export default MoCA;