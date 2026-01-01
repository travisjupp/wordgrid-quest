// jest.setup.js
import 'react-native-gesture-handler/jestSetup';

// Stubbing the Keyboard Controller (Native logic)
jest.mock('react-native-keyboard-controller', () => 
  require('react-native-keyboard-controller/jest')
);

// Stubbing Safe Area (Returns fixed state to prevent crashes)
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  };
});

// Stubbing Reanimated (Animations are ignored in Jest)
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Specialized Mock for Bottom Sheet (Allows interaction in tests)
jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  ...require('@gorhom/bottom-sheet/mock'),
}));

// Mock React Native Paper's internal hooks and utilities
jest.mock('react-native-paper', () => {
  const actualRNP = jest.requireActual('react-native-paper');
  return {
    ...actualRNP,
    // Ensure configureFonts doesn't crash during theme building
    configureFonts: jest.fn(config => config),
    // Ensure useTheme returns a valid object even if called outside a provider
    useTheme: () => ({
      ...actualRNP.MD3LightTheme, // or MD3DarkTheme
      colors: actualRNP.MD3LightTheme.colors,
    }),
  };
});

// Mock the entire themeConfig module
jest.mock('@theme/themeConfig', () => {
  const actualRNP = require('react-native-paper');

  // Generalized Theme Stub
  const mockAppTheme = {
    ...actualRNP.MD3LightTheme, // Start with base RNP properties
    shared: {
      inputWrapper: { padding: 10, backgroundColor: 'white' },
      centeredView: {},
      centeredContainer: {},
    },
    preGameConfig: {
      customMaterialScreens: {
        loaditems: { loadItemButtonsContainer: {} },
      },
    },
    // Additional custom properties...
  };

  return {
    // Mock the hook to return the stubbed object
    useAppTheme: () => mockAppTheme,
    // Mock the builder if other providers use it
    themeBuilder: jest.fn(() => mockAppTheme),
  };
});

// Address StyleSheet and PlatformIOSStatic
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
  create: jest.fn(style => style),
  flatten: jest.fn(style => style),
  hairlineWidth: 1,
}));

// Ensure PlatformIOSStatic is addressed via the Platform mock
jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'ios';
  Platform.select = objs => objs.ios || objs.default;
  // This satisfies the PlatformIOSStatic requirement
  Platform.isPad = false;
  Platform.isTV = false;
  return Platform;
});
