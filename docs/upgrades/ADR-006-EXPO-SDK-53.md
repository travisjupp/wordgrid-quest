# ADR-006: Migration to Expo SDK 53 and Infrastructure Hardening

**Status:** Accepted  
**Date:** 2025-07-08  
**Decisions Linked:** [#64], [Security Advisory #2]

## 1. Context and Problem Statement
The project was operating on Expo SDK 52.0.46. An upgrade was necessitated by two primary factors:
1.  **Security Vulnerability:** Dependabot identified a Critical/High severity Regular Expression Denial of Service (ReDoS) vulnerability in `brace-expansion` ([Security #2](https://github.com)).
2.  **Infrastructure Drift:** Node.js and NPM versions required alignment with modern LTS standards to ensure build stability and performance for the "Wall of Providers" implementation.

## 2. Decision
We decided to perform a full infrastructure pivot to **Expo SDK 53** and align the development environment with **Node 22 (LTS)**.

### 2.1 Dependency and Version Alignment
*   **Expo SDK:** Upgraded from `~52.0.46` to `^53.0.0`.
*   **Runtime:** Migrated to **Node.js 22.17.0** via NVM to leverage improved ESM support and performance.
*   **Package Manager:** Updated to **NPM 11.4.2**.

### 2.2 Security Remediation
*   The upgrade successfully resolved the `brace-expansion` ReDoS vulnerability by moving the dependency tree to a patched version provided by the SDK 53 baseline.

### 2.3 Verification Strategy
*   Implementation of `npx expo-doctor` as a mandatory CI/CD gate. 
*   **Known Constraint:** At the time of merge, `expo-doctor` identified minor patch-version mismatches (e.g., `expo@53.0.13` vs `53.0.15`). It was decided to proceed with the core upgrade and handle minor patch drifts iteratively via `npx expo install --check`.

## 3. Alternatives Considered
*   **Patching SDK 52:** Rejected. Manual patching of sub-dependencies is brittle and does not solve the underlying infrastructure drift.
*   **Immediate Move to SDK 54:** Rejected. SDK 54 was not stable/released at the time of this pivot; SDK 53 provided the necessary bridge for React 18.3 stability.

## 4. Consequences
*   **Positive:** Resolution of critical security vulnerabilities.
*   **Positive:** Established the "Fresh Store" testing pattern on a more stable native bridge.
*   **Neutral:** Resulted in a minor increase in build times due to the updated Metro bundler settings, later mitigated by optimized caching.

