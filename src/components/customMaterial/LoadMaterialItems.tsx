import { Button, Icon } from 'react-native-paper';
import { selectTempCustomCategory, selectTempCustomMaterialItems } from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector } from '@hooks/useAppHooks';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import LoadItem from './LoadItem';
import Chip from '@components/Chip';
import ConfirmMaterialItems from '@components/customMaterial/ConfirmMaterialItems';

export function LoadMaterialItems() {
  const tempCategory = useAppSelector(selectTempCustomCategory);
  const router = useRouter();
  const { showBottomSheet, hideBottomSheet, expandedBottomSheet } =
    useBottomSheetCustom();
  const handleEditCategory = () => {
    hideBottomSheet();
    router.navigate({
      pathname: '/loadcat',
      params: { prevRoute: '/loaditems', currentCategory: tempCategory },
    });
  };

  // Retrieve Custom Theme-properties
  const {
    colors: { onPrimary, onSurfaceDisabled },
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  const rawItems = useAppSelector(selectTempCustomMaterialItems);
  return (
    <>
      <View style={sharedInputWrapper} testID='InputWrapper'>
        <Chip content={tempCategory} onPress={handleEditCategory} />
        { rawItems[0] && <ConfirmMaterialItems /> }
        <Button
          disabled={expandedBottomSheet ? true : false}
          onPress={() => {
            showBottomSheet(<LoadItem />);
          }}
          contentStyle={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mode='contained'
          testID='Button Add Material'
        >
          <Icon
            source={'plus-circle-outline'}
            color={expandedBottomSheet ? onSurfaceDisabled : onPrimary}
            size={22}
          />
        </Button>
        <Button
          disabled={expandedBottomSheet ? true : false}
          contentStyle={{ height: 50 }}
          mode='contained'
        >
          Cancel
        </Button>
      </View>
    </>
  );
}
