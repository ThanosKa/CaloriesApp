// components/FoodImage/FoodImage.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

interface FoodImageProps {
  imageUrl: string;
  name: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  animate?: boolean;
}

const { width } = Dimensions.get("window");

export const FoodImage: React.FC<FoodImageProps> = ({
  imageUrl,
  name,
  loading,
  setLoading,
  animate = false,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <Animated.View style={[styles.mainImageContainer, { opacity: fadeAnim }]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.mainFoodImage}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#007AFF" />
      )}
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
  mainFoodImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: "cover",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -20,
  },
  foodName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FoodImage;
