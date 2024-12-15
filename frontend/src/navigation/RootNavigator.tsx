import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabs } from './MainTabs';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import AuthScreen from '../screens/AuthScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Camera"
        component={CameraScreen}
        options={{ 
          headerShown: false, // This will hide the header for the camera screen
        }}
      />
      <Stack.Screen 
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{ title: 'Food Details' }}
      />
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen}
        options={{ title: 'Login / Register' }}
      />
    </Stack.Navigator>
  );
}
