import SnackbarContext from '@contexts/SnackbarContext';
import React, { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

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
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackbar}
          testID='Snackbar'
        >
          {message}
        </Snackbar>
      </Portal>
    </SnackbarContext>
  );
}
