/** @jest-environment jsdom */

import assert from 'node:assert/strict';
import { jest } from '@jest/globals';
import util from 'node:util';
util.inspect.defaultOptions.depth = null; // show full objects
// util.inspect.defaultOptions.depth = 0; // show truncated objects
// util.inspect.defaultOptions.compact = true; // dont break objects to new lines
// util.inspect.defaultOptions.compact = false; // break objects to new lines

// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
import { fireEvent, render, screen, waitFor } from '@utils/test-utils';

// Mock 'firebase/auth' to intercept imports before config evaluates it
// Do not add this to jest.setup.js, must run after moduleNameMapper (jest.config.js)
jest.mock('firebase/auth', () => {
  // Grab all standard browser-cjs exports (like browserLocalPersistence, connectAuthEmulator)
  const actualAuth = jest.requireActual('firebase/auth') as any;
  return {
    ...actualAuth,
    // Provide a functional stub for the React Native specific method
    // Redirects Firebase to use the working browser storage layer inside jsdom
    getReactNativePersistence: () => actualAuth.browserLocalPersistence,
  };
});

// Prevent Expo Router from importing the heavy UI views that break jsdom
jest.mock('expo-router', () => {
  return {
    __esModule: true,
    // Provide a mocked functional component for any layout boundary tags
    Stack: Object.assign(({ children }: { children: any }) => <>{children}</>, {
      Screen: () => null,
    }),
    router: {
      replace: jest.fn(),
      navigate: jest.fn(),
      push: jest.fn(),
    },
  };
});

import { logItems } from '@utils/logger'; // Log NumericKeyObjectRecord
import nodeConsole from 'console';
jest.unmock('@theme/themeConfig');
import { style } from '@utils/styles';
const { dim, green, hr, reset } = style;

// Suppress jests tracing console logs
import console from 'console';
const jestConsole = console;
import { auth } from '@services/firebaseConfig';
import { connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import RootLayout from '../../../../app/_layout';

// Connect to local test auth instance
connectAuthEmulator(auth, 'http://127.0.0.1:9099');

// prettier-ignore
describe(style.wrap('bolditalic', 'Firebase Auth Session Persistence Flow\n'), () => {
  beforeEach(async () => {
    await auth.signOut();
    jest.clearAllMocks();
    jest.useFakeTimers();
    global.console = nodeConsole; // Less noise
    const TEST_BEFORE = [ '\n', style.color(255, 0, 255), '▷ ', style.reset, style.color(39), expect.getState().currentTestName, style.reset, '\n', ].join('');
    process.stdout.write(TEST_BEFORE);
  });

  afterEach(() => {
    // Clear timers and switch back to real time to prevent leakages
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    const TEST_AFTER = [ '\n', style.color(99), style.hr.double, style.reset, '\n', ].join('');
    process.stdout.write(TEST_AFTER);
  });

  it('RED: should automatically redirect an authenticated user to /loadcat if a persistent session exists', async () => {
    // 1. Arrange: Seed the running emulator with an authenticated user session
    await signInWithEmailAndPassword(auth, 'test@example.com', 'password123');

    // 2. Act: Render the root layout layout 
    render(<RootLayout />);

    // 3. Assert: Verify the app intercepts the persistent state and routes them away
    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith('/loadcat');
    });
  });

  it('GREEN: should keep unauthenticated users on the public stack (no redirect)', async () => {
    render(<RootLayout />);

    await waitFor(() => {
      expect(router.replace).not.toHaveBeenCalledWith('/loadcat');
    });
  });
});
