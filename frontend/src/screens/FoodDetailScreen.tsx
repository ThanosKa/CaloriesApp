// src/screens/FoodDetailScreen.tsx
// src/screens/FoodDetailScreen.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";

import { Food, FoodDetailParams } from "../types/food";
import { RootStackParamList, RootNavigationType } from "../navigation/types";

type FoodDetailScreenRouteProp = RouteProp<RootStackParamList, "FoodDetail">;

export default function FoodDetailScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const route = useRoute<FoodDetailScreenRouteProp>();
  const { food } = route.params;
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSaveFood = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true); // Show modal instead of direct navigation
      return;
    }

    try {
      // Implement save food logic here
      Alert.alert("Success", "Food saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save food");
    }
  };

  const openDeliveryLink = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open delivery link");
    });
  };

  // Rest of your component remains the same...
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: food.imageUrl }} style={styles.mainImage} />

      <View style={styles.header}>
        <Text style={styles.foodName}>{food.name}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveFood}>
          <MaterialIcons name="bookmark-border" size={24} color="#2196F3" />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nutritionCard}>
        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        <Text style={styles.calories}>{food.calories} calories</Text>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{food.macros.protein}g</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{food.macros.carbs}g</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{food.macros.fats}g</Text>
            <Text style={styles.macroLabel}>Fats</Text>
          </View>
        </View>
      </View>

      <View style={styles.similarFoods}>
        <Text style={styles.sectionTitle}>Similar Foods</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {food.similarImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.similarFoodImage}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.deliveryOptions}>
        <Text style={styles.sectionTitle}>Order Online</Text>
        <View style={styles.deliveryButtons}>
          {Object.entries(food.thirdPartyLinks).map(
            ([platform, url]) =>
              url && (
                <TouchableOpacity
                  key={platform}
                  style={styles.deliveryButton}
                  onPress={() => openDeliveryLink(url)}
                >
                  <Text style={styles.deliveryButtonText}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Text>
                </TouchableOpacity>
              )
          )}
        </View>
      </View>

      <Modal
        visible={showAuthModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login Required</Text>
            <Text style={styles.modalText}>
              Please login or register to save this food item.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowAuthModal(false);
                navigation.navigate("Auth");
              }}
            >
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalSecondaryButton]}
              onPress={() => setShowAuthModal(false)}
            >
              <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: "100%",
    height: 250,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButtonText: {
    marginLeft: 4,
    color: "#2196F3",
  },
  nutritionCard: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    margin: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  calories: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 16,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  macroLabel: {
    fontSize: 14,
    color: "#666",
  },
  similarFoods: {
    padding: 16,
  },
  similarFoodImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  deliveryOptions: {
    padding: 16,
  },
  deliveryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  deliveryButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  deliveryButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalText: {
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  modalSecondaryButton: {
    backgroundColor: "#f5f5f5",
  },
  modalSecondaryButtonText: {
    color: "#333",
  },
});
