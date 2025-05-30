import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      // if you want to define screen options, you can add a Stack.Screen
      // component inside the Stack component
    </Stack>
    </GestureHandlerRootView>
  );
}

