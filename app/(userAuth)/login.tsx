import { LogIn } from '@components/LogIn';
import { ResetPass } from '@components/ResetPass';
import { Text } from '@components/Text';
import { router } from 'expo-router';
import { useModal } from '@hooks/useModal';

export default function LoginScreen() {
  const { showModal, hideModal } = useModal();
  return (
    <>
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
          showModal(<ResetPass hideModal={hideModal} />);
        }}
      >
        Forgot password?
      </Text>
    </>
  );
}
