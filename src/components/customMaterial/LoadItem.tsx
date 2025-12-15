import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import { View } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import { Button, TextInput } from 'react-native-paper';
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types';

export function LoadItem() {
  // Retrieve Custom Theme-properties
  const {
    colors: { onSecondaryContainer },
    shared: { inputWrapper: sharedInputWrapper },
    preGameConfig: {
      customMaterialScreens: {
        loaditems: {
          loadItemButtonsContainer,
        },
      },
    },
  } = useAppTheme();

  const { hideBottomSheet } = useBottomSheetCustom();

  return (
    <View style={sharedInputWrapper}>
      <TextInput
        mode='outlined'
        style={{
          marginInline: 12,
        }}
        placeholder='Word, e.g., Platypus'
        placeholderTextColor={onSecondaryContainer}
        label='Discovery Term'
        render={(props: RenderProps) => <BottomSheetTextInput {...props} />}
        testID='Discovery Term Text Input'
      />

      <TextInput
        mode='outlined'
        multiline={true}
        style={{
          marginInline: 12,
          height: 80,
        }}
        placeholder='Definition, e.g., Semiaquatic, egg-laying mammal endemic to eastern Australia.'
        placeholderTextColor={onSecondaryContainer}
        label='Definition'
        render={(props: RenderProps) => <BottomSheetTextInput {...props} />}
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
