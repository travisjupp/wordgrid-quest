import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { View } from 'react-native';
import { FAB, Button, Switch } from 'react-native-paper';
import { useAppTheme } from '@theme/themeConfig';
// import { FirebaseTest } from '@features/firebase/firebaseTest';
import { router } from 'expo-router';
import { useTheme } from '@hooks/useTheme';
import { useModal } from '@hooks/useModal';
import { useDialog } from '@hooks/useDialog';
import { Text } from '@components/Text';
import { useSnackbar } from '@hooks/useSnackbar';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
// import { MajorHUD } from '@features/majorHUD/MajorHUD';

export default function HomeScreen() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { showModal, hideModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { showDialog, hideDialog } = useDialog();

  // Retrieve Custom Theme-properties
  const { container } = useAppTheme();

  return (
    <>
      <ThemeAwareScreenOptions header menu />
      <View style={container}>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        <FAB icon='skull-outline' onPress={() => console.log('Pressed')} />
        <Text
          onPress={() =>
            showModal(
              <View
                style={{
                  width: 400,
                }}
              >
                <Button
                  onPress={() =>
                    showSnackbar({ message: 'SNACKBAR ABOVE MODAL?' })
                  }
                >
                  SHOW SNACKBAR FROM MODAL
                </Button>
                <Button
                  onPress={() =>
                    showDialog({
                      title: 'DIALOG ABOVE MODAL?',
                      icon: 'cat',
                      content: 'Content',
                    })
                  }
                >
                  SHOW DIALOG FROM MODAL
                </Button>
                <Button onPress={hideModal}>x</Button>
              </View>,
            )
          }
        >
          SHOW MODAL
        </Text>
        <Text onPress={() => showSnackbar({ message: 'TEST' })}>
          SHOW SNACKBAR
        </Text>
        <Text
          onPress={() =>
            showDialog({
              title: 'DIALOG TEST TITLE',
              // content: 'This is the Dialog content',
              content: <Text variant='timer'>This is the Dialog content</Text>,
              actions: (
                <>
                  <Button onPress={hideDialog}>HIDE DIALOG</Button>
                  <Button onPress={hideDialog}>HIDE DIALOG</Button>
                </>
              ),
              icon: 'eye',
            })
          }
        >
          SHOW DIALOG
        </Text>
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
            router.navigate({
              pathname: '/loaditems',
              params: { itemId: '123' },
            });
          }}
        >
          Loaditems
        </Button>
        <Button
          onPress={() => {
            router.navigate({
              pathname: '/loadcat',
              params: { itemId: '123' },
            });
          }}
        >
          Loadcat
        </Button>
        <Button
          onPress={() => {
            router.navigate({
              pathname: '/profile',
              params: { itemId: '123' },
            });
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
        <Button
          onPress={() => {
            router.navigate('/upload');
          }}
        >
          Upload
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
    </>
  );
}
