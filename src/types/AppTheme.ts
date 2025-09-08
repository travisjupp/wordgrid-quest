import { ViewStyle, TextStyle } from 'react-native';
import React from 'react';

export interface AppTheme {
  animation: object;
  majorHUD: MajorHUDStyles; // custom
  topicFrame: TopicFrameStyles; // custom
  carousel: CarouselStyles; // custom

  centeredView: object; // custom
  container: object; // custom
  text: object; // custom
  link: object; // custom
  logo: object; // custom
  clogo: object; // custom
  menu: object; // custom
  modal: object; // custom
  timer: object; // custom

  fonts: {
    bodyLarge: object;
    bodyLargeEmphasized: object;
    bodyMedium: object;
    bodySmall: object;
    brand: object; // custom
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
    letterTile: object; // custom
    titleLarge: object;
    titleMedium: object;
    titleSmall: object;
  };

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
  newProp: object;
  mode: string;
  roundness: number;
  version: number;
}

export interface CarouselStyles {
  container: ViewStyle;
  dot?: ViewStyle;
  activeDot?: ViewStyle;
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
  category: CustomMaterialArray;
  activeCategory: string;
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
