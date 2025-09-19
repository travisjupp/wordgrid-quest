import { SignUp } from '@components/SignUp';
import { Text } from '@components/Text';
import { router } from 'expo-router';
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
      <Text variant='bodyLarge'>
        Have an account?
        <Text
          variant='bodyLargeEmphasized'
          onPress={() => {
            router.navigate('/login');
          }}
        >
          {' '}
          Sign In
        </Text>
      </Text>
    </Animated.View>
  );
}
