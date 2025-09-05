import { Modal as RNModal, View } from "react-native";
import { useAppTheme } from "@theme/themeConfig";
import React from "react";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Modal({ children, modalVisible, setModalVisible }: Props) {
  // Retrieve Custom Theme-properties
  const { centeredView, modal } = useAppTheme();
  return (
    <RNModal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      testID='Modal'
    >
      <View testID='Modal Overlay'
        style={[centeredView, {
          backgroundColor:'rgba(0, 0, 0, .5)'
        }]}
        onPointerDown={() => setModalVisible(!modalVisible)}
      >
        <View
          style={[modal,{
            paddingTop: 15 // Adjust for form-field label
          }]}
          testID='InputWrapper'
        >
          {children} 
        </View>
      </View>
    </RNModal> 
  )
}
