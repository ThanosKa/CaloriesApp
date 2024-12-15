// src/screens/AuthScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationType } from '../navigation/types';

export default function AuthScreen() {
  const navigation = useNavigation<RootNavigationType>();

  // Implement your login/register UI here
  return (
    <View style={styles.container}>
      {/* Auth form components */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
