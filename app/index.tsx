import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { View } from 'react-native';
import { FAB, Button, Switch } from 'react-native-paper';
import { useAppTheme } from '@theme/themeConfig';
// import { FirebaseTest } from '@features/firebase/firebaseTest';
import { router, useNavigation } from 'expo-router';
import { useTheme } from '@hooks/useTheme';
// import { MajorHUD } from '@features/majorHUD/MajorHUD';

export default function HomeScreen() {
  const { isDarkTheme, toggleTheme } = useTheme();

  // Retrieve Custom Theme-properties
  const { container } = useAppTheme();

  // Screen Options
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      // Hide menu
      headerRight: null,
    });
  }, [navigation]);

  return (
    <View style={container}>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <FAB icon='skull-outline' onPress={() => console.log('Pressed')} />
      {/* <FirebaseTest /> */}
      {/* <Text  */}
      {/*   variant="bodyLarge" */}
      {/*   style={{fontFamily: "InriaSerif-BoldItalic"}}>Home `app/index.tsx`</Text> */}
      {/* <Text  */}
      {/*   style={{fontFamily: "Inter24pt-Black"}} */}
      {/* >NO variant, inline style fontFamily: Inter24pt-Black</Text> */}
      {/**/}
      {/* <MajorHUD /> */}
      {/* <Text  */}
      {/*   style={{fontFamily: "InriaSerif-Regular"}} */}
      {/* >NO variant, inline style fontFamily: InriaSerif-Regular</Text> */}
      {/**/}
      {/* <Text>NO variant, NO inline style</Text> */}
      {/**/}
      {/* <Text style={text}>NO variant, object style</Text> */}
      {/**/}
      <Button
        onPress={() => {
          router.navigate('/profile');
        }}
      >
        Profile
      </Button>
      <Button
        onPress={() => {
          router.navigate('/login');
        }}
      >
        Login
      </Button>
      {/* <Text variant="brand">CUSTOM variant (brand), No inline style</Text> */}
      {/**/}
      {/* <Text variant="letterTile">CUSTOM variant (letterTile), No inline style</Text> */}
      {/* <Text variant="category">CUSTOM variant (category), No inline style</Text> */}
      {/**/}
      {/* <Text  */}
      {/*   variant="bodyLarge" */}
      {/*   style={{fontFamily: "Inter24pt-Black"}} */}
      {/* >YES variant (bodyLarge), inline style fontFamily: Inter24pt-Black</Text> */}
      {/**/}
      {/* {/* <Text variant="displayLarge" style={text}>WordGrid Quest</Text> */}
      {/* <Button icon="camera" onTouchMove={() => console.log('Pressed')} mode="contained">SSS</Button> */}
      {/* <Button mode='outlined'>TEST</Button> */}
      {/* <Button icon="camera" disabled={true} mode="contained">Disabled</Button> */}
    </View>
  );
}
