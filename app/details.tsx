import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/themeConfig';

export default function DetailsScreen() {
  // Retrieve Custom Properties
  const {
    container,
  } = useAppTheme();

  return (
    <View style={container}>
      <Text variant="bodyLarge">Details `app/details.tsx`</Text>
    </View>
  );
}

