import { LoadMaterialCategory } from '@components/customMaterial/LoadMaterialCategory';
import { useAppTheme } from '@theme/themeConfig';
import { memo } from 'react';
import Animated, { FlipInYRight, FlipInYLeft } from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';

export default function LoadCategoryScreen() {
  const { prevRoute } = useLocalSearchParams();
  const returning: boolean = prevRoute === '/loaditems';
  const enteringAnimation = returning ? FlipInYLeft : FlipInYRight;

  // Retrieve Custom Theme-properties
  const {
    preGameConfig: {
      customMaterialScreens: { loadcatScreenAnimatedView },
    },
  } = useAppTheme();

  return (
    <Animated.View
      style={loadcatScreenAnimatedView}
      testID='Animated View'
      entering={enteringAnimation}
    >
      <MemoizedLoadMaterialCategory />
    </Animated.View>
  );
}

const MemoizedLoadMaterialCategory = memo(LoadMaterialCategory);
