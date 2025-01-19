import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ReviewOfSystems = ({ handleSystemReview }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [expandedSystem, setExpandedSystem] = useState(null);

  const systems = [
    {
      name: 'Constitutional',
      items: ['Fever', 'Fatigue', 'Weight loss', 'Weight gain', 'Night sweats', 'Poor appetite', 'Weakness', 'Activity changes', 'Sleep changes']
    },
    {
      name: 'Eyes',
      items: ['Vision changes', 'Eye pain', 'Double vision', 'Light sensitivity', 'Redness', 'Tearing', 'Eye discharge', 'Blurred vision', 'Eye dryness', 'Vision loss']
    },
    {
      name: 'ENT',
      items: ['Sore throat', 'Hearing loss', 'Ear pain', 'Nasal congestion', 'Sinus pressure', 'Voice changes', 'Ringing in ears', 'Nose bleeds', 'Dental problems', 'Mouth sores', 'Difficulty swallowing', 'Hoarseness']
    },
    {
      name: 'Respiratory',
      items: ['Cough', 'Shortness of breath', 'Wheezing', 'Chest pain', 'Sputum', 'Coughing blood', 'Sleep apnea', 'Snoring', 'Breathing difficulty']
    },
    {
      name: 'Cardiovascular',
      items: ['Chest pain', 'Palpitations', 'Irregular heartbeat', 'Leg swelling', 'Exercise intolerance', 'Orthopnea', 'Claudication', 'Easy bruising', 'Fainting']
    },
    {
      name: 'Gastrointestinal',
      items: ['Abdominal pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Blood in stool', 'Heartburn', 'Change in bowel habits', 'Gas/bloating', 'Hemorrhoids', 'Yellow skin/eyes']
    },
    {
      name: 'Genitourinary',
      items: ['Urinary frequency', 'Urgency', 'Burning urination', 'Blood in urine', 'Incontinence', 'Urinary retention', 'Nocturia', 'Flank pain', 'Sexual dysfunction']
    },
    {
      name: 'Musculoskeletal',
      items: ['Joint pain', 'Muscle pain', 'Back pain', 'Joint swelling', 'Stiffness', 'Reduced motion', 'Muscle weakness', 'Cramping', 'Arthritis']
    },
    {
      name: 'Integumentary',
      items: ['Rash', 'Itching', 'Color changes', 'Skin lesions', 'Hair changes', 'Nail changes', 'Breast changes', 'Excessive sweating', 'Dryness']
    },
    {
      name: 'Neurological',
      items: ['Headaches', 'Dizziness', 'Seizures', 'Weakness', 'Numbness', 'Tingling', 'Memory loss', 'Balance problems', 'Tremors', 'Speech changes', 'Coordination problems']
    },
    {
      name: 'Psychiatric',
      items: ['Depression', 'Anxiety', 'Mood changes', 'Suicidal thoughts', 'Sleep problems', 'Memory issues', 'Hallucinations', 'Behavioral changes', 'Confusion']
    },
    {
      name: 'Endocrine',
      items: ['Heat/cold intolerance', 'Excessive thirst', 'Frequent urination', 'Hair loss/growth', 'Sexual dysfunction', 'Hormone problems', 'Blood sugar issues']
    },
    {
      name: 'Hematologic/Lymphatic',
      items: ['Easy bruising', 'Bleeding tendency', 'Swollen glands', 'Blood clots', 'Anemia symptoms', 'Enlarged lymph nodes']
    },
    {
      name: 'Allergic/Immunologic',
      items: ['Seasonal allergies', 'Food allergies', 'Drug allergies', 'Frequent infections', 'Immune disorders', 'Environmental sensitivities']
    }
  ];

  const handleChipSelect = (systemName, symptom) => {
    setSelectedSymptoms((prev) => {
      const updatedSymptoms = { ...prev };
      if (!updatedSymptoms[systemName]) {
        updatedSymptoms[systemName] = [];
      }

      if (updatedSymptoms[systemName].includes(symptom)) {
        updatedSymptoms[systemName] = updatedSymptoms[systemName].filter((s) => s !== symptom);
      } else {
        updatedSymptoms[systemName] = [...updatedSymptoms[systemName], symptom];
      }

      handleSystemReview?.(systemName, updatedSymptoms[systemName]);
      return updatedSymptoms;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Review of Systems</Text>
      {systems.map((system) => (
        <View key={system.name} style={styles.card}>
          <TouchableOpacity
            style={styles.cardHeader}
            onPress={() =>
              setExpandedSystem(expandedSystem === system.name ? null : system.name)
            }
          >
            <Text style={styles.systemTitle}>{system.name}</Text>
            {selectedSymptoms[system.name]?.length > 0 && (
              <Text style={styles.selectedCount}>
                ({selectedSymptoms[system.name].length})
              </Text>
            )}
          </TouchableOpacity>
          {expandedSystem === system.name && (
            <View style={styles.symptomsContainer}>
              {system.items.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  onPress={() => handleChipSelect(system.name, symptom)}
                  style={[
                    styles.symptomChip,
                    selectedSymptoms[system.name]?.includes(symptom)
                      ? styles.selectedChip
                      : styles.unselectedChip
                  ]}
                >
                  <Text
                    style={[
                      styles.symptomText,
                      selectedSymptoms[system.name]?.includes(symptom)
                        ? styles.selectedText
                        : styles.unselectedText
                    ]}
                  >
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  systemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedCount: {
    fontSize: 14,
    color: '#888',
  },
  symptomsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  symptomChip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedChip: {
    backgroundColor: '#007BFF',
  },
  unselectedChip: {
    backgroundColor: '#f0f0f0',
  },
  symptomText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#000',
  },
});

export default ReviewOfSystems;