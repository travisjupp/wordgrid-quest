import { Button, Icon } from 'react-native-paper';
import {
  selectTempCustomCategory,
  // selectTempCustomMaterialArray,
} from '@features/tempMaterial/tempMaterialSelectors';
import { useAppDispatch, useAppSelector } from '@hooks/useAppHooks';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { resetTempMaterial } from '@features/tempMaterial/tempMaterialSlice';
import { useAppTheme } from '@theme/themeConfig';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import { LoadItem } from './LoadItem';
import Chip from '@components/Chip';

export function LoadMaterialItems() {
  const dispatch = useAppDispatch();
  const tempCategory = useAppSelector(selectTempCustomCategory);
  const router = useRouter();
  const { showBottomSheet, hideBottomSheet } = useBottomSheetCustom();
  const handleEditCategory = () => {
    hideBottomSheet();
    dispatch(resetTempMaterial());
    router.navigate({
      pathname: '/loadcat',
      params: { prevRoute: '/loaditems' },
    });
  };

  // Retrieve Custom Theme-properties
  const {
    colors: { onPrimary },
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  return (
    <>
      <View style={sharedInputWrapper} testID='InputWrapper'>
        <Chip content={tempCategory} onPress={handleEditCategory} />
        <Button
          onPress={() => showBottomSheet(<LoadItem />)}
          contentStyle={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mode='contained'
          style={{ marginTop: 21 }}
          testID='Button Add Material'
        >
          <Icon source={'plus-circle-outline'} color={onPrimary} size={22} />
        </Button>
        <Button
          contentStyle={{ height: 50 }}
          style={{ marginTop: 6 }}
          mode='contained'
        >
          Cancel
        </Button>
      </View>
    </>
  );
}
