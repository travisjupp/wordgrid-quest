import Logo from '@components/Logo';
import { Stack, Slot, router, usePathname } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@theme/themeConfig';
import PageHeading from '@components/PageHeading';
import GuidanceText from '@components/GuidanceText';


export default function AuthLayout() { 
  const pathname = usePathname();
  const isLoginPage = pathname === '/signin';

  const { container } = useAppTheme();
  return ( 
    <SafeAreaView style={[container, { justifyContent: 'start' }]}>
      <PageHeading text='Welcome' />
      <Logo width={174.9} height={174.9} />
      <GuidanceText text={isLoginPage ? 'Sign-in to continue' : 'Create an account'} />
      <Slot />
    </SafeAreaView>
  );
};

