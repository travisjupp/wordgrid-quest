import { Button, Icon } from 'react-native-paper';
import {
  selectIsInitialState,
  selectTempCustomCategory,
  selectValidationErrors,
} from '@features/tempMaterial/tempMaterialSelectors';
import { useAppSelector } from '@hooks/useAppHooks';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';
import LoadItem from './LoadItem';
import Chip from '@components/Chip';
import ConfirmMaterialItems from '@components/customMaterial/ConfirmMaterialItems';
import { ConfirmStartButton } from './ConfirmStartButton';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

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
    animatedStyles: {
      pulse: { pulseToScale, pulseTimingConfig },
    },
  } = useAppTheme();

  const isInitialState = useAppSelector(selectIsInitialState);
  const scale = useSharedValue(1);
  const validationError = useAppSelector(selectValidationErrors);
  const isReady = !validationError;

  useEffect(() => {
    if (!isReady && !expandedBottomSheet) {
      scale.value = withRepeat(
        withSequence(
          withTiming(pulseToScale, pulseTimingConfig),
          withTiming(1, pulseTimingConfig),
        ),
        -1,
        true,
      );
    } else {
      scale.value = withTiming(1);
    }
  }, [
    isInitialState,
    expandedBottomSheet,
    isReady,
    scale,
    pulseToScale,
    pulseTimingConfig,
  ]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      <View style={sharedInputWrapper} testID='InputWrapper'>
        <Chip content={tempCategory} onPress={handleEditCategory} />
        {!isInitialState && <ConfirmMaterialItems />}
        <Animated.View style={animatedButtonStyle}>
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
            {isInitialState ?
              'Add Your First Item'
            : <Icon
                source={'plus-circle-outline'}
                color={expandedBottomSheet ? onSurfaceDisabled : onPrimary}
                size={22}
              />
            }
          </Button>
        </Animated.View>
        {!isInitialState && (
          <Button
            disabled={expandedBottomSheet}
            contentStyle={{ height: 50 }}
            mode='contained'
          >
            Cancel
          </Button>
        )}
        <ConfirmStartButton />
      </View>
    </>
  );
}
