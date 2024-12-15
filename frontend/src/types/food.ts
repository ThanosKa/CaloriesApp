export type Food = {
    _id: string;
    name: string;
    calories: number;
    macros: {
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
  };
  
  export type FoodDetailParams = {
    food: Food;
    confidence: number;
  };
  