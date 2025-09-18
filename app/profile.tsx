import * as React from 'react';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  // Retrieve Custom Properties
  const { container } = useAppTheme();

  return (
    <SafeAreaView style={[container, { justifyContent: 'start' }]}>
      <ThemeAwareScreenOptions header menu back />
      <Text variant='bodyLarge'>Profile `app/profile.tsx`</Text>
      <Button
        onPress={() => {
          router.navigate('/upload');
        }}
      >
        Upload
      </Button>
    </SafeAreaView>
  );
}
