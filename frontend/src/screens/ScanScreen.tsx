import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  Alert,
  Dimensions,
  Linking,
  ActivityIndicator 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootNavigationType, ScanScreenRouteProp } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('window');

interface MacroCircleProps {
  percentage: number;
  macro: string;
  value: number;
  color: string;
  gradientColors: [string, string]; // Define as tuple type
}

const MacroCircle: React.FC<MacroCircleProps> = ({ 
  percentage, 
  macro, 
  value, 
  color, 
  gradientColors 
}) => (
  <View style={styles.macroCircleContainer}>
    <LinearGradient
      colors={gradientColors}
      style={styles.macroCircle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.macroPercentage}>{percentage}%</Text>
      <Text style={styles.macroValue}>{value}g</Text>
    </LinearGradient>
    <Text style={styles.macroLabel}>{macro}</Text>
  </View>
);

export default function ScanScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const route = useRoute<ScanScreenRouteProp>();
  const scanResult = route.params?.scanResult;
  const error = route.params?.error;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleScanAgain = () => {
    navigation.navigate('Camera');
  };

  const handleViewDetails = () => {
    if (scanResult) {
      navigation.navigate('FoodDetail', {
        food: scanResult.food,
        confidence: scanResult.confidence
      });
    }
  };

  const handleDeliveryServicePress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', "Can't open this URL");
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const renderNutritionalInfo = () => (
    <View style={styles.nutritionalContainer}>
      <Text style={styles.sectionTitle}>Nutritional Information</Text>
      <View style={styles.nutritionalGrid}>
        <View style={styles.nutritionalItem}>
          <Text style={styles.nutritionalValue}>{scanResult?.food.calories}</Text>
          <Text style={styles.nutritionalLabel}>Calories</Text>
        </View>
        <View style={styles.nutritionalItem}>
          <Text style={styles.nutritionalValue}>
            {scanResult?.food.servingSize || '100g'}
          </Text>
          <Text style={styles.nutritionalLabel}>Serving Size</Text>
        </View>
      </View>
    </View>
  );
  console.log('Image URL:', scanResult?.food?.imageUrl);

  return (
    <ScrollView style={styles.container}>
      {scanResult ? (
        <View style={styles.resultContainer}>
          {/* Header */}
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

          {/* Macro Circles */}
          <View style={styles.macrosRow}>
            <MacroCircle 
              percentage={scanResult.food.macroPercentages.protein}
              macro="Protein"
              value={scanResult.food.macros.protein}
              color="#FF6B6B"
              gradientColors={['#FF6B6B', '#FF8E8E']}
            />
            <MacroCircle 
              percentage={scanResult.food.macroPercentages.carbs}
              macro="Carbs"
              value={scanResult.food.macros.carbs}
              color="#4ECDC4"
              gradientColors={['#4ECDC4', '#6EE7E1']}
            />
            <MacroCircle 
              percentage={scanResult.food.macroPercentages.fats}
              macro="Fats"
              value={scanResult.food.macros.fats}
              color="#FFE66D"
              gradientColors={['#FFE66D', '#FFF3A3']}
            />
          </View>
          

          {/* Main Food Image */}
          {/* <SharedElement id={`food.${scanResult.food._id}.image`}> */}
            <View style={styles.mainImageContainer}>
              <Image 
                source={{
                  uri: `${scanResult.food.imageUrl}`,
                }}
                style={styles.mainFoodImage}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
              {loading && (
                <ActivityIndicator 
                  style={styles.loader}
                  size="large"
                  color="#007AFF"
                />
              )}
              <Text style={styles.foodName}>{scanResult.food.name}</Text>
            </View>
          {/* </SharedElement> */}

          {/* Nutritional Information */}
          {renderNutritionalInfo()}

          {/* Similar Foods */}
          {scanResult.food.similarImages && (
            <View style={styles.similarContainer}>
              <Text style={styles.sectionTitle}>Similar Foods</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {scanResult.food.similarImages.map((image, index) => (
                  <Image 
                    key={index}
                    source={{ uri: image }}
                    style={styles.similarImage}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Third Party Links */}
          <View style={styles.thirdPartyContainer}>
            <Text style={styles.sectionTitle}>Order Now</Text>
            <View style={styles.deliveryServices}>
              {scanResult.food.thirdPartyLinks.uberEats && (
                <TouchableOpacity 
                  style={styles.deliveryButton}
                  onPress={() => handleDeliveryServicePress(
                    scanResult.food.thirdPartyLinks.uberEats
                  )}
                >
                  <Image 
                    source={require('../../assets/uber-eats-logo.png')} 
                    style={styles.deliveryLogo}
                  />
                  <Text style={styles.deliveryText}>Uber Eats</Text>
                </TouchableOpacity>
              )}
              {scanResult.food.thirdPartyLinks.deliveroo && (
                <TouchableOpacity 
                  style={styles.deliveryButton}
                  onPress={() => handleDeliveryServicePress(
                    scanResult.food.thirdPartyLinks.deliveroo
                  )}
                >
                  <Image 
                    source={require('../../assets/deliveroo-logo.png')} 
                    style={styles.deliveryLogo}
                  />
                  <Text style={styles.deliveryText}>Deliveroo</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Action Buttons */}
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
          <TouchableOpacity 
            style={styles.scanButton} 
            onPress={handleScanAgain}
          >
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  confidence: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  macroCircleContainer: {
    alignItems: 'center',
  },
  macroCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  macroPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  macroValue: {
    fontSize: 16,
    color: '#fff',
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  mainImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  mainFoodImage: {
    width: width - 32,
    height: width - 32,
    borderRadius: 16,
    marginBottom: 16,
    // backgroundColor:"red",
    resizeMode: 'cover', // Add this
  },
  
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  foodName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nutritionalContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginVertical: 16,
  },
  nutritionalGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  nutritionalItem: {
    alignItems: 'center',
  },
  nutritionalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  nutritionalLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  similarContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  similarImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  thirdPartyContainer: {
    padding: 16,
  },
  deliveryServices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deliveryButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    width: (width - 48) / 2,
    elevation: 2,
    shadowColor: '#000',
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
    color: '#333',
    fontWeight: '500',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  detailsButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  detailsButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 16,
  },
});
