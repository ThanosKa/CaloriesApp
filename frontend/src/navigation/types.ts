// src/navigation/types.ts
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FoodDetailParams } from "../types/food";
import { FoodItem } from "../services";
import { RouteProp } from "@react-navigation/native";

export type MainTabParamList = {
  Scan:
    | {
        scanResult?: FoodItem;
        error?: string;
        tempImageUri?: string; // Add this
        isLoading?: boolean; // Add this
      }
    | undefined;
  Profile: undefined;
};

export type ScanScreenRouteProp = RouteProp<MainTabParamList, "Scan">;

export type RootStackParamList = {
  MainTabs: undefined;
  Camera: undefined;
  FoodDetail: {
    food: FoodItem["food"];
    confidence: number;
  };
  Auth: undefined;
};

// You might also want to add specific route params for the Camera screen
export type CameraScreenRouteProp = RouteProp<RootStackParamList, "Camera">;

export type RootNavigationType = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<MainTabParamList>
>;
