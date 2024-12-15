import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiConfig } from '../config/api.config';

export const api = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error accessing AsyncStorage:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      await AsyncStorage.removeItem('token');
      // You might want to redirect to login or trigger auth state update
    }
    return Promise.reject(error);
  }
);
