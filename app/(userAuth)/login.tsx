import { LogIn } from '@components/LogIn';
import { ResetPass } from '@components/ResetPass';
import { Text } from '@components/Text';
import { router } from 'expo-router';
import { useState } from 'react';
import { Snackbar } from 'react-native-paper';

export default function SignupScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const onDismissSnackBar = () => setSnackBarVisible(false);
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
          setModalVisible(!modalVisible);
        }}
      >
        Forgot password?
      </Text>
      {modalVisible && (
        <ResetPass
          setModalVisible={setModalVisible}
          setSnackBarVisible={setSnackBarVisible}
        />
      )}
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        wrapperStyle={{ width: 380 }}
        icon={'information-outline'}
      >
        Check email for password reset link
      </Snackbar>
    </>
  );
}
