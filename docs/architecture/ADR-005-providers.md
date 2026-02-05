# ADR-005: Provider Orchestration & Context Encapsulation

**Status:** `Accepted` (Implemented 2024, Validated via Expo 53 Migration 2026)
**Scope:** `Infrastructure / Architecture`
**Parent Epic:** Epic: Infrastructure & DX (#35)

## Context
Providing React Contexts "nakedly" within `_layout.tsx` leads to high cognitive load, cluttered entry files, and unnecessary re-renders due to non-memoized value objects. Standardized state isolation is required to maintain 60fps performance and developer velocity.

## Decision
We adopt the **WGQ Provider Technique**: a 5-step enforcement pattern that decouples **Context Definition**, **Hook Consumption**, and **Logic Implementation** into self-contained Provider units.

## Consequences
**Positive**: Single Source of Truth for state logic; Type-safe hooks with built-in null-checks; Clean, declarative `_layout.tsx`.

**Neutral**: Requires boilerplate (5-file setup) for new global features to ensure long-term scalability.

**Issue**: Providing the context _directly_ where it is to be consumed (very simple static values may be an exception).
 
```tsx
// _layout.tsx
<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}> {/* <-- Provided directly */}
  <PaperProvider theme={theme}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModalProvider> {/* <-- Uses a wrapper */}
        <Stack
...
```
**Consequences** of not wrapping contexts:

1. `{ isDarkTheme, toggleTheme }` is a new object on every render of `_layout.tsx` so every component that consumes `ThemeContext` will be forced to re-render even if the values haven't changed. 

2. `_layout.tsx` is cluttered with `const [isDarkTheme, setIsDarkTheme] = useState(deviceThemeIsDark)` and `const toggleTheme = () => {setIsDarkTheme(prev => !prev)}`.

3. Every time we want to use `ThemeContext` we need to re-implement the state because it's not self contained.

**Preferred Technique**: Contain the context logic by moving the logic to a `<someComponent>Provider.tsx`:
```tsx
// src/providers/ThemeProvider.tsx
import { useState, useMemo, FC, ReactNode } from 'react';
import ThemeContext from '../context/ThemeContext';

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const contextValue = useMemo(() => ({
    isDarkTheme,
    toggleTheme,
  }), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
```
Now `_layout.tsx` is cleaner:
```tsx
// _layout.tsx
<ThemeProvider> {/* <-- Now uses a self-contained wrapper */}
  <PaperProvider theme={theme}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModalProvider>
        <Stack
...
```

## Steps for adding a component to a Provider (WGQ Technique)

### 1. Create and **export the types** from a `./types/<ComponentName>Types.ts` file:
   - The types are whatever methods are available in the Provider 
      E.g., `showComponent`, `hideComponent`
   - Use JSDoc blocks to describe what the method do 
      E.g., "shows the component" (hints displayed in editor)

<details>
      <summary>Types Example</summary>

```tsx
export type ShowModal = (content: React.ReactNode) => void;
export type HideModal = () => void;

export interface ModalContextType {
  /**
   * Displays a modal containing a component
   * @param content The content for the modal.
   */
  showModal: ShowModal;
  /**
   * Hides the currently visible modal.
   */
  hideModal: HideModal;
}
```
</details>



### 2. Create the **context file** `./contexts/<ComponentName>Context.ts` file:
   - Imports the types from file in step 1
   - Uses React `createContext`
   - Returns the context using a default export

<details>
      <summary>Context Example</summary>

```tsx
import { ModalContextType } from '@custom-types/ModalTypes';
import { createContext } from 'react';

const ModalContext = createContext<ModalContextType | null>(null);
export default ModalContext;
```
</details>



### 3. Create the **hook file** `./hooks/use<ComponentName>.ts`:
   - Imports the context from file in step 2
   - Uses React `useContext`
   - Throws a Error of context is false:
      "`use<ComponentName>` must be used within a `<ComponentName>Provider`"
   - Returns the value of `useContext(<ComponentName>Context)`

<details>
      <summary>Hook Example</summary>

```tsx
import ModalContext from '@contexts/ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
```
</details>



### 4. Create a **provider file** `./providers/<ComponentNameOrFeatureName>Provider.tsx`: 
   - Imports the context from file in step 2
   - Exports a `<ComponentNameOrFeatureName>Provider` function (named export)
   - Provider func contains the logic (methods) defined in step 1
   - Create a `contextValue` object containing the methods used in the hook 
      E.g., `{ showComponent, hideComponent }`
   - Returns the context jsx wrapped around children 
      E.g., `<ModalContext value={contextValue}>{children}</ModalContext>`

<details>
      <summary>Provider Example</summary>

```tsx
import {
  View,
  Modal as RNModal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useAppTheme } from '@theme/themeConfig';
import ModalContext from '@contexts/ModalContext';
import SnackbarContext from '@contexts/SnackbarContext';
import React, { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import * as SnackbarTypes from '@custom-types/SnackbarTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

export function OverlayProvider({ children }: Props) {
  const insets = useSafeAreaInsets();

  // Retrieve Custom Theme-properties
  const { modal } = useAppTheme();

  // Modal State
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  // Snackbar State
  const [snackbarState, setSnackbarState] =
    useState<SnackbarTypes.SnackbarState>({
      message: '',
      icon: undefined,
      visible: false,
      iconPressCb: undefined,
      action: undefined,
      calledFromModal: undefined,
    });

  // Modal Logic
  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  // Snackbar Logic
  const showSnackbar = (snackbarConfig: SnackbarTypes.SnackbarConfig) => {
    const icon = snackbarConfig.icon ?? 'close';
    const iconPressCallback = snackbarConfig.iconPressCb ?? hideSnackbar;

    setSnackbarState({
      message: snackbarConfig.message,
      icon: icon,
      visible: true,
      iconPressCb: iconPressCallback,
      action: snackbarConfig.action,
      calledFromModal: snackbarConfig.calledFromModal,
    });
  };

  const hideSnackbar = () => {
    setSnackbarState(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const dismissSnackbarFunction = snackbarState.iconPressCb ?? hideSnackbar;
  const onDismissSnackbar = () => {
    dismissSnackbarFunction();
    hideSnackbar(); // Ensure orphaned Snackbars hide
  };

  return (
    <ModalContext value={{ showModal, hideModal }}>
      <SnackbarContext value={{ showSnackbar, hideSnackbar }}>
        {children}
        {modalVisible && (
          /* DISPLAY SNACKBARS WHILE MODALS OPEN CONFIG
           * (SNACKBARS OVERLAY MODALS) */
          <Portal>
            <RNModal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onDismiss={() => {
                setModalVisible(false);
              }}
              testID='Modal'
            >
              <KeyboardAvoidingView
                behavior='height'
                style={[modal.contentWrapper, { marginTop: insets.top }]}
                testID='Modal Content Wrapper'
              >
                <View
                  style={modal.contentAndSnackbarContainer}
                  testID='Modal Content and Snackbar Container'
                >
                  {modalContent}
                  <Snackbar /* Display within and over Modal */
                    visible={snackbarState.visible}
                    onDismiss={onDismissSnackbar}
                    action={snackbarState.action}
                    icon={snackbarState.icon}
                    onIconPress={snackbarState.iconPressCb}
                    wrapperStyle={modal.overModalSnackbarWrapper}
                    style={modal.overModalSnackbar}
                    testID='Over Modal Snackbar'
                  >
                    {snackbarState.message}
                  </Snackbar>
                </View>
              </KeyboardAvoidingView>
            </RNModal>
          </Portal>
        )}
        {!modalVisible && snackbarState.visible && (
          /* DISPLAY SNACKBARS NO MODAL OPEN CONFIG
           * (SNACKBARS DEFAULT) */
          <>
            {Platform.OS === 'web' ?
              <Snackbar
                visible={snackbarState.visible}
                onDismiss={onDismissSnackbar}
                action={snackbarState.action}
                icon={
                  snackbarState.calledFromModal ? 'close' : snackbarState.icon
                }
                onIconPress={
                  snackbarState.calledFromModal ? hideSnackbar : (
                    snackbarState.iconPressCb
                  )
                }
                wrapperStyle={modal.defaultWebSnackbarWrapper}
                style={modal.defaultWebSnackbar}
                testID='Default Web Snackbar'
              >
                {snackbarState.message}
              </Snackbar>
            : <KeyboardAvoidingView behavior='padding'>
                <Snackbar
                  visible={snackbarState.visible}
                  onDismiss={onDismissSnackbar}
                  action={snackbarState.action}
                  icon={
                    snackbarState.calledFromModal ? 'close' : snackbarState.icon
                  }
                  onIconPress={
                    snackbarState.calledFromModal ? hideSnackbar : (
                      snackbarState.iconPressCb
                    )
                  }
                  wrapperStyle={modal.defaultMobileSnackbarWrapper}
                  style={modal.defaultMobileSnackbar}
                  testID='Default Mobile Snackbar'
                >
                  {snackbarState.message}
                </Snackbar>
              </KeyboardAvoidingView>
            }
          </>
        )}
      </SnackbarContext>
    </ModalContext>
  );
}

```
</details>



### 5. Provider is **ready to provide hooks** to sub-components:
   - Wrap consuming sub-components with provider from step 4 
      E.g., `<ModalProvider><StackOrComponent /></ModalProvider>`
   - Now `<StackOrComponent />` can use the hook and methods it contains 
      E.g., `const { showModal, hideModal } = useModal()`

<details>
      <summary>Usage Example</summary>

```tsx
//...
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider>
            <KeyboardProvider>
              <LogoProvider>
                <JsStack screenOptions={screenOptions} />
              </LogoProvider>
            </KeyboardProvider>
          </OverlayProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}

```
</details>

