import { createContext } from 'react';

const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {console.log('ThemeContext not provided')},
});

export default ThemeContext;
