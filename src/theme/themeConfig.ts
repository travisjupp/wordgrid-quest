import { MD3LightTheme as DefaultTheme, MD3DarkTheme, configureFonts, useTheme } from 'react-native-paper';
import { Platform, StyleSheet } from 'react-native';
import { AppTheme } from '../types/AppTheme';


const fontConfig = {
  brandMobile: {
    fontSize: 30,
    fontFamily: 'InriaSerif-Regular',
  },
  letterTileMobile: {
    fontSize: 38,
    fontFamily: 'Inter24pt-Black',
  },
  // fontFamily: 'Inter24pt-Black', // override all variants (only if no variants)
  // override property for existing variant
  bodyLarge: {
    fontFamily: 'Inter24pt-Black',
  },
  // If any component uses Paper's Text component, without 
  // specified variant, then *default* variant is applied
  default: {
    fontSize: 12,
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: undefined,
    letterSpacing: 0,
    lineHeight: 20,
  },
};
// console.log('MD3DarkTheme', MD3DarkTheme);

// Build theme-variant-based theme object
export const themeBuilder = (isDarkTheme: boolean) => {
  const themeVariant = isDarkTheme ? MD3DarkTheme : DefaultTheme;
  const customProperties =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeVariant.colors.surface,
    },
    text: {
      color: themeVariant.colors.onSurface,
      fontFamily: 'Inter24pt-Black',
      // fontSize: 45
    },
    link: {
      color: themeVariant.colors.onSurface,
      fontWeight: 'bold',
      fontSize: 26
    },
    logo: {
      borderWidth: 0,
      borderColor: 'green',
      borderStyle: 'solid',
      position: 'relative',
      top: 2,
      left: 4,
    },
    clogo: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      height: '100%',
      borderWidth: 0,
      borderColor: 'red',
      borderStyle: 'solid',
      position: 'relative',
      top: -3,
    },
    clogoweb: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      height: '100%',
      borderWidth: 0,
      borderColor: '#ff00ff',
      borderStyle: 'solid',
    },
  });
  return {
    ...themeVariant,
    container: customProperties.container,
    text: customProperties.text,
    link: customProperties.link,
    logo: customProperties.logo,
    clogo: customProperties.clogo,
    clogoweb: customProperties.clogoweb,
    fonts: configureFonts({config: fontConfig}),
    colors: {
      ...themeVariant.colors,
      // Custom color properties
      surfaceContainer: isDarkTheme ? 'rgba(33, 31, 38, 1)' : 'rgba(243, 237, 247, 1)',
    },
  }
};
// console.log('customProperties', customProperties);
// console.log('MD3DarkTheme', themeBuilder(true));
// console.log('MD3DarkTheme', themeBuilder(false));
// Sub-components can access Custom Theme-properties
// const themeType = themeBuilder(true);
// console.log('themeType', typeof themeType);
// export type appTheme = typeof themeType;
export const useAppTheme = () => useTheme<AppTheme>();

