import { Text } from '@/components/Text';
import Logo from './Logo';
import { View, Platform } from 'react-native';
import { useAppTheme } from '@/theme/themeConfig';

const CLogo = () => {
  // Retrieve Custom Theme-properties
  const { clogo, clogoweb } = useAppTheme();
  return (
    <View style={Platform.OS === 'web' ? clogoweb : clogo}>
      <Text variant="brandMobile">
        Wordgrid Quest
      </Text>
      <Logo width={25.9} height={25.9} />
    </View>

  )
}

export default CLogo;
