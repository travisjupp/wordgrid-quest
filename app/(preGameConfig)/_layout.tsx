import { Logo } from '@components/Logo';
import { Slot } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { PageHeading } from '@components/PageHeading';
import { GuidanceText } from '@components/GuidanceText';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  View,
  ScrollView,
  LayoutChangeEvent,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useBottomSheetCustom } from '@hooks/useBottomSheet';

export default function PreGameConfigLayout() {
  // Retrieve Custom Properties
  const {
    shared: { centeredContainer },
    colors: { background },
  } = useAppTheme();

  const { snapBottomSheet, expandedBottomSheet } = useBottomSheetCustom();
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const handleBottomSheetLayout = (id: string, event: LayoutChangeEvent) => {
    if (Platform.OS !== 'web' && expandedBottomSheet) {
      const { height, y } = event.nativeEvent.layout;
      const obfuscation = 145;
      let snapHeight = screenHeight - y - height - insets.bottom - insets.top;
      snapHeight += obfuscation;
      snapBottomSheet(snapHeight);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: background }}
      testID='PreGame Config SafeAreaView'
    >
        <ThemeAwareScreenOptions header={false} />
        <KeyboardAvoidingView
          behavior='height'
          style={[
            centeredContainer,
            {
              // marginTop: insets.top,
              borderColor: 'orange',
              borderStyle: 'dashed',
              borderWidth: 2,
            },
          ]}
          testID='PreGame Config KBAV'
        >
          <ScrollView
            // onLayout={(event) => handleLayout('UACS', event)}
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              borderColor: 'blue',
              borderStyle: 'dotted',
              borderWidth: 2,
            }}
            testID='PreGame Config ScrollView'
          >
            <View
              // Get the distance from UACC to top of Viewport (UACS)
              // onLayout={event => handleBottomSheetLayout('UACC', event)}
              style={{
                alignItems: 'center',
                borderColor: 'green',
                borderStyle: 'dashed',
                borderWidth: 4,
                gap: 20,
              }}
              testID='PreGame Config Content Container'
            >
              <PageHeading />
              <Logo gradient={true} />
              <GuidanceText />
              <Slot />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
