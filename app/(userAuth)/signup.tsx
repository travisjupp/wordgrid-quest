import AuthSubtext from '@components/AuthSubtext';
import { SignUp } from '@components/SignUp';
import { memo } from 'react';
import Animated, { FadeOut, FlipInYRight } from 'react-native-reanimated';

export default function SignupScreen() {
  return (
    <Animated.View
      entering={FlipInYRight}
      exiting={FadeOut}
      testID='Animated View'
      style={{
        alignItems: 'center',
        width: 330,
        flex: 1,
      }}
    >
      <MemoizedSignUp />
      <MemoizedAuthSubtext />
    </Animated.View>
  );
}

const MemoizedSignUp = memo(SignUp);
const MemoizedAuthSubtext = memo(AuthSubtext);
