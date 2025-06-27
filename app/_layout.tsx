import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Platform, Image} from 'react-native';
import * as React from 'react';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme, configureFonts, PaperProvider} from 'react-native-paper';
import ThemeContext from '@/contexts/ThemeContext';
import * as StatusBar from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as expoFont from 'expo-font';
import Spinner from '@/src/components/Spinner';

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

const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    ...MD3DarkTheme.colors,
    surfaceContainer: 'rgba(33, 31, 38, 1)',
    // primary: 'tomato',
    // secondary: 'yellow',
  },
} 

const lightTheme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    ...DefaultTheme.colors,
    surfaceContainer: 'rgba(243, 237, 247, 1)',
    // primary: 'tomato',
    // secondary: 'yellow',
  },
}

export default function RootLayout() {
  const [browserFontsLoaded, setBrowserFontsLoaded] = React.useState(false);

  // Load Web Fonts
  const [loaded, error] = Platform.OS === 'web'
    ? useFonts(
      {
        'Inter24pt-Black': require('@/fonts/Inter24pt-Black.ttf'),
        'InriaSerif-Regular': require('@/fonts/InriaSerif-Regular.ttf'),
        'material-community': require('@/fonts/material-community.ttf')
      }) : [true, null]; // For iOS/Android, assume fonts loaded

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Keep Splash visible while fonts load (web)
  };

  // Use Font Loading API to check Web Fonts loaded (web)
  // Expo Fonts `useFonts` `loaded` is inaccurate for web
  async function checkBrowserFontsLoaded() {
    const FontFaceSetReady = await document.fonts.ready; 
    const loaded = FontFaceSetReady.status === "loaded";
    console.log('FontFaceSetReady', FontFaceSetReady);
    return loaded
      ? setBrowserFontsLoaded(true) : console.log('FONTS NOT YET LOADED');
  };

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      checkBrowserFontsLoaded();
    }
  }, [checkBrowserFontsLoaded]);


  // console.log('expoFont.getLoadedFonts() =>', expoFont.getLoadedFonts());

  // Check/Store Device Settings
  const deviceThemeIsDark = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = React.useState(deviceThemeIsDark);
  const theme = isDarkTheme ? darkTheme : lightTheme; 

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
  }, [theme]);

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
              headerTitle: () => (
                <Image 
                  source={require('../assets/images/adaptive-icon.png')} 
                  style={{ width: 80, height: 40 }} />
              ),
            }}>
          </Stack>
        </GestureHandlerRootView>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

