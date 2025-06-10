import { ConfigContext, ExpoConfig } from 'expo/config';

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
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#25292e" // TODO use RN useColorScheme() hook to programattically update this depending on device color-mode settings
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: getUniqueIdentifier(),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
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

