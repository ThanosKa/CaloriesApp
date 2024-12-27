// components/DeliveryServices/DeliveryServices.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
interface DeliveryServicesProps {
  thirdPartyLinks: {
    uberEats?: string;
    deliveroo?: string;
  };
  onPress: (url: string) => void;
}

export const DeliveryServices: React.FC<DeliveryServicesProps> = ({
  thirdPartyLinks,
  onPress,
}) => (
  <View style={styles.thirdPartyContainer}>
    <Text style={styles.sectionTitle}>Order Now</Text>
    <View style={styles.deliveryServices}>
      {thirdPartyLinks.uberEats && (
        <TouchableOpacity
          style={styles.deliveryButton}
          onPress={() => onPress(thirdPartyLinks.uberEats!)}
        >
          <Image
            source={require("../../../assets/uber-eats-logo.png")}
            style={styles.deliveryLogo}
          />
          <Text style={styles.deliveryText}>Uber Eats</Text>
        </TouchableOpacity>
      )}
      {thirdPartyLinks.deliveroo && (
        <TouchableOpacity
          style={styles.deliveryButton}
          onPress={() => onPress(thirdPartyLinks.deliveroo!)}
        >
          <Image
            source={require("../../../assets/deliveroo-logo.png")}
            style={styles.deliveryLogo}
          />
          <Text style={styles.deliveryText}>Deliveroo</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  thirdPartyContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  deliveryServices: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deliveryButton: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    width: (width - 48) / 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deliveryLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default DeliveryServices;
