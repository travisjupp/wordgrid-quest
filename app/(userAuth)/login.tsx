import { LogIn } from '@components/LogIn';
import { ResetPass } from '@components/ResetPass';
import { Text } from '@components/Text';
import { router } from 'expo-router';
import { useState } from 'react';

export default function SignupScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
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
        />
      )}
    </>
  );
}
