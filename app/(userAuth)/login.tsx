import { LogIn } from '@components/LogIn';
import Animated, { FlipInYLeft } from 'react-native-reanimated';
import AuthSubtext from '@components/AuthSubtext';

export default function LoginScreen() {
  return (
    <Animated.View
      entering={FlipInYLeft}
      testID='Animated View'
      style={{
        alignItems: 'center',
        width: 330,
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
      }}
    >
      <LogIn />
      <AuthSubtext />
    </Animated.View>
  );
}
