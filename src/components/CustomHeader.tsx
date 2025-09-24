import { Button, Icon, Surface } from 'react-native-paper';
import { CLogo } from '@components/CLogo';
import { Menu } from '@components/Menu';
import { View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@hooks/useTheme';
import { StackHeaderProps } from '@react-navigation/stack';

export default function CustomHeader(props: StackHeaderProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  console.log('StackHeaderProps', props);

  return (
    <Surface
      mode='flat'
      style={{
        borderBottomWidth: 1,
        // borderBottomColor: theme?.colors.outlineVariant,
        borderBottomColor: theme?.colors.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
        paddingTop: insets.top,
      }}
      testID='Custom Header Surface'
    >
      {props.navigation.canGoBack() ?
        <Animated.View
          // entering={SlideInLeft}
          // exiting={SlideOutLeft}
          testID='Back Button View'
        >
          <Button
            onPress={props.navigation.goBack}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 15,
              right: 15,
            }}
            style={
              {
                // borderColor: 'red',
                // borderWidth: 1,
              }
            }
            testID='Back Button'
          >
            <Icon size={24} source='arrow-left' />
          </Button>
        </Animated.View>
      : <View style={{ width: 64 }} testID='Back Button Placeholder' />}
      <CLogo />
      <Menu />
    </Surface>
  );
}
