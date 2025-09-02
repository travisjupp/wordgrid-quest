import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Platform, View } from 'react-native';
import { router } from 'expo-router';
import { auth } from 'src/services/firebaseConfig';
import { Text } from './Text';

export function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);

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
        autoComplete={ Platform.OS === 'ios' ? 'off' : 'email' }
        textContentType='emailAddress' // iOS only (dont use with autoComplete)
        value={email}
        onChangeText={email => setEmail(email)}
        style={{}}
        testID='EmailInput'
        returnKeyType='next'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        right={
          <TextInput.Icon
            icon={'pencil-outline'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
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
        autoComplete={ Platform.OS === 'ios' ? 'off' : 'new-password' }
        textContentType='newPassword'// iOS only (dont use with autoComplete)
        passwordRules='minlength: 20; required: lower; required: upper; required: digit; required: [-];' // iOS only
        value={newPassword}
        onChangeText={newPassword => setNewPassword(newPassword)}
        style={{}}
        testID='newPasswordInput'
        returnKeyType='done'
        right={
          focused ?
          <TextInput.Icon
            icon={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
          :
          <TextInput.Icon
            icon={'pencil-outline'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <View
        style={{
          paddingTop: 6,
          width: '100%',
          height: 56,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
     {focused && <Text>focused</Text>}
        <Button
          theme={{ roundness: 0.8 }}
          style={{
            height: '100%',
            alignSelf: 'stretch',
            display: 'flex',
            justifyContent: 'center',
          }}
          mode='contained'
          onPress={handleSignUp}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}
