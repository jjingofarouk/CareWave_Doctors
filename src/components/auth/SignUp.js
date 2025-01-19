import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateInputs = () => {
    if (!email || (!isLogin && !fullName) || !password) {
      return { isValid: false, message: 'Please fill in all fields' };
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { isValid: false, message: 'Please enter a valid email' };
    }
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    return { isValid: true };
  };

  const handleAuthentication = async () => {
    const validation = validateInputs();
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    setLoading(true);
    try {
      // Your authentication logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
      }
      navigation.replace('Main');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, isPassword }) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#4A5568" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#4A5568"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LinearGradient
            colors={['#E1F0FF', '#FFFFFF']}
            style={styles.gradient}>
            <View style={styles.header}>
              <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
              <Text style={styles.subtitle}>
                {isLogin
                  ? 'Sign in to access your medical care'
                  : 'Join our healthcare platform'}
              </Text>
            </View>

            <View style={styles.form}>
              {!isLogin && (
                <InputField
                  icon="person-outline"
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              )}

              <InputField
                icon="mail-outline"
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
              />

              <InputField
                icon="lock-closed-outline"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                isPassword
              />

              <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setRememberMe(!rememberMe)}>
                  {rememberMe && <Ionicons name="checkmark" size={18} color="#2563EB" />}
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleAuthentication}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.toggleContainer}
                onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <Text style={styles.toggleLink}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE4E5', // Coral Cloud
  },
  scrollContent: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#002432', // Ocean Obsidian
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#002432', // Ocean Obsidian
    textAlign: 'center',
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#DFE4E5', // Coral Cloud
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#002432', // Ocean Obsidian
    height: 56,
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    color: '#002432', // Ocean Obsidian
    fontSize: 16,
    height: '100%',
  },
  eyeIcon: {
    padding: 12,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#27C7B8', // Teal Tide
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    color: '#002432', // Ocean Obsidian
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#F78837', // Tangerine Tango
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#F78837', // Tangerine Tango
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#002432', // Ocean Obsidian
  },
  dividerText: {
    color: '#002432', // Ocean Obsidian
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 56,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#002432', // Ocean Obsidian
  },
  socialButtonText: {
    color: '#002432', // Ocean Obsidian
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  toggleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  toggleText: {
    color: '#002432', // Ocean Obsidian
    fontSize: 14,
  },
  toggleLink: {
    color: '#27C7B8', // Teal Tide
    fontWeight: '600',
  },
});

export default SignUp;
