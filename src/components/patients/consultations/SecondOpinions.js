import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios'; // For backend API calls
import CustomSelect from '../../utils/CustomSelect'; // Replace with your actual custom select component

const SecondOpinions = () => {
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    condition: '',
    medicalRecords: null,
    specialist: '',
  });

  const [specialists, setSpecialists] = useState([]);
  const [loadingSpecialists, setLoadingSpecialists] = useState(true);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);

  // Fetch available specialists from the backend
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axios.get('http://192.168.1.5:3000/api/doctors'); // Replace with your endpoint
        const availableDoctors = response.data;
        if (availableDoctors.length > 0) {
          setSpecialists(availableDoctors);
        } else {
          setSpecialists([]);
        }
      } catch (error) {
        console.error('Error fetching specialists:', error.message);
        setSpecialists([]);
      } finally {
        setLoadingSpecialists(false);
      }
    };

    fetchSpecialists();
  }, []);

  const handleChange = (name, value) => {
    setPatientDetails({
      ...patientDetails,
      [name]: value,
    });
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0]);
        handleChange('medicalRecords', response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    if (!patientDetails.name || !patientDetails.condition || !patientDetails.specialist) {
      setStatus('Please fill in all required fields.');
      return;
    }

    if (specialists.length === 0) {
      setStatus('No specialists available. Please try again later.');
      return;
    }

    const formData = new FormData();
    formData.append('name', patientDetails.name);
    formData.append('age', patientDetails.age);
    formData.append('condition', patientDetails.condition);
    formData.append('specialist_id', patientDetails.specialist);
    if (patientDetails.medicalRecords) {
      formData.append('medicalRecords', {
        uri: patientDetails.medicalRecords.uri,
        type: patientDetails.medicalRecords.type,
        name: patientDetails.medicalRecords.fileName || 'medical_record.jpg',
      });
    }

    try {
      const response = await axios.post('http://YOUR_BACKEND_IP:PORT/api/second-opinions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('Request submitted successfully!');
      console.log('Backend Response:', response.data);

      // Reset form
      setPatientDetails({
        name: '',
        age: '',
        condition: '',
        medicalRecords: null,
        specialist: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error submitting request:', error.message);
      setStatus('Failed to submit request. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Request a Second Opinion</Text>
      <Text style={styles.subHeader}>Fill out the form below to request a second opinion from a specialist.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Patient's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={patientDetails.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={patientDetails.age}
          onChangeText={(text) => handleChange('age', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medical Condition</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your condition"
          value={patientDetails.condition}
          onChangeText={(text) => handleChange('condition', text)}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Upload Medical Records</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
          <Text style={styles.uploadButtonText}>Upload Image/Document</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Specialist</Text>
        {loadingSpecialists ? (
          <ActivityIndicator size="small" color="#FF7043" />
        ) : specialists.length > 0 ? (
          <CustomSelect
            options={specialists.map((doctor) => ({ label: doctor.name, value: doctor.id }))}
            selectedValue={patientDetails.specialist}
            onValueChange={(value) => handleChange('specialist', value)}
          />
        ) : (
          <Text style={styles.noSpecialistText}>No specialists available at the moment.</Text>
        )}
      </View>

      <Button title="Submit Request" onPress={handleSubmit} color="#FF7043" />

      {status ? <Text style={styles.status}>{status}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004C54',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#004C54',
    marginBottom: 5,
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default SecondOpinions;
