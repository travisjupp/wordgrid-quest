import { useRef, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Platform, View, TextInput as RNTextInput } from 'react-native';
import { router } from 'expo-router';
import { auth } from 'src/services/firebaseConfig';
import { useAppTheme } from '@theme/themeConfig';

export function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [focusedPasswordField, setFocusedPasswordField] =
    useState<boolean>(false);

  // Retrieve Custom Theme-properties
  const {
    shared: { inputWrapper: sharedInputWrapper },
  } = useAppTheme();

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

  const passwordFieldRef = useRef<RNTextInput | null>(null);

  return (
    <View style={[sharedInputWrapper, { gap: 8 }]} testID='InputWrapper'>
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
        aria-label='Your email address'
        testID='EmailInput'
        returnKeyType='next'
        onSubmitEditing={() => passwordFieldRef.current?.focus()}
        right={<TextInput.Icon icon={'pencil-outline'} />}
      />
      <TextInput
        ref={passwordFieldRef}
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
        aria-label='Your password'
        testID='newPasswordInput'
        returnKeyType='done'
        onFocus={() => {
          setFocusedPasswordField(true);
        }}
        onBlur={() => {
          setFocusedPasswordField(false);
          // Mask P/W when field deselected
          // Breaks show/hide P/W toggle on web, non-web only
          if (Platform.OS !== 'web') setSecureTextEntry(true);
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
        contentStyle={{ height: 50 }}
        style={{ marginTop: 7 }}
        mode='contained'
        onPress={handleSignUp}
      >
        Sign Up
      </Button>
    </View>
  );
}
