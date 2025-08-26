import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  configureFonts,
  useTheme,
} from 'react-native-paper';
import { Platform, PlatformIOSStatic, StyleSheet } from 'react-native';
import { AppTheme } from '@custom-types/AppTheme';
import materialColors from '@prototype/material-theme.json';

const fontConfig = {
  brand: {
    fontSize: 30,
    fontFamily: 'InriaSerif-Regular',
  },
  category: {
    fontSize: 24,
    fontFamily: 'InriaSerif-BoldItalic',
  },
  letterTile: {
    fontSize: 38,
    fontFamily: 'Inter24pt-Black',
  },
  timer: {
    fontSize: Platform.select({
      web: 68,
      default: 48,
    }),
    fontFamily: 'Abel-Regular',
  },
  carouselParagraph: {
    fontSize: 16,
    fontFamily: 'InriaSerif-Regular',
    lineHeight: 24,
  },
  // fontFamily: 'Inter24pt-Black', // override all variants (only if no variants)
  // override property for existing variant
  bodyLarge: {
    // fontFamily: 'Inter24pt-Black',
  },
  bodyLargeEmphasized: {
    fontWeight: 'bold',
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
  const isIOS = Platform.OS === 'ios';
  const isPad = () => isIOS && (Platform as PlatformIOSStatic).isPad;
  const customProperties = StyleSheet.create({
    // START MajorHUD Styles
    majorHUDContainer: {
      flexDirection: 'row',
      gap: 20,
    },
    // END MajorHUD Styles

    // START TopicFrame Styles
    topicFrameContainer: {
      // marginInlineStart: 0,
    },
    // END TopicFrame Styles

    // START Carousel Styles
    carouselContainer: {
      width: 'auto',
      flex: 1,
      marginTop: 20,
      // borderWidth: 1,
      // borderColor: '#00ff00'
    },
    carouselPage: {
      justifyContent: 'center',
      alignItems: 'center',
      // paddingHorizontal: 20,
      height: 'auto',
    },
    carouselParagraph: {
      // borderWidth: 1,
      // borderColor: 'magenta',
      // backgroundColor: 'darkmagenta',
      color: themeVariant.colors.onSurface,
    },
    carouselDotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    carouselDot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: themeVariant.colors.secondaryContainer,
      marginHorizontal: 5,
    },
    carouselActiveDot: {
      backgroundColor: themeVariant.colors.secondaryContainer,
      borderWidth: 1,
      borderColor: themeVariant.colors.primary,
    },
    // END Carousel Styles

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeVariant.colors.surface,
    },

    text: {
      color: themeVariant.colors.onSurface,
      fontFamily: 'Inter24pt-Black',
    },

    link: {
      color: themeVariant.colors.onSurface,
      fontWeight: 'bold',
      fontSize: 26,
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
      ...Platform.select({
        ios: {
          position: 'relative',
          top: -3,
          borderColor: 'red',
        },
        android: {
          position: 'relative',
          top: -3,
          borderColor: 'green',
        },
        web: {
          borderColor: 'blue',
        },
      }),
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      height: '100%',
      borderWidth: 1,
      borderStyle: 'solid',
    },

    menu: {
      ...Platform.select({
        ios: {
          top: isPad() ? 70 : 100,
          borderColor: 'red',
        },
        android: {
          top: 60,
          borderColor: 'green',
        },
        web: {
          top: 60,
          borderColor: 'blue',
        },
      }),
      borderWidth: 1,
      borderStyle: 'solid',
    },

    timer: {
      ...Platform.select({
        ios: {
          borderColor: 'red',
        },
        android: {
          borderColor: 'green',
        },
        web: {
          borderColor: 'blue',
        },
      }),
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      borderRadius: 6,
      padding: 20,
      color: themeVariant.colors.onSecondaryContainer,
      backgroundColor: themeVariant.colors.secondaryContainer,
      borderWidth: 0,
      borderStyle: 'solid',
    },
  });

  return {
    ...themeVariant,
    majorHUD: {
      container: customProperties.majorHUDContainer,
    },
    topicFrame: {
      container: customProperties.topicFrameContainer,
    },
    carousel: {
      container: customProperties.carouselContainer,
      page: customProperties.carouselPage,
      paragraph: customProperties.carouselParagraph,
      dotsContainer: customProperties.carouselDotsContainer,
      dot: customProperties.carouselDot,
      activeDot: customProperties.carouselActiveDot,
    },
    container: customProperties.container,
    text: customProperties.text,
    link: customProperties.link,
    logo: customProperties.logo,
    clogo: customProperties.clogo,
    menu: customProperties.menu,
    timer: customProperties.timer,
    fonts: configureFonts({ config: fontConfig }),
    colors:
      isDarkTheme ?
        {
          ...themeVariant.colors,
          // Custom color properties
          ...materialColors.schemes.dark,
          // surfaceContainer: isDarkTheme ? 'rgba(33, 31, 38, 1)' : 'rgba(243, 237, 247, 1)',
        }
      : {
          ...themeVariant.colors,
          // Custom color properties
          ...materialColors.schemes.light,
          // surfaceContainer: isDarkTheme ? 'rgba(33, 31, 38, 1)' : 'rgba(243, 237, 247, 1)',
        },
  };
};

// Sub-components can access Custom Theme-properties
export const useAppTheme = () => useTheme<AppTheme>();
