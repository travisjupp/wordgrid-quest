import { ConfigContext, ExpoConfig } from 'expo/config';
import materialColors from './prototype/material-theme.json';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.tjupp.wordgridquest.dev';
  }

  if (IS_PREVIEW) {
    return 'com.tjupp.wordgridquest.preview';
  }

  return 'com.tjupp.wordgridquest';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'wordgrid-quest (Dev)';
  }

  if (IS_PREVIEW) {
    return 'wordgrid-quest (Preview)';
  }

  return 'wordgrid-quest';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "wordgrid-quest",
  version: "1.0.0",
  orientation: "default",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/icon-splash.png",
    resizeMode: "contain",
    backgroundColor: materialColors.schemes.light.background
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    userInterfaceStyle: "automatic",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    },
    icon: {
      dark: "./assets/images/icon-ios-dark.png",
      light: "./assets/images/icon-ios-light.png",
      tinted: "./assets/images/icon-ios-tinted.png"
    }
  },
  android: {
    userInterfaceStyle: "automatic",
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon-android-adaptive-foreground.png",
      backgroundImage: "./assets/images/icon-android-adaptive-background.png",
      monochromeImage: "./assets/images/icon-android-adaptive-foreground.png",
      backgroundColor: materialColors.schemes.dark.background
    },
    package: getUniqueIdentifier(),
  },
  web: {
    userInterfaceStyle: "automatic",
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        android: {
          imageWidth: 150,
          resizeMode: "contain",
          image: "./assets/images/icon-splash.png",
          backgroundColor: materialColors.schemes.light.background,
          dark: {
            backgroundColor: materialColors.schemes.dark.background,
          }
        },
        ios: {
          imageWidth: 200,
          resizeMode: "cover",
          image: "./assets/images/icon-splash.png",
          backgroundColor: materialColors.schemes.light.background,
          dark: {
            backgroundColor: materialColors.schemes.dark.background,
          }
        }
      }
    ],
    [
      "expo-font",
      {
        android: {
          fonts: [
            "./assets/fonts/Inter24pt-Black.ttf",
            "./assets/fonts/InriaSerif-Regular.ttf",
            "./assets/fonts/InriaSerif-BoldItalic.ttf",
            "./assets/fonts/Abel-Regular.ttf"
          ],
        },
        ios: {
          fonts: [
            "./assets/fonts/Inter24pt-Black.ttf",
            "./assets/fonts/InriaSerif-Regular.ttf",
            "./assets/fonts/InriaSerif-BoldItalic.ttf",
            "./assets/fonts/Abel-Regular.ttf"
          ]
        }
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: "f509dfcb-5fce-4dd7-99a3-0959d7598bb2"
    }
  },
  updates: {
    url: "https://u.expo.dev/f509dfcb-5fce-4dd7-99a3-0959d7598bb2"
  },
  runtimeVersion: {
    policy: "appVersion"
  },
  owner: "tjupp"
});

