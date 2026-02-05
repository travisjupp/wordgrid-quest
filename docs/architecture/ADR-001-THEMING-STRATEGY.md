# ADR-001: Theming Strategy

> ## Using, Reusing, and Extending Theme Styles
> 
> Currently, we have this nasty, verbose setup where a RNP `useTheme` hook in the body of our HomeScreen sub-component grabs `theme` from our Paper Theme, then uses React Native's `StyleSheet.create` method to create a stylesheet in the **BODY** of the component (`theme` is only available there) and applies `theme` properties (E.g., `color: theme.colors.onSurface`) to HomeScreen's JSX.
> 
> ```tsx
> // index.tsx
> export default function HomeScreen() {
>  //...
>   const theme = useTheme();
>   const styles = StyleSheet.create({
>     container: {
>       flex: 1,
>       justifyContent: 'center',
>       alignItems: 'center',
>       backgroundColor: theme.colors.surface,
>     },
>     text: {
>       color: theme.colors.onSurface
>     },
>     link: {
>       color: theme.colors.onSurface,
>       fontWeight: 'bold',
>       fontSize: 26
>     },
>     switch: {
>       borderColor: '#00ff00',
>     },
>   });
> 
>   return (
>     <View style={styles.container}>
>       {/* ... */}
>       <Button icon="camera" disabled={true} mode="contained">Disabled</Button>
>       <Link style={{color: theme.colors.onSurface}} href="/details">View details</Link>
>       <Link style={styles.link} href="/bottomSheet">View bottomSheet</Link>
>     </View>
>   );
> }
> ```
> Using `StyleSheet.create` is fine, but it should only be used OUTSIDE of the component for now and `useAppTheme` hook should pull in all our custom properties from the theme object(s) (lightTheme/darkTheme). So, the custom `container` property defined above background color would change from :
> `backgroundColor: theme.colors.surface` to:
> `backgroundColor: surface`,
> But first, theses styles would need to be imported from our theme using object destructuring: `const { colors: { surface }, } = useAppTheme()`
> 
> That being said, can we not add all our sub-component styles to our `./app/_layout.tsx` theme objects (lightTheme/darkTheme) and remove that nastay `StyleSheet.create({...})` from our `HomeScreen` component completely? I think we should, as it IS part of the theme after all and it is wasteful to not reuse styles in our sub-components. 
> 
> ### Atomic Style approach
> 
> Ultimately, React Natives `StyleSheet.create()` should be reserved only for NON-theme styles or theme styles that need to be _augmented_ for a specific component but have been initially defined in our Paper Theme.
> 
> Lets say our Paper Theme (`app/_layout.tsx`) has the following container style:
> 
> ```js
>     container: {
>       flex: 1,
>       justifyContent: 'center',
>       alignItems: 'center',
>       backgroundColor: theme.colors.surface,
>     }
> ```
> ...and our current component (`app/index.tsx`) requires a slightly modified version with a different background color. We can extend the imported Paper Theme style with using `StyleSheet.create()` with the Spread Operator:
> 
> ```js
> // base style imported from our Paper Theme
> const { container } = useAppTheme();
> 
> // slightly modified version
> const alertContainerStyle = {
>     ...container, // Inherit base properties
>     alignItems: 'start', // Augment/Override alignItems
>     backgroundColor: 'red', // Add/Override backgroundColor
> };
> 
> const styles = StyleSheet.create({
>     contianer: container,
>     alertContainer: alertContainerStyle,
> });
> ```
> 
> 
> 
> 
>  

 _Originally posted by @travisjupp in [#61](https://github.com/travisjupp/wordgrid-quest/issues/61#issuecomment-2973324455)_
