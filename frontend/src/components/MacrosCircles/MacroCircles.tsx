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
  isLoading?: boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MacroCircle: React.FC<MacroCircleProps> = ({
  percentage,
  macro,
  value,
  gradientColors,
  animate = false,
  isLoading = false,
}) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const loadingAnimation = useRef(new Animated.Value(0)).current;
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    if (isLoading) {
      // Reset the loading animation
      loadingAnimation.setValue(0);

      const animate = () => {
        Animated.sequence([
          Animated.timing(loadingAnimation, {
            toValue: 100,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(loadingAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start((finished) => {
          if (finished && isLoading) {
            animate();
          }
        });
      };

      animate();

      // Add listener to update displayed percentage based on animation value
      const loadingListener = loadingAnimation.addListener(({ value }) => {
        setDisplayedPercentage(Math.round(value));
      });

      return () => {
        loadingAnimation.removeListener(loadingListener);
        loadingAnimation.stopAnimation();
      };
    } else {
      // Normal progress animation
      Animated.timing(progressAnimation, {
        toValue: percentage,
        duration: animate ? 1000 : 0,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();

      setDisplayedPercentage(percentage);
      setDisplayedValue(value);
    }

    return () => {
      progressAnimation.stopAnimation();
    };
  }, [isLoading, percentage, value, animate]);

  const circleCircumference = 2 * Math.PI * 40;
  const strokeDashoffset = isLoading
    ? loadingAnimation.interpolate({
        inputRange: [0, 100],
        outputRange: [circleCircumference, 0],
      })
    : progressAnimation.interpolate({
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
            <Circle
              cx={45}
              cy={45}
              r={40}
              stroke="#ffffff30"
              strokeWidth={8}
              fill="none"
            />
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
            {isLoading ? (
              <>
                <Text style={styles.macroPercentage}>
                  {displayedPercentage}%
                </Text>
                <Text style={styles.macroValue}>0g</Text>
              </>
            ) : (
              <>
                <Text style={styles.macroPercentage}>
                  {displayedPercentage}%
                </Text>
                <Text style={styles.macroValue}>{displayedValue}g</Text>
              </>
            )}
          </View>
        </LinearGradient>
      </View>
      <Text style={styles.macroLabel}>{macro}</Text>
    </View>
  );
};

export const MacroCircles: React.FC<{
  food?: any;
  animate?: boolean;
  isLoading?: boolean;
}> = ({ food, animate = false, isLoading = false }) => {
  return (
    <View style={styles.macrosRow}>
      <MacroCircle
        percentage={isLoading ? 0 : food?.macroPercentages?.protein || 0}
        macro="🍖 Protein"
        value={isLoading ? 0 : food?.macros?.protein || 0}
        gradientColors={["#E53935", "#FF5252"]}
        animate={animate}
        isLoading={isLoading}
      />
      <MacroCircle
        percentage={isLoading ? 0 : food?.macroPercentages?.carbs || 0}
        macro="🍞 Carbs"
        value={isLoading ? 0 : food?.macros?.carbs || 0}
        gradientColors={["#FB8C00", "#FFA726"]}
        animate={animate}
        isLoading={isLoading}
      />
      <MacroCircle
        percentage={isLoading ? 0 : food?.macroPercentages?.fats || 0}
        macro="🥑 Fats"
        value={isLoading ? 0 : food?.macros?.fats || 0}
        gradientColors={["#1E88E5", "#42A5F5"]}
        animate={animate}
        isLoading={isLoading}
      />
    </View>
  );
};

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
    color: "gray",
    fontWeight: "bold",
  },
});

export default MacroCircles;
