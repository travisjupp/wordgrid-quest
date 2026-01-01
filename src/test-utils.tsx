import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@providers/ThemeProvider';
// Import real reducer/slice to test actual logic flow
import rootReducer from '@store/rootReducer';

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
      <ThemeProvider>
        {/* add Keyboard, SafeArea, Overlay... */}
        {children}
      </ThemeProvider>
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
