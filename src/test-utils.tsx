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
}

// Override the standard render method
const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    ...options
  }: CustomRenderOptions = {}
) => {

const store = createMockStore();
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

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Re-export everything from RNTL + custom render
export * from '@testing-library/react-native';
export { customRender as render };
