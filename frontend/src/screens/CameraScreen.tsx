import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationType } from "../navigation/types";
import { scanService } from "../services/scanService";
import CameraComponent from "../components/camera/CameraComponent";

// Add this type for the image
type ImageData = {
  uri: string;
  type: string;
  name: string;
};

export default function CameraScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const [isLoading, setIsLoading] = useState(false);

  // CameraScreen.tsx
  const handleCapture = async (uri: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const imageData: ImageData = {
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        type: "image/jpeg",
        name: "food.jpg",
      };
      formData.append("image", imageData as any);

      // First navigate with the temporary image
      navigation.navigate("Scan", {
        tempImageUri: uri,
        isLoading: true,
      });

      // Make the API call
      const response = await scanService.scanFood(formData);

      // Then navigate again with the results
      navigation.navigate("Scan", {
        scanResult: response.data,
        tempImageUri: uri,
        isLoading: false,
      });
    } catch (error) {
      console.error("Scan error:", error);
      navigation.navigate("Scan", {
        error: "Failed to scan food",
        tempImageUri: uri,
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraComponent
        onCapture={handleCapture}
        onClose={handleClose}
        onPickImages={() => {}}
        currentImageCount={0}
        showGallery={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
