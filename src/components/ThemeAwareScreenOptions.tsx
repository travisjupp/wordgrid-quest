import { Platform, View } from 'react-native';
import { CLogo } from '@components/CLogo';
import { Menu } from '@components/Menu';
import { useTheme } from '@hooks/useTheme';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import CustomHeader from './CustomHeader';

interface Props {
  header?: boolean | undefined;
  menu?: boolean | undefined;
  back?: boolean | undefined;
  title?: string | undefined;
}

export function ThemeAwareScreenOptions({ header = true, menu = false, back, title }: Props) {
  const navigation = useNavigation(); /* Access current screens navigator */
  const { theme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: header,
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
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerBackVisible: back ? true : false,
      headerLeft: back ? undefined : () => <View />,
      headerBackButtonDisplayMode: 'minimal',
      headerTitle: (props: any) => {
        props.back = back ?? false; /* Pass 'back' as prop */
        props.title = title ?? false; /* Pass 'title' as prop */
        return <CLogo {...props} />;
      },
      headerRight: (props: any) => (menu ? <Menu {...props} /> : null),
    });
  }, [navigation, header, menu, back, title, theme]);

  return null; /* Renders no UI */
}
