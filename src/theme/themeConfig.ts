import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  configureFonts,
  useTheme,
} from 'react-native-paper';
import { Platform, PlatformIOSStatic, StyleSheet } from 'react-native';
import { AppTheme } from '@custom-types/AppTheme';
import materialColors from '@theme/material-theme.json';

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
  const materialColorScheme =
    isDarkTheme ? materialColors.schemes.dark : materialColors.schemes.light;
  const isIOS = Platform.OS === 'ios';
  const isPad = () => isIOS && (Platform as PlatformIOSStatic).isPad;
  const customProperties = StyleSheet.create({
    // START PreGameConfig Styles
    signupScreenAnimatedView: {
      width: 330,
      borderColor: 'red',
      // borderWidth: 1,
    },

    loadcatScreenAnimatedView: {
      width: 330,
      borderColor: 'red',
      // borderWidth: 1,
    },

    loginScreenAnimatedView: {
      width: 330,
      borderColor: 'red',
      // borderWidth: 1,
    },

    authSubtextContainer: {
      // marginTop: 30,
      gap: 10,
      alignItems: 'center',
      borderColor: 'purple',
      // borderWidth: 1,
    },

    authSubtextWrapper: {
      margin: 15,
      minHeight: 40,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderColor: 'orange',
      // borderWidth: 3,
    },
    // END PreGameConfig Styles

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
    carouselActiveDot: {
      backgroundColor: materialColorScheme.secondaryContainer,
      borderWidth: 1,
      borderColor: materialColorScheme.primary,
    },
    carouselContainer: {
      width: 'auto',
      flex: 1,
      marginTop: 20,
      // borderWidth: 1,
      // borderColor: '#00ff00'
    },
    carouselDot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: materialColorScheme.secondaryContainer,
      marginHorizontal: 5,
    },
    carouselDotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
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
      color: materialColorScheme.onSurface,
    },
    // END Carousel Styles

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: materialColorScheme.surface,
    },

    text: {
      color: materialColorScheme.onSurface,
      fontFamily: 'Inter24pt-Black',
    },

    link: {
      color: materialColorScheme.onSurface,
      fontWeight: 'bold',
      fontSize: 26,
    },

    logo: {
      borderWidth: 0,
      borderColor: 'green',
      borderStyle: 'solid',
      position: 'relative',
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

    // START Modal and Snackbar Styles
    contentWrapper: {
      justifyContent: 'center',
      flex: 1,
      borderWidth: 3,
      borderColor: 'red',
      backgroundColor: themeVariant.colors.backdrop,
    },
    contentAndSnackbarContainer: {
      ...(Platform.OS === 'web' ?
        {
          borderWidth: 6,
          borderColor: 'purple',
          alignSelf: 'center',
        }
      : {
          borderWidth: 6,
          borderColor: 'orange',
          position: 'absolute' /* <- Fit Snackbar inside Modal */,
          alignSelf: 'center',
        }),
    },
    overModalSnackbar: {
      borderWidth: 3,
      margin: 0,
      borderColor: 'slateblue',
      borderStyle: 'dashed',
    },
    overModalSnackbarWrapper: {
      flex: 1,
      borderWidth: 6,
      borderColor: 'orangered',
      borderStyle: 'dashed',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingBottom: 0 /* Place at abs bottom */,
      paddingLeft: '5%',
      paddingRight: '5%',
      height: '100%',
      backgroundColor: themeVariant.colors.backdrop,
    },
    defaultMobileSnackbar: {
      borderWidth: 3,
      borderColor: 'magenta',
      borderStyle: 'dotted',
    },
    defaultMobileSnackbarWrapper: {
      maxWidth: 400,
      alignSelf: 'center',
    },
    defaultWebSnackbar: {
      alignSelf: 'center',
    },
    defaultWebSnackbarWrapper: {
      maxWidth: 400,
      alignSelf: 'center',
    },
    // END Modal and Snackbar Styles

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
      color: materialColorScheme.onSecondaryContainer,
      backgroundColor: materialColorScheme.secondaryContainer,
      borderWidth: 0,
      borderStyle: 'solid',
    },
  });

  return {
    ...themeVariant,
    preGameConfig: {
      authScreens: {
        signupScreenAnimatedView: customProperties.signupScreenAnimatedView,
        loginScreenAnimatedView: customProperties.loginScreenAnimatedView,
        authSubtext: {
          wrapper: customProperties.authSubtextWrapper,
          container: customProperties.authSubtextContainer,
        },
      },
      customMaterialScreens: {
        loadcatScreenAnimatedView: customProperties.loadcatScreenAnimatedView,
      },
    },
    majorHUD: {
      container: customProperties.majorHUDContainer,
    },
    topicFrame: {
      container: customProperties.topicFrameContainer,
    },
    carousel: {
      activeDot: customProperties.carouselActiveDot,
      container: customProperties.carouselContainer,
      dot: customProperties.carouselDot,
      dotsContainer: customProperties.carouselDotsContainer,
      page: customProperties.carouselPage,
      paragraph: customProperties.carouselParagraph,
    },
    centeredView: customProperties.centeredView,
    container: customProperties.container,
    text: customProperties.text,
    link: customProperties.link,
    logo: customProperties.logo,
    clogo: customProperties.clogo,
    menu: customProperties.menu,
    modal: {
      contentAndSnackbarContainer: customProperties.contentAndSnackbarContainer,
      contentWrapper: customProperties.contentWrapper,
      defaultMobileSnackbar: customProperties.defaultMobileSnackbar,
      defaultMobileSnackbarWrapper:
        customProperties.defaultMobileSnackbarWrapper,
      defaultWebSnackbar: customProperties.defaultWebSnackbar,
      defaultWebSnackbarWrapper: customProperties.defaultWebSnackbarWrapper,
      overModalSnackbar: customProperties.overModalSnackbar,
      overModalSnackbarWrapper: customProperties.overModalSnackbarWrapper,
    },
    timer: customProperties.timer,
    fonts: configureFonts({ config: fontConfig }),
    roundness: 4,
    colors:
      isDarkTheme ?
        {
          ...themeVariant.colors,
          // Custom color properties
          // ...materialColors.schemes.dark,
          ...materialColorScheme,
          // surfaceContainer: isDarkTheme ? 'rgba(33, 31, 38, 1)' : 'rgba(243, 237, 247, 1)',
        }
      : {
          ...themeVariant.colors,
          // Custom color properties
          // ...materialColors.schemes.light,
          ...materialColorScheme,
          // surfaceContainer: isDarkTheme ? 'rgba(33, 31, 38, 1)' : 'rgba(243, 237, 247, 1)',
        },
  };
};

// Sub-components can access Custom Theme-properties
export const useAppTheme = () => useTheme<AppTheme>();
