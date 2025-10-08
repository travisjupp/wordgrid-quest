import { LogIn } from '@components/userAuth/LogIn';
import { AuthSubtext } from '@components/userAuth/AuthSubtext';
import Animated, { FlipInYLeft } from 'react-native-reanimated';
import { memo } from 'react';
import { useAppTheme } from '@theme/themeConfig';

export default function LoginScreen() {
  const { preGameConfig } = useAppTheme();
  return (
    <Animated.View
      entering={FlipInYLeft}
      testID='Animated View'
      style={preGameConfig.authScreens.loginScreenAnimatedView}
    >
      <MemoizedLogIn />
      <MemoizedAuthSubtext />
    </Animated.View>
  );
}

const MemoizedLogIn = memo(LogIn);
const MemoizedAuthSubtext = memo(AuthSubtext);
