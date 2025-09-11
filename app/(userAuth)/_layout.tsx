import { Logo } from '@components/Logo';
import { Slot, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@theme/themeConfig';
import { PageHeading } from '@components/PageHeading';
import { GuidanceText } from '@components/GuidanceText';
import LogoContext from '@contexts/LogoContext';
import { useState } from 'react';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';

export default function AuthLayout() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const defaultLogoSize = 174.9;
  const [logoVisible, setLogoVisible] = useState<boolean>(true);
  const [logoSize, setLogoSize] = useState<number | undefined>(defaultLogoSize);

  const toggleLogo = () => setLogoVisible(!logoVisible);
  const scaleLogo = (size?: number | undefined) => {
    setLogoSize(size ?? defaultLogoSize);
  };

  const { container } = useAppTheme();
  return (
    <SafeAreaView style={[container, { justifyContent: 'start' }]}>
    <ThemeAwareScreenOptions header menu />
      <LogoContext value={{ toggleLogo, scaleLogo }}>
        <PageHeading text='Welcome' />
        <Logo width={logoSize} height={logoSize} gradient={true} />
        <GuidanceText
          text={isLoginPage ? 'Sign-in to continue' : 'Create an account'}
        />
        <Slot />
      </LogoContext>
    </SafeAreaView>
  );
}
