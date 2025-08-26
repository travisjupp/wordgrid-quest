import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(user => {
        if (user) router.replace('/profile');
      })
      .catch(e => console.error(e.message));
  };

  // Retrieve Custom Theme-properties
  const {
    container,
  } = useAppTheme();

  return (
    <View
      style={{
        width: '100%',
        gap: 8,
        display: 'flex'
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
        style={{ 
        }}
        testID='EmailInput'
      />
      <TextInput
        label='Choose Password'
        id='PasswordInput'
        placeholder='Password'
        keyboardType='default'
        mode='outlined'
        secureTextEntry={true}
        autoCapitalize='none'
        value={password}
        onChangeText={password => setPassword(password)}
        style={{ 
        }}
        testID='PasswordInput'
      />
      <TextInput
        label='Confirm Password'
        id='PasswordInput'
        placeholder='Password'
        keyboardType='default'
        mode='outlined'
        secureTextEntry={true}
        autoCapitalize='none'
        value={password}
        onChangeText={password => setPassword(password)}
        style={{ 
        }}
        testID='PasswordInput'
      />
      <View style={{ 
        paddingTop: 6,
        width: '100%',
        height: 56,
        display: 'flex',
        justifyContent: 'flex-end'
      }} >
        <Button theme={{ roundness: .8}} 
          style={{
            height: '100%',
            alignSelf: 'stretch',
            display: 'flex',
            justifyContent: 'center'
          }}
          mode='contained' onPress={handleRegister}>Sign Up</Button>
      </View>
    </View>
  );
};

export default SignUp;

