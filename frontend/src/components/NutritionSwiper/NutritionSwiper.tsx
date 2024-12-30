// components/NutritionSwiper/NutritionSwiper.tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { MacroCircles } from "../MacrosCircles/MacroCircles";

const { width } = Dimensions.get("window");

interface NutritionSwiperProps {
  food: any;
  animate?: boolean;
  isLoading?: boolean;
}

export const NutritionSwiper: React.FC<NutritionSwiperProps> = ({
  food,
  animate = false,
  isLoading = false,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Swiper
          loop={true}
          height={250}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          paginationStyle={styles.pagination}
        >
          {/* Nutritional Info Slide */}
          <View style={styles.nutritionSlideContainer}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionalGrid}>
              <View style={styles.nutritionalItem}>
                <Text style={styles.nutritionalEmoji}>🔥</Text>
                <Text style={styles.nutritionalValue}>
                  {isLoading ? "..." : food?.calories}
                </Text>
                <Text style={styles.nutritionalLabel}>Calories</Text>
              </View>
              <View style={[styles.nutritionalItem, styles.servingSizeItem]}>
                <Text style={styles.nutritionalEmoji}>⚖️</Text>
                <Text style={styles.nutritionalValue}>
                  {isLoading ? "..." : food?.servingSize || "100g"}
                </Text>
                <Text style={styles.nutritionalLabel}>Serving Size</Text>
              </View>
            </View>
          </View>

          {/* Macros Slide */}
          <View style={styles.macrosSlideContainer}>
            <View style={styles.macrosTitleContainer}>
              <Text style={styles.sectionTitle}>Macronutrients</Text>
            </View>
            <View style={styles.macrosContent}>
              <MacroCircles
                food={food}
                animate={animate}
                isLoading={isLoading}
              />
            </View>
          </View>
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: "#fff",
    marginVertical: 16,
    borderRadius: 16,
    height: 250,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  // Nutrition Info Slide Styles
  nutritionSlideContainer: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  nutritionalGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 12,
  },
  nutritionalItem: {
    alignItems: "center",
    flex: 1,
  },
  servingSizeItem: {
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
    marginLeft: 20,
    paddingLeft: 20,
  },
  nutritionalEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  nutritionalValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  nutritionalLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  // Macros Slide Styles
  macrosSlideContainer: {
    flex: 1,
    paddingVertical: 25,
  },
  macrosTitleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  macrosContent: {
    // Empty to preserve original macro circles spacing
  },
  // Common Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  // Swiper Styles
  dot: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: "#007AFF",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pagination: {
    bottom: 10,
  },
});

export default NutritionSwiper;
