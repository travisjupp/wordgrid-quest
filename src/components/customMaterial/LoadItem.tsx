import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import React, { useEffect, useRef, useState } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Item from '@components/customMaterial/Item';
import { DiscoveryTermObject, NumericKeyObjectRecord } from '@custom-types/AppTheme';
import { logItems } from '@utils/logger';
import { useAppDispatch } from '@hooks/useAppHooks';
import { updateTempItem } from '@features/tempMaterial/tempMaterialSlice';

export default function LoadItem() {
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

  const [itemsFormData, setItemsFormData] = useState<NumericKeyObjectRecord>({
    0: { dt: '', def: '' },
  });

  const dispatch = useAppDispatch();
  const updateItemFormData = (
    index: number,
    discoveryTerm: DiscoveryTermObject,
  ) => {
    setItemsFormData(prev => ({
      ...prev,
      [index]: discoveryTerm,
    }));
    dispatch(updateTempItem({id: index, data: discoveryTerm }));
  };

  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleAddMore = () => {
    const itemIdx = itemCount + 1;
    setItemCount(prev => prev + 1);
    setItemsFormData(prev => ({
      ...prev,
      [itemIdx]: { dt: '', def: '' },
    }));
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [itemsFormData]);

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
        {Object.entries(itemsFormData).map(([key, val]) => {
          logItems(Number(key), val, itemsFormData);
          return (
            <Item
              key={`item-${key}`}
              updateItemFormData={DTO => updateItemFormData(Number(key), DTO)}
            />
          );
        })}
      </BottomSheetScrollView>
      <View
        style={loadItemButtonsContainer}
        testID='Load Item Buttons Container'
      >
        <Button
          onPress={() => {
            console.log('✓  Done');
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
