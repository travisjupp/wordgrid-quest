
jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest'),
);

// React Native Mock (synchronous)
const React = require('react');
const mockRN = {
  View: 'View',
  Text: 'Text',
  ScrollView: 'ScrollView',
  TouchableOpacity: 'View',
  useColorScheme: jest.fn(() => 'light'),

  // ThemeProvider often uses this for layout/status bar
  useWindowDimensions: jest.fn(() => ({
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  })),
  StyleSheet: {
    create: s => s,
    flatten: s => s,
    hairlineWidth: 1,
  },
  Platform: {
    OS: 'ios',
    select: objs => objs.ios || objs.default,
    isPad: false,
  },

  // Inside jest.mock('react-native', () => { ... })
  Animated: {
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(() => ({})),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      stopAnimation: jest.fn(),
    })),
    ValueXY: jest.fn(() => ({
      setValue: jest.fn(),
      setOffset: jest.fn(),
    })),
    timing: jest.fn(() => ({ start: jest.fn(cb => cb?.()) })),
    spring: jest.fn(() => ({ start: jest.fn(cb => cb?.()) })),
    parallel: jest.fn(() => ({ start: jest.fn() })),
    sequence: jest.fn(() => ({ start: jest.fn() })),
    event: jest.fn(),
  },

  // ...rest of the RN stubs
};

jest.mock('react-native', () => mockRN);

let mockAppTheme;

// Pull in the actual theme logic AFTER the RN mock is established
const { themeBuilder } = require('@theme/themeConfig');

// Hydrate the Theme Mock
mockAppTheme = themeBuilder(false); // isDarkTheme = false

jest.mock('@theme/themeConfig', () => {
  const actual = jest.requireActual('@theme/themeConfig');
  return {
    ...actual,
    useAppTheme: () => mockAppTheme,
    themeBuilder: () => mockAppTheme,
  };
});

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');

  // Instead of requiring View, we just use the string 'View'
  // which is what React/RNTL expect for basic containers.
  return {
    GestureHandlerRootView: ({ children, style }) =>
      React.createElement('View', { style }, children), // Stable string-based type

    // Interaction stubs
    PanGestureHandler: ({ children }) => children,
    TapGestureHandler: ({ children }) => children,
    NativeViewGestureHandler: ({ children }) => children,
    State: {
      BEGAN: 'BEGAN',
      ACTIVE: 'ACTIVE',
      END: 'END',
      FAILED: 'FAILED',
      UNDETERMINED: 'UNDETERMINED',
    },
    Gesture: {
      Pan: () => ({
        onStart: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
      }),
      Tap: () => ({ onStart: jest.fn().mockReturnThis() }),
    },
  };
});

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

// Manually stub Bottom Sheet to avoid circular dependency crashes
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View, TextInput } = require('react-native');
  // Use the string 'View' to avoid initialization race conditions
  const ViewStub = ({ children }) => React.createElement('View', {}, children);

  return {
    __esModule: true,
    BottomSheetModalProvider: ViewStub,

    // Standard components
    default: ViewStub,
    BottomSheetView: ViewStub,
    // Functional mock to allow children rendering
    BottomSheetScrollView: React.forwardRef(({ children, ...props }, ref) => {
      // Hydrate ref
      React.useImperativeHandle(ref, () => ({
        scrollTo: jest.fn(),
        scrollToEnd: jest.fn(),
      }));
      return <View {...props} ref={ref}>{children}</View>
    }),
    // Map the custom input to a standard RN TextInput for fireEvent compatibility
    BottomSheetTextInput: React.forwardRef((props, ref) => (
      <TextInput {...props} ref={ref} />
    )),
    BottomSheetBackdrop: () => null,

    // Hooks
    useBottomSheet: () => ({
      expand: jest.fn(),
      collapse: jest.fn(),
      close: jest.fn(),
      snapToIndex: jest.fn(),
    }),
    useBottomSheetModal: () => ({
      present: jest.fn(),
      dismiss: jest.fn(),
    }),
  };
});

// Mock React Native Paper with stubs for core hooks/utilities
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { Text: RNText, View } = require('react-native');

  // Import Design Tokens
  const mockMd3Base = require('@theme/MD3LightTheme.json');
  const mockFigmaTokens = require('@theme/material-theme.json');
  const mockCustomLight = require('@theme/CustomLightColors.json');
  const mockCustomDark = require('@theme/CustomDarkColors.json');

  // Construct the "Real" base data structures
  const baseThemeData = {
    ...mockMd3Base,
    colors: {
      ...mockMd3Base.colors,
      ...mockFigmaTokens.schemes.light,
      ...mockCustomLight.colors,
    },
    fonts: { default: { fontFamily: 'System' } },
    animation: { scale: 1.0 },
  };

  return {
    // --- Data Properties (Hydrated from JSON) ---
    MD3LightTheme: baseThemeData,
    MD3DarkTheme: {
      ...baseThemeData,
      colors: { ...baseThemeData.colors, ...mockCustomDark.colors },
    },
    DefaultTheme: baseThemeData,

    // --- Component Stubs (Using string-based 'View' for stability) ---
    PaperProvider: ({ children }) => React.createElement('View', {}, children),
    Provider: ({ children }) => React.createElement('View', {}, children),
    Portal: ({ children }) => children,
    Snackbar: () => null,
    TextInput: React.forwardRef(({ children, ...props }, ref) => {
      const { View } = require('react-native');
      // Using View here for stability, or 'TextInput' if you need fireEvent.changeText
      return React.createElement('TextInput', { ...props, ref }, children);
    }),
    Button: ({ children, ...props }) =>
      React.createElement('View', props, children),

    Dialog: Object.assign(({ children }) => children, {
      Content: ({ children }) => children,
      Actions: ({ children }) => children,
      Title: ({ children }) => children,
      Icon: () => null,
    }),

    List: Object.assign(
      ({children}) => React.createElement('View', {}, children), 
      {
        Item: ({ children, left, right, title, description }) => (
          React.createElement('View', {}, [
            // Ensure props are rendered so RNTL can find them
            left ? left({ color: '#000', style: {}}) : null,
            title ? React.createElement('Text', {key: 'title-text'}, title) : null,
            description ? React.createElement('Text', {key: 'desc-text'}, description) : null,
            children,
            right ? right({ color: '#000', style: {}}) : null,
          ])
        ),
        // Add Section and Accordion to prevent 'undefined' crashes
        Section: ({children}) => React.createElement('View', {}, children),
        Accordion: ({children}) => React.createElement('View', {}, children),
        Icon: () => null,
      }),

    // --- Typography & Logic Stubs ---
    configureFonts: jest.fn(config => config),
    useTheme: () => baseThemeData,

    customText: jest.fn(() => {
      return ({ children, variant, style, ...props }) =>
        React.createElement(RNText, { style, ...props }, children);
    }),

    Text: ({ children, style, ...props }) =>
      React.createElement(RNText, { style, ...props }, children),
  };
});

// Stubbing Expo Status Bar
jest.mock('expo-status-bar', () => {
  return {
    setStatusBarStyle: () => jest.fn(),
  };
});

// // Mock the entire themeConfig module (Global Theme Stub)
// jest.mock('@theme/themeConfig', () => {
//   const actualRNP = require('react-native-paper');
//
//   // Generalized Theme Stub
//   const mockAppTheme = {
//     ...actualRNP.MD3LightTheme, // Start with base RNP properties
//     shared: {
//       inputWrapper: { padding: 10, backgroundColor: 'white' },
//       centeredView: {},
//       centeredContainer: {},
//     },
//     preGameConfig: {
//       customMaterialScreens: {
//         loaditems: { loadItemButtonsContainer: {} },
//       },
//     },
//     // Additional custom properties...
//   };
//
//   return {
//     // Mock the hook to return the stubbed object
//     useAppTheme: () => mockAppTheme,
//     // Mock the builder if other providers use it
//     themeBuilder: jest.fn(() => mockAppTheme),
//   };
// });
