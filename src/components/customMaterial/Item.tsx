import { DiscoveryTermObject } from '@custom-types/AppTheme';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { ComponentProps, useEffect, useRef } from 'react';
import { Platform, TextInput as RNTextInput, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types';



interface Props {
  updateItemFormData: (discoveryTerm: DiscoveryTermObject) => void;
}


export default function Item({ updateItemFormData }: Props) {
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

  const SharedTextInputProps: ComponentProps<typeof TextInput> = {
    mode: 'outlined',
    scrollEnabled: false,
    ...(Platform.OS !== 'web' ?
      /* Keep Gorhoms BS Keyboard Behavior on mobile */
      { render: (props: RenderProps) => <BottomSheetTextInput {...props} /> }
    : null),
  };
  return (
    <View 
      style={{
        marginBlockEnd: 8,
      }}
    >
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
    </View>
  );
}
