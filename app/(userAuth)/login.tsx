import { LogIn } from '@components/LogIn';
import { ResetPass } from '@components/ResetPass';
import { Text } from '@components/Text';
import { router } from 'expo-router';
import { useModal } from '@hooks/useModal';
import { useSnackbar } from '@hooks/useSnackbar';
import Animated, { FlipInYLeft } from 'react-native-reanimated';

export default function LoginScreen() {
  const { showModal, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
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
        <Text variant='bodyLarge'>
          Need an account?
          <Text
            variant='bodyLargeEmphasized'
            onPress={() => {
              router.navigate('/signup');
            }}
          >
            {' '}
            Sign Up
          </Text>
        </Text>
        <Text
          variant='bodyLargeEmphasized'
          onPress={() => {
            showModal(
              <ResetPass hideModal={hideModal} showSnackbar={showSnackbar} />,
            );
          }}
        >
          Forgot password?
        </Text>
    </Animated.View>
  );
}
