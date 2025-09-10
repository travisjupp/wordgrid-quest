import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { CLogo } from '@components/CLogo';
import { Menu } from '@components/Menu';
import { useTheme } from '@hooks/useTheme';

interface Props {
  children?: React.ReactNode;
}
export function ThemeAwareStack({ children }: Props) {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: Platform.select({
          web: {
            borderBottomColor: theme?.colors.outlineVariant,
            backgroundColor: theme?.colors.surfaceContainer,
          },
          default: {
            backgroundColor: theme?.colors.surfaceContainer,
          },
        }),
        headerTintColor: theme?.colors.onSurface,
        // headerRight: () => null,
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerBackButtonDisplayMode: 'minimal',
        headerTitle: () => <CLogo />,
        headerRight: () => <Menu />,
      }}
    >
      {children}
    </Stack>
  );
}
