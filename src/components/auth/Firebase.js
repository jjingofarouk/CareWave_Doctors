import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Your Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyBXhclJuVvSfMSjl0qgCeWgn5POa5yK4m8",
  authDomain: "ucare-2bdd3.firebaseapp.com",
  projectId: "ucare-2bdd3",
  storageBucket: "ucare-2bdd3.firebasestorage.app",
  messagingSenderId: "673282269114",
  appId: "1:673282269114:web:9b8101c32c719b51f10783",
  measurementId: "G-B484JKNFYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Use AsyncStorage for persistence
});

export { auth }; // Export the auth object for use in other components
