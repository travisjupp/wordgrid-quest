import { customText } from 'react-native-paper'
// If you're using TypeScript you will need to create a 
// custom Text component which accepts your custom variants
// https://callstack.github.io/react-native-paper/docs/guides/fonts/#using-configurefonts-helper-1

// Use this instead of importing `Text` from `react-native-paper`

export const Text = customText<
| 'brand' 
| 'letterTile'
| 'timer'
>()
