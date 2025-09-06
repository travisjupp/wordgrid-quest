import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Modal } from '@components/Modal';
import { auth } from 'src/services/firebaseConfig';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ResetPass({ setModalVisible, setSnackBarVisible }: Props) {
  const [email, setEmail] = useState<string>('');
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setSnackBarVisible(true);
        setModalVisible(false);
        console.log('Password reset email sent');
      })
      .catch(e => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.error(errorCode, errorMessage);
      });
  };
  return (
    <Modal modalVisible setModalVisible={setModalVisible}>
      <TextInput
        label='Reset Email'
        id='ResetEmailInput'
        placeholder='Email'
        keyboardType='email-address'
        mode='outlined'
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete={Platform.OS === 'ios' ? 'off' : 'email'}
        textContentType='emailAddress' // iOS only (dont use with autoComplete)
        value={email}
        onChangeText={email => setEmail(email)}
        spellCheck={false}
        style={{}}
        aria-label='Your email address'
        testID='EmailInput'
        returnKeyType='done'
        right={<TextInput.Icon icon={'mail'} />}
      />
      <Button
        theme={{ roundness: 0.8 }}
        contentStyle={{ height: 50 }}
        style={{ marginTop: 6 }}
        mode='contained'
        onPress={handlePasswordReset}
      >
        Reset Password
      </Button>
      <Button
        theme={{ roundness: 0.8 }}
        contentStyle={{ height: 50 }}
        style={{ marginTop: 6 }}
        mode='contained'
        onPress={() => {
          setModalVisible(false);
        }}
      >
        Cancel
      </Button>
    </Modal>
  );
}
