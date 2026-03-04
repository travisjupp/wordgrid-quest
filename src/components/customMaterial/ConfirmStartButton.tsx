import { Button, HelperText } from 'react-native-paper';
import { Text } from '@components/Text';
import { useAppSelector } from '@hooks/useAppHooks';
import { selectValidationErrors } from '@features/tempMaterial/tempMaterialSelectors';
import { useAppTheme } from '@theme/themeConfig';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export function ConfirmStartButton() {
  // Retrieve Custom Theme-properties
  const {
    colors: { onSurfaceDisabled, primary },
  } = useAppTheme();

  const validationError = useAppSelector(selectValidationErrors);
  const isReady = !validationError;
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isReady) {
      scale.value = withSequence(
        withSpring(1.05, { damping: 2, stiffness: 80 }),
        withSpring(1),
      );
    }
  }, [isReady, scale]);

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
