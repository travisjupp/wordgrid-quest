import { AppTheme } from '@custom-types/AppTheme';
import { createContext } from 'react';

type IsDarkThemeType = boolean;
type ToggleThemeType = () => void;
type ThemeType = AppTheme;

interface ThemeContextType {
  isDarkTheme: IsDarkThemeType;
  toggleTheme: ToggleThemeType;
  theme?: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | null>(null);
export default ThemeContext;
