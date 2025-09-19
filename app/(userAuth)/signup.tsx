import AuthSubtext from '@components/AuthSubtext';
import { SignUp } from '@components/SignUp';
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
      <SignUp />
      <AuthSubtext />
    </Animated.View>
  );
}
