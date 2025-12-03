import { LoadMaterialItems } from '@components/customMaterial/LoadMaterialItems';
import { useAppTheme } from '@theme/themeConfig';
import { memo } from 'react';
import Animated, { FlipInYRight } from 'react-native-reanimated';

export default function LoadItemsScreen() {

  // Retrieve Custom Theme-properties
  const {
    preGameConfig: { customMaterialScreens },
  } = useAppTheme();

  return (
    <Animated.View
      style={customMaterialScreens.loaditemsScreenAnimatedView}
      testID='Animated View'
      entering={FlipInYRight}
    >
      <MemoizedLoadMaterialItems />
    </Animated.View>
  );
}

const MemoizedLoadMaterialItems = memo(LoadMaterialItems);
