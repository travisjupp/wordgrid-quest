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
};
