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
- [ ] [Create a Redux Store](https://react-redux.js.org/tutorials/quick-start#create-a-redux-store)
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

## Managing Data

### Categories, Discovery Terms & Definitions (Items)

1. Storing Discovery-terms with Defintions (Items[^5]) in Redux

Discovery-terms[^1] with their accompanying Definitions[^2] are always stored in Redux state as a property of the Category[^3] object that defines the category to which the terms belong. The structure of this data can be shown using a group of discovery-terms that fall under the category "Marsupials" that are stored in a Redux `discoveryTermsSlice`:

```js
// src/features/discoveryTermsSlice.ts
// ...
{ // initialState:
    category: {
        marsupials: [
            { dt: 'Koala', def: 'Tree-dwelling marsupial native to Australia' },
            { dt: 'Wombat', def: 'Burrowing marsupial with a stubby tail' },
            { dt: 'Kangaroo', def: 'Large marsupial that hops and carries young in a pouch' }
        ],
        // User-supplied Custom Material loaded here 
        // (E.g., `asyncJS: [{ dt: 'Promise', def: 'object representing...' },...`)
    },
    activeCategory: 'marsupials'
},
    reducers: {
        addCustomCategory: () => {},
        setActiveCategory: () => {}
}
```

> [!NOTE]
> As we work out the gameplay logic going forward, Discovery-term objects can
> expand to hold more properties to simplify things, one example could be a
> `letterTilesRemaining` property with a value range from 0 to `dt.length` for
> tracking scorepoints.


2. Example Data-flow

We have a `TopicFrame` (#71) component that wraps the components responsible for displaying the current topic (`CategoryHeader` (#72)) with one or more definitions (`DefinitionCarousel` (#73)). Using a Redux Selector, `TopicFrame` checks `activeCategory` then passes the category and definitions to its sub-components to be displayed in the UI.

Redux Selectors are defined in a `<featureName>Selectors.ts` file adjacent to the Redux Slice file `<featureName>Slice.ts` in the approprate folder:
```ts
// src/features/discoveryTerms/discoveryTermsSelectors.ts (same folder as discoveryTermsSlice.ts)
export const selectDefinitionsForActiveCategory = (state: RootState) => {
    const terms = state.discoveryTerms.categories[state.discoveryTerms.activeCategory] || [];
    return terms.map(term => term.definition);
};
```

Selector is used in the `TopicFrame` component:
```ts
// src/components/TopicFrame.tsx
import { useAppSelector } from '@hooks/useAppHooks';
import { selectActiveCategory, selectDefinitionsForActiveCategory } from '@features/discoveryTerms/discoveryTermsSelectors';

const category = useAppSelector(selectActiveCategory);
const definitions = useAppSelector(selectDefinitionsForActiveCategory);
// Pass category to CategoryHeader, definitions to DefinitionsCarousel
```


3. Loading Custom Material (multi-step form)

The steps a user takes when uploading Custom Material[^4] involves a [multi-step form](https://www.figma.com/proto/IiHd2g9zMPmTjf26rPoZbq/WordGrid-Quest?node-id=377-1420&p=f&t=2t3Czvs6J4u3axla-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=377%3A1420&show-proto-sidebar=1) with 3 steps:

    1. Category Creation: User supplies the category for the Discovery-terms
       
        * Create a `LoadMaterialCategory` component that returns a JSX form

        * Dispatch `addCustomCategory` action on form submit with payload

        * Use Expo Router `router.replace()` to move to next form step 

          Note: We can pass `activeCategory` data to the next component at
                this point using query parameters:
                ```
                router.replace({
                    pathname: '/load/loadmaterial-items',
                    params: { activeCategory: 'Marsupials' }
                });
                ```
                Then in `LoadMaterialItems` we can display it:
                ```
                const {activeCategory} = useLocalSearchParams();
                return <Chip icon='pencil-outline'>{activeCategory}</Chip> 
                ```

    2. Add Items: User adds 1 or more Items[^5] (2 form fields each: word, definition)

       * Create a `LoadMaterialItems` component that shows a "+" button to display
         a bottomSheet when pressed and has a local `useState` for temporarily storing 
         Items

       * Create a `LoadItem` component to be displayed in the bottomSheet
         that returns a JSX form for loading Items and, from `LoadMaterialItems`,
         pass `setItem` to it

       * In `LoadItem`, create a `pressHandler` function responsible for calling
         `setItem(form-data)` to store an Item from `LoadItem` to the `LoadMaterialItems`
         components local-state when User presses "Add More" or "Done"

       * The "Add More" displays a new form after submitting data, while "Done"
         submits the Item then closes the bottomSheet revealing `LoadMaterialItems`
         which is now populated with our loaded material Items for review
          

    3. User Confirmation: User is shown list of items for confirmation and is given the
       option to remove Items (x) and/or add more (+) before continuing

    4. User Submits by pressing "Continue": Pressing "Continue" dispatches the action
       responsible for moving our new Custom Material object from local-state to
       the Redux stores `category` object in `discoveryTermsSlice.ts` AND setting the
       `activeCategory` to the name of our new custom category




[^1]: Discovery-terms: The scrambled terms a user is tasked with finding in the word-grid.
[^2]: Definitions: The statement describing the Discovery-term is displayed in `DefinitionCarousel`
[^3]: Category: Used to group related Discovery-terms and is displayed in the UI `CategoryHeader`
[^4]: Custom Material: Discovery-terms and definitions supplied by a user using multi-stage form
[^5]: Items: A Discovery-term and Definition represented as a `{ dt: 'someTerm', def: 'someDef' }`

