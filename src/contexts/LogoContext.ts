import { createContext } from 'react';

type ToggleLogoType = () => void;
type ScaleLogoType = (size?: number | undefined) => void;

interface LogoContextType {
  toggleLogo: ToggleLogoType;
  scaleLogo: ScaleLogoType;
}

// const LogoContext = createContext({
//   toggleLogo: () => {
//     console.log('LogoContext not provided');
//   },
//   scaleLogo: (size?: number | undefined) => {
//     console.log('LogoContext not provided');
//   },
// });
const LogoContext = createContext<LogoContextType | null>(null);

export default LogoContext;
