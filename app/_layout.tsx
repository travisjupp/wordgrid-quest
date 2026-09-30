import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Platform } from 'react-native';
import { useState, useEffect, StrictMode } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { store } from '@store/index';
import { Provider } from 'react-redux';
import { themeBuilder } from '@theme/themeConfig';
import { Spinner } from '@components/Spinner';
import { ThemeProvider } from '@providers/ThemeProvider';
import { OverlayProvider } from '@providers/OverlayProvider';
import { StackNavigationOptions } from '@react-navigation/stack';
import { JsStack } from '@layouts/js-stack';
import { LogoProvider } from '@providers/LogoProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { router, useSegments } from 'expo-router';

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
      return loaded ?
          setBrowserFontsLoaded(true)
        : console.log('FONTS NOT YET LOADED');
    }
    if (Platform.OS === 'web') {
      checkBrowserFontsLoaded();
    }
  }, []);

  // Route users depending on authentication status
  const auth = getAuth();
  const segments = useSegments();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      const isAtLoginOrSignup = segments[1] === '(userAuth)';
      const isAtBlankEntryPath = !segments[0];

      if (user) {
        // ONLY redirect if they are at login/signup or /
        if (isAtLoginOrSignup || isAtBlankEntryPath) {
          router.replace('/loadcat');
        }
      } else {
        // Kick unauthenticated users back to login/
        if (!isAtLoginOrSignup) {
          router.replace('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [auth, segments]);

  if (!loaded && !error) {
    return null; // Keep Splash visible while fonts load (web)
  }

  // Show Spinner until Web Fonts/Icons loaded (web)
  if (!browserFontsLoaded && Platform.OS === 'web') {
    return <Spinner theme={theme} />;
  }

  const screenOptions: StackNavigationOptions = {
    animation: 'slide_from_right',
    // header: props => <CustomHeader {...props} />,
    headerMode: 'float',
    headerShown: false,
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <OverlayProvider>
                <LogoProvider>
                  <StrictMode>
                    <JsStack screenOptions={screenOptions} />
                  </StrictMode>
                </LogoProvider>
              </OverlayProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
