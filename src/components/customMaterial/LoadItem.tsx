import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { useAppTheme } from '@theme/themeConfig';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Keyboard, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Item from '@components/customMaterial/Item';
import { DiscoveryTermObject } from '@custom-types/AppTheme';
import { logItems } from '@utils/logger';
import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { updateTempItem } from '@features/tempMaterial/tempMaterialSlice';
import {
  selectTempCustomMaterialItems,
  selectActiveItemIndex,
  selectScrollPulse,
  selectUIReadyForScroll,
} from '@features/tempMaterial/tempMaterialSelectors';

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

  const dispatch = useAppDispatch();
  const updateItemFormData = (
    index: number,
    discoveryTerm: DiscoveryTermObject,
  ) => {
    dispatch(updateTempItem({ id: index, data: discoveryTerm }));
  };

  const scrollViewRef = useRef<ScrollView | null>(null);
  const itemOffsetsRef = useRef<Record<number, number>>({});

  const handleAddMore = () => {
    const itemIdx = itemCount + 1;
    setItemCount(prev => prev + 1);
    dispatch(updateTempItem({ id: itemIdx, data: { dt: '', def: '' } }));
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd();
  }, [itemCount]);

  const activeItemIndex = useAppSelector(selectActiveItemIndex);
  const scrollPulse = useAppSelector(selectScrollPulse);
  const isUIReadyForScroll = useAppSelector(selectUIReadyForScroll);
  useEffect(() => {
    const targetY = itemOffsetsRef.current[activeItemIndex ?? -1];
    const isAuditToEditReady =
      activeItemIndex !== null && targetY !== undefined && isUIReadyForScroll;

    if (isAuditToEditReady) {
      scrollViewRef.current?.scrollTo({
        y: targetY,
        animated: true,
      });
    }
  }, [scrollPulse, activeItemIndex, isUIReadyForScroll]);

  const rawItems = useAppSelector(selectTempCustomMaterialItems);
  const tempItems = useMemo(() => Object.entries(rawItems), [rawItems]);

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
          height: 150, // A Non-Bounded height breaks scrollToEnd
          maxHeight: 150,
          borderWidth: 1,
          borderColor: 'slateblue',
        }}
        testID='LoadItem BS ScrollView'
      >
        {tempItems.map(([numericKey]) => {
          logItems(
            Number(numericKey),
            itemOffsetsRef.current,
            rawItems,
            activeItemIndex,
          );
          return (
            <Item
              key={`item-${numericKey}`}
              index={Number(numericKey)}
              offsetsBucket={itemOffsetsRef}
              updateItemFormData={DTO =>
                updateItemFormData(Number(numericKey), DTO)
              }
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
