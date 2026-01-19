import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth } from 'src/services/firebaseConfig';
import { ShowSnackbar } from '@custom-types/SnackbarTypes';
import { HideModal } from '@custom-types/ModalTypes';
import { useAppTheme } from '@theme/themeConfig';

interface Props {
  hideModal: HideModal;
  showSnackbar: ShowSnackbar;
}

export function ResetPass({ hideModal, showSnackbar }: Props) {
  const [email, setEmail] = useState<string>('');

  // Retrieve Custom Theme-properties
  const {
    preGameConfig: {
      authScreens: { resetPassView },
    },
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showSnackbar({
          message: 'Password reset email sent',
          iconPressCb: hideModal,
          icon: 'check',
          calledFromModal: true,
        });
        console.log('Password reset email sent');
      })
      .catch(e => {
        const errorCode = e.code;
        const errorMessage = e.message;
        showSnackbar({
          message: errorMessage,
          icon: 'alert',
          calledFromModal: true,
        });
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <View style={[sharedInputWrapper, resetPassView]} testID='ResetPass View'>
      <TextInput
        label='Reset Email'
        id='ResetEmailInput'
        placeholder='Email'
        keyboardType='email-address'
        mode='outlined'
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete={Platform.OS === 'ios' ? 'off' : 'email'}
        textContentType='emailAddress' /* <-- iOS only (dont use with autoComplete) */
        value={email}
        onChangeText={email => setEmail(email)}
        spellCheck={false}
        style={{
          marginTop: -6,
        }}
        aria-label='Your email address'
        testID='EmailInput'
        returnKeyType='done'
        right={<TextInput.Icon icon={'mail'} />}
      />
      <Button
        contentStyle={{ height: 50 }}
        mode='contained'
        onPress={handlePasswordReset}
      >
        Reset Password
      </Button>
      <Button
        contentStyle={{ height: 50 }}
        mode='contained'
        onPress={hideModal}
      >
        Cancel
      </Button>
    </View>
  );
}
