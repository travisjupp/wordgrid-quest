import { LoadMaterialCategory } from '@components/customMaterial/LoadMaterialCategory';
import { useAppTheme } from '@theme/themeConfig';
import { memo } from 'react';
import Animated, { FlipInYRight } from 'react-native-reanimated';

export default function LoadCategoryScreen() {
  const {
    preGameConfig: { customMaterialScreens },
  } = useAppTheme();
  return (
    <Animated.View
      style={customMaterialScreens.loadcatScreenAnimatedView}
      testID='Animated View'
      entering={FlipInYRight}
    >
      <MemoizedLoadMaterialCategory />
    </Animated.View>
  );
}

const MemoizedLoadMaterialCategory = memo(LoadMaterialCategory);
