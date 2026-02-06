# ADR-001: Centralized Theming and Atomic Style Governance

**Status:** Accepted  
**Owner:** Engineering  
**Decisions Linked:** [#61], [#102], [#172]  
**Date:** February 6, 2026 (Revised)  

## 1. Context and Problem Statement
Early development was characterized by the **"Drifter Pattern"**—a practice where `StyleSheet.create` was invoked inside functional component bodies. This led to:
1.  **Memory Volatility:** Stylesheets were re-allocated on every render, bypassing the native optimization of the [React Native Bridge](https://reactnative.dev).
2.  **Thematic Fragmentation:** Hardcoded design tokens (e.g., `borderColor: 'yellow'`) "drifted" away from the global MD3 specification.
3.  **Syntactic Noise:** JSX was cluttered with deep-path property accessors, obscuring business logic.

## 2. Decision: The "Wall of Providers" Style Pattern
We will utilize a **Theme-First** architecture. Components shall treat the central `themeConfig` as a Single Source of Truth (SSOT).

### 2.1 The Atomic Style Approach
`StyleSheet.create()` is strictly reserved for **Non-Theme styles** or **Augmented styles**. 
*   **Base Styles:** Defined globally in `themeConfig`.
*   **Augmentation:** Components requiring local overrides must use the spread operator to inherit base properties.

### 2.2 Hierarchical Organization (Nesting Schema)
Styles follow a strict hierarchy to ensure intuitive discovery:  
`[Category] . [Feature/Screen] . [Component] . [Property]`  
*Example:* `preGameConfig.authScreens.loginScreen.animatedView`

### 2.3 Logic for "Shared" vs. "Isolated" Styles
*   **Shared Styles:** Properties shared by a group must be prefixed with `shared` (e.g., `sharedInputWrapper`).
*   **Isolation:** Unique styles remain nested under specific component keys.

## 3. Style Tenets
1.  **Intuitive Discovery:** Nesting must not exceed four levels of depth.
2.  **Avoid Superfluity:** Do not redefine properties provided by the [React Native Paper MD3 Theme](https://callstack.github.io).
3.  **Destructured Imports:** Components must import at the "Level of Intended Use."

## 4. Proposal: Component Prop Abstraction (`{...props}`)
To further reduce JSX boilerplate, we propose abstracting repetitive component configurations (e.g., `mode`, `contentStyle`, `elevation`) into `themeConfig`.

*   **Implementation:** Store common prop-sets in `themeConfig.props`.
*   **Usage:** `<Button {...authStyles.primaryButtonProps}>Login</Button>`
*   **Constraint:** This is reserved for **Presentational Props** only. Logic-carrying props (e.g., `onPress`, `value`) must remain explicit in the JSX to maintain data-flow visibility.

## 5. Consequences
*   **Positive:** Significant reduction in "Drifter Pattern" overhead and render-cycle performance hits.
*   **Positive:** Centralized control over the "Boardroom Look" via global design tokens.
*   **Negative:** Increased initial configuration time when establishing new UI patterns.

