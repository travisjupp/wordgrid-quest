# ADR-004: Migration to Expo SDK 54 and React 19 Ecosystem

**Status:** Proposed  
**Date:** 2026-02-06  
**Decisions Linked:** [ADR-003], [Epic #35], [Issue #172]  

## 1. Context and Problem Statement
The project is currently provisioned on Expo SDK 53 with the **Fabric Renderer (New Architecture)** enabled. To maintain **Native Bridge** stability and access critical performance optimizations, a synchronized upgrade is required.
1.  **Fabric & Reanimated 4.x:** We need to align with SDK 54 to leverage the latest threading stability in Reanimated 4.
2.  **React Compiler Adoption:** Manual `useMemo`/`useCallback` hooks (Issue #102) add maintenance debt that the stable React Compiler in SDK 54 automates.
3.  **Mandatory Edge-to-Edge:** SDK 54 forces Android Edge-to-Edge. Delaying migration risks "Layout Debt" where UI developed now must be refactored later to support the mandatory native layout standard.

## 2. Decision
We will migrate the development ecosystem to **Expo SDK 54** on a dedicated verification branch (`infra/expo-54-upgrade`) prior to finalizing the Firebase persistence layer.

### 2.1 Native Architecture & Orchestration
*   **Fabric Stability:** Validate that **Concurrent Rendering** does not introduce race conditions in the `onLayout` registry or the **Audit-to-Edit loop** (#102).
*   **Dependency Alignment:** Orchestrate the upgrade via `npx expo install --fix` to ensure all native modules (Paper, Firebase, Reanimated) are reconciled.

### 2.2 Compiler and Performance
*   Enable the **React Compiler** experimental flag to automate component memoization.
*   **Consequence:** Manual `React.memo` wrappers will be systematically removed once compiler stability is verified.

### 2.3 Layout & Environment
*   **Mandatory Android Edge-to-Edge:** Adopt the new native standard, replacing legacy third-party layout managers with native SDK 54 implementation.
*   **Environment:** Mandate Node.js 20.19.4+ and move to the `sdk-54` EAS build image.

## 3. Alternatives Considered
*   **Delayed Upgrade (SDK 55):** Rejected. Jumping two major versions while on the New Architecture (Fabric) introduces too many variables for a single implementation track.

## 4. Consequences
*   **Positive:** Improved frame rates for the Form Factory and superior keyboard handling via Reanimated 4/Fabric.
*   **Positive:** Access to the latest security patches and performance fixes for the **Hermes engine**.
*   **Negative:** Risk of breaking changes in third-party integrations (specifically `BottomSheet`).
*   **Negative:** Developers must ensure the Zod schema remains strict to match React 19's tighter type-safety.

## 5. Success Criteria
*   **Verification:** `npx expo-doctor` reports zero peer dependency conflicts.
*   **Performance:** React DevTools "✨ badge" confirms the React Compiler is active on `ConfirmMaterialItems.tsx`.
*   **Stability:** All Jest 29+ integration tests pass within the Fabric/React 19 environment.

