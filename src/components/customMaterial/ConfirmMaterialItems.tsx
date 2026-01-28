import {
  selectActiveItemIndex,
  selectTempCustomMaterialItems,
} from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector, useAppDispatch } from '@hooks/useAppHooks';
import { useAppTheme } from '@theme/themeConfig';
import { Pressable, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { memo, useMemo, useState } from 'react';
import {
  removeTempItem,
  setActiveItemIndex,
} from '@features/tempMaterial/tempMaterialSlice';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import LoadItem from './LoadItem';

export default function ConfirmMaterialItems() {
  // Retrieve Custom Theme-properties
  const {
    colors: { onSurfaceVariant },
    preGameConfig: {
      customMaterialScreens: {
        loaditems: { confirmItemsListItemContainer, confirmItemsScrollView },
      },
    },
  } = useAppTheme();

  const dispatch = useAppDispatch();
  const { showBottomSheet } = useBottomSheetCustom();

  const handleEditPress = (id: number) => {
    dispatch(setActiveItemIndex(id));
    showBottomSheet(<LoadItem />);
  };

  const activeItemIndex = useAppSelector(selectActiveItemIndex);
  const handleRemoveItem = (id: number) => {
    dispatch(removeTempItem(id));
    if (activeItemIndex === id) {
      dispatch(setActiveItemIndex(null));
    }
  };

  const rawItems = useAppSelector(selectTempCustomMaterialItems);
  const tempItems = useMemo(() => Object.entries(rawItems), [rawItems]);
  const [pressedId, setPressedId] = useState<number | null>(null);

  return (
    <ScrollView style={confirmItemsScrollView}>
      {tempItems.map(([id, DTO]) => {
        const numericId = Number(id);
        return (
          <MemoizedListItem
            style={confirmItemsListItemContainer}
            key={`List Item ${id}`}
            title={DTO.dt}
            description={DTO.def}
            onPress={() => handleEditPress(numericId)}
            right={props => (
              <Pressable
                key={`Remove Trigger ${id}`}
                onPress={() => handleRemoveItem(numericId)}
                onPressIn={() => setPressedId(numericId)}
                onPressOut={() => setPressedId(null)}
                testID={`List Item Icon Pressable ${id}`}
              >
                <List.Icon
                  {...props}
                  color={pressedId === numericId ? 'red' : onSurfaceVariant}
                  icon='close-circle-outline'
                />
              </Pressable>
            )}
          />
        );
      })}
    </ScrollView>
  );
}

const MemoizedListItem = memo(List.Item);
