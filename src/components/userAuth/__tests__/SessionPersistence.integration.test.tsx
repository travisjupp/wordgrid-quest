/** @jest-environment jsdom */
// Load environment mocks first
import '@utils/jsdomMocks';
import { jest } from '@jest/globals';
import util from 'node:util';
import { render, waitFor } from '@utils/test-utils'; // Use local utility
import nodeConsole from 'console';
import { style } from '@utils/styles';
import { auth } from '@services/firebaseConfig';
import { connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import RootLayout from '../../../../app/_layout';

// Config overrides
util.inspect.defaultOptions.depth = null; // Show full objects
jest.unmock('@theme/themeConfig');

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
