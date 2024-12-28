// components/MacroCircles/MacroCircles.tsx
import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

interface MacroCircleProps {
  percentage: number;
  macro: string;
  value: number;
  gradientColors: [string, string];
  animate?: boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MacroCircle: React.FC<MacroCircleProps> = ({
  percentage,
  macro,
  value,
  gradientColors,
  animate = false,
}) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    if (animate) {
      // Reset values
      progressAnimation.setValue(0);
      setDisplayedPercentage(0);
      setDisplayedValue(0);

      // Animate the progress circle
      Animated.timing(progressAnimation, {
        toValue: percentage,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();

      // Animate the numbers
      let startTime = Date.now();
      const duration = 1500;

      const updateNumbers = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);

        if (progress < 1) {
          setDisplayedPercentage(Math.round(percentage * progress));
          setDisplayedValue(Math.round(value * progress));
          requestAnimationFrame(updateNumbers);
        } else {
          setDisplayedPercentage(percentage);
          setDisplayedValue(value);
        }
      };

      requestAnimationFrame(updateNumbers);
    } else {
      progressAnimation.setValue(percentage);
      setDisplayedPercentage(percentage);
      setDisplayedValue(value);
    }
  }, [animate, percentage, value]);

  const circleCircumference = 2 * Math.PI * 40; // radius is 40
  const strokeDashoffset = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: [circleCircumference, 0],
  });

  return (
    <View style={styles.macroCircleContainer}>
      <View style={styles.circleContainer}>
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Svg width={90} height={90}>
            {/* Background Circle */}
            <Circle
              cx={45}
              cy={45}
              r={40}
              stroke="#ffffff30"
              strokeWidth={8}
              fill="none"
            />
            {/* Progress Circle */}
            <AnimatedCircle
              cx={45}
              cy={45}
              r={40}
              stroke="#fff"
              strokeWidth={8}
              fill="none"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="45, 45"
            />
          </Svg>
          <View style={styles.valueContainer}>
            <Text style={styles.macroPercentage}>{displayedPercentage}%</Text>
            <Text style={styles.macroValue}>{displayedValue}g</Text>
          </View>
        </LinearGradient>
      </View>
      <Text style={styles.macroLabel}>{macro}</Text>
    </View>
  );
};

export const MacroCircles: React.FC<{ food: any; animate?: boolean }> = ({
  food,
  animate = false,
}) => (
  <View style={styles.macrosRow}>
    <MacroCircle
      percentage={food.macroPercentages.protein}
      macro="Protein"
      value={food.macros.protein}
      gradientColors={["#FF6B6B", "#FF8E8E"]}
      animate={animate}
    />
    <MacroCircle
      percentage={food.macroPercentages.carbs}
      macro="Carbs"
      value={food.macros.carbs}
      gradientColors={["#4ECDC4", "#6EE7E1"]}
      animate={animate}
    />
    <MacroCircle
      percentage={food.macroPercentages.fats}
      macro="Fats"
      value={food.macros.fats}
      gradientColors={["#FFE66D", "#FFF3A3"]}
      animate={animate}
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
  circleContainer: {
    width: 90,
    height: 90,
    marginBottom: 8,
  },
  gradientBackground: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  valueContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
