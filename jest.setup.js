// Manually stub Gesture Handler to resolve circular dependency
jest.mock('react-native-gesture-handler', () => {
  // Use lazy require inside the factory to bypass hoisting issues
  const React = require('react');
  const { View } = require('react-native');

  return {
    // Component Stubs
    GestureHandlerRootView: ({ children, style }) => (
      <View style={style}>{children}</View>
    ),
    // Common Interaction Stubs
    State: {
      BEGAN: 'BEGAN',
      FAILED: 'FAILED',
      ACTIVE: 'ACTIVE',
      END: 'END',
      UNDETERMINED: 'UNDETERMINED',
    },
    // Mock interaction handlers
    PanGestureHandler: ({ children }) => children,
    TapGestureHandler: ({ children }) => children,
    State: {},
    Gesture: {
      Pan: () => ({
        onStart: jest.fn().mockReturnThis(),
        onUpdate: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
      }),
      Tap: () => ({
        onStart: jest.fn().mockReturnThis(),
      }),
    },
    // Required for BottomSheet/Navigation internal logic
    NativeViewGestureHandler: ({ children }) => children,
    BaseButton: ({ children }) => children,
    RectButton: ({ children }) => children,
  };
});

// Mock useWindowDimensions (Native friction)
jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  default: jest.fn(() => ({
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  })),
}));

// Stubbing the Keyboard Controller (Native logic)
jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const  { View } = require('react-native');
  return {
    ...require('react-native-keyboard-controller/jest'),
    KeyboardAvoidingView: ({ children }) => <View>{children}</View>,
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
  const { View } = require('react-native'); // Use require inside the factory

  return {
    __esModule: true,
    // Provide a default export that just renders children
    default: ({ children }) => <View>{children}</View>,
    // Provide named exports for all common sub-components
    BottomSheetScrollView: ({ children }) => <View>{children}</View>,
    BottomSheetView: ({ children }) => <View>{children}</View>,
    BottomSheetTextInput: ({ children }) => <View>{children}</View>,
    BottomSheetBackdrop: () => null,
    // Mock the useBottomSheet hooks
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
  const { Text: RNText } = require('react-native');

  return {
    // Return dummy components that just render their children
    PaperProvider: ({ children }) => children,
    Provider: ({ children }) => children,
    // Ensure configureFonts doesn't crash during theme building
    configureFonts: jest.fn(config => config),
    // Stub useTheme returns a basic object (global theme stub handles specific props later)
    useTheme: () => ({}),
    // Add other components LoadItem uses (Button, TextInput) as stubs
    Button: ({ children, ...props }) => <>{children}</>,
    TextInput: () => null,
    Portal: ({children}) => children,
    Snackbar: () => null,
    Dialog: Object.assign(
      ({ children }) => children,
      {
        Content: ({ children }) => children,
        Actions: ({ children }) => children,
        Title: ({ children }) => children,
        Icon: () => null,
      }
    ),
    customText: jest.fn(() => {
      return ({ children, variant, style, ...props }) => (
        <RNText style={style} {...props}>
          {children}
        </RNText>
      );
    }),
    Text: ({ children, style, ...props }) => (
      <RNText style={style} {...props}>
        {children}
      </RNText>
    ),
  // Add base themes if needed by themeBuilder
  MD3LightTheme: {},
  MD3DarkTheme: {},
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
