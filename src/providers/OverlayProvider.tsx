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

type IconPressCallback = () => void;
interface Props {
  children: React.ReactNode;
}

export function OverlayProvider({ children }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [snackbarState, setSnackbarState] = useState<{
    message: string;
    visible: boolean;
    onIconPressCallback: IconPressCallback;
  }>({ message: '', visible: false, onIconPressCallback: () => {} });

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

  const showSnackbar = (
    message: string,
    onIconPressCallback?: IconPressCallback,
  ) => {
    const callback = onIconPressCallback ?? hideSnackbar;
    setSnackbarState({
      message,
      visible: true,
      onIconPressCallback: callback,
    });
  };

  const hideSnackbar = () => {
    setSnackbarState(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const onDismissSnackbar = () =>
    snackbarState.onIconPressCallback() ?? hideSnackbar();

  const insets = useSafeAreaInsets();
  return (
    <ModalContext value={{ showModal, hideModal }}>
      <SnackbarContext value={{ showSnackbar, hideSnackbar }}>
        {children}
        {modalVisible && (
          /* DISPLAY SNACKBARS WHILE MODALS OPEN CONFIG
           * (SNACKBARS OVERLAY MODALS) */
          <Portal>
            <RNModal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onDismiss={() => {
                setModalVisible(false);
              }}
              testID='Modal'
            >
              <KeyboardAvoidingView
                behavior='height'
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  borderWidth: 3,
                  borderColor: 'red',
                  backgroundColor: backdrop,
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
                        alignSelf: 'center',
                      }
                    : {
                        borderWidth: 6,
                        borderColor: 'orange',
                        position: 'absolute' /* <- Fit inside modal */,
                        alignSelf: 'center',
                      }
                  }
                  testID='Modal Content and Snackbar Container'
                >
                  {modalContent}
                  <Snackbar /* Display within and over Modal */
                    visible={snackbarState.visible}
                    onDismiss={onDismissSnackbar}
                    testID='Snackbar'
                    wrapperStyle={{
                      flex: 1,
                      borderWidth: 6,
                      borderColor: 'orangered',
                      borderStyle: 'dashed',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      paddingBottom: 0 /* Place at abs bottom */,
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
                    action={{
                      label: 'Close',
                      onPress: () => {
                        console.log('Pressed Action Label');
                      },
                    }}
                    onIconPress={() => {
                      snackbarState.onIconPressCallback();
                    }}
                  >
                    {snackbarState.message}
                  </Snackbar>
                </View>
              </KeyboardAvoidingView>
            </RNModal>
          </Portal>
        )}
        {!modalVisible && snackbarState.visible && (
          /* DISPLAY SNACKBARS NO MODAL OPEN CONFIG
           * (SNACKBARS DEFAULT) */
          <>
            {Platform.OS === 'web' ?
              <Snackbar
                visible={snackbarState.visible}
                onDismiss={onDismissSnackbar}
                testID='Snackbar'
                // action={{
                //   label: 'Close',
                //   onPress: () => {
                //     setSnackbarVisible(false);
                //   }}}
                onIconPress={() => {
                  snackbarState.onIconPressCallback();
                }}
              >
                {snackbarState.message}
              </Snackbar>
            : <KeyboardAvoidingView behavior='padding'>
                <Snackbar
                  visible={snackbarState.visible}
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
                  onIconPress={() => {
                    snackbarState.onIconPressCallback();
                  }}
                >
                  {snackbarState.message}
                </Snackbar>
              </KeyboardAvoidingView>
            }
          </>
        )}
      </SnackbarContext>
    </ModalContext>
  );
}
