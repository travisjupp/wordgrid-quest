import { Logo } from '@components/Logo';
import { Slot, usePathname } from 'expo-router';
import { useAppTheme } from '@theme/themeConfig';
import { PageHeading } from '@components/PageHeading';
import { GuidanceText } from '@components/GuidanceText';
import { ThemeAwareScreenOptions } from '@components/ThemeAwareScreenOptions';
import { Surface } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function PreGameConfigLayout() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const { container } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Surface
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
          container,
          {
            marginTop: insets.top,
            borderColor: 'orange',
            borderStyle: 'dashed',
            borderWidth: 2,
          },
        ]}
        testID='User Auth Content Wrapper'
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
            }}
            testID='User Auth Content Container'
          >
            <PageHeading text='Welcome' />
            <Logo gradient={true} />
            <GuidanceText
              text={isLoginPage ? 'Sign-in to continue' : 'Create an account'}
            />
            <Slot />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
}
