import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import * as StatusBar from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { store } from '@store/index';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import ThemeContext from '@contexts/ThemeContext';
import { themeBuilder } from '@theme/themeConfig';
import { Spinner } from '@components/Spinner';
import { CLogo } from '@components/CLogo';
import { Menu } from '@components/Menu';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

export default function RootLayout() {
  // Check/Store Device Settings Dark/Light mode state
  const deviceThemeIsDark = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = useState(deviceThemeIsDark);
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

  // Respond to Device Settings Dark/Light mode state
  useEffect(() => {
    setIsDarkTheme(deviceThemeIsDark);
  }, [setIsDarkTheme, deviceThemeIsDark]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  // Set Status Bar style on theme change
  useEffect(() => {
    StatusBar.setStatusBarStyle(isDarkTheme ? 'light' : 'dark', true);
    if (Platform.OS === 'android') {
      StatusBar.setStatusBarBackgroundColor(
        theme.colors.surfaceContainer,
        true,
      );
    }
    return () => {
      StatusBar.setStatusBarStyle('auto');
    };
  }, [isDarkTheme, theme]);

  if (!loaded && !error) {
    return null; // Keep Splash visible while fonts load (web)
  }

  // Show Spinner until Web Fonts/Icons loaded (web)
  if (!browserFontsLoaded && Platform.OS === 'web') {
    return <Spinner theme={theme} />;
  }

  return (
    <Provider store={store}>
      <ThemeContext value={{ isDarkTheme, toggleTheme }}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerStyle: Platform.select({
                  web: {
                    borderBottomColor: theme.colors.outlineVariant,
                    backgroundColor: theme.colors.surfaceContainer,
                  },
                  ios: {
                    backgroundColor: theme.colors.surfaceContainer,
                  },
                  android: {
                    backgroundColor: theme.colors.surfaceContainer,
                  },
                  default: {
                    backgroundColor: theme.colors.surfaceContainer,
                  }}),
                headerTintColor: theme.colors.onSurface,
                headerShown: true,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerBackButtonDisplayMode: 'minimal',
                headerTitle: () => <CLogo />,
                headerRight: () => <Menu />,
              }}
            ></Stack>
          </GestureHandlerRootView>
        </PaperProvider>
      </ThemeContext>
    </Provider>
  );
}
