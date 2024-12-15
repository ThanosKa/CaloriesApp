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
  food: {
    _id: string;
    name: string;
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fats: number;
    };
    macroPercentages: {
      protein: number;
      carbs: number;
      fats: number;
    };
    imageUrl: string;
    similarImages: string[];
    thirdPartyLinks: {
      uberEats: string;
      deliveroo: string;
      foodPanda: string;
    };
    servingSize?: string;  // Optional serving size
    nutritionalInfo?: {    // Optional detailed nutritional info
      fiber?: number;
      sugar?: number;
      sodium?: number;
      cholesterol?: number;
    };
    allergens?: string[];  // Optional allergens information
    dietaryInfo?: {        // Optional dietary information
      isVegan?: boolean;
      isVegetarian?: boolean;
      isGlutenFree?: boolean;
    };
  };
  confidence: number;
  scannedAt: string;
}

 

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    username: string;
  }
  