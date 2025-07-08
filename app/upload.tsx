import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';

export default function LoadmaterialScreen() {
  // Retrieve Custom Properties
  const {
    container,
  } = useAppTheme();

  return (
    <View style={container}>
      <Text variant="bodyLarge">Load Material `app/upload.tsx`</Text>
    </View>
  );
}

