import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import CustomSlider from './CustomSlider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Add these constants at the top of the file, before the component
const BODY_LOCATIONS = [
  'Head', 'Neck', 'Chest', 'Abdomen', 'Back', 'Arms', 'Legs', 'Joints',
  'Left Side', 'Right Side', 'Upper', 'Lower', 'Other'
];

const DEPTH_OPTIONS = [
  'Superficial', 'Deep', 'Variable', 'Throughout tissue', 'Bone-deep'
];

const SURFACE_AREAS = [
  'Pinpoint', 'Less than 1cm', '1-5cm', '5-10cm', 'Large area (>10cm)',
  'Diffuse', 'Multiple areas'
];

const TIME_PERIODS = [
  'Today', 'Yesterday', 'This week', 'Last week', 'This month',
  'Several months', '6 months or more', '1 year or more'
];

const ONSET_CONTEXTS = [
  'At rest', 'During exercise', 'After eating', 'While sleeping',
  'After injury', 'During work', 'No specific context', 'Other'
];

const SPREAD_PATTERNS = [
  'Radiating', 'Shooting', 'Moving', 'Fixed', 'Intermittent spread'
];

const SPREAD_DIRECTIONS = [
  'Upward', 'Downward', 'Outward', 'Left to right', 'Right to left',
  'Front to back', 'Back to front'
];

const FREQUENCY_OPTIONS = [
  'Constant', 'Hourly', 'Daily', 'Several times a day',
  'Weekly', 'Monthly', 'Irregular', 'Other'
];

const DURATION_OPTIONS = [
  'Seconds', 'Minutes', 'Hours', 'All day',
  'Variable', 'Continuous', 'Other'
];

const TIME_OF_DAY_OPTIONS = [
  'Morning', 'Afternoon', 'Evening', 'Night',
  'Early morning', 'After meals', 'No specific pattern'
];

const COMMON_FACTORS_WORSE = [
  'Movement', 'Pressure', 'Standing', 'Sitting', 'Lying down',
  'Eating', 'Stress', 'Physical activity', 'Weather changes'
];

const COMMON_FACTORS_BETTER = [
  'Rest', 'Medication', 'Position change', 'Ice', 'Heat',
  'Walking', 'Stretching', 'Massage', 'Nothing'
];
const IMPACT_OPTIONS = [
  'No impact', 
  'Mild interference', 
  'Moderate interference', 
  'Severe interference',
  'Complete limitation'
];

const ACTIVITY_IMPACTS = [
  'Work/School',
  'Sleep',
  'Physical Activity',
  'Social Life',
  'Self Care',
  'Mood',
  'Appetite'
];

const SocratesSection = ({ title, children, expanded, onToggle }) => {
  const [animation] = useState(new Animated.Value(expanded ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const bodyHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1000],
  });

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={onToggle} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="#555" />
      </TouchableOpacity>
      {expanded && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
};

const ToggleButton = ({ title, selected, onToggle }) => (
  <TouchableOpacity 
    onPress={onToggle}
    style={[styles.toggleButton, selected && styles.toggleButtonSelected]}
  >
    <Text style={[styles.toggleButtonText, selected && styles.toggleButtonTextSelected]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const SelectableChips = ({ options, selected, onSelect, multiple = false }) => (
  <View style={styles.chipContainer}>
    {options.map((option) => (
      <SymptomChip
        key={option}
        title={option}
        selected={multiple ? selected.includes(option) : selected === option}
        onToggle={() => {
          if (multiple) {
            const newSelection = selected.includes(option)
              ? selected.filter(s => s !== option)
              : [...selected, option];
            onSelect(newSelection);
          } else {
            onSelect(option);
          }
        }}
      />
    ))}
  </View>
);

const SymptomChip = ({ title, selected, onToggle }) => (
  <TouchableOpacity 
    onPress={onToggle}
    style={[styles.symptomChip, selected && styles.symptomChipSelected]}
  >
    <Text style={[styles.symptomChipText, selected && styles.symptomChipTextSelected]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const HistoryOfPresentIllness = ({ onDataChange }) => {
  const [expandedSection, setExpandedSection] = useState('site');
  const [formData, setFormData] = useState({
    site: {
      location: '',
      precise: '',
      surface: '',
      depth: '',
    },
    onset: {
      whenStarted: '',
      howStarted: '',
      wasItSudden: false,
      context: '',
    },
    character: {
      type: '',
      description: '',
      quality: [],
    },
    radiation: {
      doesItSpread: false,
      whereToSpread: '',
      pattern: '',
      direction: '',
    },
    associatedSymptoms: {
      symptoms: [],
      customSymptom: '',
    },
    timing: {
      frequency: '',
      pattern: '',
      duration: '',
      timeOfDay: '',
      periodicity: '',
    },
    exacerbatingRelieving: {
      worsens: [],
      improves: [],
      customFactors: '',
    },
    severity: {
      current: 5,
      worst: 5,
      best: 5,
      impactOnDaily: '',
    }
  });

  const handleDataChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    onDataChange?.(formData);
  };

  const commonSymptoms = [
    'Nausea', 'Vomiting', 'Fever', 'Fatigue', 'Headache',
    'Dizziness', 'Loss of Appetite', 'Weight Loss', 'Night Sweats',
    'Weakness', 'Shortness of Breath', 'Chest Pain', 'Palpitations'
  ];

  const painQualities = [
    'Sharp', 'Dull', 'Burning', 'Throbbing', 'Stabbing',
    'Aching', 'Cramping', 'Gnawing', 'Shooting', 'Tingling'
  ];

  const renderSiteSection = () => (
    <View>
      <Text style={styles.label}>Primary Location</Text>
      <SelectableChips
        options={BODY_LOCATIONS}
        selected={formData.site.location}
        onSelect={(value) => handleDataChange('site', 'location', value)}
      />
      {formData.site.location === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Specify location"
          placeholderTextColor="#A0AEC0"
          value={formData.site.precise}
          onChangeText={(text) => handleDataChange('site', 'precise', text)}
        />
      )}
      
      <Text style={styles.label}>Surface Area</Text>
      <SelectableChips
        options={SURFACE_AREAS}
        selected={formData.site.surface}
        onSelect={(value) => handleDataChange('site', 'surface', value)}
      />
      
      <Text style={styles.label}>Depth</Text>
      <SelectableChips
        options={DEPTH_OPTIONS}
        selected={formData.site.depth}
        onSelect={(value) => handleDataChange('site', 'depth', value)}
      />
    </View>
  );
  
  const renderOnsetSection = () => (
    <View>
      <Text style={styles.label}>When did it start?</Text>
      <SelectableChips
        options={TIME_PERIODS}
        selected={formData.onset.whenStarted}
        onSelect={(value) => handleDataChange('onset', 'whenStarted', value)}
      />
      
      <Text style={styles.label}>Context</Text>
      <SelectableChips
        options={ONSET_CONTEXTS}
        selected={formData.onset.context}
        onSelect={(value) => handleDataChange('onset', 'context', value)}
      />
      {formData.onset.context === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Specify context"
          placeholderTextColor="#A0AEC0"
          value={formData.onset.howStarted}
          onChangeText={(text) => handleDataChange('onset', 'howStarted', text)}
        />
      )}
      
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Was the onset sudden?</Text>
        <View style={styles.toggleRow}>
          <ToggleButton
            title="Sudden"
            selected={formData.onset.wasItSudden}
            onToggle={() => handleDataChange('onset', 'wasItSudden', true)}
          />
          <ToggleButton
            title="Gradual"
            selected={!formData.onset.wasItSudden}
            onToggle={() => handleDataChange('onset', 'wasItSudden', false)}
          />
        </View>
      </View>
    </View>
  );
  
  const renderCharacterSection = () => (
    <View>
      <Text style={styles.label}>Quality of Discomfort</Text>
      <View style={styles.chipContainer}>
        {painQualities.map((quality) => (
          <SymptomChip
            key={quality}
            title={quality}
            selected={formData.character.quality.includes(quality)}
            onToggle={() => {
              const newQualities = formData.character.quality.includes(quality)
                ? formData.character.quality.filter(q => q !== quality)
                : [...formData.character.quality, quality];
              handleDataChange('character', 'quality', newQualities);
            }}
          />
        ))}
      </View>
      <Text style={styles.label}>Additional Description</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder="Describe the sensation in detail"                  placeholderTextColor="#A0AEC0"

        value={formData.character.description}
        onChangeText={(text) => handleDataChange('character', 'description', text)}
      />
    </View>
  );

  const renderRadiationSection = () => (
    <View>
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Does it spread?</Text>
        <View style={styles.toggleRow}>
          <ToggleButton
            title="Yes"
            selected={formData.radiation.doesItSpread}
            onToggle={() => handleDataChange('radiation', 'doesItSpread', true)}
          />
          <ToggleButton
            title="No"
            selected={!formData.radiation.doesItSpread}
            onToggle={() => handleDataChange('radiation', 'doesItSpread', false)}
          />
        </View>
      </View>
      {formData.radiation.doesItSpread && (
        <>
          <Text style={styles.label}>Pattern of Spread</Text>
          <SelectableChips
            options={SPREAD_PATTERNS}
            selected={formData.radiation.pattern}
            onSelect={(value) => handleDataChange('radiation', 'pattern', value)}
          />
          
          <Text style={styles.label}>Direction of Spread</Text>
          <SelectableChips
            options={SPREAD_DIRECTIONS}
            selected={formData.radiation.direction}
            onSelect={(value) => handleDataChange('radiation', 'direction', value)}
          />
        </>
      )}
    </View>
  );
  

  const renderAssociatedSection = () => (
    <View>
      <Text style={styles.label}>Associated Symptoms</Text>
      <View style={styles.chipContainer}>
        {commonSymptoms.map((symptom) => (
          <SymptomChip
            key={symptom}
            title={symptom}
            selected={formData.associatedSymptoms.symptoms.includes(symptom)}
            onToggle={() => {
              const newSymptoms = formData.associatedSymptoms.symptoms.includes(symptom)
                ? formData.associatedSymptoms.symptoms.filter(s => s !== symptom)
                : [...formData.associatedSymptoms.symptoms, symptom];
              handleDataChange('associatedSymptoms', 'symptoms', newSymptoms);
            }}
          />
        ))}
      </View>
      <Text style={styles.label}>Other Symptoms</Text>
      <TextInput
        style={styles.input}
        placeholder="Add any other symptoms"                  placeholderTextColor="#A0AEC0"

        value={formData.associatedSymptoms.customSymptom}
        onChangeText={(text) => handleDataChange('associatedSymptoms', 'customSymptom', text)}
      />
    </View>
  );

  const renderTimingSection = () => (
    <View>
      <Text style={styles.label}>Frequency</Text>
      <SelectableChips
        options={FREQUENCY_OPTIONS}
        selected={formData.timing.frequency}
        onSelect={(value) => handleDataChange('timing', 'frequency', value)}
      />
      
      <Text style={styles.label}>Duration</Text>
      <SelectableChips
        options={DURATION_OPTIONS}
        selected={formData.timing.duration}
        onSelect={(value) => handleDataChange('timing', 'duration', value)}
      />
      
      <Text style={styles.label}>Time of Day</Text>
      <SelectableChips
        options={TIME_OF_DAY_OPTIONS}
        selected={formData.timing.timeOfDay}
        onSelect={(value) => handleDataChange('timing', 'timeOfDay', value)}
      />
      
      {['frequency', 'duration', 'timeOfDay'].some(field => 
        formData.timing[field] === 'Other'
      ) && (
        <TextInput
          style={styles.input}
          placeholder="Specify additional timing details"
          placeholderTextColor="#A0AEC0"
          value={formData.timing.pattern}
          onChangeText={(text) => handleDataChange('timing', 'pattern', text)}
        />
      )}
    </View>
  );
  
  const renderFactorsSection = () => (
    <View>
      <Text style={styles.label}>What makes it worse?</Text>
      <SelectableChips
        options={COMMON_FACTORS_WORSE}
        selected={formData.exacerbatingRelieving.worsens}
        onSelect={(values) => handleDataChange('exacerbatingRelieving', 'worsens', values)}
        multiple={true}
      />
      
      <Text style={styles.label}>What makes it better?</Text>
      <SelectableChips
        options={COMMON_FACTORS_BETTER}
        selected={formData.exacerbatingRelieving.improves}
        onSelect={(values) => handleDataChange('exacerbatingRelieving', 'improves', values)}
        multiple={true}
      />
      
      <Text style={styles.label}>Additional Factors</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder="Any other factors that affect the condition"
        placeholderTextColor="#A0AEC0"
        value={formData.exacerbatingRelieving.customFactors}
        onChangeText={(text) => handleDataChange('exacerbatingRelieving', 'customFactors', text)}
      />
    </View>
  );


  const PainScale = ({ value, onValueChange, label }) => (
    <CustomSlider
      value={value ?? 0}
      onValueChange={onValueChange}
      label={label}
    />
  );

const renderSeveritySection = () => (
  <View>
    <PainScale
      label="Current Pain Level (0-10)"
      value={formData.severity.current}
      onValueChange={(value) => handleDataChange('severity', 'current', value)}
    />
    
    <PainScale
      label="Worst Pain Level"
      value={formData.severity.worst}
      onValueChange={(value) => handleDataChange('severity', 'worst', value)}
    />
    
    <PainScale
      label="Best Pain Level"
      value={formData.severity.best}
      onValueChange={(value) => handleDataChange('severity', 'best', value)}
    />

    <Text style={styles.label}>Overall Impact Level</Text>
    <SelectableChips
      options={IMPACT_OPTIONS}
      selected={formData.severity.impactLevel}
      onSelect={(value) => handleDataChange('severity', 'impactLevel', value)}
    />

    <Text style={styles.label}>Affected Activities</Text>
    <SelectableChips
      options={ACTIVITY_IMPACTS}
      selected={formData.severity.affectedActivities || []}
      onSelect={(values) => handleDataChange('severity', 'affectedActivities', values)}
      multiple={true}
    />

    <Text style={styles.label}>Additional Impact Details</Text>
    <TextInput
      style={styles.textArea}
      multiline
      numberOfLines={4}
      placeholder="Any other ways this affects daily life?"
      placeholderTextColor="#A0AEC0"
      value={formData.severity.impactOnDaily}
      onChangeText={(text) => handleDataChange('severity', 'impactOnDaily', text)}
    />
  </View>
);



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>History of Presenting Complaints</Text>
      
      <SocratesSection
        title="Site & Location"
        expanded={expandedSection === 'site'}
        onToggle={() => setExpandedSection(expandedSection === 'site' ? '' : 'site')}
      >
        {renderSiteSection()}
      </SocratesSection>

      <SocratesSection
        title="Onset"
        expanded={expandedSection === 'onset'}
        onToggle={() => setExpandedSection(expandedSection === 'onset' ? '' : 'onset')}
      >
        {renderOnsetSection()}
        </SocratesSection>

        <SocratesSection
        title="Character"
        expanded={expandedSection === 'character'}
        onToggle={() => setExpandedSection(expandedSection === 'character' ? '' : 'character')}
      >
        {renderCharacterSection()}
      </SocratesSection>

      <SocratesSection
        title="Radiation"
        expanded={expandedSection === 'radiation'}
        onToggle={() => setExpandedSection(expandedSection === 'radiation' ? '' : 'radiation')}
      >
        {renderRadiationSection()}
      </SocratesSection>

      <SocratesSection
        title="Associated Symptoms"
        expanded={expandedSection === 'associated'}
        onToggle={() => setExpandedSection(expandedSection === 'associated' ? '' : 'associated')}
      >
        {renderAssociatedSection()}
      </SocratesSection>

      <SocratesSection
        title="Timing"
        expanded={expandedSection === 'timing'}
        onToggle={() => setExpandedSection(expandedSection === 'timing' ? '' : 'timing')}
      >
        {renderTimingSection()}
      </SocratesSection>

      <SocratesSection
        title="Exacerbating/Relieving Factors"
        expanded={expandedSection === 'factors'}
        onToggle={() => setExpandedSection(expandedSection === 'factors' ? '' : 'factors')}
      >
        {renderFactorsSection()}
      </SocratesSection>

      <SocratesSection
        title="Severity"
        expanded={expandedSection === 'severity'}
        onToggle={() => setExpandedSection(expandedSection === 'severity' ? '' : 'severity')}
      >
        {renderSeveritySection()}
      </SocratesSection>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionBody: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  toggleContainer: {
    marginVertical: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  toggleButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  toggleButtonText: {
    color: '#555',
    fontSize: 16,
  },
  toggleButtonTextSelected: {
    color: '#fff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
  },
  symptomChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  symptomChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  symptomChipText: {
    color: '#555',
    fontSize: 14,
  },
  symptomChipTextSelected: {
    color: '#fff',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  painScaleContainer: {
    marginBottom: 20,
  },
  scaleContainer: {
    paddingHorizontal: 10,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  scaleText: {
    fontSize: 12,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },


});

export default HistoryOfPresentIllness;