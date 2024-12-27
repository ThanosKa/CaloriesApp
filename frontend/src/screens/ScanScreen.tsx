// screens/ScanScreen.tsx
import React from "react";
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

const { width } = Dimensions.get("window");

export default function ScanScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const route = useRoute<ScanScreenRouteProp>();
  const scanResult = route.params?.scanResult;
  const error = route.params?.error;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

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

  return (
    <ScrollView style={styles.container}>
      {scanResult ? (
        <View style={styles.resultContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.confidence}>
              {(scanResult.confidence * 100).toFixed(1)}% Match
            </Text>
          </View>

          <MacroCircles food={scanResult.food} />

          <FoodImage
            imageUrl={scanResult.food.imageUrl}
            name={scanResult.food.name}
            loading={loading}
            setLoading={setLoading}
          />

          <NutritionalInfo food={scanResult.food} />

          <DeliveryServices
            thirdPartyLinks={scanResult.food.thirdPartyLinks}
            onPress={handleDeliveryServicePress}
          />

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={handleViewDetails}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleScanAgain}
            >
              <Text style={styles.scanButtonText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="camera-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>
            Take a photo of your food to get started
          </Text>
          <TouchableOpacity style={styles.scanButton} onPress={handleScanAgain}>
            <Text style={styles.scanButtonText}>Start Scan</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  detailsButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  scanButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
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
