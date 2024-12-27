// components/MacroCircles/MacroCircles.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface MacroCircleProps {
  percentage: number;
  macro: string;
  value: number;
  gradientColors: [string, string];
}

const MacroCircle: React.FC<MacroCircleProps> = ({
  percentage,
  macro,
  value,
  gradientColors,
}) => (
  <View style={styles.macroCircleContainer}>
    <LinearGradient
      colors={gradientColors}
      style={styles.macroCircle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.macroPercentage}>{percentage}%</Text>
      <Text style={styles.macroValue}>{value}g</Text>
    </LinearGradient>
    <Text style={styles.macroLabel}>{macro}</Text>
  </View>
);

export const MacroCircles: React.FC<{ food: any }> = ({ food }) => (
  <View style={styles.macrosRow}>
    <MacroCircle
      percentage={food.macroPercentages.protein}
      macro="Protein"
      value={food.macros.protein}
      gradientColors={["#FF6B6B", "#FF8E8E"]}
    />
    <MacroCircle
      percentage={food.macroPercentages.carbs}
      macro="Carbs"
      value={food.macros.carbs}
      gradientColors={["#4ECDC4", "#6EE7E1"]}
    />
    <MacroCircle
      percentage={food.macroPercentages.fats}
      macro="Fats"
      value={food.macros.fats}
      gradientColors={["#FFE66D", "#FFF3A3"]}
    />
  </View>
);

const styles = StyleSheet.create({
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  macroCircleContainer: {
    alignItems: "center",
  },
  macroCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  macroPercentage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  macroValue: {
    fontSize: 16,
    color: "#fff",
  },
  macroLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default MacroCircles;
