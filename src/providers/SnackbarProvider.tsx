import SnackbarContext from '@contexts/SnackbarContext';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Portal, Snackbar, Surface } from 'react-native-paper';

interface Props {
  children: React.ReactNode;
}

export function SnackbarProvider({ children }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const showSnackbar = (message: string) => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackbar = () => setVisible(false);

  return (
    <SnackbarContext value={{ showSnackbar }}>
      {children}
      <Portal>
        {Platform.OS === 'web' ?
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackbar}
            testID='Snackbar'
          >
            {message}
          </Snackbar>
        : <KeyboardAvoidingView behavior='padding'>
            <View
              style={{
                height: '100%',
              }}
            >
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackbar}
                testID='Snackbar'
              >
                {message}
              </Snackbar>
            </View>
          </KeyboardAvoidingView>
        }
      </Portal>
    </SnackbarContext>
  );
}
