// components/NutritionSwiper/NutritionSwiper.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { MacroCircles } from "../MacrosCircles/MacroCircles";

const { width } = Dimensions.get("window");

interface NutritionSwiperProps {
  food: any;
  animate?: boolean;
  isLoading?: boolean;
}

const LoadingDots = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((current) => {
        if (current.length >= 3) return ".";
        return current + ".";
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.nutritionalValue}>{dots}</Text>;
};

export const NutritionSwiper: React.FC<NutritionSwiperProps> = ({
  food,
  animate = false,
  isLoading = false,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Swiper
          loop={false} // Changed to false to prevent circular swiping
          height={250}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          paginationStyle={styles.pagination}
          showsButtons={false} // Optional: hide navigation buttons
        >
          {/* Nutritional Info Slide */}
          <View style={styles.nutritionSlideContainer}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionalGrid}>
              <View style={styles.nutritionalItem}>
                <Text style={styles.nutritionalEmoji}>🔥</Text>
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  <Text style={styles.nutritionalValue}>{food?.calories}</Text>
                )}
                <Text style={styles.nutritionalLabel}>Calories</Text>
              </View>
              <View style={[styles.nutritionalItem, styles.servingSizeItem]}>
                <Text style={styles.nutritionalEmoji}>⚖️</Text>
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  <Text style={styles.nutritionalValue}>
                    {food?.servingSize || "100g"}
                  </Text>
                )}
                <Text style={styles.nutritionalLabel}>Serving Size</Text>
              </View>
            </View>
          </View>

          {/* Macros Slide */}
          <View style={styles.macrosSlideContainer}>
            <View style={styles.macrosTitleContainer}>
              <Text style={styles.sectionTitle}>Macros</Text>
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
    marginTop: 4,
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
  },
  macrosSlideContainer: {
    flex: 1,
    paddingVertical: 25,
  },
  macrosTitleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  macrosContent: {},
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
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
