// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        // Handle refresh token failure
        await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
        // Redirect to login (implement your navigation logic here)
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const fetchDoctorDashboardData = async () => {
  try {
    const [
      appointmentsResponse,
      analyticsResponse,
      patientsResponse,
      activitiesResponse,
      tipsResponse
    ] = await Promise.all([
      api.get('/appointments/today'),
      api.get('/analytics/summary'),
      api.get('/patients/stats'),
      api.get('/activities/recent'),
      api.get('/health-tips')
    ]);

    return {
      appointments: appointmentsResponse.data,
      analytics: analyticsResponse.data,
      patientStats: patientsResponse.data,
      recentActivities: activitiesResponse.data,
      healthTips: tipsResponse.data,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Failed to fetch dashboard data');
    } else if (error.request) {
      // Request made but no response
      throw new Error('Network error. Please check your connection.');
    } else {
      // Error in request setup
      throw new Error('Failed to make request. Please try again.');
    }
  }
};

// Optional: Add more API endpoints
export const fetchAppointmentDetails = async (appointmentId) => {
  const response = await api.get(`/appointments/${appointmentId}`);
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(`/appointments/${appointmentId}/status`, { status });
  return response.data;
};

export const fetchPatientHistory = async (patientId) => {
  const response = await api.get(`/patients/${patientId}/history`);
  return response.data;
};