import { createContext } from 'react';

type IsDarkThemeType = boolean;
type ToggleThemeType = () => void;

interface ThemeContextType {
  isDarkTheme: IsDarkThemeType;
  toggleTheme: ToggleThemeType;
}

const ThemeContext = createContext<ThemeContextType | null>(null);
export default ThemeContext;
