import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';

export default function LoadmaterialScreen() {
  // Retrieve Custom Properties
  const {
    shared: { centeredContainer },
  } = useAppTheme();

  return (
    <View style={centeredContainer}>
      <ThemeAwareScreenOptions header menu back />
      <Text variant='bodyLarge'>Load Material `app/upload.tsx`</Text>
    </View>
  );
}
