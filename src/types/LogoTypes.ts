import { DerivedValue } from 'react-native-reanimated';

export type DefaultLogoSize = number;
export type KeyboardVisibleLogoSize = number;

type LogoSizeType = DerivedValue<DefaultLogoSize | KeyboardVisibleLogoSize>;

export interface LogoContextType {
  logoSize?: LogoSizeType;
}
