import { useRef, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { View, Platform, TextInput as RNTextInput } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { auth } from 'src/services/firebaseConfig';
import { useDialog } from '@hooks/useDialog';
import { Menu } from '@components/Menu';

export function LogIn() {
  const navigator = useNavigation();
  const parentNavigator = navigator.getParent();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const { showDialog, hideDialog } = useDialog();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        showDialog({
          title: 'Load Material?',
          actions: (
            <>
              <Button
                onPress={() => {
                  router.navigate('/loadcat');
                  hideDialog();
                }}
              >
                Load Material
              </Button>
              <Button onPress={() => router.navigate('/')}>Skip</Button>
            </>
          ),
          content:
            'Load your own words with categories and definitions to WordGrid Quest or use the default preloaded material. You can always load material from the Load Material menu later!',
        });
        parentNavigator?.setOptions({
          headerShown: true,
          headerRight: () => <Menu />,
        });
      })
      .catch(e => console.error(e.message));
  };

  const passwordFieldRef = useRef<RNTextInput | null>(null);

  return (
    <View
      style={{
        width: '100%',
        gap: 8,
        display: 'flex',
        // borderWidth: 3,
        // borderColor: 'red',
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
        onSubmitEditing={() => passwordFieldRef.current?.focus()}
        onFocus={() => {
          // handleScaleLogo(50);
        }}
        onBlur={() => {
          // handleScaleLogo();
        }}
      />
      <TextInput
        ref={passwordFieldRef}
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
        //       passwordRules='minlength: 20; required: lower; required: upper; required: digit; required: [-];' // iOS only value={password}
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
