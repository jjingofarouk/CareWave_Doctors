import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For image picking functionality
import LottieView from 'lottie-react-native'; // Lottie for advanced loading animation
import { useToast } from 'react-native-toast-notifications'; // For notifications on success or error

const PillIdentifier = () => {
  const [pillImage, setPillImage] = useState(null);
  const [identificationResult, setIdentificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast(); // Custom toast notification

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setPillImage(result.uri);
      identifyPill(result.uri);
    }
  };

  const identifyPill = async (uri) => {
    setLoading(true);
    setError(null); // Reset previous error state
    try {
      // Simulate an API call with a timeout (mock API response for demonstration)
      const result = await new Promise((resolve, reject) =>
        setTimeout(() => {
          const isSuccessful = Math.random() > 0.5; // Random success/failure
          if (isSuccessful) {
            resolve("Identified Pill: Aspirin");
          } else {
            reject("Failed to identify the pill. Please try again.");
          }
        }, 2000)
      );
      setIdentificationResult(result);
      toast.show("Pill identification successful", { type: "success" });
    } catch (err) {
      setError(err);
      toast.show(err, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pill Identifier</Text>

      <Button title="Upload Pill Image" onPress={handleImageUpload} />

      {pillImage && (
        <Image source={{ uri: pillImage }} style={styles.pillImage} />
      )}

      {loading && (
        <LottieView
          source={require('./assets/loading.json')} // Add a custom Lottie animation file in the assets folder
          autoPlay
          loop
          style={styles.lottie}
        />
      )}

      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {identificationResult && <Text style={styles.resultMessage}>{identificationResult}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  pillImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  lottie: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  errorMessage: {
    color: '#D32F2F',
    fontSize: 16,
    marginTop: 20,
  },
  resultMessage: {
    color: '#4CAF50',
    fontSize: 18,
    marginTop: 20,
  },
});

export default PillIdentifier;
