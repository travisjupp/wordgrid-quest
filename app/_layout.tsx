import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Platform, StyleSheet} from 'react-native';
import * as React from 'react';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme, configureFonts, PaperProvider, useTheme } from 'react-native-paper';
import ThemeContext from '@/contexts/ThemeContext';
import * as StatusBar from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Spinner from '@/src/components/Spinner';
import { AppTheme } from '@/types/AppTheme';
import CLogo from '@/src/components/CLogo';

SplashScreen.preventAutoHideAsync();

const fontConfig = {
  brandMobile: {
    fontSize: 30,
    fontFamily: 'InriaSerif-Regular',
  },
  letterTileMobile: {
    fontSize: 38,
    fontFamily: 'Inter24pt-Black',
  },
  // fontFamily: 'Inter24pt-Black', // override all variants (only if no variants)
  // override property for existing variant
  bodyLarge: {
    fontFamily: 'Inter24pt-Black',
  },
  // If any component uses Paper's Text component, without 
  // specified variant, then *default* variant is applied
  default: {
    fontSize: 12,
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: undefined,
    letterSpacing: 0,
    lineHeight: 20,
  },
};
// console.log('MD3DarkTheme', MD3DarkTheme);

// Build theme-variant-based theme object
const themeBuilder = (isDarkTheme: boolean) => {
  const themeVariant = isDarkTheme ? MD3DarkTheme : DefaultTheme;
  const customProperties =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeVariant.colors.surface,
    },
    text: {
      color: themeVariant.colors.onSurface,
      fontFamily: 'Inter24pt-Black',
      // fontSize: 45
    },
    link: {
      color: themeVariant.colors.onSurface,
      fontWeight: 'bold',
      fontSize: 26
    },
    logo: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'red',
      borderStyle: 'solid',
    },
  });
  return {
    ...themeVariant,
    container: customProperties.container,
    text: customProperties.text,
    link: customProperties.link,
    logo: customProperties.logo,
    fonts: configureFonts({config: fontConfig}),
    colors: {
      ...themeVariant.colors,
      // Custom color properties
      surfaceContainer: isDarkTheme ? 'rgba(33, 31, 38, 1)' : 'rgba(243, 237, 247, 1)',
    },
  }
};
// console.log('customProperties', customProperties);
// console.log('MD3DarkTheme', themeBuilder(true));
// console.log('MD3DarkTheme', themeBuilder(false));
// Sub-components can access Custom Theme-properties
// const themeType = themeBuilder(true);
// console.log('themeType', typeof themeType);
// export type appTheme = typeof themeType;
export const useAppTheme = () => useTheme<AppTheme>();

export default function RootLayout() {
  const [browserFontsLoaded, setBrowserFontsLoaded] = React.useState(false);

  // Load Web Fonts
  const [loaded, error] = useFonts({
    'Inter24pt-Black': require('@/fonts/Inter24pt-Black.ttf'),
    'InriaSerif-Regular': require('@/fonts/InriaSerif-Regular.ttf'),
    'material-community': require('@/fonts/material-community.ttf')
  }); // For iOS/Android, assume fonts loaded

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  React.useEffect(() => {
    // Use Font Loading API to check Web Fonts loaded (web)
    // Expo Fonts `useFonts` `loaded` is inaccurate for web
    async function checkBrowserFontsLoaded() {
      const FontFaceSetReady = await document.fonts.ready; 
      const loaded = FontFaceSetReady.status === "loaded";
      console.log('FontFaceSetReady', FontFaceSetReady);
      return loaded
        ? setBrowserFontsLoaded(true) : console.log('FONTS NOT YET LOADED');
    };
    if (Platform.OS === 'web') {
      checkBrowserFontsLoaded();
    }
  }, []);

  // Check/Store Device Settings
  const deviceThemeIsDark = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = React.useState(deviceThemeIsDark);
  const theme = themeBuilder(isDarkTheme); 

  // Respond to Device Settings
  React.useEffect(() => {
    setIsDarkTheme(deviceThemeIsDark);
  }, [setIsDarkTheme, deviceThemeIsDark]);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  // Set Status Bar style on theme change
  React.useEffect(() => {
    StatusBar.setStatusBarStyle(isDarkTheme ? 'light' : 'dark', true);
    if (Platform.OS === "android") {
      StatusBar
        .setStatusBarBackgroundColor(theme.colors.surfaceContainer, true);
    };
    return () => {
      StatusBar.setStatusBarStyle('auto');
    };
  }, [isDarkTheme, theme]);

  if (!loaded && !error) {
    return null; // Keep Splash visible while fonts load (web)
  };

  // Show Spinner until Web Fonts/Icons loaded (web)
  if (!browserFontsLoaded && Platform.OS === 'web') {
    return <Spinner theme={theme} />
  }

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.surfaceContainer,
              },
              headerTintColor: theme.colors.onSurface,
              headerShown: true, 
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              headerTitle: () => (<CLogo/>),
            }}>
          </Stack>
        </GestureHandlerRootView>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

