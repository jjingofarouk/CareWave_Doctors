import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { app } from './Firebase'; // Your Firebase app initialization

const ProfileSettings = ({ navigation }) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(user?.photoURL || null);
  const [isLoading, setIsLoading] = useState(false);

  // Pick a profile photo
  const pickProfilePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'You need to enable gallery access to select a profile photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePhoto(result.uri); // Set new profile photo URI
    }
  };

  // Update profile info (name, photo, email)
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      if (name !== user?.displayName || profilePhoto !== user?.photoURL) {
        await updateProfile(user, {
          displayName: name,
          photoURL: profilePhoto,
        });
      }
      if (email !== user?.email) {
        await updateEmail(user, email);
      }
      Alert.alert('Success', 'Your profile has been updated successfully.');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Please enter both current and new passwords.');
      return;
    }
    setIsLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Your password has been updated.');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('SignUp');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>

      {/* Profile Photo */}
      <TouchableOpacity onPress={pickProfilePhoto} style={styles.photoContainer}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.photo} />
        ) : (
          <MaterialCommunityIcons name="account-circle" size={100} color="#ccc" />
        )}
        <MaterialCommunityIcons name="camera" size={24} color="#009688" style={styles.cameraIcon} />
      </TouchableOpacity>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="account" size={20} color="#009688" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email" size={20} color="#009688" />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleUpdateProfile}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      {/* Current Password Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock" size={20} color="#009688" />
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
      </View>

      {/* New Password Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-reset" size={20} color="#009688" />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </View>

      {/* Update Password Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleUpdatePassword}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004C54',
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
});

export default ProfileSettings;
