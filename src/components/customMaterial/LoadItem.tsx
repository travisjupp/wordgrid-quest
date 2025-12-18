import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import { ComponentProps, useEffect, useRef } from 'react';
import { Platform, View, TextInput as RNTextInput } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';
import { Button, TextInput } from 'react-native-paper';
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types';

export function LoadItem() {
  // Retrieve Custom Theme-properties
  const {
    shared: { inputWrapper: sharedInputWrapper },
    preGameConfig: {
      customMaterialScreens: {
        loaditems: { loadItemButtonsContainer },
      },
    },
  } = useAppTheme();

  const { hideBottomSheet } = useBottomSheetCustom();

  type RNPTextInputProps = ComponentProps<typeof TextInput>;

  const TextInputProps: RNPTextInputProps = {
    mode: 'outlined',
  };

  function bottomSheetKBBehavior(props: RenderProps) {
    return <BottomSheetTextInput {...props} />;
  }

  if (Platform.OS !== 'web') {
    /* Keep Gorhoms BS Keyboard Behavior on mobile */
    TextInputProps.render = bottomSheetKBBehavior;
  }

  const discoveryTermTextInputRef = useRef<RNTextInput | null>(null);
  const definitionTextInputRef = useRef<RNTextInput | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (discoveryTermTextInputRef.current) {
        discoveryTermTextInputRef.current.focus();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={[sharedInputWrapper, { paddingInline: 12 }]}>
      <TextInput
        ref={discoveryTermTextInputRef}
        {...TextInputProps}
        placeholder='Discovery Term, e.g., Platypus'
        label='Discovery Term'
        returnKeyType='next'
        onSubmitEditing={() => definitionTextInputRef.current?.focus()}
        submitBehavior='submit'
        aria-label='Your Discovery Term'
        testID='Discovery Term Text Input'
      />
      <TextInput
        ref={definitionTextInputRef}
        {...TextInputProps}
        placeholder='Definition, e.g., Semiaquatic, egg-laying mammal...'
        label='Definition'
        returnKeyType='default'
        multiline={true}
        submitBehavior='newline'
        aria-label='Your Definition Text'
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
