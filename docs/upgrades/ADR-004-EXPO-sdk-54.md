# ADR-004: Migration to Expo SDK 54 Ecosystem

## Status
Proposed (Syncing with Epic #35)

## Context
The project is currently provisioned on Expo SDK 53 with the **Fabric Renderer (New Architecture)** enabled. To maintain **Native Bridge** stability and access the latest performance optimizations in the **Fabric Renderer** and **Reanimated 4.x**, a synchronized upgrade to Expo SDK 54 is required.

## Decision
We will migrate the entire development ecosystem to Expo SDK 54. This involves:
1. **Orchestrating** dependency alignment via `npx expo install --fix`.
2. **Hardening** the **Audit-to-Edit loop** against potential threading changes in Reanimated 4.
3. **Validating** continued **Fabric Renderer** stability, specifically ensuring that **Concurrent Rendering** does not introduce race conditions in the `onLayout` registry (#102).

## Consequences
- **Positive**: Improved frame rates for the Form Factory and better keyboard handling.
- **Positive**: Access to the latest security patches for the Hermes engine.
- **Negative**: Risk of breaking changes in the BottomSheet third-party integration.
- **Action**: A dedicated verification branch (`infra/expo-54-upgrade`) will be used to isolate the migration.

