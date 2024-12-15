import { apiConfig } from '../config/api.config';

export const validateEnv = () => {
  // Log the current API configuration
  console.log('API Configuration:', {
    baseUrl: apiConfig.baseUrl,
  });
};
