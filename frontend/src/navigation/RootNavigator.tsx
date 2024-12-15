import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabs } from './MainTabs';
import ScanResultScreen from '../screens/ScanResultScreen';
import AuthScreen from '../screens/AuthScreen';

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
        name="ScanResult" 
        component={ScanResultScreen}
        options={{ title: 'Scan Result' }}
      />
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen}
        options={{ title: 'Login / Register' }}
      />
    </Stack.Navigator>
  );
}
