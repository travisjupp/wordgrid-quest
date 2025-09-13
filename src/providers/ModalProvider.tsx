import { Modal as RNModal } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import React, { useState } from 'react';
import { Portal, Surface } from 'react-native-paper';

interface Props {
  children: React.ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  // Retrieve Custom Theme-properties
  const {
    centeredView,
    modal,
    colors: { backdrop },
  } = useAppTheme();

  const showModal = (content: React.ReactNode) => {
    setContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext value={{ showModal, hideModal }}>
      {children}
      <Portal>
        {modalVisible && (
          <Surface
            style={[
              {
                backgroundColor: backdrop,
                height: '100%',
                width: '100%',
                borderWidth: 5,
                borderColor: 'slateblue',
              },
            ]}
            testID='Modal Backdrop'
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
              <Surface
                elevation={0}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderWidth: 2,
                  borderColor: 'red',
                  top: -45, // Avoid Snackbar Occlusion
                }}
                testID='Modal Content Wrapper'
              >
                {content}
              </Surface>
            </RNModal>
          </Surface>
        )}
      </Portal>
    </ModalContext>
  );
}
