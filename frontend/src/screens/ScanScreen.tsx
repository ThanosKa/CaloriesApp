// screens/ScanScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootNavigationType, ScanScreenRouteProp } from "../navigation/types";
import { NutritionalInfo } from "../components/NutritionalInfo/NutritionalInfo";
import { FoodImage } from "../components/FoodImage/FoodImage";
import MacroCircles from "../components/MacrosCircles/MacroCircles";
import DeliveryServices from "../components/DeliveryService/DeliveryService";
import NutritionSwiper from "../components/NutritionSwiper/NutritionSwiper";

const { width } = Dimensions.get("window");

export default function ScanScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const route = useRoute<ScanScreenRouteProp>();
  const scanResult = route.params?.scanResult;
  const error = route.params?.error;
  const tempImageUri = route.params?.tempImageUri;
  const isLoading = route.params?.isLoading;
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [macroAnimationComplete, setMacroAnimationComplete] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  useEffect(() => {
    if (scanResult) {
      setIsInitialLoading(true);
      setShowContent(false);
      setShowAnimation(true);
      setMacroAnimationComplete(false);

      const macroTimer = setTimeout(() => {
        setMacroAnimationComplete(true);
      }, 1500);

      const contentTimer = setTimeout(() => {
        setIsInitialLoading(false);
        setShowContent(true);
      }, 2000);

      const animationTimer = setTimeout(() => {
        setShowAnimation(false);
      }, 3500);

      return () => {
        clearTimeout(macroTimer);
        clearTimeout(contentTimer);
        clearTimeout(animationTimer);
      };
    }
  }, [scanResult]);

  const handleScanAgain = () => {
    navigation.navigate("Camera");
  };

  const handleViewDetails = () => {
    if (scanResult) {
      navigation.navigate("FoodDetail", {
        food: scanResult.food,
        confidence: scanResult.confidence,
      });
    }
  };

  const handleDeliveryServicePress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Can't open this URL");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.confidence}>
        {(scanResult?.confidence ?? 0 * 100).toFixed(1)}% Match
      </Text>
    </View>
  );

  if (!scanResult && !tempImageUri) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="camera-outline" size={64} color="#666" />
        <Text style={styles.emptyText}>
          Take a photo of your food to get started
        </Text>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanAgain}>
          <Text style={styles.scanButtonText}>Start Scan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show loading state with captured image
  if (tempImageUri && isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <NutritionSwiper
          food={scanResult?.food}
          animate={showAnimation}
          isLoading={true}
        />
        <FoodImage
          imageUrl=""
          tempImageUri={tempImageUri}
          name="Analyzing..."
          loading={true}
          setLoading={setLoading}
          animate={false}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultContainer}>
        {renderHeader()}

        {(showContent || scanResult) && (
          <>
            <NutritionSwiper
              food={scanResult?.food}
              animate={showAnimation}
              isLoading={isLoading}
            />
            <FoodImage
              imageUrl={scanResult?.food.imageUrl}
              tempImageUri={tempImageUri}
              name={scanResult?.food.name || "Analyzing..."}
              loading={false}
              setLoading={setLoading}
              animate={showAnimation}
            />

            {scanResult && (
              <>
                <DeliveryServices
                  thirdPartyLinks={scanResult.food.thirdPartyLinks}
                  onPress={handleDeliveryServicePress}
                  animate={showAnimation}
                />
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[
                      styles.detailsButton,
                      showAnimation && styles.buttonAnimated,
                    ]}
                    onPress={handleViewDetails}
                  >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.scanButton,
                      showAnimation && styles.buttonAnimated,
                    ]}
                    onPress={handleScanAgain}
                  >
                    <Text style={styles.scanButtonText}>Scan Again</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  resultContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  confidence: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  detailsButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    opacity: 1,
  },
  scanButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    opacity: 1,
  },
  buttonAnimated: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  detailsButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
  },
});
