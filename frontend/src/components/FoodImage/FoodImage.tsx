// components/FoodImage/FoodImage.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import * as Progress from "react-native-progress"; // You'll need to install this package

interface FoodImageProps {
  imageUrl: string | undefined;
  tempImageUri?: string;
  name: string;
  loading: boolean | undefined;
  setLoading: (loading: boolean) => void;
  animate?: boolean;
}

const { width } = Dimensions.get("window");

export const FoodImage: React.FC<FoodImageProps> = ({
  imageUrl,
  tempImageUri,
  name,
  loading,
  setLoading,
  animate = false,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (animate) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [animate]);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 0.1;
          return newProgress > 0.9 ? 0.9 : newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(1);
    }
  }, [loading]);

  return (
    <Animated.View style={[styles.mainImageContainer, { opacity: fadeAnim }]}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: loading ? tempImageUri : imageUrl }}
          style={[styles.mainFoodImage, loading && styles.loadingImage]}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={progress}
              width={200}
              color="#007AFF"
              borderWidth={0}
              unfilledColor="rgba(255,255,255,0.5)"
              borderRadius={4}
            />
            <Text style={styles.progressText}>Analyzing image...</Text>
          </View>
        )}
      </View>
      <Text style={styles.foodName}>{name}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mainImageContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    position: "relative",
  },
  mainFoodImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: "cover",
  },
  loadingImage: {
    opacity: 0.7,
  },
  progressContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -20 }],
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 8,
  },
  progressText: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  foodName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FoodImage;
