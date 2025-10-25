import { View, Modal as RNModal, Platform } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import SnackbarContext from '@contexts/SnackbarContext';
import DialogContext from '@contexts/DialogContext';
import React, { useMemo, useState } from 'react';
import {
  Dialog as RNPDialog,
  DialogProps as RNPDialogProps,
  SnackbarProps as RNPSnackbarProps,
  Portal,
  Snackbar as RNPSnackbar,
} from 'react-native-paper';
import * as SnackbarTypes from '@custom-types/SnackbarTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as DialogTypes from '@custom-types/DialogTypes';
import { Text } from '@components/Text';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks/useTheme';

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

  // Dialog State
  const [dialogState, setDialogState] = useState<DialogTypes.DialogState>({
    title: undefined,
    content: undefined,
    icon: undefined,
    visible: false,
    onDismissPressCb: undefined,
    actions: undefined,
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

  // Dialog Logic
  const showDialog = (dialogConfig: DialogTypes.DialogConfig) => {
    const onDismissPressCb = dialogConfig.onDismissPressCb ?? hideDialog;

    setDialogState({
      title: dialogConfig.title,
      content:
      dialogConfig.content ?
        <Text variant='bodyMedium'>{dialogConfig.content}</Text>
        : undefined,
      actions: dialogConfig.actions,
      icon: dialogConfig.icon,
      visible: true,
      onDismissPressCb: onDismissPressCb,
      calledFromModal: dialogConfig.calledFromModal,
    });
  };

  const hideDialog = () => {
    setDialogState(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const dismissDialogFunction = dialogState.onDismissPressCb ?? hideDialog;
  const onDismissDialog = () => {
    dismissDialogFunction();
    hideDialog();
  };

  const RNPDialogProps: RNPDialogProps = {
    visible: dialogState.visible,
    onDismiss: onDismissDialog,
    style: {
      width: 300,
      alignSelf: 'center',
    },
    children: [
      dialogState.icon ?
        <RNPDialog.Icon icon={dialogState.icon} key='RNPD-icon' />
        : undefined,
      dialogState.title ?
        <RNPDialog.Title key='RNPD-title'>{dialogState.title}</RNPDialog.Title>
        : undefined,
      dialogState.content ?
        <RNPDialog.Content key='RNPD-content'>
          {dialogState.content}
        </RNPDialog.Content>
        : undefined,
      dialogState.actions ?
        <RNPDialog.Actions key='RNPD-actions'>
          {dialogState.actions}
        </RNPDialog.Actions>
        : undefined,
    ],
    testID: 'RNPDialog',
  };

  const RNPSnackbarProps: RNPSnackbarProps = {
    visible: snackbarState.visible,
    onDismiss: onDismissSnackbar,
    action: snackbarState.action,
    icon: snackbarState.icon,
    onIconPress: snackbarState.iconPressCb,
    wrapperStyle: modal.overModalSnackbarWrapper,
    style: modal.overModalSnackbar,
    testID: 'RNPSnackbar',
    children: snackbarState.message,
  };

  const snapPoints = useMemo(() => ['24'], []);
  const { theme } = useTheme();

  return (
    <ModalContext value={{ showModal, hideModal }}>
      <SnackbarContext value={{ showSnackbar, hideSnackbar }}>
        <DialogContext value={{ showDialog, hideDialog }}>
          {children}
          <BottomSheet
            backgroundStyle={{
              backgroundColor: theme?.colors.surfaceContainer,
            }}
            handleIndicatorStyle={{
              backgroundColor: theme?.colors.outline,
            }}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            keyboardBlurBehavior='restore'
            containerStyle={{
            }}
            style={{ 
              marginInline: 15,
              flex: 1,
              borderWidth: 1,
              borderColor: 'red'
            }}
          >
            <BottomSheetView
              focusable={true}
              style={{
                borderColor: 'green',
                borderWidth: 1,
              }}
            >
              <BottomSheetTextInput
                value='Input Text'
                style={{
                  alignSelf: 'stretch',
                  padding: 8,
                  marginInline: 10,
                  borderRadius: 4,
                  color: theme?.colors.onSecondaryContainer,
                  borderWidth: .5,
                  borderColor: theme?.colors.onSecondaryContainer,
                  textAlign: 'center',
                  backgroundColor: theme?.colors.secondaryContainer,
                }}
              />
            </BottomSheetView>
          </BottomSheet>
          {dialogState.visible && !modalVisible ?
            <RNPDialog {...RNPDialogProps} />
            : null}
          {modalVisible ?
            /* DISPLAY SNACKBARS WHILE MODALS OPEN CONFIG
             * (SNACKBARS OVERLAY MODALS) */
            <Portal>
              <RNModal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onDismiss={hideModal}
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
                    <RNPSnackbar /* Display within and over Modal */
                      {...RNPSnackbarProps}
                    />
                    <RNPDialog /* Display within and over Modal */
                      {...RNPDialogProps}
                    />
                  </View>
                </KeyboardAvoidingView>
              </RNModal>
            </Portal>
            : null}
          {!modalVisible && snackbarState.visible ?
            /* DISPLAY SNACKBARS NO MODAL OPEN CONFIG
             * (SNACKBARS DEFAULT) */
            <>
              {Platform.OS === 'web' ?
                <RNPSnackbar /* WEB */
                  {...RNPSnackbarProps}
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
                </RNPSnackbar>
                : <KeyboardAvoidingView behavior='padding'>
                  <RNPSnackbar /* MOBILE */
                    {...RNPSnackbarProps}
                    icon={
                      snackbarState.calledFromModal ? 'close' : (
                        snackbarState.icon
                      )
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
                  </RNPSnackbar>
                </KeyboardAvoidingView>
              }
            </>
            : null}
        </DialogContext>
      </SnackbarContext>
    </ModalContext>
  );
}
