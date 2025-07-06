import { Text } from '@components/Text';
import Logo from './Logo';
import { View } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';

// Combination Logo
const CLogo = () => {
  // Retrieve Custom Theme-properties
  const { clogo } = useAppTheme();

  return (
    <View style={clogo}>
      <Text variant="brandMobile">
        Wordgrid Quest
      </Text>
      <Logo width={25.9} height={25.9} />
    </View>
  )
}

export default CLogo;
