import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  configureFonts,
  useTheme,
} from 'react-native-paper';
import { Platform, PlatformIOSStatic, StyleSheet } from 'react-native';
import { AppTheme } from '@custom-types/AppTheme';
import figmaMaterialThemeBuilderExport from '@theme/material-theme.json';
import CustomLightColorScheme from '@theme/CustomLightColors.json';
import CustomDarkColorScheme from '@theme/CustomDarkColors.json';

const fontConfig = {
  brand: {
    fontSize: 30,
    fontFamily: 'InriaSerif-Regular',
  },
  chip: {
    fontSize: 14,
    fontFamily: 'System',
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

// Build theme-variant-based theme object
export const themeBuilder = (isDarkTheme: boolean) => {
  const RNPColors = isDarkTheme ? MD3DarkTheme : DefaultTheme;
  const figmaColors =
    isDarkTheme ? figmaMaterialThemeBuilderExport.schemes.dark : figmaMaterialThemeBuilderExport.schemes.light;
  const RNPCustomColors = 
    isDarkTheme ? CustomDarkColorScheme.colors : CustomLightColorScheme.colors;
  const colors = {
    /* Merge multiple MD3 color sources */
    ...RNPColors.colors,
    ...figmaColors,
    /* Custom Color Scheme Overrides: 
     * https://oss.callstack.com/react-native-paper/docs/guides/theming */
    // ...RNPCustomColors,
    /* Custom Color Properties */
    customColorProperty: '#ff00ff',
  }
  const isIOS = Platform.OS === 'ios';
  const isPad = () => isIOS && (Platform as PlatformIOSStatic).isPad;

  const customProperties = StyleSheet.create({
    // START Shared Styles
    sharedInputWrapper: {
      width: '100%',
      gap: 8,
      display: 'flex',
      borderWidth: 3,
      borderColor: 'red',
      borderStyle: 'dotted',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
    },
    // END Shared Styles

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
    loaditemsScreenAnimatedView: {
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
    customChipContentContainer: {
      paddingInlineStart: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    discoveryTermTextInput: {
      backgroundColor: colors.secondaryContainer,
      color: colors.onSecondaryContainer,
      height: 54,
      padding: 12,
      borderColor: colors.outline,
      borderWidth: 1.5,
      borderRadius: 4,
      marginInline: 12,
    },
    definitionTextInput: {
      backgroundColor: colors.secondaryContainer,
      color: colors.onSecondaryContainer,
      height: 64,
      padding: 12,
      borderColor: colors.outline,
      borderWidth: 1.5,
      borderRadius: 4,
      marginInline: 12,
    },
    loadItemButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
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
      backgroundColor: colors.secondaryContainer,
      borderWidth: 1,
      borderColor: colors.primary,
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
      backgroundColor: colors.secondaryContainer,
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
      color: colors.onSurface,
    },
    // END Carousel Styles

    text: {
      color: colors.onSurface,
      fontFamily: 'Inter24pt-Black',
    },
    link: {
      color: colors.onSurface,
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
      backgroundColor: colors.backdrop,
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
      backgroundColor: colors.backdrop,
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

    // START Timer Styles
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
      color: colors.onSecondaryContainer,
      backgroundColor: colors.secondaryContainer,
      borderWidth: 0,
      borderStyle: 'solid',
    },
    // END Timer Styles

  });

  return {
    ...RNPColors,
    shared: {
      inputWrapper: customProperties.sharedInputWrapper,
      centeredView: customProperties.centeredView,
      centeredContainer: customProperties.centeredContainer,
    },
    preGameConfig: {
      layout: {
        customChipContentContainer:
        customProperties.customChipContentContainer,
      },
      authScreens: {
        signupScreenAnimatedView: customProperties.signupScreenAnimatedView,
        loginScreenAnimatedView: customProperties.loginScreenAnimatedView,
        authSubtext: {
          wrapper: customProperties.authSubtextWrapper,
          container: customProperties.authSubtextContainer,
        },
      },
      customMaterialScreens: {
        loadcat: {
          loadcatScreenAnimatedView: customProperties.loadcatScreenAnimatedView,
        },
        loaditems: {
          loaditemsScreenAnimatedView:
          customProperties.loaditemsScreenAnimatedView,
          discoveryTermTextInput: 
          customProperties.discoveryTermTextInput,
          definitionTextInput:
          customProperties.definitionTextInput,
          loadItemButtonsContainer:
          customProperties.loadItemButtonsContainer,

        },
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
    roundness: 0.8,
    colors: {...colors},
  };
};

// Sub-components can access Custom Theme-properties
export const useAppTheme = () => useTheme<AppTheme>();
