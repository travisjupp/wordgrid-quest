import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export function LoadItem() {
  // Retrieve Custom Theme-properties
  const {
    colors,
    colors: { outline, onSecondaryContainer },
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  const { hideBottomSheet } = useBottomSheetCustom();

  return (
    <View style={sharedInputWrapper}>
      <BottomSheetTextInput
        placeholderTextColor={onSecondaryContainer}
        style={{
          backgroundColor: colors.secondaryContainer,
          color: onSecondaryContainer,
          height: 54,
          padding: 12,
          borderColor: outline,
          borderWidth: 1.5,
          borderRadius: 4,
          marginInline: 12,
        }}
        placeholder='Word, e.g., Platypus'
      />
      <BottomSheetTextInput
        multiline={true}
        placeholderTextColor={onSecondaryContainer}
        style={{
          backgroundColor: colors.secondaryContainer,
          color: onSecondaryContainer,
          height: 64,
          padding: 12,
          borderColor: outline,
          borderWidth: 1.5,
          borderRadius: 4,
          marginInline: 12,
        }}
        placeholder='Definition, e.g., Semiaquatic, egg-laying mammal endemic to eastern Australia.'
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <Button onPress={hideBottomSheet} mode='contained' icon='check'>
          Done
        </Button>
        <Button mode='contained' icon='chevron-right'>
          Add More
        </Button>
      </View>
    </View>
  );
}
