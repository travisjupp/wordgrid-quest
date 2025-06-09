import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import { Link } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme, Text, FAB, Menu, Divider, Button, Switch } from 'react-native-paper';
import ThemeContext from './context/ThemeContext';

export default function HomeScreen() {
  const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgb(19 37 64)',
      backgroundColor: theme.colors.surface,
    },
    text: {
      color: theme.colors.onSurface,
      // fontSize: 45
    },
    link: {
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      fontSize: 26
    },
    switch: {
      borderColor: '#00ff00',
    },
  });

  return (
    <View style={styles.container}>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button icon="dots-vertical" onPress={openMenu}>Show menu
        </Button>}>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
      <FAB
        icon="ladybug"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="bird"
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="skull-outline"
        onPress={() => console.log('Pressed')}
      />
      <Text variant="bodyLarge">Home `app/index.tsx`</Text>
      <Text variant="displayLarge" style={styles.text}>TXCT</Text>
      <Button icon="camera" onTouchMove={() => console.log('Pressed')} mode="contained">SSS</Button>
      <Button mode='outlined'>TEST</Button>
      <Button icon="camera" disabled={true} mode="contained">Disabled</Button>
      <Link style={{color: theme.colors.onSurface}} href="/details">View details</Link>
      <Link style={styles.link} href="/bottomSheet">View bottomSheet</Link>
    </View>
  );
}


