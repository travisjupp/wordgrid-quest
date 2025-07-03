import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import { Link } from 'expo-router';
import { View } from 'react-native';
import { FAB, Menu, Divider, Button, Switch } from 'react-native-paper';
import { Text } from '@/components/Text';
import ThemeContext from '@/contexts/ThemeContext';
import { useAppTheme } from '@/app/_layout';

export default function HomeScreen() {
  const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);

  // Menu state
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Retrieve Custom Theme-properties
  const {
    container,
    text,
    link,
    // newsurfaceContainer,
    // colors: { brandPrimary },
    colors: { surfaceContainer },
  } = useAppTheme();

  return (
    <View style={container}>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Menu
        style={{
          outlineColor: surfaceContainer
        }}
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
      <Text 
        variant="bodyLarge"
        style={{ fontFamily: "Inter24pt-Black" }}>Home `app/index.tsx`</Text>

      <Text 
        style={{fontFamily: "Inter24pt-Black"}}
      >NO variant, inline style fontFamily: Inter24pt-Black</Text>

      <Text 
        style={{fontFamily: "InriaSerif-Regular"}}
      >NO variant, inline style fontFamily: InriaSerif-Regular</Text>

      <Text>NO variant, NO inline style</Text>

      <Text style={text}>NO variant, object style</Text>

      <Text variant="brandMobile">CUSTOM variant (brandMobile), No inline style</Text>

      <Text variant="letterTileMobile">CUSTOM variant (letterTileMobile), No inline style</Text>

      <Text 
        variant="bodyLarge"
        style={{fontFamily: "Inter24pt-Black"}}
      >YES variant (bodyLarge), inline style fontFamily: "Inter24pt-Black"</Text>

      {/* <Text variant="displayLarge" style={text}>WordGrid Quest</Text> */}
      <Button icon="camera" onTouchMove={() => console.log('Pressed')} mode="contained">SSS</Button>
      <Button mode='outlined'>TEST</Button>
      <Button icon="camera" disabled={true} mode="contained">Disabled</Button>
      <Link style={link} href="/details">View details</Link>
      <Link style={link} href="/bottomSheet">View bottomSheet</Link>
    </View>
  );
}


