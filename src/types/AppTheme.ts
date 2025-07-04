export interface AppTheme {
  animation: object;
  colors: {
    backdrop: string;
    background: string;
    elevation: object;
    error: string;
    errorContainer: string;
    inverseOnSurface: string;
    onBackground: string;
    onError: string;
    onErrorContainer: string;
    onPrimary: string;
    onPrimaryContainer: string;
    onSecondary: string;
    onSecondaryContainer: string;
    onSurface: string;
    onSurfaceDisabled: string;
    onSurfaceVariant: string;
    onTertiary: string;
    onTertiaryContainer: string;
    outline: string;
    outlineVariant: string;
    primary: string;
    primaryContainer: string;
    scrim: string;
    secondary: string;
    secondaryContainer: string;
    shadow: string;
    surface: string;
    surfaceContainer: string; // custom
    surfaceDisabled: string;
    surfaceVariant: string;
    tertiary: string;
    tertiaryContainer: string;
  };
  container: object;
  dark: boolean;
  fonts: {
    bodyLarge: object;
    bodyMedium: object;
    bodySmall: object;
    brandMobile: object; // custom
    default: object;
    displayLarge: object;
    displayMedium: object;
    displaySmall: object;
    headlineLarge: object;
    headlineMedium: object;
    headlineSmall: object;
    labelLarge: object;
    labelMedium: object;
    labelSmall: object;
    letterTileMobile: object; // custom
    titleLarge: object;
    titleMedium: object;
    titleSmall: object;
  };
  isV3: boolean;
  link: object;
  logo: object; // custom
  newProp: object;
  mode: string;
  roundness: number;
  text: object;
  version: number;
}
