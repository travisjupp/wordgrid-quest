import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import * as React from 'react';
import { Text, MD3LightTheme as DefaultTheme, MD3DarkTheme, configureFonts,
  FAB, Menu, Divider, PaperProvider, Button } from 'react-native-paper';

const fontConfig = {
  // fontFamily: 'Abel', // override all variants (only if no variants)
  default: {
    fontSize: 12,
    // fontFamily: 'sans-serif',
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      // ios: 'Default',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: undefined,
    letterSpacing: 0,
    lineHeight: 20,
  },
};
export default function RootLayout() {
  const [isThemeDark, setIsThemeDark] = React.useState(true);
  const theme = isThemeDark ? {
    ...MD3DarkTheme,
    fonts: configureFonts({config: fontConfig}),
    colors: {
      ...MD3DarkTheme.colors,
      // primary: 'tomato',
      // secondary: 'yellow',
    },
  } : {
      ...DefaultTheme,
      fonts: configureFonts({config: fontConfig}),
      colors: {
        ...DefaultTheme.colors,
        // primary: 'tomato',
        // secondary: 'yellow',
      },
    }

  return (
    <PaperProvider theme={theme}>
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
        </Stack>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

