import { selectTempCustomMaterialItems } from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector } from '@hooks/useAppHooks';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

export default function ConfirmMaterialItems() {
  const tempItems = Object.entries(
    useAppSelector(selectTempCustomMaterialItems),
  );

  const renderTempItems = () => {
    return tempItems.map(([id, DTO]) => (
      <List.Item key={`DTO_${id}`} title={DTO.dt} description={DTO.def} />
    ));
  };
  return <ScrollView>{renderTempItems()}</ScrollView>;
}
