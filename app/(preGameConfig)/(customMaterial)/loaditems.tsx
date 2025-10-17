import { LoadMaterialItems } from '@components/customMaterial/LoadMaterialItems';
import { useAppTheme } from '@theme/themeConfig';
import { memo } from 'react';
import Animated from 'react-native-reanimated';

export default function LoadItemsScreen() {
  const {
    preGameConfig: { customMaterialScreens },
  } = useAppTheme();
  return (
    <Animated.View
      style={customMaterialScreens.loaditemsScreenAnimatedView}
      testID='Animated View'
    >
      <MemoizedLoadMaterialItems />
    </Animated.View>
  );
}

const MemoizedLoadMaterialItems = memo(LoadMaterialItems);
