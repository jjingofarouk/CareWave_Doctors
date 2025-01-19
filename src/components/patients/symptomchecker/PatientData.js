// PatientData.js

import React from 'react';
import { TextInput, DropDownPicker } from 'react-native';
import { styles } from './Styles'; // Assuming this is your shared styles

const PatientData = ({
  age, setAge,
  gender, setGender,
  severity, setSeverity,
  duration, setDuration,
  openAge, setOpenAge,
  openGender, setOpenGender,
  openSeverity, setOpenSeverity,
  openDuration, setOpenDuration
}) => {

  return (
    <>
      {/* Dropdown for Duration */}
      <DropDownPicker
        open={openDuration}
        value={duration}
        items={[
          { label: 'Short Duration', value: 'short' },
          { label: 'Medium Duration', value: 'medium' },
          { label: 'Long Duration', value: 'long' },
        ]}
        setOpen={setOpenDuration}
        setValue={setDuration}
        placeholder="Select Duration"
        style={styles.dropdown}
      />

      {/* Dropdown for Severity */}
      <DropDownPicker
        open={openSeverity}
        value={severity}
        items={[
          { label: 'Mild', value: 'mild' },
          { label: 'Moderate', value: 'moderate' },
          { label: 'Severe', value: 'severe' },
        ]}
        setOpen={setOpenSeverity}
        setValue={setSeverity}
        placeholder="Select Severity"
        style={styles.dropdown}
      />

      {/* Dropdown for Age */}
      <DropDownPicker
        open={openAge}
        value={age}
        items={[
          { label: 'Child', value: 'child' },
          { label: 'Adult', value: 'adult' },
          { label: 'Elderly', value: 'elderly' },
        ]}
        setOpen={setOpenAge}
        setValue={setAge}
        placeholder="Select Age Group"
        style={styles.dropdown}
      />

      {/* Dropdown for Gender */}
      <DropDownPicker
        open={openGender}
        value={gender}
        items={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
        setOpen={setOpenGender}
        setValue={setGender}
        placeholder="Select Gender"
        style={styles.dropdown}
      />
    </>
  );
};

export default PatientData