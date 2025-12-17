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
  const {
    showBottomSheet,
    hideBottomSheet,
    snapBottomSheet,
    expandedBottomSheet,
  } = useBottomSheetCustom();
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
    colors: { onPrimary, onSurfaceDisabled },
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  return (
    <>
      <View style={sharedInputWrapper} testID='InputWrapper'>
        <Chip content={tempCategory} onPress={handleEditCategory} />
        <Button
          disabled={expandedBottomSheet ? true : false}
          onPress={() => {
            // Show and Snap BottomSheet to bottom of Chip
            showBottomSheet(<LoadItem />);
            // snapBottomSheet(300); // <-- this needs same height as onLayout height (context?)
          }}
          contentStyle={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mode='contained'
          style={{ marginTop: 21 }}
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
          style={{ marginTop: 6 }}
          mode='contained'
        >
          Cancel
        </Button>
      </View>
    </>
  );
}
