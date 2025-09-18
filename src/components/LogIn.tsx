import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { View, Platform } from 'react-native';
import { router } from 'expo-router';
import { auth } from 'src/services/firebaseConfig';

export function LogIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        if (user) router.replace('/profile');
      })
      .catch(e => console.error(e.message));
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
      />
      <TextInput
        label='Password'
        id='PasswordInput'
        placeholder='Password'
        keyboardType='default'
        mode='outlined'
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        autoCorrect={false}
        autoComplete={Platform.OS === 'ios' ? 'off' : 'current-password'}
        textContentType='password' // iOS only (dont use with autoComplete)
        //       passwordRules='minlength: 20; required: lower; required: upper; required: digit; required: [-];' // iOS only
        value={password}
        onChangeText={password => setPassword(password)}
        spellCheck={false}
        style={{}}
        aria-label='Your password'
        testID='PasswordInput'
        returnKeyType='done'
        onBlur={() => {
          // Mask P/W when field deselected
          // Breaks show/hide P/W toggle on web, non-web only
          if (Platform.OS !== 'web') setSecureTextEntry(true);
        }}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
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
        onPress={handleSignIn}
      >
        Sign In
      </Button>
    </View>
  );
}
