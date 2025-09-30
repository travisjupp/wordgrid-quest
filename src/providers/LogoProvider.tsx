import LogoContext from '@contexts/LogoContext';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { useDerivedValue, withSpring } from 'react-native-reanimated';

interface Props {
  children?: React.ReactNode;
}

const DEFAULT_LOGO_SIZE = 174.9;
const KEYBOARD_VISIBLE_LOGO_SIZE = 50;

export function LogoProvider({ children }: Props) {
  // const { progress } = useReanimatedKeyboardAnimation();
  const { height } = useReanimatedKeyboardAnimation();

  // Derived value for smooth animation based on K/B height
  const derivedLogoSize = useDerivedValue(() => {
    /* Interpolate (LERP method) the logo size from the initial size to
     * the smaller size based on keyboard progress.
     *
     * Uses intermediate progress values (frame-by-frame) but only works on Android:
     *
     * const derivedLogoSize = useDerivedValue(() => {
     * const currentSize =
     *   progress.value * (KEYBOARD_VISIBLE_LOGO_SIZE - DEFAULT_LOGO_SIZE) +
     *   DEFAULT_LOGO_SIZE;
     * return withSpring(currentSize);
     * }, [progress]); */

    console.log('height.value', height.value);
    if (height.value !== 0) {
      return withSpring(KEYBOARD_VISIBLE_LOGO_SIZE);
    } else {
      return withSpring(DEFAULT_LOGO_SIZE);
    }
  });

  const contextValue = {
    logoSize: derivedLogoSize,
  };

  return <LogoContext value={contextValue}>{children}</LogoContext>;
}
