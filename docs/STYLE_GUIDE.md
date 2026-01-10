Maintain, Organize, or Restructure **Theme Config** properties and styles for ease of use and intuitive discovery.

### Style Tenets
- Custom Properties should be easy to find
- Theme Styles should be intuitive
- Styles / Properties should be reused where appropriate
- Avoid Redundancy (Superfluity)
- Strive for concision
- Design for future you (or whoever)

### Grouping / Nesting Component Styles
Style Objects should be Grouped/Nested by 
`CategoryNameOrGroupName.ComponentName.PropertyName` 
E.g., `preGameConfig.authScreens.loginScreen.animatedView`

### Importing Component Styles
Import objects from **Theme Config** to avoid long chained property notations.

Instead of `const { preGameConfig } = useAppTheme()`, import at the level intended for use: `const { preGameConfig: { authScreens } } = useAppTheme()` so components only contain necessary styles. 

By importing at level of intended use, the component `style` prop won't contain the entire "Subway Line" but only the "Cars" needed; E.g., `<someComp style={authScreens.animatedView} />` is better than `<someComp style={grandmasStyles.theCatsStyles.preGameConfig.authScreens.animatedView} />` but may not always be possible so use your own discretion while keeping the "Style Tenets" in mind.

### Global and Shared Styles

For now **Global Styles** are defined at the first level and Components' **Shared Styles** (I.e., styles shared by components in a group) can be nested directly under the **Category** or **Group** name, adjacent to Component names containing isolated styles. But, **SHARED STYLE PROPERTY NAMES SHOULD START WITH 'shared'** so you know that changing the properties for CSS Rule `sharedAnimatedView` will affect more components than the one you're currently refactoring.

### Component Props `<someComp {...props} />`

...not there yet
