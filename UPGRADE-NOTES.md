# Upgrade Notes

Upgraded Expo from 52.0.46 to 53.0.0

```bash

~/Documents/projects/wordgrid-quest-53 upgrade/sdk-53*
❯ npx expo install expo@^53.0.0 --fix                                                                              v22.17.0 "wordgrid-ques..
› Installing 1 other package using npm
› Using ^53.0.0 instead of ~52.0.47 for expo because this version was explicitly provided. Packages excluded from dependency validation should be listed in expo.install.exclude in package.json. Learn more
> npm install
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported

added 112 packages, removed 85 packages, changed 47 packages, and audited 1378 packages in 26s

209 packages are looking for funding
  run `npm fund` for details

1 low severity vulnerability

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
› Running npx expo install under the updated expo version
> expo install --fix
The following packages should be updated for best compatibility with the installed expo version:
  expo-blur@14.0.3 - expected version: ~14.1.5
  expo-constants@17.0.8 - expected version: ~17.1.6
  expo-dev-client@5.0.20 - expected version: ~5.2.2
  expo-font@13.0.4 - expected version: ~13.3.1
  expo-haptics@14.0.1 - expected version: ~14.1.4
  expo-linking@7.0.5 - expected version: ~7.1.5
  expo-router@4.0.21 - expected version: ~5.1.1
  expo-splash-screen@0.29.24 - expected version: ~0.30.9
  expo-status-bar@2.0.1 - expected version: ~2.2.3
  expo-symbols@0.2.2 - expected version: ~0.4.5
  expo-system-ui@4.0.9 - expected version: ~5.0.9
  expo-web-browser@14.0.2 - expected version: ~14.2.0
  react@18.3.1 - expected version: 19.0.0
  react-dom@18.3.1 - expected version: 19.0.0
  react-native@0.76.9 - expected version: 0.79.4
  react-native-gesture-handler@2.20.2 - expected version: ~2.24.0
  react-native-reanimated@3.16.7 - expected version: ~3.17.4
  react-native-safe-area-context@4.12.0 - expected version: 5.4.0
  react-native-screens@4.4.0 - expected version: ~4.11.1
  react-native-web@0.19.13 - expected version: ^0.20.0
  react-native-webview@13.12.5 - expected version: 13.13.5
  expo-navigation-bar@4.0.9 - expected version: ~4.2.6
  @types/react@18.3.20 - expected version: ~19.0.10
  jest-expo@52.0.6 - expected version: ~53.0.7
  eslint-config-expo@8.0.1 - expected version: ~9.2.0
Your project may not work correctly until you install the expected versions of the packages.
› Installing 25 SDK 53.0.0 compatible native modules using npm
> npm install
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.3.1" from react-dom@18.3.1
npm warn node_modules/react-dom
npm warn   react-dom@"19.0.0" from the root project
npm warn   1 more (react-native-web)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.2.0" from react-native@0.76.9
npm warn node_modules/react-native
npm warn   react-native@"0.79.4" from the root project
npm warn   29 more (@expo/metro-runtime, @expo/vector-icons, ...)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.0.0" from react-native-web@0.19.13
npm warn node_modules/react-native-web
npm warn   react-native-web@"^0.20.0" from the root project
npm warn   1 more (expo-system-ui)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react@18.3.1
npm warn node_modules/react
npm warn   react@"19.0.0" from the root project
npm warn   34 more (@callstack/react-theme-provider, @expo/vector-icons, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^18.3.1" from react-test-renderer@18.3.1
npm warn node_modules/react-test-renderer
npm warn   dev react-test-renderer@"18.3.1" from the root project
npm warn   1 more (jest-expo)
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: wordgrid-quest-expo@1.0.0
npm warn Found: react-dom@18.3.1
npm warn node_modules/react-dom
npm warn   react-dom@"19.0.0" from the root project
npm warn   1 more (react-native-web)
npm warn
npm warn Could not resolve dependency:
npm warn peer react-dom@"^18.0.0" from react-native-web@0.19.13
npm warn node_modules/react-native-web
npm warn   react-native-web@"^0.20.0" from the root project
npm warn   1 more (expo-system-ui)
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: wordgrid-quest-expo@1.0.0
npm error Found: react@19.0.0
npm error node_modules/react
npm error   react@"19.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^18.3.1" from react-test-renderer@18.3.1
npm error node_modules/react-test-renderer
npm error   dev react-test-renderer@"18.3.1" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error /Users/travisjupp/.npm/_logs/2025-06-30T22_02_39_236Z-eresolve-report.txt
npm error A complete log of this run can be found in: /Users/travisjupp/.npm/_logs/2025-06-30T22_02_39_236Z-debug-0.log
Error: npm install exited with non-zero code: 1
Error: npm install exited with non-zero code: 1
    at ChildProcess.completionListener (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/spawn-async/build/spawnAsync.js:42:23)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:518:28)
    at maybeClose (node:internal/child_process:1101:16)
    at ChildProcess._handle.onexit (node:internal/child_process:304:5)
    ...
    at spawnAsync (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/spawn-async/build/spawnAsync.js:7:23)
    at NpmPackageManager.runAsync (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/package-manager/build/node/BasePackageManager.js:41:42)
    at /Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/package-manager/build/node/NpmPackageManager.js:36:20
    at /Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/package-manager/build/utils/spawn.js:14:34
Error: npx expo install --fix exited with non-zero code: 1
Error: npx expo install --fix exited with non-zero code: 1
    at ChildProcess.completionListener (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/spawn-async/build/spawnAsync.js:42:23)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:518:28)
    at maybeClose (node:internal/child_process:1101:16)
    at ChildProcess._handle.onexit (node:internal/child_process:304:5)
    ...
    at spawnAsync (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/spawn-async/build/spawnAsync.js:7:23)
    at installExpoPackageAsync (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/cli/build/src/install/installExpoPackage.js:110:41)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async installPackagesAsync (/Users/travisjupp/Documents/projects/wordgrid-quest-53/node_modules/@expo/cli/build/src/install/installAsync.js:170:16)



```
