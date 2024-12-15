import { api } from './config';
import { ApiResponse, FoodItem } from './types';

export const foodService = {
  getSavedFoods: async (): Promise<ApiResponse<FoodItem[]>> => {
    const response = await api.get<ApiResponse<FoodItem[]>>('/foods/saved');
    return response.data;
  },

  saveFood: async (foodId: string): Promise<ApiResponse<FoodItem>> => {
    const response = await api.post<ApiResponse<FoodItem>>(`/foods/save/${foodId}`);
    return response.data;
  },

  deleteFood: async (foodId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/foods/${foodId}`);
    return response.data;
  },
};
