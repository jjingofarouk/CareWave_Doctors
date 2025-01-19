import React from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import Calendar from '../../ui/Calendar'; // Assuming this is a custom Calendar component.
import Separator from '../../ui/Separator'; // Assuming this is a custom Separator component.

const PersonalInfo = ({ personalInfo, handleInputChange }) => {
  const handleDateSelect = (date) => {
    handleInputChange('personalInfo', 'dateOfBirth', date);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Personal Information</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prefix</Text>
            <Picker
              selectedValue={personalInfo.prefix}
              onValueChange={(itemValue) => handleInputChange('personalInfo', 'prefix', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Prefix" value="" />
              <Picker.Item label="Mr." value="Mr." />
              <Picker.Item label="Mrs." value="Mrs." />
              <Picker.Item label="Miss" value="Miss" />
              <Picker.Item label="Dr." value="Dr." />
              <Picker.Item label="Prof." value="Prof." />
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., John Kagwa"
              value={personalInfo.name}
              onChangeText={(text) => handleInputChange('personalInfo', 'name', text)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={personalInfo.dateOfBirth ? personalInfo.dateOfBirth.toISOString().split('T')[0] : ''} // Using native Date formatting
              onChangeText={(text) => handleDateSelect(new Date(text))}
              placeholder="Select Date"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <Picker
              selectedValue={personalInfo.gender}
              onValueChange={(itemValue) => handleInputChange('personalInfo', 'gender', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Intersex" value="intersex" />
              <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
            </Picker>
          </View>
        </View>

        <Separator />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Occupation</Text>
          <Picker
            selectedValue={personalInfo.occupation}
            onValueChange={(itemValue) => handleInputChange('personalInfo', 'occupation', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Occupation" value="" />
            <Picker.Item label="Farmer" value="farmer" />
            <Picker.Item label="Teacher" value="teacher" />
          </Picker>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Marital Status</Text>
            <Picker
              selectedValue={personalInfo.maritalStatus}
              onValueChange={(itemValue) => handleInputChange('personalInfo', 'maritalStatus', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Marital Status" value="" />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Betrothed" value="betrothed" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name of Next of Kin</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., John Kagwa"
              value={personalInfo.nok}
              onChangeText={(text) => handleInputChange('personalInfo', 'nok', text)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nationality</Text>
          <Picker
            selectedValue={personalInfo.nationality}
            onValueChange={(itemValue) => handleInputChange('personalInfo', 'nationality', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Nationality" value="" />
            <Picker.Item label="Ugandan" value="Ugandan" />
            <Picker.Item label="Kenyan" value="Kenyan" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tribe</Text>
          <Picker
            selectedValue={personalInfo.tribe}
            onValueChange={(itemValue) => handleInputChange('personalInfo', 'tribe', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Tribe" value="" />
            <Picker.Item label="Muganda" value="muganda" />
            <Picker.Item label="Musongora" value="musongora" />
            <Picker.Item label="Munyarwanda" value="munyarwanda" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Religion</Text>
          <Picker
            selectedValue={personalInfo.religion}
            onValueChange={(itemValue) => handleInputChange('personalInfo', 'religion', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Religion" value="" />
            <Picker.Item label="Catholic" value="catholic" />
            <Picker.Item label="Anglican" value="anglican" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <Separator />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <Picker
            selectedValue={personalInfo.address}
            onValueChange={(itemValue) => handleInputChange('personalInfo', 'address', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Patient's District" value="" />
            <Picker.Item label="Abim" value="abim" />
            <Picker.Item label="Adjumani" value="adjumani" />
            <Picker.Item label="Agago" value="agago" />
            <Picker.Item label="Zombo" value="zombo" />
          </Picker>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., +256 123 456 789"
              value={personalInfo.phone}
              onChangeText={(text) => handleInputChange('personalInfo', 'phone', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., patient@example.com"
              value={personalInfo.email}
              onChangeText={(text) => handleInputChange('personalInfo', 'email', text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
    paddingRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
  },
});

export default PersonalInfo;
