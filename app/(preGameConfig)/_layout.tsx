import { Logo } from '@components/Logo';
import { Slot } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { PageHeading } from '@components/PageHeading';
import { GuidanceText } from '@components/GuidanceText';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import { Surface } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function PreGameConfigLayout() {
  // Retrieve Custom Properties
  const {
    shared: { centeredContainer },
  } = useAppTheme();

  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.colors.background }}>
      mode='flat'
      style={{
        backgroundColor: theme?.colors.background,
        flex: 1,
      }}
    >
      <ThemeAwareScreenOptions header={false} />
      <KeyboardAvoidingView
        behavior='height'
        style={[
          centeredContainer,
          {
            marginTop: insets.top,
            borderColor: 'orange',
            borderStyle: 'dashed',
            borderWidth: 2,
          },
        ]}
        testID='PreGame Config KBAV'
      >
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              borderColor: 'green',
              borderStyle: 'dashed',
              borderWidth: 4,
              gap: 20,
            }}
            testID='User Auth Content Container'
          >
            <PageHeading />
            <Logo gradient={true} />
            <GuidanceText />
            <Slot />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
    </SafeAreaView>
  );
}
