import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as React from 'react';
import { View } from 'react-native';
import { FAB, Button, Switch } from 'react-native-paper';
import { Text } from '@components/Text';
import ThemeContext from '@contexts/ThemeContext';
import { useAppTheme } from '@theme/themeConfig';
import Timer from '@features/timer/Timer';
import TopicFrame from '@components/TopicFrame';
// import * as useFonts from 'expo-font';

export default function HomeScreen() {
  const { isDarkTheme, toggleTheme } = React.useContext(ThemeContext);

// if (Platform.OS === "ios") {
// console.log('loaded ios fonts', useFonts.getLoadedFonts());
//   }
  // Retrieve Custom Theme-properties
  const {
    container,
    text,
  } = useAppTheme();

  const definitionsArray = [
    "This is the first paragraph. A little longer to see how it wraps.",
    "Here is the second paragraph.  It's also quite informative and can be a bit lengthy to showcase the carousel's adaptability.",
    "And finally, the third paragraph. This one provides a concise summary of the key points discussed earlier."
  ];
  const category = 'Asynchronous JS';
  return (
    <View style={container}>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Timer />
      <TopicFrame 
        category={category}
        definitions={definitionsArray}
        topicframeWidth={200}
        topicframeHeight={200}
      />
      <FAB
        icon="skull-outline"
        onPress={() => console.log('Pressed')}
      />
      <Text 
        variant="bodyLarge"
        style={{fontFamily: "InriaSerif-BoldItalic"}}>Home `app/index.tsx`</Text>
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


