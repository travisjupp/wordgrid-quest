import { Stack } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { CLogo } from '@components/CLogo';
import { Menu } from '@components/Menu';
import { useTheme } from '@hooks/useTheme';
import { Logo } from './Logo';

interface Props {
  header?: boolean | undefined;
  menu?: boolean | undefined;
  back?: boolean | undefined;
}

export function ThemeAwareScreenOptions({header, menu, back}: Props) {
  const { theme } = useTheme();

  return (
    <Stack.Screen
      options={{
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
        headerShown: header ? true : false,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerBackVisible: back ? true : false,
        headerLeft: back ? undefined : () => <View></View>,
        headerBackButtonDisplayMode: 'minimal',
        headerTitle: () => <CLogo />,
        headerRight: () => menu ? <Menu /> : null,
      }}
    />
  );
}
