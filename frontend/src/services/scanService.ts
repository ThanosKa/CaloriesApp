import { api } from './config';
import { ApiResponse, FoodItem } from './types';

export const scanService = {
  scanFood: async (imageFile: FormData): Promise<ApiResponse<FoodItem>> => {
    const response = await api.post<ApiResponse<FoodItem>>('/scan', imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
