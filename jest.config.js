const transformWhitelist = [
  '(jest-)?react-native',
  '@react-native(-community)?',
  'expo(nent)?',
  '@expo(nent)?/.*',
  '@expo-google-fonts/.*',
  'react-navigation',
  '@react-navigation/.*',
  '@unimodules/.*',
  'unimodules',
  'sentry-expo',
  'native-base',
  'react-native-svg',
  'react-redux',
  '@reduxjs/toolkit',
  'immer',
  'react-native-keyboard-controller',
  'react-native-safe-area-context',
  '@gorhom/bottom-sheet',
  'react-native-paper',
  'react-native-screens',
  'react-native-webview',
  'firebase',
  '@expo/vector-icons',
];

module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    `node_modules/(?!(${transformWhitelist.join('|')}))`,
  ],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@fonts/(.*)$': '<rootDir>/assets/fonts/$1',
    '^@images/(.*)$': '<rootDir>/assets/images/$1',
    '^@custom-types/(.*)$': '<rootDir>/src/types/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@prototype/(.*)$': '<rootDir>/prototype/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    // Force Redux Toolkit to use the CommonJS entry point
    // Core RTK: Maps "@reduxjs/toolkit", handles "import ... from '@reduxjs/toolkit'"
    '^@reduxjs/toolkit$':
      '<rootDir>/node_modules/@reduxjs/toolkit/dist/cjs/index.js',
    // RTK Query (React): Maps "@reduxjs/toolkit/query/react"
    // Note: The structure often places React-specific CJS inside its own react subfolder
    '^@reduxjs/toolkit/query/react$':
      '<rootDir>/node_modules/@reduxjs/toolkit/dist/query/react/cjs/index.js',
    // RTK Query (Core): Maps "@reduxjs/toolkit/query"
    '^@reduxjs/toolkit/query$':
      '<rootDir>/node_modules/@reduxjs/toolkit/dist/query/cjs/index.js',
    // Catch-all for other sub-paths (fallback)
    '^@reduxjs/toolkit/(.*)$':
    '<rootDir>/node_modules/@reduxjs/toolkit/dist/$1/cjs/index.js',
    // Figma Material Theme-Builder Export
    '^@theme/material-theme.json$': '<rootDir>/src/theme/material-theme.json',
    // Custom RNP Light Theme
    '^@theme/CustomLightColors.json$': '<rootDir>/src/theme/CustomLightColors.json',
    // RNP Standard Light Theme
    '^@theme/MD3LightTheme.json$': '<rootDir>/src/theme/MD3LightTheme.json',
  },
  // Point to the Native Mock Registry
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
};
