import { Button, Chip, Icon } from 'react-native-paper';
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
import { Text } from '@components/Text';

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
    colors: { onPrimary },
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
        <Button
          onPress={() =>
            showBottomSheet(
              <View>
                <Text variant='bodySmall'>This is the Bottomsheet content</Text>
                <Button onPress={() => hideBottomSheet()}>Close</Button>
              </View>,
            )
          }
          theme={{ roundness: 0.8 }}
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
            color={onPrimary}
            size={22}
          />
        </Button>
        <Button
          theme={{ roundness: 0.8 }}
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
