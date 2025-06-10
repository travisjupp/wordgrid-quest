import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Platform, Image } from 'react-native';
import * as React from 'react';
import { useTheme, Text, MD3LightTheme as DefaultTheme, MD3DarkTheme, configureFonts, FAB, Menu, Divider, Switch, PaperProvider, Button } from 'react-native-paper';
import ThemeContext from '../src/contexts/ThemeContext';
import * as StatusBar from 'expo-status-bar';

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
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };
  const theme = isDarkTheme ? darkTheme : lightTheme; 
  React.useEffect(() => {
    StatusBar.setStatusBarStyle(isDarkTheme ? 'light' : 'dark');
    if (Platform.OS === "android") {
      StatusBar.setStatusBarBackgroundColor(theme.colors.surfaceContainer, true);
    }
    return () => {
      StatusBar.setStatusBarStyle('auto');
    };
  }, [theme]);
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
              headerTitle: (props) => (
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

