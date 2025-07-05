import * as React from 'react';
import { Menu as RNPMenu, Button, Divider } from "react-native-paper";
import { useAppTheme } from "../theme/themeConfig";

const Menu = () => {
  // Menu state
  const [visible, setVisible] = React.useState(false);
  const openRNPMenu = () => setVisible(true);
  const closeRNPMenu = () => setVisible(false);
  // Retrieve Custom Theme-properties
  const {
    // newsurfaceContainer,
    // colors: { brandPrimary },
    colors: { surfaceContainer },
  } = useAppTheme();

  return (
    <RNPMenu
      style={{
        outlineColor: surfaceContainer
      }}
      visible={visible}
      onDismiss={closeRNPMenu}
      anchor={<Button icon="dots-vertical" onPress={openRNPMenu}>Show menu
      </Button>}>
      <RNPMenu.Item onPress={() => {}} title="Item 1" />
      <RNPMenu.Item onPress={() => {}} title="Item 2" />
      <Divider />
      <RNPMenu.Item onPress={() => {}} title="Item 3" />
    </RNPMenu>
  )
};

export default Menu;
