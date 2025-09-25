import { Logo } from '@components/Logo';
import { Slot, usePathname } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { PageHeading } from '@components/PageHeading';
import { GuidanceText } from '@components/GuidanceText';
import LogoContext from '@contexts/LogoContext';
import { useState } from 'react';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { useTheme } from '@hooks/useTheme';

export default function AuthLayout() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const DEFAULT_LOGO_SIZE = 174.9;
  const [logoVisible, setLogoVisible] = useState<boolean>(true);
  const [logoSize, setLogoSize] = useState<number | undefined>(DEFAULT_LOGO_SIZE);

  const toggleLogo = () => setLogoVisible(!logoVisible);
  const scaleLogo = (size?: number | undefined) => {
    setLogoSize(size ?? DEFAULT_LOGO_SIZE);
  };

  const { container } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <Surface
      mode='flat'
      style={{
        backgroundColor: theme?.colors.background,
        flex: 1,
      }}
    >
      <ThemeAwareScreenOptions header={false} />
      <KeyboardAvoidingView
        behavior='height'
        style={[container, { 
          marginTop: insets.top,
          borderColor: 'orange',
          borderWidth: 1,
        }]}
        testID='Modal Content Wrapper'
      >
      <View
        style={{
          alignItems: 'center',
          borderColor: 'green',
          borderStyle: 'dashed',
          borderWidth: 4,
          height: 350,
          // minHeight: 'auto',
          }}
        >
        <LogoContext value={{ toggleLogo, scaleLogo }}>
          <PageHeading text='Welcome' />
          <Logo width={logoSize} height={logoSize} gradient={true} />
          <GuidanceText
            text={isLoginPage ? 'Sign-in to continue' : 'Create an account'}
          />
          <Slot />
        </LogoContext>
        </View>
      </KeyboardAvoidingView>
    </Surface>
  );
}
