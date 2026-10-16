import { DiscoveryTermObjectInput } from '@shared/domain/customMaterial/discoverySchema';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Platform, TextInput as RNTextInput, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types';
import {
  selectActiveItemIndex,
  selectItemFocusDisabled,
  selectUIReadyForScroll,
} from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector } from '@hooks/useAppHooks';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { MATERIAL_INPUT_LIMITS } from '@features/material/constants/materialConfig';

interface Props {
  updateItemFormData: (discoveryTerm: DiscoveryTermObjectInput) => void;
  data: DiscoveryTermObjectInput;
  index?: number;
  updateItemOffsets: (index: number, y: number) => void;
}

export default function Item({
  updateItemFormData,
  data,
  index,
  updateItemOffsets,
}: Props) {
  const discoveryTermTextInputRef = useRef<RNTextInput | null>(null);
  const definitionTextInputRef = useRef<RNTextInput | null>(null);

  const activeItemIndex = useAppSelector(selectActiveItemIndex);
  const isActiveItem = activeItemIndex === index;
  const isBottomSheetReady = useAppSelector(selectUIReadyForScroll);
  const isItemFocusDisabled = useAppSelector(selectItemFocusDisabled);
  const { expandedBottomSheet } = useBottomSheetCustom();

  useEffect(() => {
    if (
      !isItemFocusDisabled /* Prevent focus (KB hidden by BS pull) */ &&
      expandedBottomSheet /* Prevent offscreen focus (KB hidden by BS pull) */ &&
      isActiveItem /* Only focus the active `Item` */ &&
      isBottomSheetReady /* BottomSheet is open? */ &&
      discoveryTermTextInputRef.current
    ) {
      /* Force Android to show KB */
      if (Platform.OS === 'android') {
        discoveryTermTextInputRef.current?.setNativeProps({
          showSoftInputOnFocus: true,
        });
      }
      if (Platform.OS !== 'web') {
        const frameId = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            discoveryTermTextInputRef.current?.focus();
          });
        });
        return () => cancelAnimationFrame(frameId);
      } else {
        discoveryTermTextInputRef.current?.focus();
      }
    }
  }, [
    expandedBottomSheet,
    isItemFocusDisabled,
    isActiveItem,
    isBottomSheetReady,
  ]);

  const [DTO, setDTO] = useState<DiscoveryTermObjectInput>({
    dt: data.dt,
    def: data.def,
  });

  const handleDiscoveryTerm = (term: string) => {
    setDTO({
      dt: term,
      def: DTO.def,
    });
  };

  const handleDefinition = (definition: string) => {
    setDTO({
      dt: DTO.dt,
      def: definition,
    });
  };

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
        marginBlockEnd: 12 /* Creates the gap between `Item`s, also helps trigger BS ScrollView onContentSizeChange when a new Item is added (ensure scrollToEnd fires on 2nd Item creation) */,
      }}
      onLayout={e => {
        const y = e.nativeEvent.layout.y;
        updateItemOffsets(Number(index), y);
      }}
      testID={`Item View ${index}`}
    >
      <TextInput
        ref={discoveryTermTextInputRef}
        {...SharedTextInputProps}
        placeholder='Discovery Term, e.g., Platypus'
        label='Discovery Term'
        returnKeyType='next'
        onSubmitEditing={() => definitionTextInputRef.current?.focus()}
        submitBehavior='submit'
        maxLength={MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength}
        aria-label='Your Discovery Term'
        onChangeText={dt => handleDiscoveryTerm(dt)}
        value={DTO.dt}
        onBlur={() => {
          updateItemFormData(DTO);
        }}
        testID='Discovery Term Text Input'
      />
      <TextInput
        ref={definitionTextInputRef}
        {...SharedTextInputProps}
        placeholder='Definition, e.g., Semiaquatic, egg-laying mammal...'
        label='Definition'
        returnKeyType='default'
        multiline={true}
        submitBehavior='newline'
        maxLength={MATERIAL_INPUT_LIMITS.definitionText.maxLength}
        aria-label='Your Definition Text'
        onChangeText={def => handleDefinition(def)}
        value={DTO.def}
        onBlur={() => {
          updateItemFormData(DTO);
        }}
        testID='Definition Text Input'
      />
    </View>
  );
}
