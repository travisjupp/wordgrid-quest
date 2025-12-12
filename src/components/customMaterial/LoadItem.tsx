import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import { View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import { Button } from 'react-native-paper';

export function LoadItem() {
  // Retrieve Custom Theme-properties
  const {
    colors: { onSecondaryContainer },
    shared: { inputWrapper: sharedInputWrapper },
    preGameConfig: {
      customMaterialScreens: {
        loaditems: {
          definitionTextInput,
          discoveryTermTextInput,
          loadItemButtonsContainer,
        },
      },
    },
  } = useAppTheme();

  const { hideBottomSheet } = useBottomSheetCustom();

  return (
    <View style={sharedInputWrapper}>
      <BottomSheetTextInput
        placeholderTextColor={onSecondaryContainer}
        style={discoveryTermTextInput}
        placeholder='Word, e.g., Platypus'
        testID='Discovery Term Text Input'
      />
      <BottomSheetTextInput
        multiline={true}
        placeholderTextColor={onSecondaryContainer}
        style={definitionTextInput}
        placeholder='Definition, e.g., Semiaquatic, egg-laying mammal endemic to eastern Australia.'
        testID='Definition Text Input'
      />
      <View
        style={loadItemButtonsContainer}
        testID='Load Item Buttons Container'
      >
        <Button
          onPress={() => {
            hideBottomSheet();
            KeyboardController.dismiss();
          }}
          mode='contained'
          icon='check'
          testID='Load Item Done Button'
        >
          Done
        </Button>
        <Button
          mode='contained'
          icon='chevron-right'
          testID='Load Item Add More Button'
        >
          Add More
        </Button>
      </View>
    </View>
  );
}
