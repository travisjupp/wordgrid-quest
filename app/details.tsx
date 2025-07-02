import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import ThemeContext from '@/contexts/ThemeContext';
import { useAppTheme } from '@/app/_layout';

export default function DetailsScreen() {
  const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);
  // Retrieve Custom Properties
  const {
    container,
    text,
    link,
    // colors: { brandPrimary },
  } = useAppTheme();

  return (
    <View style={container}>
      <Text variant="bodyLarge">Details `app/details.tsx`</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgb(19 37 64)',
//   },
// });

