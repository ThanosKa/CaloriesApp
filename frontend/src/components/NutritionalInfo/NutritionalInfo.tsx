// components/NutritionalInfo/NutritionalInfo.tsx
// components/NutritionalInfo/NutritionalInfo.tsx
import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface NutritionalInfoProps {
  food: any;
  animate?: boolean;
}

export const NutritionalInfo: React.FC<NutritionalInfoProps> = ({
  food,
  animate = false,
}) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(0);
      fadeAnim.setValue(1);
    }
  }, [animate]);

  return (
    <Animated.View
      style={[
        styles.nutritionalContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
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
    </Animated.View>
  );
};

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
