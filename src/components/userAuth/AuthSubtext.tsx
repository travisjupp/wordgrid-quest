import { Text } from '@components/Text';
import { router, usePathname } from 'expo-router';
import { ResetPass } from '@components/userAuth/ResetPass';
import { useModal } from '@hooks/useModal';
import { useSnackbar } from '@hooks/useSnackbar';
import { useAppTheme } from '@theme/themeConfig';
import { View } from 'react-native';

export function AuthSubtext() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const { showModal, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { authSubtext } = useAppTheme();
  return (
    <View style={authSubtext}>
      {isLoginPage ?
        <>
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
        </>
      : <Text variant='bodyLarge'>
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
      }
    </View>
  );
}
