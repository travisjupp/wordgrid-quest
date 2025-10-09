import { SignUp } from '@components/userAuth/SignUp';
import { AuthSubtext } from '@components/userAuth/AuthSubtext';
import Animated, { FlipInYRight } from 'react-native-reanimated';
import { memo } from 'react';
import { useAppTheme } from '@theme/themeConfig';

export default function SignupScreen() {
  const {
    preGameConfig: { authScreens },
  } = useAppTheme();
  return (
    <Animated.View
      entering={FlipInYRight}
      testID='Animated View'
      style={authScreens.signupScreenAnimatedView}
    >
      <MemoizedSignUp />
      <MemoizedAuthSubtext />
    </Animated.View>
  );
}

const MemoizedSignUp = memo(SignUp);
const MemoizedAuthSubtext = memo(AuthSubtext);
