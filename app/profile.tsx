import * as React from 'react';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  // Retrieve Custom Properties
  const {
    shared: { centeredContainer },
  } = useAppTheme();
  const { itemId } = useLocalSearchParams();

  return (
    <SafeAreaView style={[centeredContainer, { justifyContent: 'flex-start' }]}>
      <ThemeAwareScreenOptions header menu back />
      <Text variant='bodyLarge'>Profile `app/profile.tsx` {itemId}</Text>
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
