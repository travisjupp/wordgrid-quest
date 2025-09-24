import { SignUp } from '@components/userAuth/SignUp';
import { AuthSubtext } from '@components/userAuth/AuthSubtext';
import { memo } from 'react';
import Animated, { FlipInYRight } from 'react-native-reanimated';

export default function SignupScreen() {
  return (
    <Animated.View
      entering={FlipInYRight}
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
