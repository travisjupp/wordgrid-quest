import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { View } from 'react-native';
import { router } from 'expo-router';

export function LogIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleRegister = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
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
        value={email}
        onChangeText={email => setEmail(email)}
        style={{}}
        testID='EmailInput'
      />
      <TextInput
        label='Password'
        id='PasswordInput'
        placeholder='Password'
        keyboardType='default'
        mode='outlined'
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        value={password}
        onChangeText={password => setPassword(password)}
        style={{}}
        testID='PasswordInput'
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
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
        <Button
          theme={{ roundness: 0.8 }}
          style={{
            height: '100%',
            alignSelf: 'stretch',
            display: 'flex',
            justifyContent: 'center',
          }}
          mode='contained'
          onPress={handleRegister}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
}
