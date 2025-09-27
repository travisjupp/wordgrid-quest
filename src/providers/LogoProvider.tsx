import LogoContext from '@contexts/LogoContext';
import { useAnimatedKeyboard, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

interface Props {
  children?: React.ReactNode;
}

const DEFAULT_LOGO_SIZE = 174.9;
const KEYBOARD_VISIBLE_LOGO_SIZE = 50;

export function LogoProvider({ children }: Props) {

  const keyboard = useAnimatedKeyboard();

  // Logo target size shared value
  const logoSize = useSharedValue(DEFAULT_LOGO_SIZE);
  
  // Derived value for smooth animation on UI thread
  const derivedLogoSize = useDerivedValue(() => {
    if (keyboard.height.value > 0) {
      return withSpring(KEYBOARD_VISIBLE_LOGO_SIZE);
    } else {
      return withSpring(DEFAULT_LOGO_SIZE);
    }
  }, [keyboard.height.value]);

  const contextValue = {
    logoSize: derivedLogoSize,
  }

  return (
    <LogoContext value={contextValue}>{children}</LogoContext>
  );
}
