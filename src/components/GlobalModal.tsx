import { Modal as RNModal, View } from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import React, { useContext, useState } from 'react';
import { Portal } from 'react-native-paper';
import { ModalContent } from '@custom-types/AppTheme';

interface Props {
  children: React.ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  // Retrieve Custom Theme-properties
  const { centeredView, modal } = useAppTheme();

  const showModal = (content: React.ReactNode) => {
    setContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    console.log('hideModal ran');
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Portal>
        <RNModal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          testID='Modal'
        >
          <View
            testID='Modal Overlay'
            style={[
              centeredView,
              {
                backgroundColor: 'rgba(0, 0, 0, .5)',
              },
            ]}
          >
            <View
              style={[
                modal,
                {
                  paddingTop: 15, // Adjust for form-field label
                },
              ]}
              testID='InputWrapper'
            >
              {content}
            </View>
          </View>
        </RNModal>
      </Portal>
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
