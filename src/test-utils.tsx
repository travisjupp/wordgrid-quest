import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@providers/ThemeProvider';
// Import real reducer/slice to test actual logic flow
import rootReducer from '@store/rootReducer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from '@providers/OverlayProvider';

// Create a "Fresh" store for every test to avoid state pollution
const createMockStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

// The (boilerplate abstracting) Wrapper Component
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const store = createMockStore();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <OverlayProvider>
                {/* add Keyboard, SafeArea, Overlay... */}
                {children}
              </OverlayProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

// Override the standard render method
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from RNTL + custom render
export * from '@testing-library/react-native';
export { customRender as render };
