import { createContext } from 'react';

type ToggleLogoType = () => void;
type ScaleLogoType = (size?: number | undefined) => void;
type LogoSizeType = any;

interface LogoContextType {
  // toggleLogo: ToggleLogoType;
  // scaleLogo: ScaleLogoType;
  logoSize?: LogoSizeType;
}

const LogoContext = createContext<LogoContextType | null>(null);
export default LogoContext;
