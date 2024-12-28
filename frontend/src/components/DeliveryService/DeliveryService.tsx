// components/DeliveryServices/DeliveryServices.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

interface DeliveryServicesProps {
  thirdPartyLinks: {
    uberEats?: string;
    deliveroo?: string;
  };
  onPress: (url: string) => void;
  animate?: boolean;
}

export const DeliveryServices: React.FC<DeliveryServicesProps> = ({
  thirdPartyLinks,
  onPress,
  animate = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 15,
          stiffness: 100,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(1);
      fadeAnim.setValue(1);
    }
  }, [animate]);

  const DeliveryButton = ({
    logo,
    text,
    onPress,
  }: {
    logo: any;
    text: string;
    onPress: () => void;
  }) => (
    <Animated.View
      style={[
        styles.deliveryButtonContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.deliveryButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image source={logo} style={styles.deliveryLogo} />
        <Text style={styles.deliveryText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Animated.View
      style={[
        styles.thirdPartyContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.sectionTitle}>Order Now</Text>
      <View style={styles.deliveryServices}>
        {thirdPartyLinks.uberEats && (
          <DeliveryButton
            logo={require("../../../assets/uber-eats-logo.png")}
            text="Uber Eats"
            onPress={() => onPress(thirdPartyLinks.uberEats!)}
          />
        )}
        {thirdPartyLinks.deliveroo && (
          <DeliveryButton
            logo={require("../../../assets/deliveroo-logo.png")}
            text="Deliveroo"
            onPress={() => onPress(thirdPartyLinks.deliveroo!)}
          />
        )}
      </View>
    </Animated.View>
  );
};

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
  deliveryButtonContainer: {
    width: (width - 48) / 2,
  },
  deliveryButton: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
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
