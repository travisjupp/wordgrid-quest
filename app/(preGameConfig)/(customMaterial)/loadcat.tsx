import { LoadMaterialCategory } from '@components/customMaterial/LoadMaterialCategory';
import { useAppTheme } from '@theme/themeConfig';
import { memo } from 'react';
import Animated from 'react-native-reanimated';

export default function LoadCategoryScreen() {
  const {
    preGameConfig: { customMaterialScreens },
  } = useAppTheme();
  return (
    <Animated.View
      style={customMaterialScreens.loadcatScreenAnimatedView}
      testID='Animated View'
    >
      <MemoizedLoadMaterialCategory />
    </Animated.View>
  );
}

const MemoizedLoadMaterialCategory = memo(LoadMaterialCategory);
