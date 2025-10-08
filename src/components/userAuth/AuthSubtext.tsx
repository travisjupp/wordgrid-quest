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
  const { preGameConfig } = useAppTheme();
  return (
    <View style={preGameConfig.authScreens.authSubtext.wrapper}>
      {isLoginPage ?
        <View style={preGameConfig.authScreens.authSubtext.wrapper}>
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
        </View>
      : <View style={preGameConfig.authScreens.authSubtext.container}>
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
        </View>
      }
    </View>
  );
}
