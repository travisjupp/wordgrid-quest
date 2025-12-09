import ThemeContext from '@contexts/ThemeContext';
import { themeBuilder } from '@theme/themeConfig';
import React, { useState, useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';
import * as StatusBar from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { AppTheme } from '@custom-types/AppTheme';

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  // Check/Store Device Settings Dark/Light mode state
  const deviceThemeIsDark = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(deviceThemeIsDark);
  const toggleTheme = () => setIsDarkTheme(prevThemeMode => !prevThemeMode);

  // Respond to Device Settings Dark/Light mode state
  useEffect(() => {
    setIsDarkTheme(deviceThemeIsDark);
  }, [setIsDarkTheme, deviceThemeIsDark]);
  const theme: AppTheme = themeBuilder(isDarkTheme);

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

  return (
    <ThemeContext value={{ isDarkTheme, toggleTheme, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext>
  );
}
