import { LogIn } from '@components/LogIn';
import { ResetPass } from '@components/ResetPass';
import { Text } from '@components/Text';
import { router } from 'expo-router';
import { useModal } from '@hooks/useModal';
import { ModalProvider } from '@providers/ModalProvider';
import { SnackbarProvider } from '@providers/SnackbarProvider';
import { OverlayProvider } from '@providers/OverlayProvider';
import { useSnackbar } from '@hooks/useSnackbar';

export default function LoginScreen() {
  const { showModal, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
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
          showModal(
            <OverlayProvider>
                <ResetPass hideModal={hideModal} showSnackbar={showSnackbar} />
            </OverlayProvider>
          );
        }}
      >
        Forgot password?
      </Text>
    </>
  );
}
