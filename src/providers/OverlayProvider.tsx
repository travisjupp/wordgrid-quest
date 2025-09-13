import {
  View,
  Modal as RNModal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import SnackbarContext from '@contexts/SnackbarContext';
import React, { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

export function OverlayProvider({ children }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  // Retrieve Custom Theme-properties
  const {
    colors: { backdrop },
  } = useAppTheme();

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  const insets = useSafeAreaInsets();
  return (
    <ModalContext value={{ showModal, hideModal }}>
      <SnackbarContext value={{ showSnackbar }}>
        {children}
        {modalVisible && (
          <Portal>
            <View
              style={{
                flex: 1,
                borderColor: 'blue',
                borderWidth: 4,
                justifyContent: 'center',
                marginTop: insets.top,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderWidth: 8,
                  borderColor: 'pink',
                  backgroundColor: backdrop,
                }}
                testID='Modal Backdrop'
              >
              </View>
              <RNModal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onDismiss={() => {
                  setModalVisible(!modalVisible);
                }}
                testID='Modal'
              >
                <KeyboardAvoidingView behavior='position'
                  style={{
                    justifyContent: 'flex-end',
                    paddingBottom: 0,
                    alignItems: 'center',
                    flex: 1,
                    borderWidth: 3,
                    borderColor: 'red',
                    marginTop: insets.top,
                  }}
                  testID='Modal Content Wrapper'
                >
                  <View
                    style={{
                      borderWidth: 6,
                      borderColor: 'blue',
                      paddingBottom: snackbarVisible ? 60 : 0,
                    }}
                    testID='Modal Content and Snackbar Wrapper'
                  >
                    {modalContent}
                    <Snackbar // display beneath modal
                      visible={snackbarVisible}
                      onDismiss={onDismissSnackbar}
                      testID='Snackbar'
                      wrapperStyle={
                        {
                          borderWidth: 6,
                          borderColor: 'orange',
                          alignSelf: 'center',
                          paddingBottom: 0, // place at abs bottom
                          height: 'auto',
                        }
                      }
                      style={{
                        borderWidth: 3,
                        margin: 0,
                        borderColor: 'slateblue',
                        borderStyle: 'dashed',
                      }}
                    >
                      {snackbarMessage}
                    </Snackbar>
                  </View>
                </KeyboardAvoidingView>
              </RNModal>
            </View>
          </Portal>
        )
        }
        {(!modalVisible && snackbarVisible) && (
          <>
            {Platform.OS === 'web' ?
              <Snackbar
                visible={snackbarVisible}
                onDismiss={onDismissSnackbar}
                testID='Snackbar'
              >
                {snackbarMessage}
              </Snackbar>
              : <KeyboardAvoidingView behavior='padding'>
                <Snackbar
                  visible={snackbarVisible}
                  onDismiss={onDismissSnackbar}
                  testID='Snackbar'
                  style={{
                    borderWidth: 3,
                    borderColor: 'magenta',
                    borderStyle: 'dotted',
                  }}
                >
                  {snackbarMessage}
                </Snackbar>
              </KeyboardAvoidingView>
            }
          </>)}
      </SnackbarContext>
    </ModalContext>
  );
}
