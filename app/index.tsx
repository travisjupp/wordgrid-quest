import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { FAB, Button, Switch } from 'react-native-paper';
import { Text } from '@components/Text';
import ThemeContext from '@contexts/ThemeContext';
import { useAppTheme } from '@theme/themeConfig';
import Timer from '@features/timer/Timer';
import CategoryHeader from '@components/CategoryHeader';
import * as useFonts from 'expo-font';

export default function HomeScreen() {
  const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);

if (Platform.OS === "ios") {
console.log('loaded ios fonts', useFonts.getLoadedFonts());
  }
  // Retrieve Custom Theme-properties
  const {
    container,
    text,
  } = useAppTheme();

  return (
    <View style={container}>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Timer />
      <CategoryHeader headerText="Asynchronous" />
      <FAB
        icon="skull-outline"
        onPress={() => console.log('Pressed')}
      />
      <Text 
        variant="bodyLarge"
        style={{ fontFamily: "InriaSerif-BoldItalic" }}>Home `app/index.tsx`</Text>
      <Text 
        style={{fontFamily: "Inter24pt-Black"}}
      >NO variant, inline style fontFamily: Inter24pt-Black</Text>

      <Text 
        style={{fontFamily: "InriaSerif-Regular"}}
      >NO variant, inline style fontFamily: InriaSerif-Regular</Text>

      <Text>NO variant, NO inline style</Text>

      <Text style={text}>NO variant, object style</Text>

      <Text variant="brand">CUSTOM variant (brand), No inline style</Text>

      <Text variant="letterTile">CUSTOM variant (letterTile), No inline style</Text>
      <Text variant="category">CUSTOM variant (category), No inline style</Text>

      <Text 
        variant="bodyLarge"
        style={{fontFamily: "Inter24pt-Black"}}
      >YES variant (bodyLarge), inline style fontFamily: Inter24pt-Black</Text>

      {/* <Text variant="displayLarge" style={text}>WordGrid Quest</Text> */}
      <Button icon="camera" onTouchMove={() => console.log('Pressed')} mode="contained">SSS</Button>
      <Button mode='outlined'>TEST</Button>
      <Button icon="camera" disabled={true} mode="contained">Disabled</Button>
    </View>
  );
}


