import { selectTempCustomMaterialItems } from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector, useAppDispatch } from '@hooks/useAppHooks';
import { useAppTheme } from '@theme/themeConfig';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { memo, useMemo } from 'react';
import { setActiveItemIndex } from '@features/tempMaterial/tempMaterialSlice';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import LoadItem from './LoadItem';

export default function ConfirmMaterialItems() {
  // Retrieve Custom Theme-properties
  const {
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

  const rawItems = useAppSelector(selectTempCustomMaterialItems);
  const tempItems = useMemo(() => Object.entries(rawItems), [rawItems]);

  const renderTempItems = () => {
    return tempItems.map(([id, DTO]) => (
      <MemoizedListItem
        style={confirmItemsListItemContainer}
        key={`DTO_${id}`}
        title={DTO.dt}
        description={DTO.def}
        onPress={() => handleEditPress(Number(id))}
        right={props => <List.Icon {...props} icon='close-circle-outline' />}
      />
    ));
  };
  return (
    <ScrollView style={confirmItemsScrollView}>{renderTempItems()}</ScrollView>
  );
}

const MemoizedListItem = memo(List.Item);
