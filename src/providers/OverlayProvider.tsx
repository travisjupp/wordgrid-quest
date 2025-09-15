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
import { overlay, Portal, Snackbar } from 'react-native-paper';
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
            <KeyboardAvoidingView behavior='height'
              style={{
                flex: 1,
                borderColor: 'blue',
                borderWidth: 4,
                justifyContent: 'center',
                backgroundColor: modalVisible ? backdrop : undefined,
              }}
              testID='Main Wrapper'
            >
              <RNModal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onDismiss={() => {
                  setModalVisible(false);
                }}
                testID='Modal'
              >
                <KeyboardAvoidingView behavior='height'
                  style={{
                    justifyContent: 'center',
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
                    style={
                      Platform.OS === 'web' ?
                        {
                          borderWidth: 6,
                          borderColor: 'purple',
                        }
                      : {
                          borderWidth: 6,
                          borderColor: 'orange',
                          position: 'absolute'
                        }
                    }
                    testID='Modal Content and Snackbar Container'
                  >
                    {modalContent}
                    <Snackbar // display beneath modal
                      visible={snackbarVisible}
                      onDismiss={onDismissSnackbar}
                      testID='Snackbar'
                      wrapperStyle={{
                        flex: 1,
                        borderWidth: 6,
                        borderColor: 'orangered',
                        borderStyle: 'dashed',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        paddingBottom: 0, // place at abs bottom
                        paddingLeft: '5%',
                        paddingRight: '5%',
                        height: '100%',
                        backgroundColor: backdrop,
                      }}
                      style={{
                        borderWidth: 3,
                        margin: 0,
                        borderColor: 'slateblue',
                        borderStyle: 'dashed',
                      }}
                     // action={{
                     //   label: 'Close',
                     //   onPress: () => {
                     //     setSnackbarVisible(false);
                     //   }}}
                      onIconPress={
                          () => {setSnackbarVisible(false)}
                      }
                    >
                      {snackbarMessage}
                    </Snackbar>
                  </View>
                </KeyboardAvoidingView>
              </RNModal>
            </KeyboardAvoidingView>
          </Portal>
        )}
        {!modalVisible && snackbarVisible && (
          <>
            {Platform.OS === 'web' ?
              <Snackbar
                visible={snackbarVisible}
                onDismiss={onDismissSnackbar}
                testID='Snackbar'
               // action={{
               //   label: 'Close',
               //   onPress: () => {
               //     setSnackbarVisible(false);
               //   }}}
                onIconPress={
                  () => {setSnackbarVisible(false)}
                }
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
                 // action={{
                 //   label: 'Close',
                 //   onPress: () => {
                 //     setSnackbarVisible(false);
                 //   }}}
                  onIconPress={
                    () => {setSnackbarVisible(false)}
                  }
                >
                  {snackbarMessage}
                </Snackbar>
              </KeyboardAvoidingView>
            }
          </>
        )}
      </SnackbarContext>
    </ModalContext>
  );
}
