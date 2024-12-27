// components/FoodImage/FoodImage.tsx
import React from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

interface FoodImageProps {
  imageUrl: string;
  name: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
const { width } = Dimensions.get("window");

export const FoodImage: React.FC<FoodImageProps> = ({
  imageUrl,
  name,
  loading,
  setLoading,
}) => (
  <View style={styles.mainImageContainer}>
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
  </View>
);

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
