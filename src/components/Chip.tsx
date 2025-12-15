import { View } from 'react-native';
import { Icon, Chip as RNPChip } from 'react-native-paper';
import { Text } from '@components/Text';
import { useAppTheme } from '@theme/themeConfig';

interface Props {
  onPress: () => void;
  content: string;
}

export default function Chip({ onPress, content }: Props) {
  // Retrieve Custom Theme-properties
  const {
    colors: { outline },
    preGameConfig: {
      layout: { customChipContentContainer },
    },
  } = useAppTheme();

  return (
    <RNPChip
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      mode='outlined'
      onPress={onPress}
      theme={{ roundness: 2 }}
      style={{
        alignSelf: 'center',
      }}
    >
      <View style={customChipContentContainer}>
        <Text variant='chip' style={{ marginInlineEnd: 6 }}>
          {content}
        </Text>
        <Icon source='pencil-outline' size={18} color={outline} />
      </View>
    </RNPChip>
  );
}
