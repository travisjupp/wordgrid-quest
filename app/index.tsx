import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { MD3DarkTheme as DefaultTheme, 
  FAB, Menu, Divider, PaperProvider, Button } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    // secondary: 'yellow',
  },
};

export default function HomeScreen() {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider theme={theme}>
      <View
        style={styles.container}>
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
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
        <FAB
          icon="bird"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
        <FAB
          icon="skull-outline"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
        <Text style={styles.text}>Home `app/index.tsx`</Text>
        <Button icon="camera" mode="contained">SSS</Button>
        <Button icon="camera" disabled={true} mode="contained">Disabled</Button>
        <Link style={styles.link} href="/details">View details</Link>
        <Link style={styles.link} href="/flex">View flex</Link>
        <Link style={styles.link} href="/bottomSheet">View bottomSheet</Link>
        <Link style={styles.link} href="/test">View bottomSheet (test.js)</Link>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(19 37 64)',
  },
  text: {
    color: 'purple',
    fontSize: 45
  },
  link: {
    color: 'cornflowerblue',
    fontWeight: 'bold',
    fontSize: 26
  },
  fab: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '50%',
  },
});

