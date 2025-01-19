// config/constants.js
import { Platform } from 'react-native';

// API Configuration
export const API_BASE_URL = Platform.select({
  development: 'http://dev-api.telemedicine.com/v1',
  staging: 'https://staging-api.telemedicine.com/v1',
  production: 'https://api.telemedicine.com/v1',
})[__DEV__ ? 'development' : 'production'];

// Authentication
export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

// API Endpoints
export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh',
  DASHBOARD: '/dashboard',
  APPOINTMENTS: '/appointments',
  PATIENTS: '/patients',
  NOTIFICATIONS: '/notifications',
  HEALTH_TIPS: '/health-tips',
  ANALYTICS: '/analytics'
};

// Timeouts
export const API_TIMEOUT = 30000; // 30 seconds
export const TOKEN_REFRESH_THRESHOLD = 300; // 5 minutes in seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Cache Duration
export const CACHE_DURATION = {
  DASHBOARD: 5 * 60 * 1000, // 5 minutes
  HEALTH_TIPS: 24 * 60 * 60 * 1000, // 24 hours
  USER_PROFILE: 15 * 60 * 1000 // 15 minutes
};

// App Theme
export const THEME = {
  colors: {
    primary: '#2196F3',
    secondary: '#FF4081',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  }
};

// Feature Flags
export const FEATURES = {
  VIDEO_CALL: true,
  CHAT: true,
  FILE_SHARING: true,
  E_PRESCRIPTION: true,
  ANALYTICS_DASHBOARD: true,
  PATIENT_HISTORY: true
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  sound: true,
  vibrate: true,
  priority: 'high',
  channelId: 'telemedicine-notifications',
  channelName: 'Telemedicine Notifications'
};

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM DD, YYYY',
  api: 'YYYY-MM-DD',
  time: 'HH:mm',
  datetime: 'YYYY-MM-DD HH:mm:ss'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Please check your internet connection',
  SERVER_ERROR: 'Something went wrong. Please try again later',
  AUTH_ERROR: 'Your session has expired. Please login again',
  VALIDATION_ERROR: 'Please check your input and try again',
  FILE_SIZE_ERROR: 'File size exceeds the maximum limit',
  FILE_TYPE_ERROR: 'File type not supported'
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  LOGIN: 'user_login',
  LOGOUT: 'user_logout',
  VIEW_PATIENT: 'view_patient',
  START_CONSULTATION: 'start_consultation',
  END_CONSULTATION: 'end_consultation',
  WRITE_PRESCRIPTION: 'write_prescription',
  VIEW_ANALYTICS: 'view_analytics'
};