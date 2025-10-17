import { ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { MD3Typescale } from 'react-native-paper/lib/typescript/types';

export interface ModalStyles {
  contentAndSnackbarContainer: object;
  contentWrapper: object;
  defaultMobileSnackbar: object;
  defaultMobileSnackbarWrapper: object;
  defaultWebSnackbar: object;
  defaultWebSnackbarWrapper: object;
  overModalSnackbar: object;
  overModalSnackbarWrapper: object;
}
export interface AppTheme {
  animation: object;
  carousel: CarouselStyles; // custom
  centeredView: object; // custom
  clogo: object; // custom
  container: object; // custom
  fonts: MD3Typescale;
  link: object; // custom
  logo: object; // custom
  majorHUD: MajorHUDStyles; // custom
  menu: object; // custom
  modal: ModalStyles; // custom
  preGameConfig: PreGameConfigStyles;
  text: object; // custom
  timer: object; // custom
  topicFrame: TopicFrameStyles; // custom

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

  dark: boolean;

  isV3: boolean;
  newProp?: object;
  mode?: string | undefined;
  roundness: number;
  version: number;
}

export interface PreGameConfigStyles {
  authScreens: AuthScreenStyles;
  customMaterialScreens: CustomMaterialStyles;
}

export interface AuthScreenStyles {
  signupScreenAnimatedView: ViewStyle;
  loginScreenAnimatedView: ViewStyle;
  authSubtext: AuthSubtextStyles;
}

export interface CustomMaterialStyles {
  loadcatScreenAnimatedView: ViewStyle;
  loaditemsScreenAnimatedView: ViewStyle;
}

export interface AuthSubtextStyles {
  container: ViewStyle;
  wrapper: ViewStyle;
}

export interface CarouselStyles {
  activeDot?: ViewStyle;
  container: ViewStyle;
  dot?: ViewStyle;
  dotsContainer?: ViewStyle;
  page?: ViewStyle;
  paragraph?: TextStyle;
}

export interface CustomMaterialArray {
  [key: string]: DiscoveryTermObject[];
}

export interface DiscoveryTermObject {
  dt: string;
  def: string;
}

export interface InitialMaterialSliceState {
  activeCategory: string;
  category: CustomMaterialArray;
}

export interface InitialTempMaterialSliceState {
  category: string;
  discoveryTerms: DiscoveryTermObject[];
}

export interface ModalContent {
  content: React.ReactNode;
}

export interface MajorHUDStyles {
  container: ViewStyle;
}

export interface TopicFrameStyles {
  container: ViewStyle;
}
