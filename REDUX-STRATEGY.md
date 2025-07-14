# Redux Strategy (TS)

    wordgrid-quest/
    ├── app/                  # Expo Router routes
    ├── assets/               # Static assets
    └── src/
        ├── features/         # Feature-specific Redux logic and components
        │   └── timer/
        │       ├── Timer.tsx
        │       ├── timerSlice.ts
        │       └── timerHooks.ts      # (Optional) Custom hooks *specific* to the timer
        ├── store/              # Central Redux store setup
        │   ├── index.ts        # Redux store configuration and setup
        │   └── rootReducer.ts  # Combines all your reducers
        ├── hooks/              # Global typed Redux hooks and other general custom hooks
        │   └── useAppHooks.ts  # Your file with useAppDispatch, useAppSelector, etc.
        ├── components/         # Reusable UI components
        └── types/              # TypeScript type definitions


## Setup Redux with Timer State

- [ ] [Install Redux Toolkit and React Redux](https://react-redux.js.org/tutorials/quick-start#install-redux-toolkit-and-react-redux) `npm install @reduxjs/toolkit react-redux`

- [ ] [Create a Redux Store](https://react-redux.js.org/tutorials/quick-start#create-a-redux-store)

### Move Timer component to `features/`
- [ ] Move Timer component to feature specific `src/features/timer/Timer.tsx`
- [ ] Create `@features` path-alias in `tsconfig.json`
- [ ] Relink any broken imports

### Create Redux State Slice
- [ ] [Create a Redux State Slice](https://react-redux.js.org/tutorials/quick-start#create-a-redux-state-slice)
```js
// features/timer/timerSlice.ts
import { createSlice } from '@reduxjs/toolkit'

export interface TimerState {
    isRunning: boolean;
}

const initialState: TimerState = {
    isRunning: false,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer: () => {}, // Set isRunning true
        stopTimer: () => {}, // Set isRunning false
        resetTimer: () => {}, // Set isRunning false
        //...
    }
});

// Action creators are generated for each case reducer function
export const {startTimer, stopTimer, resetTimer} = timerSlice.actions
export default timerSlice.reducer
```

### Use a Root Reducer (`combineReducers`):
- [ ] Combine reducers for modular approach
```ts
// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'; 
import timerReducer from '../features/timer/timerSlice'; 
// Import other reducers as you add them

const rootReducer = combineReducers({
  timer: timerReducer,
  // Other slices of state will be added here
});

export default rootReducer; 
```

### Create Store (Add root reducer to store):
- [ ] Create store with Root Reducer
```ts
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export default configureStore({
  reducer: rootReducer,
  // Other store configs eg. middleware, devtools, etc.
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

### Typed Hooks
- [ ] [Define Typed Hooks](https://react-redux.js.org/tutorials/typescript-quick-start#define-typed-hooks)
```ts
// src/hooks/useAppHooks.ts
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
```

### Provide Store to React
- [ ] [Provide the Redux Store to React](https://react-redux.js.org/tutorials/quick-start#provide-the-redux-store-to-react)
```js
// app/_layout.tsx
//...
import { Provider } from 'react-redux'; // Import the Redux Provider
import { store } from '../src/store'; // Import your Redux store from src/store/index.ts

export default function RootLayout() {
    <Provider store={store}> {/* Wrap app with the Redux Provider */}
        <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ //... }}>
            </Stack>
          </GestureHandlerRootView>
        </PaperProvider>
      </ThemeContext.Provider>
    </Provider>
}
```

### Use State in Component
- [ ] [Use Redux State and Actions in React Components](https://react-redux.js.org/tutorials/quick-start#use-redux-state-and-actions-in-react-components)
```js
// src/features/timer/Timer.tsx
//...
import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks'; // Typed hooks
import { startTimer, stopTimer, resetTimer } from './timerSlice'; // Actions

const Timer = () => {
  const dispatch = useAppDispatch();
  const { isRunning } = useAppSelector((state) => state.timer);
  const [ timeRemaining, setTimeRemaining ] = useState(0); // Display time remaining
  const intervalIdRef = useRef<number | null>(null); // Local ref for interval ID

  // Effect to manage the setInterval side effect
  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1000);
      }, 1000);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Clear the interval
        intervalIdRef.current = null;
      }
    }

    return () => { // Cleanup function when component unmounts
      if (timerInterval) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning]); // Re-run effect when isRunning changes

  const handleTimerStart = () => { }; // dispatch timerStart, reset time remaining
  const handleTimerStop = () => { }; // dispatch timerStop
  const handleTimerReset = () => { }; // dispatch timerReset, reset time remaining

  const formatTime = (timeInSeconds:number) => {
    // const hours = String(Math.floor(timeInSeconds / 3600)%12).padStart(2, '0');
    const minutes = String(Math.floor(timeInSeconds / 60)%60).padStart(2, '0');
    const seconds = String(timeInSeconds%60).padStart(2, '0');
    // return `${hours}:${minutes}:${seconds}`;
    return `${minutes}:${seconds}`;
  };
  //...
  // Retrieve Custom Theme-properties
  const {
    timer,
    colors: { onSecondaryContainer }
  } = useAppTheme();

  return (
    <View style={timer}>
      <Text variant="timer" style={{color: onSecondaryContainer}}>
        {formatTime(timeRemaining)}
      </Text>
      <Button onPress={handleTimerReset} icon="redo">
        <Text style={{color: onSecondaryContainer}}>Reset Timer</Text>
      </Button>
      <Button onPress={handleTimerPause} icon="pause">Pause Timer</Button>
      <Button onPress={handleTimerStart} icon="play">Start Timer</Button>
    </View>
  );
};

export default Timer;
```

https://react-redux.js.org/tutorials/quick-start
