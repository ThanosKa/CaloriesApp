// components/LoadingState/LoadingState.tsx
import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

interface LoadingStateProps {
  skipMacros?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  skipMacros = false,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });

  return (
    <View style={styles.container}>
      {!skipMacros && (
        <View style={styles.macrosRow}>
          {[1, 2, 3].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.macroCircle,
                {
                  opacity,
                  transform: [{ translateX }],
                },
              ]}
            />
          ))}
        </View>
      )}

      <Animated.View
        style={[
          styles.imageLoader,
          {
            opacity,
            transform: [{ translateX }],
          },
        ]}
      />

      <View style={styles.nutritionalLoader}>
        {[1, 2].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.textLoader,
              {
                opacity,
                transform: [{ translateX }],
                width: index === 0 ? "100%" : "60%",
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.deliveryLoader}>
        <Text style={styles.deliveryTitle}>Order Now</Text>
        <View style={styles.deliveryButtons}>
          {[1, 2].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.deliveryButton,
                {
                  opacity,
                  transform: [{ translateX }],
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  macroCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E0E0E0",
  },
  imageLoader: {
    width: width - 32,
    height: width - 32,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  nutritionalLoader: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    gap: 12,
    marginBottom: 20,
  },
  textLoader: {
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  deliveryLoader: {
    padding: 16,
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  deliveryButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deliveryButton: {
    width: (width - 48) / 2,
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
});
