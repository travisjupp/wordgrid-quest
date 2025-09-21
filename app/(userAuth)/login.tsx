import { LogIn } from '@components/LogIn';
import Animated, { FadeOut, FlipInYLeft } from 'react-native-reanimated';
import AuthSubtext from '@components/AuthSubtext';
import { memo } from 'react';

export default function LoginScreen() {
  return (
    <Animated.View
      entering={FlipInYLeft}
      exiting={FadeOut}
      testID='Animated View'
      style={{
        alignItems: 'center',
        width: 330,
        flex: 1,
        // borderColor: 'red',
        // borderWidth: 1,
      }}
    >
      <MemoizedLogIn />
      <MemoizedAuthSubtext />
    </Animated.View>
  );
}

const MemoizedLogIn = memo(LogIn);
const MemoizedAuthSubtext = memo(AuthSubtext);
