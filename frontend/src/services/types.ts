export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  }
  
  export interface FoodItem {
    id: string;
    name: string;
    nutritionalInfo: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    // Add other food properties
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    username: string;
  }
  