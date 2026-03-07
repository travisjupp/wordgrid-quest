import { Button, HelperText } from 'react-native-paper';
import { Text } from '@components/Text';
import { useAppSelector } from '@hooks/useAppHooks';
import { selectValidationErrors } from '@features/tempMaterial/tempMaterialSelectors';
import { useAppTheme } from '@theme/themeConfig';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';

export function ConfirmStartButton() {
  // Retrieve Custom Theme-properties
  const {
    colors: { onSurfaceDisabled, primary },
    animatedStyles: {
      snappySpring: { springToScale, springConfig },
    },
  } = useAppTheme();

  const validationError = useAppSelector(selectValidationErrors);
  const isReady = !validationError;
  const { expandedBottomSheet } = useBottomSheetCustom();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isReady && !expandedBottomSheet) {
      scale.value = springToScale;
      scale.value = withSpring(1, springConfig);
    }
  }, [isReady, scale, expandedBottomSheet, springToScale, springConfig]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      <Animated.View style={animatedButtonStyle}>
        <Button
          disabled={!isReady}
          contentStyle={{
            alignItems: 'center',
            height: 96,
          }}
          mode='elevated'
          icon='star-circle'
          labelStyle={{
            fontSize: 32,
          }}
          theme={{
            colors: {
              onSurface: isReady ? primary : onSurfaceDisabled,
            },
          }}
        >
          <Text
            variant='headlineSmall'
            theme={{
              colors: {
                onSurface: isReady ? primary : onSurfaceDisabled,
              },
            }}
          >
            Confirm/Start
          </Text>
        </Button>
      </Animated.View>
      <HelperText
        type={'info'}
        visible={!!validationError}
        style={{ textAlign: 'center' }}
      >
        {validationError}
      </HelperText>
    </>
  );
}
