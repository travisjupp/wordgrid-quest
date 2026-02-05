# ADR-003: Firebase Identity and Sanitized Persistence Strategy

**Status:** `Accepted`
**Date:** `2026-02-05`
**Decisions Linked:** [Epic #111], [Epic #36], [Issue #171], [Issue #115]
**Scope**: `Infrastructure / Architecture`
**Parent Epic:** Epic: Infrastructure & DX (#35)

## 1. Context and Problem Statement
The application requires a robust method for persisting transient "audit" data from Redux to a cloud-based database (Firestore). Previous testing identified three critical architectural gaps:
1.  **Identity Persistence:** Authentication sessions do not survive app restarts on physical devices.
2.  **Data Integrity:** Transient input is vulnerable to XSS injection or structural malformation during the "Audit-to-Edit" transition.
3.  **Cost Constraints:** The system must operate strictly within **Firebase Spark Plan** quotas (1MB document limit, 20k daily writes).

## 2. Decision
We have decided to implement a **"Thunk Gatekeeper"** pattern for data persistence and a **Native AsyncStorage** persistence layer for identity management.

### 2.1 Identity Management
*   We will explicitly configure the Firebase Auth service using `@react-native-async-storage/async-storage` via the `getReactNativePersistence` method. This replaces the default in-memory persistence which was causing session loss.

### 2.2 The "Thunk Gatekeeper" Pattern
*   **Bottleneck Sanitization:** Data will be sanitized exactly once—inside Redux Thunks—immediately before the Firestore persistence call.
*   **Validation (Zod):** We will use **Zod** to enforce schema constraints (e.g., 255-character limits for Terms) before the network request.
*   **Sanitization (DOMPurify):** We will use **DOMPurify** at the thunk level to strip HTML/Script tags, ensuring that the "transient-to-permanent" data pipe is free of malicious payloads.

### 2.3 Data Infrastructure & Security
*   **Flat Collections:** Firestore will utilize a flat-collection pattern for `customMaterials` to optimize read costs and query performance.
*   **Double-Lock Defense:** Client-side sanitization is backed by **Firestore Security Rules** that verify `request.auth.uid` matches the document's owner and enforce string-only type checks.

## 3. Alternatives Considered
*   **UI-Level Sanitization:** Rejected. Managing sanitization within React components leads to logic duplication and increases the risk of "security leakage" as the UI scales.
*   **Cloud Functions for Sanitization:** Rejected. While more secure, this adds latency and increases the risk of exceeding the Spark Plan's monthly invocation limits.

## 4. Consequences
*   **Positive:** Centralizing security logic in Thunks ensures the "Transient Store" and "Cloud Store" remain consistent and synchronized.
*   **Positive:** Establishing a stable Zod schema provides automatic TypeScript safety from the input form to the database.
*   **Negative:** Developers must ensure the Zod schema is updated in tandem with any Firestore schema changes to avoid validation rejection.
*   **Technical Debt:** Manual `initializeAuth` configuration is required to bypass Expo/Firebase version conflicts regarding the native bridge.

