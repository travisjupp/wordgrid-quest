import {
  View,
  Modal as RNModal,
  Platform,
} from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import SnackbarContext from '@contexts/SnackbarContext';
import React, { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import * as SnackbarTypes from '@custom-types/SnackbarTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

interface Props {
  children: React.ReactNode;
}

export function OverlayProvider({ children }: Props) {
  const insets = useSafeAreaInsets();

  // Retrieve Custom Theme-properties
  const { modal } = useAppTheme();

  // Modal State
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // Snackbar State
  const [snackbarState, setSnackbarState] =
    useState<SnackbarTypes.SnackbarState>({
      message: '',
      icon: undefined,
      visible: false,
      iconPressCb: undefined,
      action: undefined,
      calledFromModal: undefined,
    });

  // Modal Logic
  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  // Snackbar Logic
  const showSnackbar = (snackbarConfig: SnackbarTypes.SnackbarConfig) => {
    const icon = snackbarConfig.icon ?? 'close';
    const iconPressCallback = snackbarConfig.iconPressCb ?? hideSnackbar;

    setSnackbarState({
      message: snackbarConfig.message,
      icon: icon,
      visible: true,
      iconPressCb: iconPressCallback,
      action: snackbarConfig.action,
      calledFromModal: snackbarConfig.calledFromModal,
    });
  };

  const hideSnackbar = () => {
    setSnackbarState(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const dismissSnackbarFunction = snackbarState.iconPressCb ?? hideSnackbar;
  const onDismissSnackbar = () => {
    dismissSnackbarFunction();
    hideSnackbar(); // Ensure orphaned Snackbars hide
  };

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
                style={[modal.contentWrapper, { marginTop: insets.top }]}
                testID='Modal Content Wrapper'
              >
                <View
                  style={modal.contentAndSnackbarContainer}
                  testID='Modal Content and Snackbar Container'
                >
                  {modalContent}
                  <Snackbar /* Display within and over Modal */
                    visible={snackbarState.visible}
                    onDismiss={onDismissSnackbar}
                    action={snackbarState.action}
                    icon={snackbarState.icon}
                    onIconPress={snackbarState.iconPressCb}
                    wrapperStyle={modal.overModalSnackbarWrapper}
                    style={modal.overModalSnackbar}
                    testID='Over Modal Snackbar'
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
                action={snackbarState.action}
                icon={
                  snackbarState.calledFromModal ? 'close' : snackbarState.icon
                }
                onIconPress={
                  snackbarState.calledFromModal ? hideSnackbar : (
                    snackbarState.iconPressCb
                  )
                }
                wrapperStyle={modal.defaultWebSnackbarWrapper}
                style={modal.defaultWebSnackbar}
                testID='Default Web Snackbar'
              >
                {snackbarState.message}
              </Snackbar>
            : <KeyboardAvoidingView behavior='padding'>
                <Snackbar
                  visible={snackbarState.visible}
                  onDismiss={onDismissSnackbar}
                  action={snackbarState.action}
                  icon={
                    snackbarState.calledFromModal ? 'close' : snackbarState.icon
                  }
                  onIconPress={
                    snackbarState.calledFromModal ? hideSnackbar : (
                      snackbarState.iconPressCb
                    )
                  }
                  wrapperStyle={modal.defaultMobileSnackbarWrapper}
                  style={modal.defaultMobileSnackbar}
                  testID='Default Mobile Snackbar'
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
