import React from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { Label } from '../../utils/Label';
import { Input } from '../../utils/Input';
import CustomSelect from '../../utils/CustomSelect';

const housingOptions = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'Detached House', value: 'detached_house' },
  { label: 'Shared Housing', value: 'shared_housing' },
  { label: 'Temporary Shelter', value: 'temporary_shelter' },
  { label: 'Homeless', value: 'homeless' },
  { label: 'Dormitory', value: 'dormitory' },
  { label: 'Mobile Home', value: 'mobile_home' },
  { label: 'Other', value: 'other_housing' },
];

const workOptions = [
  { label: 'Office Job', value: 'office_job' },
  { label: 'Manual Labor', value: 'manual_labor' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Retired', value: 'retired' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Self-Employed', value: 'self_employed' },
  { label: 'Student', value: 'student' },
  { label: 'Military Service', value: 'military' },
  { label: 'Disability', value: 'disability' },
];

const foodOptions = [
  { label: 'Home-cooked', value: 'home_cooked' },
  { label: 'Fast Food', value: 'fast_food' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Mixed Diet', value: 'mixed_diet' },
  { label: 'Pescatarian', value: 'pescatarian' },
  { label: 'Keto', value: 'keto' },
  { label: 'Gluten-Free', value: 'gluten_free' },
  { label: 'Other', value: 'other' },
];

const violenceHistoryOptions = [
  { label: 'No History', value: 'no_history' },
  { label: 'Physical Violence', value: 'physical_violence' },
  { label: 'Emotional Abuse', value: 'emotional_abuse' },
  { label: 'Sexual Violence', value: 'sexual_violence' },
  { label: 'Financial Abuse', value: 'financial_abuse' },
  { label: 'Verbal Abuse', value: 'verbal_abuse' },
  { label: 'Stalking', value: 'stalking' },
  { label: 'Other', value: 'other_abuse' },
];

const educationLevelOptions = [
  { label: 'Less than High School', value: 'less_than_high_school' },
  { label: 'High School/GED', value: 'high_school' },
  { label: 'Some College', value: 'some_college' },
  { label: "Associate's Degree", value: 'associates' },
  { label: "Bachelor's Degree", value: 'bachelors' },
  { label: "Master's Degree", value: 'masters' },
  { label: 'Doctoral Degree', value: 'doctoral' },
  { label: 'Professional Degree', value: 'professional' },
];

const languageOptions = [
  { label: 'English', value: 'english' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'Mandarin', value: 'mandarin' },
  { label: 'French', value: 'french' },
  { label: 'Arabic', value: 'arabic' },
  { label: 'Other', value: 'other_language' },
];

const maritalStatusOptions = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'Separated', value: 'separated' },
  { label: 'Domestic Partnership', value: 'domestic_partnership' },
];

const insuranceOptions = [
  { label: 'Private Insurance', value: 'private' },
  { label: 'Medicare', value: 'medicare' },
  { label: 'Medicaid', value: 'medicaid' },
  { label: 'Military/VA', value: 'military' },
  { label: 'No Insurance', value: 'none' },
  { label: 'Other', value: 'other_insurance' },
];

const mentalHealthOptions = [
  { label: 'No History', value: 'no_history' },
  { label: 'Depression', value: 'depression' },
  { label: 'Anxiety', value: 'anxiety' },
  { label: 'PTSD', value: 'ptsd' },
  { label: 'Bipolar Disorder', value: 'bipolar' },
  { label: 'Other', value: 'other_mental_health' },
];

const FormField = ({ label, children }) => (
  <View style={styles.formField}>
    <Label>{label}</Label>
    {children}
  </View>
);

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const SocialHistory = ({ socialHistory = {}, onUpdate }) => {
  const updateField = (field, value) => {
    if (onUpdate) {
      onUpdate('socialHistory', field, value);
    } else {
      console.warn(`Attempted to update ${field} but no onUpdate handler was provided`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Social History</Text>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Substance Use History" />
          <View style={styles.grid}>
            <FormField label="Smoking History">
              <Input
                placeholder="e.g., 20 pack-years"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.smoking || ''}
                onChangeText={text => updateField('smoking', text)}
              />
            </FormField>

            <FormField label="Other Tobacco Products">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Detail use of vaping, chewing tobacco, etc."
                placeholderTextColor="#7f8c8d"
                value={socialHistory.otherTobacco || ''}
                onChangeText={text => updateField('otherTobacco', text)}
              />
            </FormField>

            <FormField label="Quit Attempts">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="List quit attempts with dates"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.quitAttempts || ''}
                onChangeText={text => updateField('quitAttempts', text)}
              />
            </FormField>

            <FormField label="Secondhand Smoke Exposure">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Detail exposure to secondhand smoke"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.secondhandSmoke || ''}
                onChangeText={text => updateField('secondhandSmoke', text)}
              />
            </FormField>

            <FormField label="Alcohol Consumption">
              <Input
                placeholder="e.g., 2 drinks/week for 5 years"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.alcohol || ''}
                onChangeText={text => updateField('alcohol', text)}
              />
            </FormField>

            <FormField label="Recreational Drug Use">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Detail any recreational drug use history"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.recreationalDrugs || ''}
                onChangeText={text => updateField('recreationalDrugs', text)}
              />
            </FormField>

            <FormField label="Prescription Drug Misuse">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Detail any prescription drug misuse"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.prescriptionMisuse || ''}
                onChangeText={text => updateField('prescriptionMisuse', text)}
              />
            </FormField>
          </View>

          <SectionHeader title="Family and Social Support" />
          <View style={styles.grid}>
            <FormField label="Marital/Relationship Status">
              <CustomSelect
                options={maritalStatusOptions}
                placeholder="Select marital status"
                placeholderTextColor="#7f8c8d"
                onSelect={item => updateField('maritalStatus', item.value)}
                label="Marital Status"
              />
            </FormField>

            <FormField label="Children and Dependents">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="List children and other dependents"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.dependents || ''}
                onChangeText={text => updateField('dependents', text)}
              />
            </FormField>
          </View>

          <SectionHeader title="Occupational History" />
          <View style={styles.grid}>
            <FormField label="Current Employment">
              <CustomSelect
                options={workOptions}
                placeholder="Select type of work"
                placeholderTextColor="#7f8c8d"
                onSelect={item => updateField('work', item.value)}
                label="Type of Work"
              />
            </FormField>

            <FormField label="Occupational Exposures/Hazards">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="List any occupational exposures or hazards"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.occupationalHazards || ''}
                onChangeText={text => updateField('occupationalHazards', text)}
              />
            </FormField>

            <FormField label="Past Occupations">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="List previous occupations and duration"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.pastOccupations || ''}
                onChangeText={text => updateField('pastOccupations', text)}
              />
            </FormField>
          </View>

          <SectionHeader title="Environmental Factors" />
          <View style={styles.grid}>
            <FormField label="Housing Situation">
              <CustomSelect
                options={housingOptions}
                placeholder="Select housing situation"
                placeholderTextColor="#7f8c8d"
                onSelect={item => updateField('housing', item.value)}
                label="Housing Situation"
              />
            </FormField>

            <FormField label="Travel History">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Detail recent travel history"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.travelHistory || ''}
                onChangeText={text => updateField('travelHistory', text)}
              />
            </FormField>

            <FormField label="Environmental Exposures">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="List environmental exposures (e.g., mold, chemicals)"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.environmentalExposures || ''}
                onChangeText={text => updateField('environmentalExposures', text)}
              />
            </FormField>

            <FormField label="Pets/Animals">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="List pets and animals in the home"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.pets || ''}
                onChangeText={text => updateField('pets', text)}
              />
            </FormField>

            <FormField label="Transportation Access">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Describe access to transportation"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.transportation || ''}
                onChangeText={text => updateField('transportation', text)}
              />
            </FormField>
          </View>

          <SectionHeader title="Mental Health" />
          <View style={styles.grid}>
            <FormField label="Violence History">
              <CustomSelect
                options={violenceHistoryOptions}
                placeholder="Select violence history"
                placeholderTextColor="#7f8c8d"
                onSelect={item => updateField('violenceHistory', item.value)}
                label="Violence History"
              />
            </FormField>
          </View>

          <SectionHeader title="Additional Notes" />
          <View style={styles.grid}>
            <FormField label="Additional Information">
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Any additional relevant social history information"
                placeholderTextColor="#7f8c8d"
                value={socialHistory.additionalNotes || ''}
                onChangeText={text => updateField('additionalNotes', text)}
              />
            </FormField>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

SocialHistory.defaultProps = {
  socialHistory: {},
  onUpdate: () => console.warn('No onUpdate handler provided to SocialHistory component')
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444444',
  },
  grid: {
    marginBottom: 24,
  },
  formField: {
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#333333',
    marginTop: 4,
},
input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: '#333333',
    marginTop: 4,
},
label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 4,
},
errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
},
disabled: {
    opacity: 0.5,
},
required: {
    color: '#ff0000',
    marginLeft: 4,
},
});

export default SocialHistory;