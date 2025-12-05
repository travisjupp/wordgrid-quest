import { FAB, Button, Chip } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  selectTempCustomCategory,
  // selectTempCustomMaterialArray,
} from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector } from '@hooks/useAppHooks';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { resetTempMaterial } from '@features/tempMaterial/tempMaterialSlice';
import { useAppTheme } from '@theme/themeConfig';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';

export function LoadMaterialItems() {
  const dispatch = useDispatch();
  const tempCategory = useAppSelector(selectTempCustomCategory);
  const router = useRouter();
  const { showBottomSheet, hideBottomSheet } = useBottomSheetCustom();
  const handleEditCategory = () => {
    dispatch(resetTempMaterial());
    router.navigate({
      pathname: '/loadcat',
      params: { prevRoute: '/loaditems' },
    });
  };

  // Retrieve Custom Theme-properties
  const {
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  return (
    <>
      <View style={sharedInputWrapper} testID='InputWrapper'>
        <Chip
          mode='outlined'
          closeIcon='pencil-outline'
          onClose={handleEditCategory}
          style={{
            alignSelf: 'center',
          }}
        >
          {tempCategory}
        </Chip>
        <FAB
          theme={{ roundness: 0.8 }}
          style={{ marginTop: 6, alignItems: 'center' }}
          icon='plus-circle-outline'
          testID='FAB-add-material'
        />
        <Button
          theme={{ roundness: 0.8 }}
          contentStyle={{ height: 50 }}
          style={{ marginTop: 6 }}
          mode='contained'
          // onPress={}
        >
          Cancel
        </Button>
      </View>
    </>
  );
}
