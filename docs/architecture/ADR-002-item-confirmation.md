# ADR-002: Form Factory State Reconciliation

**Status:** `Accepted`
**Date:** `2026-01-20`
**Decisions Linked:** [#98], [#102], [#104], [#166]
**Scope**: `Infrastructure / Architecture`
**Parent Epic:** Epic: Custom Material (#98)

## Status
Proposed (Pivot to Single Source of Truth)

## Context
The project utilizes a multi-stage Form Factory (`LoadItem` / `Item`) and a Confirmation Stage (`ConfirmMaterialItems`). The current architecture uses a hybrid of local state and Redux, leading to **Orphaned UI Nodes** where items deleted in the Confirmation Stage (Redux) persist in the Factory Stage (Local State).

## Decision
We will **decouple** the Form Factory from local parent state and **implement** a **Single Source of Truth (SSOT)** architecture using Redux exclusively for data persistence and UI rendering.

## Rationale
- **Deterministic Reconciliation**: Using Redux as the SSOT ensures the Factory and Audit lists are always in sync, neutralizing the **fragility** of dual-track state.
- **Elimination of Orphaned Nodes**: Since `LoadItem` will map directly from the Redux store, a deletion in the audit list will automatically trigger an unmount in the factory.
- **Encapsulation**: Simplifies the `Item` component API by removing the need for complex local state updaters.

## Consequences
- **Character Latency**: To prevent UI jank, `Item` will maintain a "transient" local state for `onChange` but will **standardize** the `onBlur` event as the primary **data-pipe** for Redux hydration.
- **Complexity**: Requires **orchestration** of a `NumericKeyObjectRecord` schema to prevent index collisions.

