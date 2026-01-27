import {
  View,
  Modal as RNModal,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import BottomSheetContext from '@contexts/BottomSheetContext';
import SnackbarContext from '@contexts/SnackbarContext';
import DialogContext from '@contexts/DialogContext';
import React, { useMemo, useRef, useState } from 'react';
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
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import throttle from 'lodash.throttle';

import { useTheme } from '@hooks/useTheme';
import {
  HideBottomSheet,
  ShowBottomSheet,
  SnapBottomSheet,
  ExpandedBottomSheet,
  SetBottomSheetSnap,
} from '@custom-types/BottomSheetTypes';
import { useAppDispatch } from '@hooks/useAppHooks';
import { setUIReadyForScroll } from '@features/tempMaterial/tempMaterialSlice';

const BOTTOM_SHEET_MAX_WIDTH = 500;
const BOTTOM_SHEET_SNAP_POINT = 300;

interface Props {
  children: React.ReactNode;
}

export function OverlayProvider({ children }: Props) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Retrieve Custom Theme-properties
  const { modal } = useAppTheme();

  // Modal State
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // BottomSheet State
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const [bottomSheetContent, setBottomSheetContent] =
    useState<React.ReactNode>(null);

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

  // BottomSheet Logic
  const { width: screenWidth } = useWindowDimensions();
  /* -- Centering Equation (start_pos = (total_space - item_size)/2) --
   * E.g., Calc a 500px wide BS from 1024px wide Screen:
   * (1024-500)/2 gives us 262 margin on either side,
   * 262*2 = (524) - 1024 gives us our 500 wide bottomsheet */
  const marginInline =
    screenWidth > BOTTOM_SHEET_MAX_WIDTH ?
      (screenWidth - BOTTOM_SHEET_MAX_WIDTH) / 2
    : 15;

  const showBottomSheet: ShowBottomSheet = (content: React.ReactNode) => {
    setBottomSheetContent(content);
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const hideBottomSheet: HideBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
  };

  const snapBottomSheet: SnapBottomSheet = throttle(
    (position, animationConfigs) => {
      bottomSheetRef.current?.snapToPosition(position, animationConfigs);
    },
    100,
  );
  const [snapPoint, setSnapPoint] = useState<string | number>(
    BOTTOM_SHEET_SNAP_POINT,
  );
  const snapPoints = useMemo(() => [snapPoint], [snapPoint]);
  // console.log('SNAP POINTS', snapPoints);

  const setBottomSheetSnap: SetBottomSheetSnap = (
    snapPoint: string | number,
  ) => {
    setSnapPoint(snapPoint);
  };

  const expandedBottomSheet: ExpandedBottomSheet = bottomSheetVisible;

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

  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <ModalContext value={{ showModal, hideModal }}>
      <SnackbarContext value={{ showSnackbar, hideSnackbar }}>
        <DialogContext value={{ showDialog, hideDialog }}>
          <BottomSheetContext
            value={{
              showBottomSheet,
              hideBottomSheet,
              snapBottomSheet,
              expandedBottomSheet,
              setBottomSheetSnap,
            }}
          >
            {children}
            {
              <BottomSheet
                // enablePanDownToClose={true}
                detached={false}
                ref={bottomSheetRef}
                backgroundStyle={{
                  backgroundColor: theme?.colors.surfaceContainer,
                }}
                handleIndicatorStyle={{
                  backgroundColor: theme?.colors.outline,
                }}
                index={-1} /* Hide initial load */
                snapPoints={snapPoints} // Can only remove if Dynamic Sizing enabled
                enableDynamicSizing={true} // If false, provide snapPoints
                containerStyle={{
                  marginBlockStart: insets.top,
                  borderWidth: 4,
                  borderColor: 'purple',
                  borderStyle: 'dashed',
                }}
                style={{
                  marginInline,
                  borderWidth: 4,
                  borderColor: 'yellow',
                  borderStyle: 'dashed',
                }}
                /* Layout Config */
                // handleHeight={24} // Not a prop type
                // containerHeight={0} // Use containerLayoutState instead
                // containerLayoutState={undefined}
                // contentHeight={30} // Not a prop type
                // containerOffset={undefined} // Deprecated
                // topInset={0}
                bottomInset={Platform.select({
                  // ios: insets.bottom,
                  // android: 10,
                })}
                maxDynamicContentSize={250}
                /* Keyboard Config */
                keyboardBehavior='interactive' // Follow KB 'interactive'
                keyboardBlurBehavior='restore' // Follow KB 'restore'
                enableBlurKeyboardOnGesture={false}
                /* Callbacks */
                onChange={idx => {
                  const isSettled = idx >= 0;
                  isSettled ? 
                    dispatch(setUIReadyForScroll(true)) :
                    dispatch(setUIReadyForScroll(false));
                }}
                onAnimate={(
                  // fromIdx, 
                  // toIdx, 
                  // fromPos, 
                  // toPos
                ) => {
                    // console.log(`About to animate:
                    //              IDX: From ${fromIdx} To ${toIdx}
                    //              POS: From ${fromPos} To ${toPos}`);
                  }}
              >
                <BottomSheetView
                  key='BottomSheet-View'
                  focusable={true}
                  style={{
                    borderColor: 'green',
                    borderWidth: 1,
                  }}
                  testID='BottomSheetView'
                >
                  {bottomSheetContent}
                </BottomSheetView>
              </BottomSheet>
            }
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
                      snackbarState.calledFromModal ? 'close' : (
                        snackbarState.icon
                      )
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
          </BottomSheetContext>
        </DialogContext>
      </SnackbarContext>
    </ModalContext>
  );
}
