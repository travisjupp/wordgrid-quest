import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import { Platform, View, Keyboard, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types';
import Item from '@components/customMaterial/Item';

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



  const [itemCount, setItemCount] = useState<number>(0);

  type NumericKeyObjectRecord = Record<number, DiscoveryTermObject>;
  const [itemsFormData, setItemsFormData] = useState<NumericKeyObjectRecord>({
    0: { dt: '', def: '' },
  });

  const updateItemFormData = (discoveryTerm: DiscoveryTermObject) => {
    setItemsFormData(prev => ({
      ...prev,
      [itemCount]: discoveryTerm,
    }));
  };

  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleAddMore = () => {
    setItemCount(prev => prev + 1);
    console.log('> Add More');
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [items]);

  const { setBottomSheetSnap } = useBottomSheetCustom();
  return (
    <View
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        setBottomSheetSnap(height + 40);
      }}
      style={[
        sharedInputWrapper,
        {
          flex: 1, // Must have bounded height
          paddingInline: 12,
          height: 'auto',
        },
      ]}
      testID='LoadItem View'
    >
      <BottomSheetScrollView
        nestedScrollEnabled={false}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='interactive'
        ref={scrollViewRef}
        style={{
          flex: 1, // Must have bounded height
          maxHeight: 150,
          borderWidth: 1,
          borderColor: 'slateblue',
        }}
      >
        {items.map(item => item)}
      </BottomSheetScrollView>
      <View
        style={loadItemButtonsContainer}
        testID='Load Item Buttons Container'
      >
        <Button
          onPress={() => {
            console.log('󰄬Done');
            hideBottomSheet();
            Keyboard.dismiss();
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
          onPress={handleAddMore}
        >
          Add More
        </Button>
      </View>
    </View>
  );
}
