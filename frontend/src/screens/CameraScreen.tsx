import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import CameraComponent from '../components/CameraComponent';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationType } from '../navigation/types';
import { scanService } from '../services/scanService';

// Add this type for the image
type ImageData = {
  uri: string;
  type: string;
  name: string;
};

export default function CameraScreen() {
  const navigation = useNavigation<RootNavigationType>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = async (uri: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Handle the image data properly based on platform
      const imageData: ImageData = {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        type: 'image/jpeg',
        name: 'food.jpg',
      };

      // Append as any to bypass TypeScript checking for FormData
      formData.append('image', imageData as any);

      const response = await scanService.scanFood(formData);
      navigation.navigate('Scan', { scanResult: response.data });
    } catch (error) {
      console.error('Scan error:', error);
      navigation.navigate('Scan', { error: 'Failed to scan food' });
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
