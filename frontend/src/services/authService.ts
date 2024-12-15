import { api } from './config';
import { ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials } from './types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', credentials);
    return response.data;
  },
};
