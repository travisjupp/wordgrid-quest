import * as React from 'react';
import { Menu as RNPMenu, Button, Divider, Icon } from "react-native-paper";
import { router } from 'expo-router';
import { useAppTheme } from "../theme/themeConfig";


const Menu = () => {
  // Menu state
  const [visible, setVisible] = React.useState(false);
  const openRNPMenu = () => setVisible(true);
  const closeRNPMenu = () => setVisible(false);
  // Retrieve Custom Theme-properties
  const {
    menu,
    link,
  } = useAppTheme();

  return (
    <RNPMenu
      style={menu}
      visible={visible}
      onDismiss={closeRNPMenu}
      anchor={
        <Button onPress={openRNPMenu}>
          <Icon size={25} source="dots-vertical" />
        </Button>
      }
    >
      <RNPMenu.Item onPress={() => {
        router.navigate('/profile'); closeRNPMenu()
      }} title="Profile" leadingIcon="account-circle" />

      <RNPMenu.Item onPress={() => {
        router.navigate('/settings'); closeRNPMenu()
      }} title="Settings" leadingIcon="cog-outline" />

      <RNPMenu.Item onPress={() => {
        router.navigate('/leaderboard'); closeRNPMenu()
      }} title="Leaderboard" leadingIcon="star-circle-outline" />

      <RNPMenu.Item onPress={() => {
        router.navigate('/upload'); closeRNPMenu()
      }} title="Load Material" leadingIcon="upload" />
      <Divider />
    </RNPMenu>
  )
};

export default Menu;
