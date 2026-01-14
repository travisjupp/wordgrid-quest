import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@providers/ThemeProvider';
// Import real reducer/slice to test actual logic flow
import rootReducer from '@store/rootReducer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from '@providers/OverlayProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RootState } from './store';

// Create a "Fresh" store for every test to avoid state pollution
const createMockStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: EnhancedStore;
}

interface CustomRenderResult extends ReturnType<typeof render> {
  store: ReturnType<typeof createMockStore>;
}

/**
 * CUSTOM RENDER UTILITY
 * 
 * Purpose: 
 * Orchestrates a hardened testing environment by wrapping components 
 * in the "Wall of Providers" (Redux, Theme, Overlay, etc.).
 * 
 * Features:
 * 1. Fresh Store Pattern: Instantiates a unique Redux store per test to 
 *    prevent state leakage and resolve environment fragility.
 * 2. High-Fidelity State Access: Returns the 'store' instance alongside 
 *    standard RNTL utilities to enable direct verification of the data-pipe.
 * 3. Environmental Parity: Hydrates the theme and native stubs to match 
 *    production behavior within a Node.js ecosystem.
 * 
 * Usage:
 * const { store } = render(<MyComponent />, { preloadedState: { ... } });
 * fireEvent.press(screen.getByText('Submit'));
 * expect(store.getState().slice.data).toBe('Expected Value');
 */

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {},
): CustomRenderResult => {

  // The (boilerplate abstracting) Wrapper Component
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <OverlayProvider>
                  {/* add Keyboard, SafeArea, Overlay... */}
                  {children}
                </OverlayProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: AllTheProviders, ...renderOptions }),
  };
};

// Re-export everything from RNTL + custom render
export * from '@testing-library/react-native';
export { customRender as render };
