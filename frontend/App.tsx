import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { validateEnv } from './src/utils/validateEnv';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  useEffect(() => {
    if (__DEV__) {
      validateEnv();
    }
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthProvider>
  );
}
