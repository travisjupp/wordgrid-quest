import { selectTempCustomMaterialItems } from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector } from '@hooks/useAppHooks';
import { useAppTheme } from '@theme/themeConfig';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { memo, useMemo } from 'react';

export default function ConfirmMaterialItems() {
  // Retrieve Custom Theme-properties
  const {
    preGameConfig: {
      customMaterialScreens: {
        loaditems: { confirmItemsListItemContainer, confirmItemsScrollView },
      },
    },
  } = useAppTheme();

  const rawItems = useAppSelector(selectTempCustomMaterialItems);
  const tempItems = useMemo(() => Object.entries(rawItems), [rawItems]);

  const renderTempItems = () => {
    return tempItems.map(([id, DTO]) => (
      <MemoizedListItem
        style={confirmItemsListItemContainer}
        key={`DTO_${id}`}
        title={DTO.dt}
        description={DTO.def}
        right={props => <List.Icon {...props} icon='close-circle-outline' />}
      />
    ));
  };
  return (
    <ScrollView style={confirmItemsScrollView}>{renderTempItems()}</ScrollView>
  );
}

const MemoizedListItem = memo(List.Item);
