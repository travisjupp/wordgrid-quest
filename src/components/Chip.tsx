import { Icon, Chip as RNPChip } from 'react-native-paper';
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
      customMaterialScreens: {
        loaditems: { customChip },
      },
    },
  } = useAppTheme();

  return (
    <RNPChip
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      mode='outlined'
      onPress={onPress}
      theme={{ roundness: 2 }}
      onClose={onPress}
      closeIcon={() => (
        /* Display our "edit" icon on the right */
        <Icon source='pencil-outline' size={18} color={outline} />
      )}
      closeIconAccessibilityLabel='Edit Category'
      style={customChip.surface}
      textStyle={customChip.text}
      ellipsizeMode='tail'
    >
      {content}
    </RNPChip>
  );
}
