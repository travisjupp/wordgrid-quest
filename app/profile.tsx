import * as React from 'react';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import Animated, { SlideInRight } from 'react-native-reanimated'; // Use SlideInRight or other entering animations
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';

export default function ProfileScreen() {
  // Retrieve Custom Properties
  const { container } = useAppTheme();

  return (
    <Animated.View
      entering={SlideInRight}
      style={container}
      testID='Animated.View'
    >
    <ThemeAwareScreenOptions header menu back />
      <Text variant='bodyLarge'>Profile `app/profile.tsx`</Text>
    </Animated.View>
  );
}
