import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import { auth } from 'src/services/firebaseConfig';

type HideModal = () => void;

type Message = string;
type Icon = string | undefined;
type IconPressCallback = (() => void) | undefined;
type Action = ActionObject | undefined;
// type ActionPressCallback = () => void;
type ActionLabel = string;

interface ActionObject {
  label: ActionLabel;
  onPress: IconPressCallback;
}

interface SnackbarConfig {
  message: Message;
  icon?: Icon;
  iconPressCb?: IconPressCallback;
  action?: Action;
  // actionLabel?: ActionLabel;
  // actionPressCb?: ActionPressCallback;
}

type ShowSnackbar = (snackbarConfig: SnackbarConfig) => void;

interface Props {
  hideModal: HideModal;
  showSnackbar: ShowSnackbar;
}

export function ResetPass({ 
  hideModal, 
  showSnackbar
}: Props) {
  const [email, setEmail] = useState<string>('');
  // pass this from login screen
  // const { showSnackbar } = useSnackbar();

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showSnackbar({
          message: 'Password reset email sent',
          iconPressCb: hideModal,
          icon: 'mail'
        });
        console.log('Password reset email sent');
      })
      .catch(e => {
        const errorCode = e.code;
        const errorMessage = e.message;
        showSnackbar({
          message: errorMessage,
          icon: 'mail',
          iconPressCb: undefined,
          // action: { label: 'LABEL', onPress: () => console.log('TEST ACTION')}
        });
        console.error(errorCode, errorMessage);
      });
  };
  return (
    <Surface
      elevation={0}
      style={{
        gap: 8,
        width: 380,
        padding: 25,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'yellow',
      }}
      testID='ResetPass Surface'
    >
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
        onPress={hideModal}
      >
        Cancel
      </Button>
    </Surface>
  );
}
