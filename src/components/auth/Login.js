import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleAuthentication = async () => {
    if (!validateInputs()) return;
    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.3:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      await AsyncStorage.setItem('authToken', data.token);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  const CustomInput = ({ icon, isPassword, ...props }) => (
    <View style={styles.inputWrapper}>
      <MaterialIcons name={icon} size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor="#999"
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordToggle}
        >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('./download.jpg')} // Add your background image here
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.9 }} // Make the background subtle
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Animated.View
            style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            <Text style={styles.header}>Welcome Back</Text>
            <Text style={styles.subheader}>Sign in to continue to your account</Text>

            <CustomInput
              icon="email"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              icon="lock-outline"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              isPassword
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleAuthentication}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Log In</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleContainer} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.toggleText}>
                Don't have an account?{' '}
                <Text style={styles.toggleLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5', // Coral Cloud
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#002432', // Ocean Obsidian
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFE4E5', // Coral Cloud
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#002432', // Ocean Obsidian
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#002432', // Ocean Obsidian
  },
  passwordToggle: {
    padding: 8,
  },
  button: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#F78837', // Tangerine Tango
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  toggleContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleLink: {
    color: '#27C7B8', // Teal Tide
    fontWeight: '600',
  },
});

export default Login;
