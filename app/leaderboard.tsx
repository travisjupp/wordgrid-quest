import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';

export default function LeaderboardScreen() {
  // Retrieve Custom Properties
  const { container } = useAppTheme();

  return (
      <View style={container}>
      <ThemeAwareScreenOptions header menu back />
        <Text variant='bodyLarge'>Leaderboard `app/leaderboard.tsx`</Text>
      </View>
  );
}
