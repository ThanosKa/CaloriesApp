import { Request, Response } from 'express';
import FoodGenerator from '../utils/foodGenerator';
import { formatResponse } from '../utils/responseFormatter';

export const scanController = {
  scanFood: async (req: Request, res: Response) => {
    try {
      if (req.file) {
        console.log('Received file:', req.file.originalname);
      }

      const scannedFood = FoodGenerator.generateRandomFood();
      const confidence = Number((0.85 + Math.random() * 0.14).toFixed(2));

      // Calculate calories from macros
      const proteinCalories = scannedFood.macros.protein * 4; // 4 calories per gram
      const carbsCalories = scannedFood.macros.carbs * 4;    // 4 calories per gram
      const fatsCalories = scannedFood.macros.fats * 9;      // 9 calories per gram
      const totalCalories = scannedFood.calories;

      // Calculate percentages
      const macroPercentages = {
        protein: Math.round((proteinCalories / totalCalories) * 100),
        carbs: Math.round((carbsCalories / totalCalories) * 100),
        fats: Math.round((fatsCalories / totalCalories) * 100),
      };

      res.json(formatResponse({
        success: true,
        message: 'Food scanned successfully',
        data: {
          food: {
            ...scannedFood,
            macroPercentages
          },
          confidence,
          scannedAt: new Date().toISOString()
        }
      }));
    } catch (error) {
      console.error('Scan error:', error);
      res.status(500).json(formatResponse({
        success: false,
        message: 'Error scanning food',
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }
};
