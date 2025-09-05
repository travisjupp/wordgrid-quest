import { createContext } from 'react';

const LogoContext = createContext({
  toggleLogo: () => {
    console.log('LogoContext not provided');
  },
  scaleLogo: (size?: number | undefined) => {
    console.log('LogoContext not provided');
  },
});

export default LogoContext;
