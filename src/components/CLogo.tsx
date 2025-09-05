import { Text } from '@components/Text';
import { Logo } from './Logo';
import { View } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';

// Combination Logo
export function CLogo() {
  // Retrieve Custom Theme-properties
  const { clogo } = useAppTheme();

  return (
    <View style={clogo} testID='CLogo View'>
      <Text variant='brand'>Wordgrid Quest</Text>
      <Logo width={25.9} height={25.9} styles={{ top: 2, left: 4 }} />
    </View>
  );
}
