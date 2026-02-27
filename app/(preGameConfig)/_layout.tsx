import { Logo } from '@components/Logo';
import { Slot } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { PageHeading } from '@components/PageHeading';
import { GuidanceText } from '@components/GuidanceText';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Dimensions } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useState } from 'react';

export default function PreGameConfigLayout() {
  // Retrieve Custom Properties
  const {
    shared: { centeredContainer },
    colors: { background },
  } = useAppTheme();

  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
  Dimensions.addEventListener('change', ({ window }) => {
    setIsLandscape(window.width > window.height);
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: background }}
      testID='PreGame Config SafeAreaView'
    >
      <ThemeAwareScreenOptions header={false} />
      <KeyboardAvoidingView
        key={isLandscape ? 'KBAV-Landscape' : 'KBAV-Portrait'}
        behavior='height'
        style={[
          centeredContainer,
          {
            borderColor: 'orange',
            borderStyle: 'dashed',
            borderWidth: 2,
          },
        ]}
        testID='PreGame Config KBAV'
      >
        <ScrollView
          // 'never' (Default): The keyboard dismisses on any tap outside the
          // focused input.

          // 'always': The keyboard always stays open, allowing children to
          // handle taps without closing it.

          // 'handled': The keyboard stays open if a child component handles
          // the tap; if the tap isn't handled by a child (e.g., tapping empty
          // space), the ScrollView will dismiss the keyboard.

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
