// components/NutritionalInfo/NutritionalInfo.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const NutritionalInfo: React.FC<{ food: any }> = ({ food }) => (
  <View style={styles.nutritionalContainer}>
    <Text style={styles.sectionTitle}>Nutritional Information</Text>
    <View style={styles.nutritionalGrid}>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>{food.calories}</Text>
        <Text style={styles.nutritionalLabel}>Calories</Text>
      </View>
      <View style={styles.nutritionalItem}>
        <Text style={styles.nutritionalValue}>
          {food.servingSize || "100g"}
        </Text>
        <Text style={styles.nutritionalLabel}>Serving Size</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  nutritionalContainer: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  nutritionalGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  nutritionalItem: {
    alignItems: "center",
  },
  nutritionalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  nutritionalLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default NutritionalInfo;
