import { LogIn } from '@components/LogIn';
import { Text } from '@components/Text';
import { router } from 'expo-router';

export default function SignupScreen() {
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
    </>
  );
}
