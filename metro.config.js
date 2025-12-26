// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;
const externalPath = path.resolve(__dirname, '../Javascript');
config.watchFolders = [...(config.watchFolders || []), externalPath];

module.exports = config;

