import { withLayoutContext } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { CLogo } from '@components/CLogo';
import { Menu } from '@components/Menu';
import { useTheme } from '@hooks/useTheme';
import { createStackNavigator } from '@react-navigation/stack';

interface Props {
  header?: boolean | undefined;
  menu?: boolean | undefined;
  back?: boolean | undefined;
}

export function ThemeAwareScreenOptions({ header, menu, back }: Props) {
  const { theme } = useTheme();

  const AnimatedStack = withLayoutContext(createStackNavigator().Navigator);
  return (
    <AnimatedStack.Screen
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
        headerLeft: back ? undefined : () => <View />,
        headerBackButtonDisplayMode: 'minimal',
        headerTitle: (props: any) => {
          props.back = back ?? false; /* Pass 'back' as prop */
          return <CLogo {...props} />;
        },
        headerRight: (props: any) => (menu ? <Menu {...props} /> : null),
      }}
    />
  );
}
