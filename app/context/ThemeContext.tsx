import { createContext } from "react";

const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export default ThemeContext;
