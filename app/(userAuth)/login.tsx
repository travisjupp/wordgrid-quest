import { LogIn } from '@components/userAuth/LogIn';
import { AuthSubtext } from '@components/userAuth/AuthSubtext';
import Animated, { FlipInYLeft } from 'react-native-reanimated';
import { memo } from 'react';

export default function LoginScreen() {
  return (
    <Animated.View
      entering={FlipInYLeft}
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
