import { LoadMaterialCategory } from '@components/customMaterial/LoadMaterialCategory';
import { useAppTheme } from '@theme/themeConfig';
import { memo } from 'react';
import Animated from 'react-native-reanimated';

export default function LoadCategoryScreen() {
  const { preGameConfig } = useAppTheme();
  return (
    <Animated.View
      style={preGameConfig.customMaterialScreens.loadcatScreenAnimatedView}
    >
      <MemoizedLoadMaterialCategory />
    </Animated.View>
  );
}

const MemoizedLoadMaterialCategory = memo(LoadMaterialCategory);
