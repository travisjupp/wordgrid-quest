import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Platform, View } from 'react-native';
import { router } from 'expo-router';
import { auth } from 'src/services/firebaseConfig';
import { useLogo } from '@hooks/useLogo';

export function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [focusedPasswordField, setFocusedPasswordField] =
    useState<boolean>(false);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, newPassword)
      .then(userCredential => {
        const user = userCredential.user;
        if (user) router.replace('/login');
      })
      .catch(e => {
        const errorCode = e.code;
        const errorMessage = e.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <View
      style={{
        width: '100%',
        gap: 8,
        display: 'flex',
      }}
      testID='InputWrapper'
    >
      <TextInput
        label='Email'
        id='EmailInput'
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
        returnKeyType='next'
        onFocus={() => {
          // handleScaleLogo(12);
        }}
        onBlur={() => {
          // handleScaleLogo();
        }}
        right={<TextInput.Icon icon={'pencil-outline'} />}
      />
      <TextInput
        label='Choose Password'
        id='newPasswordInput'
        placeholder='Password'
        keyboardType='default'
        mode='outlined'
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete={Platform.OS === 'ios' ? 'off' : 'new-password'}
        textContentType='newPassword' // iOS only (dont use with autoComplete)
        passwordRules='minlength: 20; required: lower; required: upper; required: digit; required: [-];' // iOS only
        value={newPassword}
        onChangeText={newPassword => setNewPassword(newPassword)}
        spellCheck={false}
        style={{}}
        aria-label='Your password'
        testID='newPasswordInput'
        returnKeyType='done'
        onFocus={() => {
          setFocusedPasswordField(true);
          // handleScaleLogo(75);
        }}
        onBlur={() => {
          setFocusedPasswordField(false);
          // Mask P/W when field deselected
          // Breaks show/hide P/W toggle on web, non-web only
          if (Platform.OS !== 'web') setSecureTextEntry(true);
          // handleScaleLogo();
        }}
        right={
          <TextInput.Icon
            icon={
              focusedPasswordField ?
                secureTextEntry ?
                  'eye-off-outline'
                : 'eye-outline'
              : 'pencil-outline'
            }
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            onPointerLeave={() => {
              // Mask P/W on mouseOut (Web)
              setSecureTextEntry(true);
            }}
          />
        }
      />
      <Button
        theme={{ roundness: 0.8 }}
        contentStyle={{ height: 50 }}
        style={{ marginTop: 6 }}
        mode='contained'
        onPress={handleSignUp}
      >
        Sign Up
      </Button>
    </View>
  );
}
