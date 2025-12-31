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
    // Entry 1: Handles "import ... from '@reduxjs/toolkit'"
    '^@reduxjs/toolkit$': '<rootDir>/node_modules/@reduxjs/toolkit/dist/cjs/index.js',

    // Entry 2: Handles sub-paths like "import ... from '@reduxjs/toolkit/query'"
    '^@reduxjs/toolkit/(.*)$': '<rootDir>/node_modules/@reduxjs/toolkit/dist/cjs/$1',


  },
};
