import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { store } from '@store/index';
import { Provider } from 'react-redux';
import { themeBuilder } from '@theme/themeConfig';
import { Spinner } from '@components/Spinner';
import { ThemeProvider } from '@providers/ThemeProvider';
import { Stack } from 'expo-router';
import { OverlayProvider } from '@providers/OverlayProvider';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

export default function RootLayout() {
  // Check/Store Device Settings Dark/Light mode state
  const isDarkTheme = useColorScheme() === 'dark';
  const theme = themeBuilder(isDarkTheme);
  const [browserFontsLoaded, setBrowserFontsLoaded] = useState(false);

  // Load Web Fonts
  const [loaded, error] = useFonts({
    'Inter24pt-Black': require('@fonts/Inter24pt-Black.ttf'),
    'InriaSerif-Regular': require('@fonts/InriaSerif-Regular.ttf'),
    'InriaSerif-BoldItalic': require('@fonts/InriaSerif-BoldItalic.ttf'),
    'material-community': require('@fonts/material-community.ttf'),
    'Abel-Regular': require('@fonts/Abel-Regular.ttf'),
  }); // For iOS/Android, assume fonts loaded

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    // Use Font Loading API to check Web Fonts loaded (web)
    // Expo Fonts `useFonts` `loaded` is inaccurate for web
    async function checkBrowserFontsLoaded() {
      const FontFaceSetReady = await document.fonts.ready;
      const loaded = FontFaceSetReady.status === 'loaded';
      // console.log('FontFaceSetReady', FontFaceSetReady);
      return loaded ?
          setBrowserFontsLoaded(true)
        : console.log('FONTS NOT YET LOADED');
    }
    if (Platform.OS === 'web') {
      checkBrowserFontsLoaded();
    }
  }, []);

  if (!loaded && !error) {
    return null; // Keep Splash visible while fonts load (web)
  }

  // Show Spinner until Web Fonts/Icons loaded (web)
  if (!browserFontsLoaded && Platform.OS === 'web') {
    return <Spinner theme={theme} />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider>
            <Stack />
          </OverlayProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
