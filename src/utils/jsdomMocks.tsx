import 'whatwg-fetch'; // Inject global fetch polyfill primitives for jsdom

import React, { ReactNode } from 'react';
import { jest } from '@jest/globals';

/*********************************************************************
 * For tests that use jsdom; do not add mocks to jest.setup.js, 
 * these mocks/stubs must run after moduleNameMapper (jest.config.js). 
 * Import this file after `@jest-environment jsdom` inline Docblock
 *********************************************************************/

// Declare Virtual Module for missing package to stop file-system check crashes
jest.mock(
  'expo-updates',
  () => ({
    ExpoUpdates: { get: () => ({}) },
    addListener: jest.fn(),
  }),
  { virtual: true },
); // <-- Virtual, not in node_modules

// Stub out Firebase Auth to safely bridge native storage definitions to jsdom
jest.mock('firebase/auth', () => {
  // Grab all standard browser-cjs exports
  const actualAuth = jest.requireActual('firebase/auth') as any;
  return {
    ...actualAuth,
    // Provide a functional stub for the React Native specific method
    // Redirects Firebase to use the working browser storage layer inside jsdom
    getReactNativePersistence: () => actualAuth.browserLocalPersistence,
  };
});

// Stub Expo Router and provide explicit types for the Stack components
jest.mock('expo-router', () => {
  const StackMock = ({ children }: { children: ReactNode }) => <>{children}</>;
  // Assign subcomponents to match Expo's real object assignment footprint
  Object.defineProperty(StackMock, 'Screen', { value: () => null });

  return {
    __esModule: true,
    Stack: StackMock,
    router: {
      replace: jest.fn(),
      navigate: jest.fn(),
      push: jest.fn(),
    },
  };
});

// Stub native module system
jest.mock('expo-modules-core', () => {
  return {
    __esModule: true,
    ExpoModulesCoreJSLogger: { 
      get: () => ({ info: jest.fn(), warn: jest.fn(), error: jest.fn() }) 
    },
    NativeModulesProxy: {},
    requireNativeModule: jest.fn(() => ({})),
    EventEmitter: class { addListener = jest.fn(() => ({ remove: jest.fn() })); },
    SharedObject: class {},
  };
});

  };
});

// Stub expo-font to simulate successful font loading
jest.mock('expo-font', () => {
  return {
    __esModule: true,
    // ...jest.requireActual('expo-font') as any, // Include utility functions
    useFonts: () => [true, null], // Returns: [loaded = true, error = null]
    loadAsync: () => Promise.resolve(),
  };
});
