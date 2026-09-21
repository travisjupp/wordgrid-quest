/** @jest-environment jsdom */
// Load environment mocks first
import { mockUseSegments } from '@utils/jsdomMocks';
import { jest } from '@jest/globals';
import util from 'node:util';
import { render, waitFor } from '@utils/test-utils'; // Use local utility
import nodeConsole from 'console';
import { style } from '@utils/styles';
import { auth } from '@services/firebaseConfig';
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
} from 'firebase/auth';
import { router } from 'expo-router';
import RootLayout from '../../../../app/_layout';

// Config overrides
util.inspect.defaultOptions.depth = null; // Show full objects
jest.unmock('@theme/themeConfig');

// Connect to local test auth instance
connectAuthEmulator(auth, 'http://127.0.0.1:9099');

describe(
  style.wrap('bolditalic', 'Firebase Auth Session Persistence Flow\n'),
  () => {
    beforeEach(async () => {
      const TEST_BEFORE = [
        '\n',
        style.color(255, 0, 255),
        '▷ ',
        style.reset,
        style.color(39),
        expect.getState().currentTestName,
        style.reset,
        '\n',
      ].join('');
      process.stdout.write(TEST_BEFORE);
      // Start with a clean slate
      if (auth.currentUser) {
        await deleteUser(auth.currentUser).catch(() => {});
      }
      await auth.signOut();
      jest.clearAllMocks();
      jest.useRealTimers();
      mockUseSegments.mockReturnValue([]); // Reset to default root path
      global.console = nodeConsole; // Less noise
    });

    afterEach(async () => {
      // Tear-down: Delete user acct from emulator
      if (auth.currentUser) {
        try {
          const targetUser = auth.currentUser;
          await deleteUser(targetUser);
        } catch (error: any) {
          console.warn(`Tear-down failed: ${error.message}`);
        }
      }

      // Clear timers and switch back to real time to prevent leakages
      const TEST_AFTER = [
        '\n',
        style.color(99),
        style.hr.double,
        style.reset,
        '\n',
      ].join('');
      process.stdout.write(TEST_AFTER);
    });

    it('Should route an authenticated user to /loadcat if a persistent session exists', async () => {
      // Seed the running emulator with an authenticated user session
      await createUserWithEmailAndPassword(
        auth,
        'test@example.com',
        'password123',
      );

      render(<RootLayout />);

      // Verify the app intercepts the persistent state and routes them away
      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith('/loadcat');
      });
    });

    it('Should keep unauthenticated users on the public stack (no redirect)', async () => {
      // Simulate the unauthenticated user is alread at the login screen
      mockUseSegments.mockReturnValue([
        '(preGameConfig)',
        '(userAuth)',
        'login',
      ]);

      render(<RootLayout />);

      expect(router.replace).not.toHaveBeenCalledWith('/loadcat');
    });

    it('Should route unauthenticated users to /login', async () => {
      // Simulate the unauthenticated user is at empty root folder
      mockUseSegments.mockReturnValue([]);

      render(<RootLayout />);

      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith('/login');
      });
    });
  },
);
